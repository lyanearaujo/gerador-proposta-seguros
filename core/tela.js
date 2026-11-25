'use strict';
/* =====================================================================
   core/tela.js  -  Controle da interface, prévia, rascunho e PDF
   ===================================================================== */

const LS_RASCUNHO = 'neu_proposta_rascunho_v7';
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

function lerLS(chave) { try { return JSON.parse(localStorage.getItem(chave)); } catch (_) { return null; } }
function gravarLS(chave, v) { try { localStorage.setItem(chave, JSON.stringify(v)); } catch (_) { /* ignora */ } }

/* ---------- estado ---------- */
let corretora = Object.assign({}, CORRETORA_PADRAO, lerLS(LS_CORRETORA) || {});
if (!Array.isArray(corretora.diferenciais)) {
  corretora.diferenciais = CORRETORA_PADRAO.diferenciais.map(function (x) { return Object.assign({}, x); });
}

function normalizarEstado(obj) {
  const base = estadoPadrao(obj && obj.tipo);
  if (!obj) return base;
  const e = Object.assign(base, obj);

  Object.keys(window.PRODUTOS).forEach(function (k) {
    const padrao = conteudoPadrao(k);
    const salvo = (obj.conteudo || {})[k] || {};
    e.conteudo[k] = Object.assign({}, padrao, salvo);

    if (padrao.coberturasSelecionadas && !Array.isArray(e.conteudo[k].coberturasSelecionadas)) {
      e.conteudo[k].coberturasSelecionadas = padrao.coberturasSelecionadas.slice();
    }
    if (padrao.coberturasCustom && (!e.conteudo[k].coberturasCustom || typeof e.conteudo[k].coberturasCustom !== 'object')) {
      e.conteudo[k].coberturasCustom = Object.assign({}, padrao.coberturasCustom);
    }
    if (padrao.valoresCoberturas && (!e.conteudo[k].valoresCoberturas || typeof e.conteudo[k].valoresCoberturas !== 'object')) {
      e.conteudo[k].valoresCoberturas = {};
    }
    if (padrao.resumoValores) {
      e.conteudo[k].resumoValores = Object.assign({ liquido: [], total: [], pagamento: [] }, salvo.resumoValores || {});
    }
    if (!Array.isArray(e.conteudo[k].requisitos)) {
      const reqBase = Array.isArray(padrao.requisitos) ? padrao.requisitos : [];
      e.conteudo[k].requisitos = reqBase.map(function (x) { return Object.assign({}, x); });
    }
    if (padrao.comparativoConcorrente) {
      const ccPadrao = padrao.comparativoConcorrente;
      const ccSalvo = (salvo.comparativoConcorrente && typeof salvo.comparativoConcorrente === 'object') ? salvo.comparativoConcorrente : {};
      e.conteudo[k].comparativoConcorrente = Object.assign({}, ccPadrao, ccSalvo);
      if (!Array.isArray(e.conteudo[k].comparativoConcorrente.linhas)) {
        const linhasBase = Array.isArray(ccPadrao.linhas) ? ccPadrao.linhas : [];
        e.conteudo[k].comparativoConcorrente.linhas = linhasBase.map(function (x) { return Object.assign({}, x); });
      }
    }
  });

  ['cliente', 'cnpj', 'endereco'].forEach(function (k) { e[k] = String(e[k] || ''); });
  e.versao = 7;
  return e;
}

let rascunho = lerLS(LS_RASCUNHO) || lerLS('neu_proposta_rascunho_v6') || lerLS('neu_proposta_rascunho_v5');
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
  const larg = 794;
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
  ajustarDensidadePaginas(doc.body);
  ajustarPreview();
  setTimeout(function () {
    ajustarDensidadePaginas(doc.body);
    ajustarPreview();
  }, 400);
}

function mudou() {
  clearTimeout(tPrev);
  tPrev = setTimeout(atualizarPreview, 150);
  clearTimeout(tSalvar);
  tSalvar = setTimeout(function () { gravarLS(LS_RASCUNHO, { estado: estado }); }, 500);
}

