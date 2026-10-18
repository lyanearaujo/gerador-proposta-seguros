'use strict';
/* =====================================================================
   gerador.js  -  o "cérebro" da proposta (não mexe na tela do formulário)

   1) CORRETORA_PADRAO ........ dados fixos da corretora
   2) conteudoPadrao(tipo) .... textos prontos de cada tipo de seguro
   3) montarProposta(e, c) .... gera o HTML da proposta (mesma estrutura
                                do seu proposta.html + proposta.css)

   >>> Se você mudar o layout no proposta.html, ajuste a função
       montarProposta() abaixo para ficar igual.
   ===================================================================== */

const CORRETORA_PADRAO = {
  nome: 'Maria Neuresy Araújo',
  susep: '212131246',
  empresa: 'Neu Corretora de Seguros',
  telefones: '(83) 98896-1030 | (83) 99100-7297',
  email: 'neucorretora@neucorretora.com.br',
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

/* ---------------------------------------------------------------------
   Textos prontos por tipo de seguro.  Edite à vontade: são só o ponto
   de partida; a corretora pode alterar tudo no formulário.
   Use [COLCHETES] onde falta preencher: o sistema avisa antes do PDF.
   --------------------------------------------------------------------- */
function conteudoPadrao(tipo) {
  if (tipo === 'rcp') {
    return {
      tipoTexto: 'Seguro de Responsabilidade Civil Profissional (E&O)',
      intro: 'O estudo foi elaborado com base nas informações previamente coletadas, considerando o perfil e as necessidades da sua assessoria contábil, com o objetivo de oferecer a melhor relação entre proteção e investimento para a sua atuação.',
      destaques: [
        { t: 'Foco na Proteção Profissional:', x: 'Mapeamento prioritário para resguardar o patrimônio da empresa contra eventuais reclamações de terceiros decorrentes de falhas na prestação de serviços contábeis.' },
        { t: 'Garantia de Custos de Defesa:', x: 'Cobertura dedicada para o pagamento de honorários advocatícios e custas judiciais, garantindo tranquilidade financeira para sua defesa em caso de processos ou questionamentos.' }
      ],
      cards: [
        { r: 'Enquadramento', v: '', d: '' },
        { r: 'Vigência e validade', v: '', d: '' }
      ],
      analise: [
        { t: 'Base de Contratação:', x: 'Reclamação com notificação, com prazo complementar de 36 meses.' },
        { t: 'Franquia Padrão:', x: '8,00% dos prejuízos com mínimo de R$ 3.000,00 para o reclamante.' },
        { t: 'Principais Subcoberturas (100% do limite):', x: 'Extravio de Documentos, Danos Morais, Calúnia, Injúria e Difamação, Quebra de Sigilo, Lucros Cessantes e Gestão de Crise.' },
        { t: 'Atos Desonestos (Exclusivo PJ):', x: 'Cobertura de 10% do limite contratado.' }
      ],
      tituloComp: 'Análise das Opções de Contratação',
      textoComp: 'Abaixo, apresentamos o comparativo estruturado com três cenários de Limite Máximo de Garantia (LMG) na seguradora [SEGURADORA], permitindo que escolha o nível de proteção ideal para o porte do seu escritório:',
      primeiraColuna: 'Detalhes da Cobertura',
      colunas: ['Opção 1', 'Opção 2', 'Opção 3'],
      linhas: [
        { rot: 'Limite Máximo de Garantia (LMG)', vals: ['', '', ''], neg: false },
        { rot: 'RC Profissional (Acordos/Indenizações)', vals: ['', '', ''], neg: false },
        { rot: 'LMI Gastos com Defesa', vals: ['', '', ''], neg: false },
        { rot: 'Condições de Pagamento', vals: ['', '', ''], neg: false },
        { rot: 'Valor por parcela', vals: ['', '', ''], neg: true }
      ],
      destaqueCol: 0,
      notaTabela: '',
      recomendacao: 'O limite de garantia contratado é de acordo com a relevância do seu risco da carteira de clientes.',
      tituloRiscos: 'Gerenciamento de Riscos Contábeis',
      introRiscos: 'Para garantir a plena eficácia das coberturas securitárias e a segurança contínua da sua operação, recomendamos as seguintes diretrizes preventivas ao longo da vigência:',
      riscos: [
        { t: 'Controle de Prazos (Obrigações Acessórias):', x: 'Manter sistemas automatizados e atualizados para o controle rigoroso de envio de guias e declarações aos órgãos reguladores, evitando multas por atraso que possam ser repassadas ou cobradas do seu escritório.' },
        { t: 'Contrato de prestação de serviços com a base de clientes', x: '' },
        { t: 'Treinamento e LGPD:', x: 'Reforçar as políticas de conformidade e tratamento de dados pessoais com toda a equipe, mitigando os riscos associados à quebra de sigilo profissional e vazamento de informações.' }
      ],
      notaLegal: LEI_NOTA
    };
  }
  return {
    tipoTexto: 'Seguro Patrimonial Empresarial',
    intro: 'O estudo foi elaborado com base nas informações previamente coletadas, considerando o perfil e as necessidades apresentadas, com o objetivo de oferecer a melhor relação entre proteção e investimento para a atividade da sua empresa.',
    destaques: [
      { t: 'Foco Estrutural e Responsabilidade Civil:', x: 'Mapeamento prioritário contra danos à infraestrutura física do imóvel e proteção financeira dedicada para eventuais danos materiais e corporais causados a terceiros durante a operação comercial.' },
      { t: 'Garantia de Valor de Novo:', x: 'Aplicação explícita de Cláusula de Valor de Novo nas coberturas aplicáveis, garantindo que, em situações de sinistro, a indenização seja calculada pelo custo de reposição atual dos bens, sem dedução ou aplicação de depreciação pelo tempo de uso.' }
    ],
    cards: [
      { r: 'Enquadramento do risco', v: '', d: '' },
      { r: 'Vigência da proposta', v: 'Validade de 5 dias (corridos)', d: '' },
      { r: 'Valor em risco (prédio e conteúdo)', v: '', d: '' }
    ],
    analise: [{ t: '', x: '' }],
    tituloComp: 'Análise das Seguradoras',
    textoComp: 'Abaixo, apresentamos o comparativo de mercado estruturado de forma personalizada:',
    primeiraColuna: 'Condições de Pagamento',
    colunas: ['Seguradora 1', 'Seguradora 2'],
    linhas: [
      { rot: 'Valor Total', vals: ['', ''], neg: true },
      { rot: '4 parcelas (Boleto)', vals: ['', ''], neg: false },
      { rot: 'Outro parcelamento', vals: ['', ''], neg: false }
    ],
    destaqueCol: 0,
    notaTabela: 'As propostas detalhadas de cada Seguradora se encontram no final desse documento.',
    recomendacao: 'Para este perfil de risco específico, a seguradora **[SEGURADORA]** apresenta o melhor equilíbrio técnico e comercial entre investimento, coberturas e limites de garantias.',
    tituloRiscos: 'Gerenciamento de Riscos',
    introRiscos: 'Para garantir a plena eficácia das coberturas securitárias e a segurança contínua da operação, recomendamos as seguintes diretrizes preventivas:',
    riscos: [
      { t: 'Instalações Elétricas:', x: 'Adequar toda a fiação elétrica aparente, protegendo-a por meio de eletrodutos e/ou eletrocalhas rígidas.' },
      { t: 'Extintores de Incêndio:', x: 'Realizar a recarga dos extintores quando necessária (mantendo conformidade com as normas da ABNT) e garantir que permaneçam desobstruídos e com livre acesso. É indispensável o envio da Nota Fiscal válida da manutenção.' },
      { t: 'Armazenamento de Materiais:', x: 'Organizar e manter mercadorias e matérias-primas com distância mínima de 1 (um) metro em relação a luminárias, cobertura (telhado), estruturas metálicas, instalações elétricas e fontes de calor.' },
      { t: 'Corredores de Circulação:', x: 'Manter os corredores livres e organizados, preservando largura mínima de 1 (um) metro para facilitar a circulação e o acesso aos equipamentos de combate a incêndio.' }
    ],
    notaLegal: LEI_NOTA
  };
}

function estadoPadrao(tipo) {
  tipo = tipo || 'patrimonial';
  return {
    versao: 1,
    tipo: tipo,
    capa: tipo === 'patrimonial',
    cliente: '',
    cnpj: '',
    endereco: '',
    conteudo: { rcp: conteudoPadrao('rcp'), patrimonial: conteudoPadrao('patrimonial') }
  };
}

/* Preenche o tipo atual com os dados das propostas de exemplo */
function aplicarExemplo(e) {
  const d = e.conteudo[e.tipo];
  if (e.tipo === 'rcp') {
    e.cliente = 'Costa e Costa Assessoria Contábil LTDA';
    e.cnpj = '13.317.445/0001-41';
    e.endereco = '';
    d.cards = [
      { r: 'Enquadramento', v: 'Contadores', d: 'Faturamento: R$ 1M a R$ 1.500M' },
      { r: 'Vigência e validade', v: '04/09/2026 a 04/09/2027', d: 'Retroatividade: 04/09/23' }
    ];
    d.textoComp = d.textoComp.replace('[SEGURADORA]', 'Allianz');
    d.linhas = [
      { rot: 'Limite Máximo de Garantia (LMG)', vals: ['R$ 1.000.000,00', 'R$ 500.000,00', 'R$ 300.000,00'], neg: false },
      { rot: 'RC Profissional (Acordos/Indenizações)', vals: ['R$ 800.000,00', 'R$ 400.000,00', 'R$ 210.000,00'], neg: false },
      { rot: 'LMI Gastos com Defesa', vals: ['R$ 200.000,00', 'R$ 100.000,00', 'R$ 90.000,00'], neg: false },
      { rot: 'Condições de Pagamento', vals: ['7x no Boleto Bancário', '', ''], neg: false },
      { rot: 'Valor por parcela', vals: ['R$ 1.817,75', 'R$ 954,30', 'R$ 758,74'], neg: true }
    ];
  } else {
    e.cliente = 'Comércio Varejista de Alimentos Verde Vale Campina LTDA';
    e.cnpj = '26.073.725/0001-01';
    e.endereco = 'Av. Prof. Almeida Barreto, 790, São José, Campina Grande/PB - CEP: 58400-328';
    d.intro = d.intro.replace('a atividade da sua empresa', 'a atividade de comercialização e armazenamento');
    d.cards = [
      { r: 'Enquadramento do risco', v: 'Lojas/Depósitos, Supermercados', d: '' },
      { r: 'Vigência da proposta', v: 'Validade de 5 dias (corridos)', d: '' },
      { r: 'Valor em risco (prédio e conteúdo)', v: 'R$ 9.047.677,00', d: '' }
    ];
    d.analise = [
      { t: '', x: 'Não houve sinistros nos últimos 12 meses;' },
      { t: '', x: 'Possui sistemas de segurança (extintores e circuito de câmeras);' },
      { t: '', x: 'Não possui outra apólice de seguro vigente para o mesmo risco.' }
    ];
    d.colunas = ['Allianz', 'Sura'];
    d.linhas = [
      { rot: 'Valor Total', vals: ['R$ 19.765,84', 'R$ 44.835,32'], neg: true },
      { rot: '4 parcelas (Boleto)', vals: ['R$ 4.941,46', 'R$ 11.206,83'], neg: false },
      { rot: 'Outro parcelamento', vals: ['R$ 2.823,70 | (7x - Débito em conta)', 'R$ 7.427,57 | (6x - Boleto)'], neg: false }
    ];
    d.recomendacao = d.recomendacao.replace('[SEGURADORA]', 'Allianz');
  }
  d.destaqueCol = 0;
}

/* ---------------------------------------------------------------------
   Utilidades de texto
   --------------------------------------------------------------------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* texto com **negrito** e quebras de linha */
function rich(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}
/* célula da tabela: "valor | detalhe em cinza" */
function cel(v) {
  const partes = String(v || '').split('|');
  const a = partes[0].trim();
  const b = partes.slice(1).join('|').trim();
  if (!a && !b) return '—';
  return esc(a || '—') + (b ? '<span class="secundario">' + esc(b) + '</span>' : '');
}

function cnpjValido(s) {
  const n = String(s || '').replace(/\D/g, '');
  if (n.length !== 14 || /^(\d)\1+$/.test(n)) return false;
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

function mascaraCnpj(v) {
  const n = String(v).replace(/\D/g, '').slice(0, 14);
  return n
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

/* "19765,84" ou "19765.84" ou "1.000.000" -> "R$ 19.765,84" (só se for número puro) */
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
  return 'Proposta_' + (e.tipo === 'rcp' ? 'RCP' : 'Patrimonial') + '_' + cliente + '_' + dia;
}

/* ---------------------------------------------------------------------
   Lista de pendências antes de gerar o PDF
   --------------------------------------------------------------------- */
function coletarTextos(o, acc) {
  if (typeof o === 'string') acc.push(o);
  else if (Array.isArray(o)) o.forEach(function (x) { coletarTextos(x, acc); });
  else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { coletarTextos(o[k], acc); });
  return acc;
}

function validarProposta(e) {
  const d = e.conteudo[e.tipo];
  const p = [];
  if (!e.cliente.trim()) p.push('Falta o nome do cliente.');
  if (!e.cnpj.trim()) p.push('Falta o CNPJ.');
  else if (!cnpjValido(e.cnpj)) p.push('O CNPJ digitado parece inválido (confira os números).');
  d.cards.forEach(function (c) {
    if ((c.r || c.d) && !String(c.v).trim()) p.push('O quadro "' + (c.r || 'sem título') + '" está sem valor.');
  });
  d.colunas.forEach(function (c, i) {
    if (!String(c).trim()) p.push('A coluna ' + (i + 1) + ' da tabela está sem nome.');
  });
  d.linhas.forEach(function (l) {
    const preenchidas = d.colunas.filter(function (_, i) { return String(l.vals[i] || '').trim(); }).length;
    const soPrimeira = preenchidas === 1 && String(l.vals[0] || '').trim();
    if (preenchidas === 0) p.push('Na tabela, a linha "' + l.rot + '" está sem valores.');
    else if (preenchidas < d.colunas.length && !soPrimeira) p.push('Na tabela, a linha "' + l.rot + '" tem células vazias.');
  });
  const textos = coletarTextos([d, e.cliente, e.endereco], []);
  if (textos.some(function (t) { return /\[[^\]]{1,60}\]/.test(t); })) {
    p.push('Ainda há trechos entre [COLCHETES] para preencher.');
  }
  return p;
}

