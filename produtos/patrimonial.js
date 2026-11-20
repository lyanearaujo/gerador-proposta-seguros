'use strict';

window.PRODUTOS.patrimonial = {
  id: 'patrimonial',
  nomeMenu: 'Patrimonial Empresarial',
  aceitaCpf: false,
  mostraEndereco: true,
  dicaCards: 'O primeiro quadro (CNPJ e endereço) é automático. Aqui entram os demais: enquadramento, vigência, valor em risco...',

  gruposCoberturas: [
    {
      grupo: 'Danos Estruturais',
      itens: [
        { id: 'incendio', nome: 'Incêndio', desc: 'Cobre danos materiais causados ao prédio e ao conteúdo por incêndio, queda de raio dentro do terreno segurado e explosão de qualquer natureza.' },
        { id: 'danos_eletricos', nome: 'Danos Elétricos', desc: 'Garante a reparação ou reposição de máquinas, equipamentos e instalações danificados por curto-circuito, variação de tensão ou queda de raio fora do terreno.' },
        { id: 'desmoronamento', nome: 'Desmoronamento', desc: 'Ampara danos materiais decorrentes de desabamento total ou parcial de paredes, vigas, colunas, lajes ou telhados do imóvel segurado.' },
        { id: 'impacto_veiculos', nome: 'Impacto de Veículos', desc: 'Cobre prejuízos causados por colisão involuntária de veículos terrestres ou queda de aeronaves contra a estrutura do imóvel.' },
        { id: 'ruptura_tanques', nome: 'Ruptura de Tanques e Tubulações', desc: 'Garante danos materiais provocados pelo rompimento súbito e acidental de reservatórios, caixas d’água e encanamentos internos.' },
        { id: 'vidros', nome: 'Vidros', desc: 'Cobre a quebra acidental de vidros, espelhos, vitrines, fachadas envidraçadas e letreiros instalados de forma fixa no estabelecimento.' },
        { id: 'vendaval', nome: 'Vendaval', desc: 'Ampara danos causados à edificação e aos bens internos por ventos fortes, furacão, ciclone, tornado, queda de granizo e fumaça.' },
        { id: 'equipamentos_moveis', nome: 'Equipamentos Móveis e Movimentação Interna', desc: 'Protege empilhadeiras, paleteiras e máquinas móveis contra acidentes de causa externa durante a operação dentro do perímetro da empresa.' }
      ]
    },
    {
      grupo: 'Danos Financeiros',
      itens: [
        { id: 'lucros_cessantes', nome: 'Lucros Cessantes (decorrente de incêndio)', desc: 'Indeniza a perda de lucro líquido e o pagamento das despesas fixas necessárias durante a paralisação das atividades causada por incêndio.' },
        { id: 'perda_aluguel', nome: 'Perda ou Pagamento de Aluguel', desc: 'Garante o reembolso dos aluguéis que o imóvel deixar de render (ao proprietário) ou que precisarem ser pagos em outro local (ao inquilino) em caso de sinistro coberto.' },
        { id: 'recomposicao_docs', nome: 'Recomposição e Registros de Documentos (decorrente de incêndio)', desc: 'Cobre as despesas necessárias para refazer, restaurar ou reconstituir registros contábeis, fiscais e documentos técnicos danificados por incêndio.' },
        { id: 'subtracao_bens', nome: 'Subtração de Bens', desc: 'Garante prejuízos decorrentes de roubo ou furto qualificado (mediante arrombamento ou ameaça) de mercadorias, máquinas e equipamentos da empresa.' }
      ]
    },
    {
      grupo: 'Danos a Terceiros',
      itens: [
        { id: 'rc_operacoes', nome: 'Responsabilidade Civil Operações', desc: 'Ampara indenizações por danos materiais ou corporais causados involuntariamente a clientes, visitantes ou terceiros dentro ou em decorrência das operações da empresa.' },
        { id: 'rc_danos_morais', nome: 'Responsabilidade Civil Danos Morais', desc: 'Estende a cobertura de responsabilidade civil para indenizações judiciais ou acordos referentes a danos morais diretamente decorrentes de dano material ou corporal coberto.' },
        { id: 'rc_empregador', nome: 'Responsabilidade Civil Empregador', desc: 'Garante o reembolso de indenizações devidas pela empresa em caso de morte ou invalidez permanente de funcionários decorrente de acidente de trabalho.' },
        { id: 'assistencia', nome: 'Serviços de Assistência', desc: '', customizavel: true, placeholder: 'Descreva o plano contratado (ex.: Plano Master 24h - chaveiro, eletricista, encanador e vidraceiro).' }
      ]
    }
  ],

  conteudoPadrao: function (leiNota) {
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
      coberturasSelecionadas: ['incendio', 'danos_eletricos', 'vendaval', 'rc_operacoes'],
      coberturasCustom: { assistencia: '' },
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
      notaLegal: leiNota
    };
  },

  aplicarExemplo: function (e, d) {
    e.cliente = 'Comércio Varejista de Alimentos Verde Vale Campina LTDA';
    e.cnpj = '26.073.725/0001-01';
    e.endereco = 'Av. Prof. Almeida Barreto, 790, São José, Campina Grande/PB - CEP: 58400-328';
    d.intro = d.intro.replace('a atividade da sua empresa', 'a atividade de comercialização e armazenamento');
    d.cards = [
      { r: 'Enquadramento do risco', v: 'Lojas/Depósitos, Supermercados', d: '' },
      { r: 'Vigência da proposta', v: 'Validade de 5 dias (corridos)', d: '' },
      { r: 'Valor em risco (prédio e conteúdo)', v: 'R$ 9.047.677,00', d: '' }
    ];
    d.coberturasSelecionadas = [
      'incendio', 'danos_eletricos', 'vendaval', 'vidros',
      'lucros_cessantes', 'subtracao_bens',
      'rc_operacoes', 'rc_empregador', 'assistencia'
    ];
    d.coberturasCustom = {
      assistencia: 'Plano Empresarial 24h com atendimento emergencial para chaveiro, eletricista, encanador, vidraceiro e vigilância patrimonial.'
    };
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
    d.destaqueCol = 0;
  },

  validarExtra: function (d, pendencias) {
    const selec = Array.isArray(d.coberturasSelecionadas) ? d.coberturasSelecionadas : [];
    const custom = d.coberturasCustom || {};
    if (selec.indexOf('assistencia') >= 0 && !String(custom.assistencia || '').trim()) {
      pendencias.push('Você marcou "Serviços de Assistência", mas não preencheu a descrição do plano.');
    }
  },

  renderizarPaginaExtra: function (d, rodape, utils) {
    const selec = Array.isArray(d.coberturasSelecionadas) ? d.coberturasSelecionadas : [];
    if (!selec.length) return '';
    const custom = d.coberturasCustom || {};

    const blocos = this.gruposCoberturas.map(function (g) {
      const marcados = g.itens.filter(function (it) { return selec.indexOf(it.id) >= 0; });
      if (!marcados.length) return '';

      const itensHtml = marcados.map(function (it) {
        const texto = it.customizavel
          ? (String(custom[it.id] || '').trim() || 'Cobertura de assistência emergencial 24h conforme condições contratadas.')
          : it.desc;
        return '<li><strong>' + utils.esc(it.nome) + ':</strong> ' + utils.rich(texto) + '</li>';
      }).join('');

      return '<div class="grupo-cob">' +
        '<h3 class="subsecao-cob">' + utils.esc(g.grupo) + '</h3>' +
        '<ul class="caixa-lista cob-lista">' + itensHtml + '</ul>' +
      '</div>';
    }).filter(Boolean).join('');

    if (!blocos) return '';

    return `
<section class="pagina pagina-coberturas">
  <div class="bloco">
    <h2 class="secao">Descritivo das Coberturas Contratadas</h2>
    <p class="intro">Apresentamos abaixo o resumo explicativo das garantias selecionadas para a proteção do seu patrimônio, divididas por natureza de risco:</p>
    ${blocos}
  </div>
  ${rodape}
</section>`;
  }
};