frame.addEventListener('load', function () {
  if (!frame.contentDocument.querySelector('link')) return;
  framePronto = true;
  atualizarPreview();
});
frame.srcdoc = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><link rel="stylesheet" href="proposta.css?v=' + (window.VERSAO_APP || Date.now()) + '"></head><body></body></html>';
window.addEventListener('resize', ajustarPreview);

/* ---------- montagem dinâmica do menu de produtos ---------- */
function montarMenuTipos() {
  const cont = $('#lista-tipos');
  cont.innerHTML = '';
  Object.values(window.PRODUTOS).forEach(function (prod) {
    const rad = h('input', { type: 'radio', name: 'tipo', value: prod.id });
    rad.addEventListener('change', function () {
      estado.tipo = prod.id;
      sincronizarForm();
      mudou();
    });
    cont.append(h('label', { class: 'opcao' }, [rad, h('span', { text: prod.nomeMenu })]));
  });
}

/* ---------- ligação campo <-> estado ---------- */
function resolver(path) {
  const partes = path.split('.');
  let alvo;
  if (partes[0] === 'c') { alvo = conteudo(); partes.shift(); }
  else if (partes[0] === 'corr') { alvo = corretora; partes.shift(); }
  else alvo = estado;
  while (partes.length > 1) {
    const k = partes.shift();
    if (!alvo[k] || typeof alvo[k] !== 'object') alvo[k] = {};
    alvo = alvo[k];
  }
  return { obj: alvo, chave: partes[0] };
}

$('#form').addEventListener('input', function (ev) {
  const t = ev.target;
  const p = t.dataset ? t.dataset.path : null;
  if (!p) return;
  if (t.dataset.mask === 'cnpj') t.value = mascaraCpfCnpj(t.value);
  const r = resolver(p);
  r.obj[r.chave] = t.value;
  if (p.indexOf('corr.') === 0) gravarLS(LS_CORRETORA, corretora);
  mudou();
});

/* ---------- editor de coberturas (caixinhas por grupo) ---------- */
function editorCoberturas(prod) {
  const sec = $('#secao-coberturas');
  const cont = $('#lista-coberturas');
  if (!prod.gruposCoberturas) {
    sec.hidden = true;
    cont.innerHTML = '';
    return;
  }
  sec.hidden = false;
  cont.innerHTML = '';

  const d = conteudo();
  if (!Array.isArray(d.coberturasSelecionadas)) d.coberturasSelecionadas = [];
  if (!d.coberturasCustom) d.coberturasCustom = {};

  prod.gruposCoberturas.forEach(function (g) {
    const box = h('div', { class: 'grupo-check' });
    box.append(h('div', { class: 'grupo-titulo', text: g.grupo }));

    g.itens.forEach(function (it) {
      const marcado = d.coberturasSelecionadas.indexOf(it.id) >= 0;
      const chk = h('input', { type: 'checkbox' });
      chk.checked = marcado;

      let campoCustom = null;
      if (it.customizavel) {
        campoCustom = h('textarea', {
          rows: 2,
          placeholder: it.placeholder || 'Descreva a cobertura...',
          class: 'campo-cob-custom'
        });
        campoCustom.value = d.coberturasCustom[it.id] || '';
        campoCustom.hidden = !marcado;
        campoCustom.addEventListener('input', function () {
          d.coberturasCustom[it.id] = campoCustom.value;
          mudou();
        });
      }

      chk.addEventListener('change', function () {
        const idx = d.coberturasSelecionadas.indexOf(it.id);
        if (chk.checked && idx < 0) d.coberturasSelecionadas.push(it.id);
        if (!chk.checked && idx >= 0) d.coberturasSelecionadas.splice(idx, 1);
        if (campoCustom) campoCustom.hidden = !chk.checked;
        if (prod.tabelaMatrizCoberturas) editorTabelaMatriz(prod);
        mudou();
      });

      const lbl = h('label', { class: 'check cob-item' }, [chk, h('span', { text: it.nome })]);
      box.append(lbl);
      if (campoCustom) box.append(campoCustom);
    });

    cont.append(box);
  });
}

/* ---------- editor de listas ---------- */
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