/* ---------------------------------------------------------------------
   MONTAGEM DO HTML DA PROPOSTA  (espelha o seu proposta.html)
   e = estado da proposta   c = dados da corretora
   --------------------------------------------------------------------- */
function montarProposta(e, c) {
  const d = e.conteudo[e.tipo];
  const rcp = e.tipo === 'rcp';
  const nome = e.cliente.trim() || 'NOME DO CLIENTE';
  const logo = '<img src="img/neu-logo.png" alt="' + esc(c.empresa) + '">';
  const rodape = '<footer class="rodape">' + rich(d.notaLegal) + '</footer>';
  const enderecoUnico = [c.end1, c.end2].filter(Boolean).join(' - ');

  /* ---- Capa ---- */
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

  /* ---- Página: dados da proposta ---- */
  const destaques = d.destaques.filter(function (x) { return x.t || x.x; });
  const cards = [{
    r: 'Dados da empresa',
    v: 'CNPJ: ' + (e.cnpj.trim() || '—'),
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

  /* ---- Página: comparativo ---- */
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

  const pagina3 = `
<section class="pagina">
  <div class="bloco">
    <h2 class="secao">${esc(d.tituloComp)}</h2>
    <p class="intro">${rich(d.textoComp)}</p>
    <table class="comparativo">
      <thead>${thead}</thead>
      <tbody>${tbody}</tbody>
    </table>
    ${d.notaTabela.trim() ? '<p class="nota">' + rich(d.notaTabela) + '</p>' : ''}
  </div>
  ${d.recomendacao.trim() ? `
  <div class="bloco evitar-quebra">
    <h2 class="secao">Recomendação Técnica</h2>
    <div class="recomendacao">${rich(d.recomendacao)}</div>
  </div>` : ''}
  ${rodape}
</section>`;

  /* ---- Página: riscos + diferenciais (+ assinatura se não houver capa) ---- */
  const riscos = d.riscos.filter(function (x) { return x.t || x.x; });
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
  ${difs.length ? `
  <div class="bloco evitar-quebra">
    <h2 class="secao">Por que escolher a ${esc(c.empresa.replace(/\s*Corretora.*$/i, '').trim() || c.empresa)} Corretora?</h2>
    <p class="intro">Nossa corretora atua lado a lado com sua empresa. Entregamos muito mais do que uma apólice; entregamos uma parceria estratégica através de:</p>
    <div class="grade">${difs.map(function (x) { return '<div class="item">' + esc(x.x) + '</div>'; }).join('')}</div>
  </div>` : ''}
  ${assinatura}
  ${rodape}
</section>`;

  /* ---- Página final (só com capa) ---- */
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

  return capa + pagina2 + pagina3 + pagina4 + final;
}

if (typeof module !== 'undefined') {
  module.exports = { CORRETORA_PADRAO, conteudoPadrao, estadoPadrao, aplicarExemplo, montarProposta,
    cnpjValido, mascaraCnpj, dinheiroSeNumerico, nomeArquivo, validarProposta };
}