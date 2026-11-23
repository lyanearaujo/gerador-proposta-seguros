'use strict';
/* =====================================================================
   core/motor.js  -  Núcleo compartilhado entre todos os seguros
   ===================================================================== */

const CORRETORA_PADRAO = {
  nome: 'Maria Neuresy Araújo',
  susep: '212131246',
  empresa: 'Neu Corretora de Seguros',
  telefones: '(83) 98896-1030',
  email: 'maria.neuresy@neucorretora.com.br',
  end1: 'R. Prof. Joaquim Santiago, 22, sala 204',
  end2: 'Expedicionários, João Pessoa-PB - CEP 58041-030',
  diferenciais: [
    { x: 'Atendimento 100% consultivo' },
    { x: 'Acompanhamento proativo anual' },
    { x: 'Especialistas em riscos empresariais' },
    { x: 'Revisão estratégica das coberturas' },
    { x: 'Apoio integral e ágil em sinistros' },
    { x: 'Atendimento personalizado' }
  ]
};

const LEI_NOTA = 'Nossa oferta atende integralmente às exigências da Lei Federal no 15.040/2024, em vigor desde 11/12/2025, garantindo total conformidade legal para as operações da sua empresa.';

function obterProduto(tipo) {
  return window.PRODUTOS[tipo] || window.PRODUTOS.patrimonial || Object.values(window.PRODUTOS)[0];
}

function conteudoPadrao(tipo) {
  return obterProduto(tipo).conteudoPadrao(LEI_NOTA);
}

function estadoPadrao(tipo) {
  tipo = tipo || 'patrimonial';
  const conteudos = {};
  Object.keys(window.PRODUTOS).forEach(function (k) {
    conteudos[k] = window.PRODUTOS[k].conteudoPadrao(LEI_NOTA);
  });
  return {
    versao: 7,
    tipo: tipo,
    capa: true,
    cliente: '',
    cnpj: '',
    endereco: '',
    conteudo: conteudos
  };
}

function aplicarExemplo(e) {
  const prod = obterProduto(e.tipo);
  if (prod.aplicarExemplo) prod.aplicarExemplo(e, e.conteudo[e.tipo]);
}

/* ---------- utilidades de texto e validação ---------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function rich(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}
function cel(v) {
  const partes = String(v || '').split('|');
  const a = partes[0].trim();
  const b = partes.slice(1).join('|').trim();
  if (!a && !b) return '—';
  return esc(a || '—') + (b ? '<span class="secundario">' + esc(b) + '</span>' : '');
}

function cpfCnpjValido(s) {
  const n = String(s || '').replace(/\D/g, '');
  if (n.length === 11) {
    if (/^(\d)\1+$/.test(n)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(n.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(n.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(n.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(n.substring(10, 11))) return false;
    return true;
  } else if (n.length === 14) {
    if (/^(\d)\1+$/.test(n)) return false;
    const dv = function (base) {
      let soma = 0, peso = base.length - 7;
      for (let i = 0; i < base.length; i++) {
        soma += base[i] * peso--;
        if (peso < 2) peso = 9;
      }
      const r = soma % 11;
      return r < 2 ? 0 : 11 - r;
    };
    const b = n.slice(0, 12).split('').map(Number);
    const d1 = dv(b);
    const d2 = dv(b.concat(d1));
    return d1 === Number(n[12]) && d2 === Number(n[13]);
  }
  return false;
}

function mascaraCpfCnpj(v) {
  let n = String(v).replace(/\D/g, '');
  if (n.length <= 11) {
    return n.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    n = n.slice(0, 14);
    return n.replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
  }
}

function dinheiroSeNumerico(txt) {
  const s = String(txt || '').trim().replace(/^R\$\s*/i, '');
  if (!s || !/^[\d.,]+$/.test(s)) return txt;
  let n;
  if (s.indexOf(',') >= 0) n = parseFloat(s.replace(/\./g, '').replace(',', '.'));
  else if (/^\d+\.\d{1,2}$/.test(s)) n = parseFloat(s);
  else if (/^\d+$/.test(s) || /^\d{1,3}(\.\d{3})+$/.test(s)) n = parseFloat(s.replace(/\./g, ''));
  else return txt;
  if (isNaN(n)) return txt;
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nomeArquivo(e, data) {
  data = data || new Date();
  const p = function (n) { return String(n).padStart(2, '0'); };
  const dia = data.getFullYear() + '-' + p(data.getMonth() + 1) + '-' + p(data.getDate());
  const cliente = String(e.cliente || 'Cliente')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40) || 'Cliente';
  return 'Proposta_' + e.tipo.toUpperCase() + '_' + cliente + '_' + dia;
}