/* ---------- editor da tabela matricial (Empresarial/Condomínio: Limite + Franquia) ---------- */
function editorTabelaMatriz(prod) {
  const d = conteudo();
  const cont = $('#editor-tabela');
  cont.innerHTML = '';
  const rebuild = function () { editorTabelaMatriz(prod); mudou(); };

  if (!d.valoresCoberturas) d.valoresCoberturas = {};
  if (!d.resumoValores) d.resumoValores = { liquido: [], total: [], pagamento: [] };

  const ativas = prod.obterCoberturasAtivas(d);
  const tab = h('table', { class: 'tab-ed tab-matriz-ed' });

  const cab1 = h('tr');
  const nenhuma = h('input', { type: 'radio', name: 'destaque-col' });
  nenhuma.checked = d.destaqueCol < 0 || d.destaqueCol >= d.colunas.length;
  nenhuma.addEventListener('change', function () { d.destaqueCol = -1; mudou(); });
  cab1.append(h('th', { rowspan: 2 }, [h('label', { class: 'recom' }, [nenhuma, ' Sem destaque'])]));

  d.colunas.forEach(function (nome, i) {
    const inp = h('input', { placeholder: 'Nome da seguradora' });
    inp.value = nome;
    inp.addEventListener('input', function () { d.colunas[i] = inp.value; mudou(); });

    const rad = h('input', { type: 'radio', name: 'destaque-col' });
    rad.checked = d.destaqueCol === i;
    rad.addEventListener('change', function () { d.destaqueCol = i; mudou(); });

    const rm = h('button', { type: 'button', class: 'x pequeno', title: 'Remover seguradora', text: '×' });
    rm.addEventListener('click', function () {
      if (d.colunas.length <= 1) { aviso('A tabela precisa de pelo menos 1 seguradora.'); return; }
      d.colunas.splice(i, 1);
      Object.keys(d.valoresCoberturas).forEach(function (cid) {
        if (Array.isArray(d.valoresCoberturas[cid])) d.valoresCoberturas[cid].splice(i, 1);
      });
      ['liquido', 'total', 'pagamento'].forEach(function (k) {
        if (Array.isArray(d.resumoValores[k])) d.resumoValores[k].splice(i, 1);
      });
      if (d.destaqueCol === i) d.destaqueCol = -1;
      else if (d.destaqueCol > i) d.destaqueCol -= 1;
      rebuild();
    });

    cab1.append(h('th', { colspan: 2 }, [inp, h('label', { class: 'recom' }, [rad, ' Recomendada']), rm]));
  });

  const addCol = h('button', { type: 'button', class: 'add', text: '+ Seguradora' });
  addCol.addEventListener('click', function () {
    d.colunas.push('Seguradora ' + (d.colunas.length + 1));
    rebuild();
  });
  cab1.append(h('th', { rowspan: 2 }, [addCol]));
  tab.append(cab1);

  const cab2 = h('tr');
  d.colunas.forEach(function () {
    cab2.append(h('th', { class: 'sub-th-ed', text: 'Limite de garantia' }));
    cab2.append(h('th', { class: 'sub-th-ed', text: 'Franquia' }));
  });
  tab.append(cab2);

  if (!ativas.length) {
    const trVazio = h('tr');
    trVazio.append(h('td', { colspan: 1 + (d.colunas.length * 2), class: 'aviso-tab-vazia', text: 'Marque as coberturas na seção 5 acima para preencher os limites e franquias aqui.' }));
    tab.append(trVazio);
  } else {
    ativas.forEach(function (cob) {
      if (!Array.isArray(d.valoresCoberturas[cob.id])) d.valoresCoberturas[cob.id] = [];
      const arr = d.valoresCoberturas[cob.id];
      const tr = h('tr');
      tr.append(h('td', { class: 'nome-cob-ed', text: cob.nome }));

      d.colunas.forEach(function (_, ci) {
        if (!arr[ci]) arr[ci] = { lmg: '', franq: '' };

        const inpLmg = h('input', { placeholder: 'Limite (R$)' });
        inpLmg.value = arr[ci].lmg || '';
        inpLmg.addEventListener('input', function () { arr[ci].lmg = inpLmg.value; mudou(); });
        inpLmg.addEventListener('blur', function () {
          const f = dinheiroSeNumerico(inpLmg.value);
          if (f !== inpLmg.value) { inpLmg.value = f; arr[ci].lmg = f; mudou(); }
        });

        const inpFranq = h('input', { placeholder: 'Franquia' });
        inpFranq.value = arr[ci].franq || '';
        inpFranq.addEventListener('input', function () { arr[ci].franq = inpFranq.value; mudou(); });
        inpFranq.addEventListener('blur', function () {
          const f = dinheiroSeNumerico(inpFranq.value);
          if (f !== inpFranq.value) { inpFranq.value = f; arr[ci].franq = f; mudou(); }
        });

        tr.append(h('td', {}, [inpLmg]));
        tr.append(h('td', {}, [inpFranq]));
      });

      tab.append(tr);
    });
  }

  const linhasFinais = [
    { chave: 'liquido', rotulo: 'Valor Líquido', ph: 'Ex.: 6840,00', formatarMoeda: true },
    { chave: 'total', rotulo: 'Valor Total (Bruto)', ph: 'Ex.: 7344,79', formatarMoeda: true, destaque: true },
    { chave: 'pagamento', rotulo: 'Forma de Pagamento', ph: 'Ex.: 6x sem juros - Débito em conta', formatarMoeda: false }
  ];

  linhasFinais.forEach(function (lf) {
    if (!Array.isArray(d.resumoValores[lf.chave])) d.resumoValores[lf.chave] = [];
    const arr = d.resumoValores[lf.chave];
    const tr = h('tr', { class: lf.destaque ? 'tr-total-ed' : 'tr-resumo-ed' });
    tr.append(h('td', { class: 'nome-cob-ed', text: lf.rotulo }));

    d.colunas.forEach(function (_, ci) {
      const inp = h('input', { placeholder: lf.ph });
      inp.value = arr[ci] || '';
      inp.addEventListener('input', function () { arr[ci] = inp.value; mudou(); });
      if (lf.formatarMoeda) {
        inp.addEventListener('blur', function () {
          const f = dinheiroSeNumerico(inp.value);
          if (f !== inp.value) { inp.value = f; arr[ci] = f; mudou(); }
        });
      }
      tr.append(h('td', { colspan: 2 }, [inp]));
    });

    tab.append(tr);
  });

  cont.append(h('div', { class: 'rolagem' }, [tab]));
}

