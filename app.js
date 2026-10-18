'use strict';
/* =====================================================================
   app.js  -  a tela: formulário, prévia, rascunho automático e PDF.
   Depende de gerador.js (carregado antes no index.html).
   ===================================================================== */

const LS_RASCUNHO = 'neu_proposta_rascunho_v2'; // Mudou para v2 para atualizar o cache
const LS_CORRETORA = 'neu_corretora_v1';

const $ = function (s, r) { return (r || document).querySelector(s); };
const $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };

function h(tag, props, kids) {
  const e = document.createElement(tag);
  Object.keys(props || {}).forEach(function (k) {
    const v = props[k];
    if (v === undefined || v === null) return;
    if (k === 'text') e.textContent = v;
    else if (k === 'class') e.className = v;
    else e.setAttribute(k, v);
  });
  [].concat(kids || []).forEach(function (c) { e.append(c); });
  return e;
}

/* ---------- armazenamento (à prova de navegador bloqueado) ---------- */
function lerLS(chave) { try { return JSON.parse(localStorage.getItem(chave)); } catch (_) { return null; } }
function gravarLS(chave, v) { try { localStorage.setItem(chave, JSON.stringify(v)); } catch (_) { /* ignora */ } }

/* ---------- estado ---------- */
let corretora = Object.assign({}, CORRETORA_PADRAO, lerLS(LS_CORRETORA) || {});
if (!Array.isArray(corretora.diferenciais)) corretora.diferenciais = CORRETORA_PADRAO.diferenciais.map(function (x) { return Object.assign({}, x); });

function normalizarEstado(obj) {
  const base = estadoPadrao(obj && obj.tipo);
  if (!obj) return base;
  const e = Object.assign(base, obj);
  e.conteudo = {
    rcp: Object.assign(conteudoPadrao('rcp'), (obj.conteudo || {}).rcp || {}),
    patrimonial: Object.assign(conteudoPadrao('patrimonial'), (obj.conteudo || {}).patrimonial || {})
  };
  
  // Correção do cache antigo: O rascunho v1 não tinha a nota legal no RCP.
  // Aqui a gente força a nota legal do RCP caso ela esteja vazia no rascunho.
  if ((e.versao === 1 || !e.versao) && e.conteudo.rcp.notaLegal === '') {
    e.conteudo.rcp.notaLegal = LEI_NOTA;
  }
  e.versao = 2;

  ['cliente', 'cnpj', 'endereco'].forEach(function (k) { e[k] = String(e[k] || ''); });
  // Agora a capa é sempre verdadeira como padrão
  e.capa = true;
  return e;
}

// Verifica se existe rascunho na v2, senão tenta puxar da v1
let rascunho = lerLS(LS_RASCUNHO) || lerLS('neu_proposta_rascunho_v1');
let estado = normalizarEstado(rascunho && rascunho.estado);
const conteudo = function () { return estado.conteudo[estado.tipo]; };

/* ---------- aviso rápido ---------- */
let tAviso;
function aviso(msg) {
  const t = $('#aviso');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(tAviso);
  tAviso = setTimeout(function () { t.hidden = true; }, 3500);
}

/* ---------- prévia ---------- */
const frame = $('#preview');
let framePronto = false;
let tPrev, tSalvar;

function ajustarPreview() {
  const doc = frame.contentDocument;
  if (!doc || !doc.documentElement) return;
  const wrap = $('#previewWrap');
  const larg = 794; /* 210 mm */
  const alt = doc.documentElement.scrollHeight;
  const esc = Math.min(1, (wrap.clientWidth - 24) / larg);
  frame.style.width = larg + 'px';
  frame.style.height = alt + 'px';
  frame.style.transform = 'scale(' + esc + ')';
  const caixa = $('#escala');
  caixa.style.width = (larg * esc) + 'px';
  caixa.style.height = (alt * esc) + 'px';
}

function atualizarPreview() {
  if (!framePronto) return;
  const doc = frame.contentDocument;
  doc.body.setAttribute('data-tipo', estado.tipo);
  doc.body.setAttribute('data-capa', estado.capa ? 'sim' : 'nao');
  doc.body.innerHTML = montarProposta(estado, corretora);
  doc.title = nomeArquivo(estado);
  ajustarPreview();
  setTimeout(ajustarPreview, 400); /* depois das imagens carregarem */
}