function coletarTextos(o, acc) {
  if (typeof o === 'string') acc.push(o);
  else if (Array.isArray(o)) o.forEach(function (x) { coletarTextos(x, acc); });
  else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { coletarTextos(o[k], acc); });
  return acc;
}

function validarProposta(e) {
  const prod = obterProduto(e.tipo);
  const d = e.conteudo[e.tipo];
  const p = [];
  if (!e.cliente.trim()) p.push('Falta o nome do cliente / condomínio.');
  if (!e.cnpj.trim()) p.push(prod.aceitaCpf ? 'Falta o CPF/CNPJ.' : 'Falta o CNPJ.');
  else if (!cpfCnpjValido(e.cnpj)) p.push(prod.aceitaCpf ? 'O CPF/CNPJ digitado parece inválido.' : 'O CNPJ digitado parece inválido.');

  if (prod.validarExtra) prod.validarExtra(d, p);

  d.cards.forEach(function (c) {
    if ((c.r || c.d) && !String(c.v).trim()) p.push('O quadro "' + (c.r || 'sem título') + '" está sem valor.');
  });
  d.colunas.forEach(function (c, i) {
    if (!String(c).trim()) p.push('A coluna ' + (i + 1) + ' da tabela está sem nome.');
  });

  if (!prod.tabelaMatrizCoberturas && Array.isArray(d.linhas)) {
    d.linhas.forEach(function (l) {
      const preenchidas = d.colunas.filter(function (_, i) { return String(l.vals[i] || '').trim(); }).length;
      const soPrimeira = preenchidas === 1 && String(l.vals[0] || '').trim();
      if (preenchidas === 0) p.push('Na tabela, a linha "' + l.rot + '" está sem valores.');
      else if (preenchidas < d.colunas.length && !soPrimeira) p.push('Na tabela, a linha "' + l.rot + '" tem células vazias.');
    });
  }

  const textos = coletarTextos([d, e.cliente, e.endereco], []);
  if (textos.some(function (t) { return /\[[^\]]{1,60}\]/.test(t); })) {
    p.push('Ainda há trechos entre [COLCHETES] para preencher.');
  }
  return p;
}