/* ---------- editor da tabela simples (RCP e outros) ---------- */
function editorTabelaSimples() {
  const d = conteudo();
  const cont = $('#editor-tabela');
  cont.innerHTML = '';
  const rebuild = function () { editorTabelaSimples(); mudou(); };

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

/* ---------- editor do comparativo com concorrente ---------- */
function editorConcorrente(prod) {
  const sec = $('#secao-concorrente');
  const d = conteudo();
  if (!prod.suportaComparativoConcorrente || !d.comparativoConcorrente) {
    sec.hidden = true;
    return;
  }
  sec.hidden = false;
  const cc = d.comparativoConcorrente;
  const chk = $('#chk-concorrente');
  const box = $('#box-concorrente');
  chk.checked = !!cc.ativo;
  box.hidden = !cc.ativo;

  chk.onchange = function () {
    cc.ativo = chk.checked;
    box.hidden = !cc.ativo;
    mudou();
  };

  if (!Array.isArray(cc.linhas)) cc.linhas = [];
  editorLista($('#lista-concorrente'), cc.linhas, [
    { k: 'item', rot: 'Cobertura / Condição', ph: 'Ex.: Danos Elétricos' },
    { k: 'concorrente', rot: 'Concorrente', ph: 'Ex.: R$ 60.000,00' },
    { k: 'nossa', rot: 'Nossa Proposta', ph: 'Ex.: R$ 120.000,00' }
  ], function () { return { item: '', concorrente: '', nossa: '' }; }, 'Adicionar item comparado');
}

/* ---------- sincroniza o formulário inteiro ---------- */
function sincronizarForm() {
  const prod = obterProduto(estado.tipo);
  const d = conteudo();

  $$('input[name="tipo"]').forEach(function (r) { r.checked = r.value === estado.tipo; });
  $('#capa').checked = estado.capa;

  $$('[data-path]').forEach(function (inp) {
    const r = resolver(inp.dataset.path);
    inp.value = r.obj[r.chave] || '';
  });

  const lblDoc = $('#label-doc');
  if (lblDoc) {
    lblDoc.firstChild.textContent = prod.aceitaCpf ? 'CPF/CNPJ ' : 'CNPJ ';
    $('[data-path="cnpj"]').placeholder = prod.aceitaCpf ? '000.000.000-00 ou 00.000.000/0000-00' : '00.000.000/0000-00';
  }

  $('#dica-cards').textContent = prod.dicaCards || '';
  $('#campo-endereco').hidden = !prod.mostraEndereco;
  $('#dica-analise').textContent = 'Escreva os pontos principais da análise do risco. Você pode deixar o título vazio e preencher só o texto, ou usar os dois.';

  editorCoberturas(prod);
  editorConcorrente(prod);

  let num = prod.gruposCoberturas ? 6 : 5;
  $$('.sec-numerada').forEach(function (el) {
    const pai = el.closest('details');
    if (pai && pai.hidden) return;
    el.textContent = num + '. ' + el.dataset.titulo;
    num += 1;
  });

  editorLista($('#lista-destaques'), d.destaques,
    [{ k: 't', rot: 'Título em negrito', ph: 'Ex.: Foco Estrutural:' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar destaque');

  editorLista($('#lista-cards'), d.cards,
    [{ k: 'r', rot: 'Título do quadro', ph: 'Ex.: Vigência da apólice' }, { k: 'v', rot: 'Informação principal', ph: 'Ex.: 12 meses' }, { k: 'd', rot: 'Detalhe (opcional)', ph: '' }],
    function () { return { r: '', v: '', d: '' }; }, 'Adicionar quadro');

  editorLista($('#lista-analise'), d.analise,
    [{ k: 't', rot: 'Título em negrito (opcional)', ph: '' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar ponto da análise');

  if (prod.tabelaMatrizCoberturas) editorTabelaMatriz(prod);
  else editorTabelaSimples();

  editorLista($('#lista-riscos'), d.riscos,
    [{ k: 't', rot: 'Título em negrito', ph: 'Ex.: Extintores de Incêndio:' }, { k: 'x', rot: 'Texto', longo: true }],
    function () { return { t: '', x: '' }; }, 'Adicionar recomendação');

  if (!Array.isArray(d.requisitos)) d.requisitos = [];
  editorLista($('#lista-requisitos'), d.requisitos,
    [{ k: 'x', rot: 'Requisito de aceitação', longo: true, ph: 'Ex.: Edificação construída em alvenaria com cobertura incombustível.' }],
    function () { return { x: '' }; }, 'Adicionar requisito');

  editorLista($('#lista-dif'), corretora.diferenciais,
    [{ k: 'x', rot: 'Diferencial' }],
    function () { return { x: '' }; }, 'Adicionar diferencial');

  atualizarPreview();
}

$('#lista-dif').addEventListener('input', function () { gravarLS(LS_CORRETORA, corretora); });
$('#capa').addEventListener('change', function () { estado.capa = $('#capa').checked; mudou(); });

/* ---------- botões ---------- */
$('#btnNovo').addEventListener('click', function () {
  if (!confirm('Começar uma proposta nova? O que está na tela será apagado.')) return;
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
  aviso('Arquivo salvo na pasta Downloads.');
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
  atualizarPreview();
  const pend = validarProposta(estado);
  const estouros = frame.contentDocument
    ? frame.contentDocument.querySelectorAll('.pagina-estouro').length
    : 0;
  if (estouros > 0) {
    pend.push('Há ' + estouros + ' página(s) com texto excedendo o limite da folha A4 (marcada com borda tracejada vermelha na prévia).');
  }
  if (pend.length && !confirm('Atenção antes de gerar o PDF:\n\n• ' + pend.join('\n• ') + '\n\nGerar mesmo assim?')) return;
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
montarMenuTipos();
sincronizarForm();
if (rascunho && rascunho.estado) aviso('Rascunho anterior recuperado.');