function mudou() {
  clearTimeout(tPrev);
  tPrev = setTimeout(atualizarPreview, 150);
  clearTimeout(tSalvar);
  tSalvar = setTimeout(function () { gravarLS(LS_RASCUNHO, { estado: estado }); }, 500);
}

frame.addEventListener('load', function () {
  if (!frame.contentDocument.querySelector('link')) return; /* ignora o about:blank inicial */
  framePronto = true;
  atualizarPreview();
});
frame.srcdoc = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><link rel="stylesheet" href="proposta.css"></head><body></body></html>';
window.addEventListener('resize', ajustarPreview);

/* ---------- ligação campo <-> estado ---------- */
function resolver(path) {
  const partes = path.split('.');
  let alvo;
  if (partes[0] === 'c') { alvo = conteudo(); partes.shift(); }
  else if (partes[0] === 'corr') { alvo = corretora; partes.shift(); }
  else alvo = estado;
  return { obj: alvo, chave: partes.join('.') };
}

$('#form').addEventListener('input', function (ev) {
  const t = ev.target;
  const p = t.dataset ? t.dataset.path : null;
  if (!p) return;
  if (t.dataset.mask === 'cnpj') t.value = mascaraCnpj(t.value);
  const r = resolver(p);
  r.obj[r.chave] = t.value;
  if (p.indexOf('corr.') === 0) gravarLS(LS_CORRETORA, corretora);
  mudou();
});

/* ---------- editor de listas (quadros, tópicos, destaques...) ---------- */
function editorLista(cont, arr, campos, novo, rotuloAdd) {
  cont.innerHTML = '';
  arr.forEach(function (item, i) {
    const caixa = h('div', { class: 'campos' });
    campos.forEach(function (c) {
      const inp = h(c.longo ? 'textarea' : 'input', { placeholder: c.ph || '', rows: c.longo ? 2 : undefined });
      inp.value = item[c.k] || '';
      inp.addEventListener('input', function () { item[c.k] = inp.value; mudou(); });
      caixa.append(h('label', {}, [h('span', { text: c.rot }), inp]));
    });
    const rm = h('button', { type: 'button', class: 'x', title: 'Remover este item', text: '×' });
    rm.addEventListener('click', function () {
      arr.splice(i, 1);
      editorLista(cont, arr, campos, novo, rotuloAdd);
      mudou();
    });
    cont.append(h('div', { class: 'item' }, [caixa, rm]));
  });
  const add = h('button', { type: 'button', class: 'add', text: '+ ' + rotuloAdd });
  add.addEventListener('click', function () {
    arr.push(novo());
    editorLista(cont, arr, campos, novo, rotuloAdd);
    mudou();
  });
  cont.append(add);
}

