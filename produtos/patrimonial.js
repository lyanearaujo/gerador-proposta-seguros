'use strict';

window.PRODUTOS.patrimonial = {
  id: 'patrimonial',
  nomeMenu: 'Patrimonial Empresarial',
  aceitaCpf: false,
  mostraEndereco: true,
  tabelaMatrizCoberturas: true,
  dicaCards: 'O primeiro quadro (CNPJ e endereço) é automático. Aqui entram os demais: enquadramento, vigências, valor em risco...',

  gruposCoberturas: [
    {
      grupo: 'Danos Estruturais',
      itens: [
        {
          id: 'incendio',
          nome: 'Incêndio',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
          desc: 'Cobre danos materiais ao prédio e conteúdo por incêndio, queda de raio no terreno e explosão.'
        },
        {
          id: 'danos_eletricos',
          nome: 'Danos Elétricos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
          desc: 'Garante reparo ou reposição de máquinas e instalações danificadas por curto-circuito ou variação de tensão.'
        },
        {
          id: 'desmoronamento',
          nome: 'Desmoronamento',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>',
          desc: 'Ampara danos materiais decorrentes de desabamento total ou parcial de paredes, vigas, lajes ou telhados.'
        },
        {
          id: 'impacto_veiculos',
          nome: 'Impacto de Veículos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
          desc: 'Cobre prejuízos causados por colisão involuntária de veículos terrestres ou queda de aeronaves no imóvel.'
        },
        {
          id: 'ruptura_tanques',
          nome: 'Ruptura de Tanques e Tubulações',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
          desc: 'Garante danos materiais provocados pelo rompimento súbito e acidental de reservatórios e encanamentos internos.'
        },
        {
          id: 'vidros',
          nome: 'Vidros',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>',
          desc: 'Cobre a quebra acidental de vidros, espelhos, vitrines e fachadas envidraçadas instalados no imóvel.'
        },
        {
          id: 'anuncios_luminosos',
          nome: 'Anúncios Luminosos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 12h12"/><path d="M12 3v4"/><path d="M12 17v4"/></svg>',
          desc: 'Cobre danos materiais a letreiros, painéis e anúncios luminosos instalados na fachada ou perímetro da empresa.'
        },
        {
          id: 'vendaval',
          nome: 'Vendaval',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
          desc: 'Ampara danos à edificação e bens internos por ventos fortes, furacão, ciclone, granizo e fumaça.'
        },
        {
          id: 'equipamentos_moveis',
          nome: 'Equipamentos Móveis e Movimentação Interna',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
          desc: 'Protege empilhadeiras, paleteiras e máquinas móveis contra acidentes de causa externa no perímetro da empresa.'
        }
      ]
    },
    {
      grupo: 'Danos Financeiros',
      itens: [
        {
          id: 'lucros_cessantes',
          nome: 'Lucros Cessantes (decorrente de incêndio)',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>',
          desc: 'Indeniza a perda de lucro líquido e despesas fixas durante a paralisação das atividades causada por incêndio.'
        },
        {
          id: 'perda_aluguel',
          nome: 'Perda ou Pagamento de Aluguel',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
          desc: 'Reembolsa aluguéis que o imóvel deixar de render ou que precisarem ser pagos em outro local após sinistro.'
        },
        {
          id: 'recomposicao_docs',
          nome: 'Recomposição e Registros de Documentos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
          desc: 'Cobre despesas para refazer ou reconstituir registros contábeis, fiscais e documentos danificados por incêndio.'
        },
        {
          id: 'subtracao_bens',
          nome: 'Subtração de Bens',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
          desc: 'Garante prejuízos por roubo ou furto qualificado (mediante arrombamento ou ameaça) de bens e mercadorias.'
        },
        {
          id: 'deterioracao_frigorificados',
          nome: 'Contaminação e Deterioração de Mercadorias em Ambientes Frigorificados',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>',
          desc: 'Cobre perdas de mercadorias perecíveis acondicionadas em câmaras frias ou frigoríficos por falha de refrigeração ou derrame de fluido.'
        },
        {
          id: 'despesas_salvamento',
          nome: 'Despesas de Salvamento',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>',
          desc: 'Reembolsa gastos comprovadamente necessários para conter o sinistro, proteger os bens e minimizar a extensão dos prejuízos.'
        }
      ]
    },
    {
      grupo: 'Danos a Terceiros',
      itens: [
        {
          id: 'rc_operacoes',
          nome: 'Responsabilidade Civil Operações',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          desc: 'Ampara indenizações por danos materiais ou corporais causados involuntariamente a clientes ou terceiros.'
        },
        {
          id: 'rc_danos_morais',
          nome: 'Responsabilidade Civil Danos Morais',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16c0-2.5-2-4-4-4s-4 1.5-4 4"/><circle cx="12" cy="7" r="3"/><circle cx="12" cy="12" r="10"/></svg>',
          desc: 'Cobre indenizações judiciais ou acordos por danos morais diretamente decorrentes de dano material ou corporal coberto.'
        },
        {
          id: 'rc_empregador',
          nome: 'Responsabilidade Civil Empregador',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
          desc: 'Reembolsa indenizações devidas pela empresa em caso de morte ou invalidez permanente de funcionários em serviço.'
        },
        {
          id: 'custos_defesa',
          nome: 'Custos de Defesa',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
          desc: 'Cobre honorários advocatícios, custas judiciais e despesas periciais na defesa do segurado em ações vinculadas a riscos cobertos.'
        },
        {
          id: 'assistencia',
          nome: 'Serviços de Assistência',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
          desc: '',
          customizavel: true,
          placeholder: 'Descreva o plano contratado (ex.: Plano Master 24h - chaveiro, eletricista, encanador e vidraceiro).'
        }
      ]
    }
  ],

  obterCoberturasAtivas: function (d) {
    const selec = Array.isArray(d.coberturasSelecionadas) ? d.coberturasSelecionadas : [];
    const lista = [];
    this.gruposCoberturas.forEach(function (g) {
      g.itens.forEach(function (it) {
        if (selec.indexOf(it.id) >= 0) lista.push(it);
      });
    });
    return lista;
  },

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
        { r: 'Vigência da apólice', v: '12 meses', d: '' },
        { r: 'Vigência da proposta', v: 'Validade de 5 dias (corridos)', d: '' },
        { r: 'Valor em risco (prédio e conteúdo)', v: '', d: '' }
      ],
      coberturasSelecionadas: ['incendio', 'danos_eletricos', 'vendaval', 'rc_operacoes'],
      coberturasCustom: { assistencia: '' },
      analise: [{ t: '', x: '' }],
      tituloComp: 'Análise das Seguradoras',
      textoComp: 'Abaixo, apresentamos o comparativo técnico de limites, franquias e condições comerciais entre as seguradoras:',
      primeiraColuna: 'Coberturas / Condições',
      colunas: ['Seguradora 1', 'Seguradora 2'],
      valoresCoberturas: {},
      resumoValores: {
        liquido: ['', ''],
        total: ['', ''],
        pagamento: ['', '']
      },
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
      tituloRequisitos: 'Requisitos de Aceitação do Seguro',
      requisitos: [
        { x: 'Imóvel construído em alvenaria (estrutura e paredes) com cobertura incombustível.' },
        { x: 'Existência de equipamentos básicos de combate a incêndio (extintores dentro da validade).' },
        { x: 'Sujeito à inspeção prévia de risco pela seguradora escolhida, caso exigido na emissão.' }
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
      { r: 'Vigência da apólice', v: '12 meses', d: '' },
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
    d.valoresCoberturas = {
      incendio: [
        { lmg: 'R$ 9.047.677,00', franq: '10% mín. R$ 2.500,00' },
        { lmg: 'R$ 9.047.677,00', franq: '10% mín. R$ 3.000,00' }
      ],
      danos_eletricos: [
        { lmg: 'R$ 150.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 120.000,00', franq: '10% mín. R$ 2.000,00' }
      ],
      vendaval: [
        { lmg: 'R$ 300.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 250.000,00', franq: '10% mín. R$ 2.500,00' }
      ],
      vidros: [
        { lmg: 'R$ 30.000,00', franq: 'R$ 500,00' },
        { lmg: 'R$ 25.000,00', franq: 'R$ 600,00' }
      ],
      lucros_cessantes: [
        { lmg: 'R$ 500.000,00', franq: '7 dias' },
        { lmg: 'R$ 400.000,00', franq: '10 dias' }
      ],
      subtracao_bens: [
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 80.000,00', franq: '10% mín. R$ 2.000,00' }
      ],
      rc_operacoes: [
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 300.000,00', franq: '10% mín. R$ 2.500,00' }
      ],
      rc_empregador: [
        { lmg: 'R$ 300.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 200.000,00', franq: 'Sem franquia' }
      ],
      assistencia: [
        { lmg: 'Plano Master 24h', franq: 'Sem franquia' },
        { lmg: 'Plano Completo 24h', franq: 'Sem franquia' }
      ]
    };
    d.resumoValores = {
      liquido: ['R$ 18.407,38', 'R$ 41.753,88'],
      total: ['R$ 19.765,84', 'R$ 44.835,32'],
      pagamento: ['7x sem juros - Débito em conta', '6x sem juros - Boleto']
    };
    d.recomendacao = d.recomendacao.replace('[SEGURADORA]', 'Allianz');
    d.destaqueCol = 0;
  },

  validarExtra: function (d, pendencias) {
    const selec = Array.isArray(d.coberturasSelecionadas) ? d.coberturasSelecionadas : [];
    const custom = d.coberturasCustom || {};
    if (selec.indexOf('assistencia') >= 0 && !String(custom.assistencia || '').trim()) {
      pendencias.push('Você marcou "Serviços de Assistência", mas não preencheu a descrição do plano.');
    }
    const res = d.resumoValores || {};
    d.colunas.forEach(function (col, i) {
      const nomeCol = col || ('Seguradora ' + (i + 1));
      if (!String((res.total || [])[i] || '').trim()) {
        pendencias.push('Na tabela, falta o Valor Total (Bruto) para "' + nomeCol + '".');
      }
    });
  },

  renderizarTabelaComparativa: function (d, utils) {
    const ativas = this.obterCoberturasAtivas(d);
    const numSeg = Math.max(1, d.colunas.length);
    const valsCob = d.valoresCoberturas || {};
    const res = d.resumoValores || { liquido: [], total: [], pagamento: [] };

    const largCob = numSeg >= 4 ? 22 : 25;
    const largSub = ((100 - largCob) / (numSeg * 2)).toFixed(4) + '%';
    let colgroup = '<colgroup><col style="width:' + largCob + '%">';
    for (let i = 0; i < numSeg * 2; i++) {
      colgroup += '<col style="width:' + largSub + '">';
    }
    colgroup += '</colgroup>';

    const thLinha1 = '<th rowspan="2">' + utils.esc(d.primeiraColuna || 'Coberturas') + '</th>' +
      d.colunas.map(function (nome, i) {
        return '<th colspan="2" class="th-seg' + (i === d.destaqueCol ? ' th-destaque' : '') + '">' + utils.esc(nome) + '</th>';
      }).join('');

    const thLinha2 = d.colunas.map(function (_, i) {
      const cls = i === d.destaqueCol ? ' class="sub-th sub-destaque"' : ' class="sub-th"';
      return '<th' + cls + '>Limite de Garantia</th><th' + cls + '>Franquia</th>';
    }).join('');

    const linhasCob = ativas.map(function (cob) {
      const arr = valsCob[cob.id] || [];
      const tds = d.colunas.map(function (_, i) {
        const item = arr[i] || { lmg: '', franq: '' };
        const cls = i === d.destaqueCol ? ' class="destaque"' : '';
        return '<td' + cls + '>' + utils.cel(item.lmg) + '</td>' +
               '<td' + cls + '>' + utils.cel(item.franq) + '</td>';
      }).join('');
      return '<tr><td>' + utils.esc(cob.nome) + '</td>' + tds + '</tr>';
    }).join('');

    const montarLinhaResumo = function (rotulo, arrVals, classeLinha) {
      const tds = d.colunas.map(function (_, i) {
        const cls = i === d.destaqueCol ? ' class="destaque"' : '';
        return '<td colspan="2"' + cls + '>' + utils.cel((arrVals || [])[i]) + '</td>';
      }).join('');
      return '<tr class="' + classeLinha + '"><td>' + utils.esc(rotulo) + '</td>' + tds + '</tr>';
    };

    const linhaLiquido = montarLinhaResumo('Valor Líquido', res.liquido, 'linha-resumo');
    const linhaTotal = montarLinhaResumo('Valor Total', res.total, 'linha-resumo total');
    const linhaPagto = montarLinhaResumo('Forma de Pagamento', res.pagamento, 'linha-resumo linha-pagto');

    return '<table class="comparativo tabela-matriz">' +
      colgroup +
      '<thead><tr>' + thLinha1 + '</tr><tr>' + thLinha2 + '</tr></thead>' +
      '<tbody>' + linhasCob + linhaLiquido + linhaTotal + linhaPagto + '</tbody>' +
    '</table>';
  },

  renderizarPaginaExtra: function (d, rodape, utils) {
    const selec = Array.isArray(d.coberturasSelecionadas) ? d.coberturasSelecionadas : [];
    if (!selec.length) return '';
    const custom = d.coberturasCustom || {};

    const blocos = this.gruposCoberturas.map(function (g) {
      const marcados = g.itens.filter(function (it) { return selec.indexOf(it.id) >= 0; });
      if (!marcados.length) return '';

      const cardsHtml = marcados.map(function (it) {
        const texto = it.customizavel
          ? (String(custom[it.id] || '').trim() || 'Cobertura de assistência emergencial 24h conforme condições contratadas.')
          : it.desc;

        return '<div class="card-cob">' +
          '<div class="cob-icone">' + (it.icone || '') + '</div>' +
          '<div class="cob-info">' +
            '<div class="cob-nome">' + utils.esc(it.nome) + '</div>' +
            '<div class="cob-desc">' + utils.rich(texto) + '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<div class="grupo-cob">' +
        '<h3 class="subsecao-cob">' + utils.esc(g.grupo) + '</h3>' +
        '<div class="cards cob-grid">' + cardsHtml + '</div>' +
      '</div>';
    }).filter(Boolean).join('');

    if (!blocos) return '';

    return `
<section class="pagina pagina-coberturas">
  <div class="bloco">
    <h2 class="secao">Descritivo das Coberturas Contratadas</h2>
    <p class="intro">Apresentamos abaixo o resumo explicativo das garantias selecionadas para a proteção do seu patrimônio, organizadas por natureza de risco:</p>
    ${blocos}
  </div>
  ${rodape}
</section>`;
  }
};