/* ---------- montagem do HTML ---------- */
function montarProposta(e, c) {
  const prod = obterProduto(e.tipo);
  const d = e.conteudo[e.tipo];
  const rcp = e.tipo === 'rcp';
  const nome = e.cliente.trim() || 'NOME DO CLIENTE';
  const logo = '<img src="img/neu-logo.png" alt="' + esc(c.empresa) + '">';
  const rodape = '<footer class="rodape">' + rich(d.notaLegal) + '</footer>';
  const enderecoUnico = [c.end1, c.end2].filter(Boolean).join(' - ');

  const numDoc = e.cnpj.replace(/\D/g, '');
  const rotuloDoc = (numDoc.length <= 11 && numDoc.length > 0) ? 'CPF: ' : 'CNPJ: ';
  const tituloDoc = e.tipo === 'condominio'
    ? 'Dados do condomínio'
    : ((prod.aceitaCpf && numDoc.length <= 11) ? 'Dados do profissional' : 'Dados da empresa');

  const capa = !e.capa ? '' : `
<section class="pagina capa">
  <div class="logo-topo"><div class="logo branco">${logo}</div></div>
  <div class="conteudo">
    <div class="linha"></div>
    <h1>Proposta<br>Comercial</h1>
    <p class="tipo">${esc(d.tipoTexto)}</p>
    <div class="cliente">
      <small>Preparado exclusivamente para:</small>
      <span>${esc(nome)}</span>
    </div>
    ${d.notaLegal.trim() ? '<p class="nota-legal">' + rich(d.notaLegal) + '</p>' : ''}
  </div>
</section>`;

  const destaques = d.destaques.filter(function (x) { return x.t || x.x; });
  const cards = [{
    r: tituloDoc,
    v: rotuloDoc + (e.cnpj.trim() || '—'),
    d: e.endereco.trim()
  }].concat(d.cards.filter(function (x) { return x.r || x.v || x.d; }));

  const cardsHtml = cards.map(function (x) {
    return '<div class="card"><div class="rotulo">' + esc(x.r) + '</div>' +
      '<div class="valor">' + esc(x.v || '—') + '</div>' +
      (x.d ? '<div class="detalhe">' + esc(x.d) + '</div>' : '') + '</div>';
  }).join('');

  const analise = d.analise.filter(function (x) { return x.t || x.x; });
  let blocoAnalise = '';
  if (analise.length) {
    if (rcp) {
      blocoAnalise = '<div class="bloco condicoes"><h2 class="secao">Análise Técnica e Condições</h2>' +
        analise.map(function (x) {
          return '<p>' + (x.t ? '<strong>' + esc(x.t) + '</strong> ' : '') + rich(x.x) + '</p>';
        }).join('') + '</div>';
    } else {
      blocoAnalise = '<div class="bloco evitar-quebra"><div class="caixa">' +
        '<div class="card rotulo" style="border:0;padding:0;margin-bottom:8px">Análise técnica</div>' +
        '<ul class="caixa-lista">' +
        analise.map(function (x) {
          return '<li>' + (x.t ? '<strong>' + esc(x.t) + '</strong> ' : '') + rich(x.x) + '</li>';
        }).join('') + '</ul></div></div>';
    }
  }

  const pagina2 = `
<section class="pagina">
  ${e.capa ? '' : `
  <header class="cabecalho">
    <div><h1>Proposta Comercial</h1><p>${esc(d.tipoTexto)}</p></div>
    <div class="logo">${logo}</div>
  </header>
  <div class="preparado">
    <small>Preparado exclusivamente para:</small>
    <strong>${esc(nome)}</strong>
  </div>`}
  <div class="bloco">
    <h2 class="secao">Dados da Proposta</h2>
    <p class="intro">${rich(d.intro)}</p>
    ${destaques.length ? '<ul class="destaques">' + destaques.map(function (x) {
      return '<li>' + (x.t ? '<strong>' + esc(x.t) + '</strong> ' : '') + rich(x.x) + '</li>';
    }).join('') + '</ul>' : ''}
  </div>
  <div class="bloco evitar-quebra">
    ${rcp ? '<h2 class="secao">Resumo do Risco</h2>' : ''}
    <div class="cards${rcp && cards.length === 3 ? ' tres' : ''}">${cardsHtml}</div>
  </div>
  ${blocoAnalise}
  ${rodape}
</section>`;

  const paginaExtra = prod.renderizarPaginaExtra
    ? prod.renderizarPaginaExtra(d, rodape, { esc: esc, rich: rich })
    : '';

  let tabelaHtml = '';
  if (prod.renderizarTabelaComparativa) {
    tabelaHtml = prod.renderizarTabelaComparativa(d, { esc: esc, rich: rich, cel: cel });
  } else {
    const thead = '<tr><th>' + esc(d.primeiraColuna) + '</th>' +
      d.colunas.map(function (n) { return '<th>' + esc(n) + '</th>'; }).join('') + '</tr>';
    const tbody = d.linhas.map(function (l) {
      const vals = d.colunas.map(function (_, i) { return String(l.vals[i] || ''); });
      const cls = l.neg ? ' class="total"' : '';
      const soPrimeira = d.colunas.length > 1 && vals[0].trim() && vals.slice(1).every(function (v) { return !v.trim(); });
      if (soPrimeira) {
        return '<tr' + cls + '><td>' + esc(l.rot) + '</td><td colspan="' + d.colunas.length + '">' + cel(vals[0]) + '</td></tr>';
      }
      return '<tr' + cls + '><td>' + esc(l.rot) + '</td>' + vals.map(function (v, i) {
        return '<td' + (i === d.destaqueCol ? ' class="destaque"' : '') + '>' + cel(v) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    tabelaHtml = '<table class="comparativo"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>';
  }

  const pagina3 = `
<section class="pagina">
  <div class="bloco">
    <h2 class="secao">${esc(d.tituloComp)}</h2>
    <p class="intro">${rich(d.textoComp)}</p>
    ${tabelaHtml}
    ${d.notaTabela.trim() ? '<p class="nota">' + rich(d.notaTabela) + '</p>' : ''}
  </div>
  ${d.recomendacao.trim() ? `
  <div class="bloco evitar-quebra">
    <h2 class="secao">Recomendação Técnica</h2>
    <div class="recomendacao">${rich(d.recomendacao)}</div>
  </div>` : ''}
  ${rodape}
</section>`;

  const paginaConcorrente = prod.renderizarPaginaConcorrente
    ? prod.renderizarPaginaConcorrente(d, rodape, { esc: esc, rich: rich, cel: cel })
    : '';

  const riscos = d.riscos.filter(function (x) { return x.t || x.x; });
  const requisitos = (d.requisitos || []).filter(function (x) { return x.x && x.x.trim(); });
  const difs = c.diferenciais.filter(function (x) { return x.x && x.x.trim(); });

  const assinatura = e.capa ? '' : `
  <div class="assinatura">
    <p class="intro">Agradecemos a oportunidade de apresentar nossa proposta. Ficamos à inteira disposição para esclarecimentos adicionais, dúvidas técnicas e ajustes que se façam necessários.</p>
    <div class="nome">${esc(c.nome)}</div>
    <div class="cargo">Corretora de Seguros | SUSEP: ${esc(c.susep)}</div>
    <div class="contato">
      <strong>${esc(c.empresa)}</strong><br>
      Telefones: ${esc(c.telefones)}<br>
      E-mail: ${esc(c.email)}<br>
      Endereço: ${esc(enderecoUnico)}
    </div>
  </div>`;

  const pagina4 = `
<section class="pagina">
  ${riscos.length ? `
  <div class="bloco">
    <h2 class="secao">${esc(d.tituloRiscos)}</h2>
    <p class="intro">${rich(d.introRiscos)}</p>
    <div class="caixa">
      <ul class="caixa-lista">
        ${riscos.map(function (x) {
          return '<li>' + (x.t ? '<strong>' + esc(x.t) + '</strong> ' : '') + rich(x.x) + '</li>';
        }).join('')}
      </ul>
    </div>
  </div>` : ''}
  ${requisitos.length ? `
  <div class="bloco evitar-quebra">
    <h2 class="secao">${esc(d.tituloRequisitos || 'Requisitos de Aceitação do Seguro')}</h2>
    <div class="caixa caixa-requisitos">
      <ul class="caixa-lista">
        ${requisitos.map(function (x) {
          return '<li>' + rich(x.x) + '</li>';
        }).join('')}
      </ul>
    </div>
  </div>` : ''}
  ${difs.length ? `
  <div class="bloco evitar-quebra">
    <h2 class="secao">Por que escolher a ${esc(c.empresa.replace(/\s*Corretora.*$/i, '').trim() || c.empresa)} Corretora?</h2>
    <p class="intro">Nossa corretora atua lado a lado com sua empresa. Entregamos muito mais do que uma apólice; entregamos uma parceria estratégica através de:</p>
    <div class="grade">${difs.map(function (x) { return '<div class="item">' + esc(x.x) + '</div>'; }).join('')}</div>
  </div>` : ''}
  ${assinatura}
  ${rodape}
</section>`;

  const final = !e.capa ? '' : `
<section class="pagina final" id="pagina-final">
  <div class="topo">
    <h2>Agradecemos a oportunidade de apresentar nossa proposta.</h2>
    <p class="subtitulo">Ficamos à inteira disposição para esclarecimentos adicionais e ajustes que se façam necessários.</p>
  </div>
  <div class="assina">
    <strong>${esc(c.nome)}</strong>
    <span>SUSEP: ${esc(c.susep)}</span>
  </div>
  <div class="contato-box">
    <div class="logo branco">${logo}</div>
    <p>${esc(c.telefones)}</p>
    <p>${esc(c.email)}</p>
    <p class="endereco">${esc(c.end1)}<br>${esc(c.end2)}</p>
  </div>
</section>`;

  return capa + pagina2 + paginaExtra + pagina3 + paginaConcorrente + pagina4 + final;
}