/* ---------- editor da tabela comparativa ---------- */
function editorTabela() {
  const d = conteudo();
  const cont = $('#editor-tabela');
  cont.innerHTML = '';
  const rebuild = function () { editorTabela(); mudou(); };

  const tab = h('table', { class: 'tab-ed' });
  const cab = h('tr');

  const nenhuma = h('input', { type: 'radio', name: 'destaque-col' });
  nenhuma.checked = d.destaqueCol < 0 || d.destaqueCol >= d.colunas.length;
  nenhuma.addEventListener('change', function () { d.destaqueCol = -1; mudou(); });
  cab.append(h('th', {}, [h('label', { class: 'recom' }, [nenhuma, ' Sem coluna em destaque'])]));

  d.colunas.forEach(function (nome, i) {
    const inp = h('input', { placeholder: 'Nome da coluna' });
    inp.value = nome;
    inp.addEventListener('input', function () { d.colunas[i] = inp.value; mudou(); });
    const rad = h('input', { type: 'radio', name: 'destaque-col' });
    rad.checked = d.destaqueCol === i;
    rad.addEventListener('change', function () { d.destaqueCol = i; mudou(); });
    const rm = h('button', { type: 'button', class: 'x pequeno', title: 'Remover coluna', text: '×' });
    rm.addEventListener('click', function () {
      if (d.colunas.length <= 1) { aviso('A tabela precisa de pelo menos 1 coluna.'); return; }
      d.colunas.splice(i, 1);
      d.linhas.forEach(function (l) { l.vals.splice(i, 1); });
      if (d.destaqueCol === i) d.destaqueCol = -1;
      else if (d.destaqueCol > i) d.destaqueCol -= 1;
      rebuild();
    });
    cab.append(h('th', {}, [inp, h('label', { class: 'recom' }, [rad, ' Recomendada']), rm]));
  });
  const addCol = h('button', { type: 'button', class: 'add', text: '+ Coluna' });
  addCol.addEventListener('click', function () {
    d.colunas.push('Nova opção');
    d.linhas.forEach(function (l) { l.vals.push(''); });
    rebuild();
  });
  cab.append(h('th', {}, [addCol]));
  tab.append(cab);

  d.linhas.forEach(function (l, li) {
    while (l.vals.length < d.colunas.length) l.vals.push('');
    const tr = h('tr');
    const rot = h('input', { placeholder: 'Nome da linha (ex.: Valor Total)' });
    rot.value = l.rot;
    rot.addEventListener('input', function () { l.rot = rot.value; mudou(); });
    const neg = h('input', { type: 'checkbox' });
    neg.checked = !!l.neg;
    neg.addEventListener('change', function () { l.neg = neg.checked; mudou(); });
    tr.append(h('td', {}, [rot, h('label', { class: 'recom' }, [neg, ' Linha em negrito'])]));
    d.colunas.forEach(function (_, ci) {
      const v = h('input', { placeholder: 'Valor' });
      v.value = l.vals[ci] || '';
      v.addEventListener('input', function () { l.vals[ci] = v.value; mudou(); });
      v.addEventListener('blur', function () {
        const f = dinheiroSeNumerico(v.value);
        if (f !== v.value) { v.value = f; l.vals[ci] = f; mudou(); }
      });
      tr.append(h('td', {}, [v]));
    });
    const rm = h('button', { type: 'button', class: 'x pequeno', title: 'Remover linha', text: '×' });
    rm.addEventListener('click', function () { d.linhas.splice(li, 1); rebuild(); });
    tr.append(h('td', {}, [rm]));
    tab.append(tr);
  });

  cont.append(h('div', { class: 'rolagem' }, [tab]));
  const addLinha = h('button', { type: 'button', class: 'add', text: '+ Linha' });
  addLinha.addEventListener('click', function () {
    d.linhas.push({ rot: '', vals: d.colunas.map(function () { return ''; }), neg: false });
    rebuild();
  });
  cont.append(addLinha);
}

/* ---------- sincroniza o formulário inteiro com o estado ---------- */
function sincronizarForm() {
  const d = conteudo();
  const rcp = estado.tipo === 'rcp';

  $$('input[name="tipo"]').forEach(function (r) { r.checked = r.value === estado.tipo; });
  $('#capa').checked = estado.capa;

  $$('[data-path]').forEach(function (inp) {
    const r = resolver(inp.dataset.path);
    inp.value = r.obj[r.chave] || '';
  });

  $('#tit-analise').textContent = 'Análise técnica';
  // Dica unificada para o novo layout em caixa branca
  $('#dica-analise').textContent = 'Escreva os pontos principais da análise do risco. Você pode deixar o título vazio e preencher só o texto, ou usar os dois.';
  
  $('#dica-cards').textContent = rcp
    ? 'O primeiro quadro (CNPJ) é automático. Aqui entram os demais: enquadramento, faturamento, vigência, retroatividade...'
    : 'O primeiro quadro (CNPJ e endereço) é automático. Aqui entram os demais: enquadramento, vigência, valor em risco...';
  $('#campo-endereco').hidden = rcp;

  editorLista($('#lista-destaques'), d.destaques,
    [{ k: 't', rot: 'Título em negrito', ph: 'Ex.: Foco na Proteção Profissional:' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar destaque');

  editorLista($('#lista-cards'), d.cards,
    [{ k: 'r', rot: 'Título do quadro', ph: 'Ex.: Vigência e validade' }, { k: 'v', rot: 'Informação principal', ph: 'Ex.: 04/09/2026 a 04/09/2027' }, { k: 'd', rot: 'Detalhe (opcional)', ph: 'Ex.: Retroatividade: 04/09/23' }],
    function () { return { r: '', v: '', d: '' }; }, 'Adicionar quadro');

  // Agora a análise técnica usa os dois campos (título e texto) para os dois tipos de seguro!
  editorLista($('#lista-analise'), d.analise,
    [{ k: 't', rot: 'Título em negrito (opcional)', ph: 'Ex.: Franquia Padrão:' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar ponto da análise');

  editorTabela();

  editorLista($('#lista-riscos'), d.riscos,
    [{ k: 't', rot: 'Título em negrito', ph: 'Ex.: Extintores de Incêndio:' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar recomendação');

  editorLista($('#lista-dif'), corretora.diferenciais,
    [{ k: 'x', rot: 'Diferencial' }],
    function () { return { x: '' }; }, 'Adicionar diferencial');
  atualizarPreview();
}

/* diferenciais pertencem à corretora: grava junto (ligado uma vez só) */
$('#lista-dif').addEventListener('input', function () { gravarLS(LS_CORRETORA, corretora); });

/* ---------- eventos do topo do formulário ---------- */
$$('input[name="tipo"]').forEach(function (r) {
  r.addEventListener('change', function () {
    estado.tipo = r.value;
    estado.capa = true; /* Força a capa como padrão ao mudar de seguro */
    $('#capa').checked = true;
    sincronizarForm();
    mudou();
  });
});
$('#capa').addEventListener('change', function () { estado.capa = $('#capa').checked; mudou(); });

/* ---------- botões ---------- */
$('#btnNovo').addEventListener('click', function () {
  if (!confirm('Começar uma proposta nova? O que está na tela será apagado (salve em arquivo antes, se quiser guardar).')) return;
  estado = estadoPadrao(estado.tipo);
  sincronizarForm();
  mudou();
  aviso('Proposta nova pronta para preencher.');
});

$('#btnExemplo').addEventListener('click', function () {
  if (!confirm('Carregar a proposta de exemplo? Isso substitui o que está preenchido neste tipo de seguro.')) return;
  estado.conteudo[estado.tipo] = conteudoPadrao(estado.tipo);
  aplicarExemplo(estado);
  sincronizarForm();
  mudou();
});

$('#btnSalvar').addEventListener('click', function () {
  const blob = new Blob([JSON.stringify({ versao: estado.versao, estado: estado }, null, 2)], { type: 'application/json' });
  const a = h('a', { href: URL.createObjectURL(blob), download: nomeArquivo(estado) + '.json' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  aviso('Arquivo salvo na pasta Downloads. Use "Abrir arquivo" para continuar depois.');
});

$('#btnAbrir').addEventListener('click', function () { $('#arquivo').click(); });
$('#arquivo').addEventListener('change', function (ev) {
  const f = ev.target.files[0];
  if (!f) return;
  const leitor = new FileReader();
  leitor.onload = function () {
    try {
      const obj = JSON.parse(leitor.result);
      if (!obj || !obj.estado || !obj.estado.conteudo) throw new Error('formato');
      estado = normalizarEstado(obj.estado);
      sincronizarForm();
      mudou();
      aviso('Proposta aberta.');
    } catch (_) {
      alert('Não consegui abrir esse arquivo. Escolha um arquivo .json salvo por este sistema.');
    }
  };
  leitor.readAsText(f);
  ev.target.value = '';
});

$('#btnPdf').addEventListener('click', function () {
  const pend = validarProposta(estado);
  if (pend.length && !confirm('Atenção antes de gerar o PDF:\n\n• ' + pend.join('\n• ') + '\n\nGerar mesmo assim?')) return;
  atualizarPreview();
  const nome = nomeArquivo(estado);
  const tituloAntes = document.title;
  document.title = nome;
  frame.contentDocument.title = nome;
  const restaurar = function () {
    document.title = tituloAntes;
    window.removeEventListener('afterprint', restaurar);
  };
  window.addEventListener('afterprint', restaurar);
  frame.contentWindow.focus();
  frame.contentWindow.print();
});

/* ---------- início ---------- */
sincronizarForm();
if (rascunho && rascunho.estado) aviso('Rascunho anterior recuperado e atualizado.');