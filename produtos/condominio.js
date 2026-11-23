'use strict';

window.PRODUTOS.condominio = {
  id: 'condominio',
  nomeMenu: 'Seguro Condomínio',
  aceitaCpf: false,
  mostraEndereco: true,
  tabelaMatrizCoberturas: true,
  suportaComparativoConcorrente: true,
  dicaCards: 'O primeiro quadro (CNPJ e endereço) é automático. Abaixo estão os quadros com os dados do condomínio e os dados estruturais.',

  gruposCoberturas: [
    {
      grupo: 'Danos Estruturais',
      itens: [
        {
          id: 'incendio',
          nome: 'Incêndio, Raio e Explosão',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
          desc: 'Cobre danos materiais às áreas comuns e estrutura do condomínio causados por incêndio, queda de raio no terreno e explosão.'
        },
        {
          id: 'danos_eletricos',
          nome: 'Danos Elétricos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
          desc: 'Garante reparo ou reposição de quadros elétricos, bombas, motores de portões e instalações comuns por curto-circuito ou variação de tensão.'
        },
        {
          id: 'vendaval',
          nome: 'Vendaval, Furacão, Ciclone, Granizo e Fumaça',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
          desc: 'Ampara danos à edificação, telhados, fachadas e áreas comuns provocados por ventos fortes, granizo, furacão, ciclone ou fumaça.'
        },
        {
          id: 'desmoronamento',
          nome: 'Desmoronamento',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>',
          desc: 'Cobre danos materiais decorrentes de desabamento total ou parcial de muros, paredes, vigas, lajes, marquises ou coberturas do condomínio.'
        },
        {
          id: 'impacto_veiculos',
          nome: 'Impacto de Veículos Terrestres e Queda de Aeronaves',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
          desc: 'Garante prejuízos causados por colisão involuntária de veículos terrestres ou queda de aeronaves contra portões, muros ou estrutura do condomínio.'
        },
        {
          id: 'vidros',
          nome: 'Quebra de Vidros e Espelhos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>',
          desc: 'Cobre a quebra acidental de vidros, espelhos, guaritas, portas de hall, fachadas envidraçadas e coberturas de vidro das áreas comuns.'
        },
        {
          id: 'ruptura_tanques',
          nome: 'Ruptura de Tanques e Tubulações',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
          desc: 'Ampara danos materiais provocados pelo rompimento súbito e acidental de reservatórios, caixas d’água e encanamentos internos.'
        },
        {
          id: 'anuncios_luminosos',
          nome: 'Anúncios Luminosos e Letreiros',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 12h12"/><path d="M12 3v4"/><path d="M12 17v4"/></svg>',
          desc: 'Cobre danos materiais a letreiros, placas de identificação e anúncios luminosos instalados na fachada ou acessos do condomínio.'
        },
        {
          id: 'sprinklers',
          nome: 'Chuveiros Automáticos (Sprinklers)',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M8 6h8"/><path d="M7 11l-2 4"/><path d="M12 11v5"/><path d="M17 11l2 4"/><path d="M5 19h.01"/><path d="M12 20h.01"/><path d="M19 19h.01"/></svg>',
          desc: 'Indeniza danos materiais decorrentes de derrame ou vazamento acidental de água proveniente das instalações de chuveiros automáticos.'
        }
      ]
    },
    {
      grupo: 'Danos Financeiros',
      itens: [
        {
          id: 'despesas_fixas',
          nome: 'Despesas Fixas (decorrente de incêndio)',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>',
          desc: 'Cobre a manutenção das despesas fixas ordinárias do condomínio (folha de pagamento, água, energia e encargos) caso o imóvel fique inabitável após sinistro.'
        },
        {
          id: 'recomposicao_docs',
          nome: 'Recomposição de Registros e Documentos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
          desc: 'Garante despesas necessárias para refazer atas, livros contábeis, documentos fiscais e registros administrativos do condomínio danificados em sinistro.'
        },
        {
          id: 'subtracao_bens',
          nome: 'Subtração de Bens do Condomínio',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
          desc: 'Cobre prejuízos causados por roubo ou furto qualificado (mediante arrombamento ou grave ameaça) de equipamentos e bens pertencentes ao condomínio.'
        }
      ]
    },
    {
      grupo: 'Danos a Terceiros',
      itens: [
        {
          id: 'rc_operacoes',
          nome: 'Responsabilidade Civil Operações / Condomínio',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          desc: 'Ampara indenizações por danos materiais ou corporais causados involuntariamente a condôminos, visitantes ou terceiros nas áreas comuns.'
        },
        {
          id: 'rc_danos_morais',
          nome: 'Responsabilidade Civil Danos Morais',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16c0-2.5-2-4-4-4s-4 1.5-4 4"/><circle cx="12" cy="7" r="3"/><circle cx="12" cy="12" r="10"/></svg>',
          desc: 'Cobre indenizações judiciais ou acordos por danos morais diretamente decorrentes de dano material ou corporal coberto pela apólice.'
        },
        {
          id: 'rc_sindico',
          nome: 'Responsabilidade Civil Síndico',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
          desc: 'Protege o patrimônio pessoal do síndico contra reclamações de terceiros ou condôminos por atos culposos cometidos no exercício da gestão condominial.'
        },
        {
          id: 'rc_condominio_guarda',
          nome: 'Responsabilidade Civil Guarda de Veículos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15h10"/><path d="M9 11h6"/></svg>',
          desc: 'Garante indenizações por incêndio, roubo ou furto qualificado de veículos de condôminos ou visitantes devidamente estacionados na garagem do condomínio.'
        },
        {
          id: 'rc_portoes',
          nome: 'Responsabilidade Civil Portões Automáticos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4h16v16"/><path d="M4 10h16"/><path d="M4 15h16"/><path d="M10 4v16"/><path d="M14 4v16"/></svg>',
          desc: 'Cobre danos materiais e corporais causados a veículos ou pessoas pelo acionamento ou fechamento involuntário dos portões automáticos de acesso.'
        },
        {
          id: 'incendio_bens_condominos',
          nome: 'Incêndio de Bens de Condôminos',
          icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11c1 1.5 2 2.8 2 4a2 2 0 1 1-4 0c0-1.2 1-2.5 2-4z"/></svg>',
          desc: 'Estende a proteção contra incêndio aos bens móveis situados no interior das unidades autônomas dos condôminos em decorrência de sinistro coberto.'
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
      tipoTexto: 'Seguro Condomínio',
      intro: 'O estudo foi elaborado com base nas informações técnicas e estruturais previamente levantadas sobre o condomínio, considerando suas características construtivas e operacionais. Na forma de contratação, foi considerado **prédio e conteúdo**, garantindo a proteção integral tanto da edificação quanto dos bens e equipamentos das áreas comuns.',
      destaques: [
        { t: 'Contratação Integral (Prédio e Conteúdo):', x: 'Cobertura estruturada para amparar a edificação (estrutura física, fachadas e áreas comuns) em conjunto com o conteúdo condominial (equipamentos, mobiliário, bombas e instalações), assegurando resguardo patrimonial completo.' },
        { t: 'Garantia de Valor de Novo:', x: 'Aplicação explícita de Cláusula de Valor de Novo nas coberturas aplicáveis, garantindo que, em situações de sinistro, a indenização seja calculada pelo custo de reconstrução ou reposição atual dos bens, sem dedução ou aplicação de depreciação pelo tempo de uso.' }
      ],
      cards: [
        { r: 'Tipo de atividade / ocupação', v: '', d: '' },
        { r: 'Classe de bônus', v: '', d: '' },
        { r: 'Vigência da apólice', v: '12 meses', d: 'Validade da proposta: 5 dias' },
        { r: 'Estrutura e Área Construída', v: '', d: 'Ex.: Vertical | Área: 0.000 m²' },
        { r: 'Pavimentos e Unidades', v: '', d: 'Ex.: 00 pavimentos | 00 unidades' },
        { r: 'Construção e Elevadores', v: '', d: 'Ex.: Ano: 2015 | 02 elevadores' }
      ],
      coberturasSelecionadas: [
        'incendio', 'danos_eletricos', 'vendaval', 'desmoronamento',
        'impacto_veiculos', 'vidros', 'ruptura_tanques',
        'rc_operacoes', 'rc_sindico', 'rc_portoes'
      ],
      coberturasCustom: {},
      analise: [
        { t: 'Forma de Contratação:', x: 'Considerado Prédio e Conteúdo, com aplicação de Cláusula de Valor de Novo.' },
        { t: '', x: '' }
      ],
      tituloComp: 'Análise das Seguradoras',
      textoComp: 'Abaixo, apresentamos o comparativo técnico de limites, franquias e condições comerciais entre as seguradoras:',
      primeiraColuna: 'Coberturas / Condições',
      colunas: ['Seguradora 1', 'Seguradora 2', 'Seguradora 3', 'Seguradora 4'],
      valoresCoberturas: {},
      resumoValores: {
        liquido: ['', '', '', ''],
        total: ['', '', '', ''],
        pagamento: ['', '', '', '']
      },
      destaqueCol: 0,
      notaTabela: 'As propostas detalhadas de cada Seguradora se encontram no final desse documento.',
      comparativoConcorrente: {
        ativo: false,
        titulo: 'Comparativo: Proposta Atual / Concorrente vs. Nossa Proposta',
        intro: 'Para facilitar a tomada de decisão do conselho e da assembleia, apresentamos o comparativo direto entre as condições da proposta concorrente/atual e a nossa recomendação técnica:',
        nomeConcorrente: 'Proposta Concorrente / Atual',
        nomeNossa: 'Nossa Proposta Recomendada',
        observacao: '',
        linhas: [
          { item: 'Incêndio, Raio e Explosão', concorrente: '', nossa: '' },
          { item: 'Danos Elétricos', concorrente: '', nossa: '' },
          { item: 'Vendaval / Impacto de Veículos', concorrente: '', nossa: '' },
          { item: 'RC Condomínio / Síndico / Portões', concorrente: '', nossa: '' },
          { item: 'Investimento Total (Prêmio Bruto)', concorrente: '', nossa: '' }
        ]
      },
      recomendacao: 'Para o perfil construtivo e operacional deste condomínio, a seguradora **[SEGURADORA]** apresenta o melhor equilíbrio técnico e comercial entre investimento, limites de garantia e franquias.',
      tituloRiscos: 'Gerenciamento de Riscos Condominiais',
      introRiscos: 'Para garantir a plena eficácia das coberturas securitárias e a segurança contínua dos moradores e colaboradores, recomendamos as seguintes diretrizes preventivas:',
      riscos: [
        { t: 'Sistemas de Combate a Incêndio:', x: 'Manter a recarga dos extintores em dia (conforme normas da ABNT/Corpo de Bombeiros), hidrantes desobstruídos e iluminação de emergência operante.' },
        { t: 'Manutenção Elétrica e Para-raios (SPDA):', x: 'Realizar inspeções periódicas nos quadros de distribuição, geradores, bombas e no Sistema de Proteção contra Descargas Atmosféricas (SPDA) com laudo atualizado.' },
        { t: 'Portões Automáticos e Elevadores:', x: 'Manter contratos vigentes de manutenção preventiva dos elevadores e revisar regularmente os sensores antiesmagamento e travas dos portões automáticos.' }
      ],
      tituloRequisitos: 'Requisitos de Aceitação do Seguro',
      requisitos: [
        { x: 'Edificação construída em alvenaria e concreto armado, com cobertura incombustível.' },
        { x: 'Existência de equipamentos básicos de combate a incêndio dentro do prazo de validade.' },
        { x: 'Sujeito à inspeção prévia de risco pela seguradora escolhida, caso exigido na emissão.' }
      ],
      notaLegal: leiNota
    };
  },

  aplicarExemplo: function (e, d) {
    e.cliente = 'Condomínio Residencial Jardim das Acácias';
    e.cnpj = '18.492.310/0001-55';
    e.endereco = 'Av. Epitácio Pessoa, 2450, Tambauzinho, João Pessoa/PB - CEP: 58040-000';
    d.cards = [
      { r: 'Tipo de atividade / ocupação', v: 'Condomínio Residencial', d: 'Forma de contratação: Prédio e Conteúdo' },
      { r: 'Classe de bônus', v: 'Classe 3 (Sem sinistros)', d: '' },
      { r: 'Vigência da apólice', v: '12 meses', d: 'Validade da proposta: 5 dias (corridos)' },
      { r: 'Estrutura e Área Construída', v: 'Vertical | 6.450 m²', d: 'Alvenaria / Concreto Armado' },
      { r: 'Pavimentos e Unidades', v: '16 pavimentos | 64 unidades', d: '4 apartamentos por andar' },
      { r: 'Construção e Elevadores', v: 'Construído em 2016', d: '03 elevadores (2 sociais, 1 serviço)' }
    ];
    d.coberturasSelecionadas = [
      'incendio', 'danos_eletricos', 'vendaval', 'desmoronamento',
      'impacto_veiculos', 'vidros', 'ruptura_tanques',
      'despesas_fixas', 'rc_operacoes', 'rc_danos_morais',
      'rc_sindico', 'rc_portoes'
    ];
    d.analise = [
      { t: 'Forma de Contratação:', x: 'Considerado Prédio e Conteúdo, garantindo reposição integral pela Cláusula de Valor de Novo.' },
      { t: 'Histórico e Proteção:', x: 'Sem registro de sinistros nos últimos 36 meses; possui SPDA, portaria 24h, CFTV e extintores dentro da validade.' }
    ];
    d.colunas = ['Allianz', 'Porto Seguro', 'Tokio Marine', 'Sura'];
    d.valoresCoberturas = {
      incendio: [
        { lmg: 'R$ 18.500.000,00', franq: '10% mín. R$ 3.000,00' },
        { lmg: 'R$ 18.500.000,00', franq: '10% mín. R$ 3.500,00' },
        { lmg: 'R$ 18.500.000,00', franq: '10% mín. R$ 3.000,00' },
        { lmg: 'R$ 18.500.000,00', franq: '10% mín. R$ 4.000,00' }
      ],
      danos_eletricos: [
        { lmg: 'R$ 120.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 1.800,00' },
        { lmg: 'R$ 120.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 2.000,00' }
      ],
      vendaval: [
        { lmg: 'R$ 250.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 200.000,00', franq: '10% mín. R$ 2.500,00' },
        { lmg: 'R$ 250.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 200.000,00', franq: '10% mín. R$ 2.500,00' }
      ],
      desmoronamento: [
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.500,00' },
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 3.000,00' },
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.500,00' },
        { lmg: 'R$ 400.000,00', franq: '10% mín. R$ 3.000,00' }
      ],
      impacto_veiculos: [
        { lmg: 'R$ 150.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 150.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 150.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 120.000,00', franq: '10% mín. R$ 2.000,00' }
      ],
      vidros: [
        { lmg: 'R$ 30.000,00', franq: 'R$ 500,00' },
        { lmg: 'R$ 25.000,00', franq: 'R$ 600,00' },
        { lmg: 'R$ 30.000,00', franq: 'R$ 500,00' },
        { lmg: 'R$ 20.000,00', franq: 'R$ 600,00' }
      ],
      ruptura_tanques: [
        { lmg: 'R$ 80.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 80.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 80.000,00', franq: '10% mín. R$ 1.500,00' },
        { lmg: 'R$ 60.000,00', franq: '10% mín. R$ 2.000,00' }
      ],
      despesas_fixas: [
        { lmg: 'R$ 150.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 120.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 150.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 100.000,00', franq: 'Sem franquia' }
      ],
      rc_operacoes: [
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 500.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 400.000,00', franq: '10% mín. R$ 2.500,00' }
      ],
      rc_danos_morais: [
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 100.000,00', franq: '10% mín. R$ 2.000,00' },
        { lmg: 'R$ 80.000,00', franq: '10% mín. R$ 2.500,00' }
      ],
      rc_sindico: [
        { lmg: 'R$ 300.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 250.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 300.000,00', franq: 'Sem franquia' },
        { lmg: 'R$ 200.000,00', franq: 'Sem franquia' }
      ],
      rc_portoes: [
        { lmg: 'R$ 50.000,00', franq: 'R$ 800,00' },
        { lmg: 'R$ 50.000,00', franq: 'R$ 900,00' },
        { lmg: 'R$ 50.000,00', franq: 'R$ 800,00' },
        { lmg: 'R$ 40.000,00', franq: 'R$ 1.000,00' }
      ]
    };
    d.resumoValores = {
      liquido: ['R$ 6.840,00', 'R$ 7.420,00', 'R$ 7.190,00', 'R$ 7.890,00'],
      total: ['R$ 7.344,79', 'R$ 7.967,60', 'R$ 7.720,62', 'R$ 8.472,28'],
      pagamento: ['6x sem juros', '6x sem juros', '6x sem juros', '5x sem juros']
    };
    d.comparativoConcorrente = {
      ativo: true,
      titulo: 'Comparativo: Proposta Concorrente vs. Nossa Proposta',
      intro: 'Abaixo, destacamos as principais diferenças técnicas e financeiras entre a cotação concorrente apresentada e a nossa recomendação na Allianz:',
      nomeConcorrente: 'Proposta Concorrente',
      nomeNossa: 'Nossa Proposta (Allianz)',
      observacao: 'Nossa proposta oferece limite superior em Danos Elétricos e inclui RC Portões Automáticos com menor investimento anual.',
      linhas: [
        { item: 'Incêndio, Raio e Explosão', concorrente: 'R$ 16.000.000,00', nossa: 'R$ 18.500.000,00' },
        { item: 'Danos Elétricos', concorrente: 'R$ 60.000,00', nossa: 'R$ 120.000,00' },
        { item: 'RC Condomínio / Operações', concorrente: 'R$ 300.000,00', nossa: 'R$ 500.000,00' },
        { item: 'RC Portões Automáticos', concorrente: 'Não contratado', nossa: 'R$ 50.000,00' },
        { item: 'Valor Total Anual', concorrente: 'R$ 8.120,00', nossa: 'R$ 7.344,79' }
      ]
    };
    d.recomendacao = d.recomendacao.replace('[SEGURADORA]', 'Allianz');
    d.destaqueCol = 0;
  },

  validarExtra: function (d, pendencias) {
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

    const blocos = this.gruposCoberturas.map(function (g) {
      const marcados = g.itens.filter(function (it) { return selec.indexOf(it.id) >= 0; });
      if (!marcados.length) return '';

      const cardsHtml = marcados.map(function (it) {
        return '<div class="card-cob">' +
          '<div class="cob-icone">' + (it.icone || '') + '</div>' +
          '<div class="cob-info">' +
            '<div class="cob-nome">' + utils.esc(it.nome) + '</div>' +
            '<div class="cob-desc">' + utils.rich(it.desc) + '</div>' +
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
    <p class="intro">Apresentamos abaixo o resumo explicativo das garantias selecionadas para a proteção do condomínio, organizadas por natureza de risco:</p>
    ${blocos}
  </div>
  ${rodape}
</section>`;
  },

  renderizarPaginaConcorrente: function (d, rodape, utils) {
    const cc = d.comparativoConcorrente;
    if (!cc || !cc.ativo) return '';
    const linhasValidas = (cc.linhas || []).filter(function (l) {
      return (l.item && l.item.trim()) || (l.concorrente && l.concorrente.trim()) || (l.nossa && l.nossa.trim());
    });
    if (!linhasValidas.length) return '';

    const linhasHtml = linhasValidas.map(function (l, idx) {
      return '<tr>' +
        '<td>' + utils.esc(l.item || '—') + '</td>' +
        '<td>' + utils.cel(l.concorrente) + '</td>' +
        '<td class="destaque">' + utils.cel(l.nossa) + '</td>' +
      '</tr>';
    }).join('');

    return `
<section class="pagina">
  <div class="bloco">
    <h2 class="secao">${utils.esc(cc.titulo || 'Comparativo: Proposta Concorrente vs. Nossa Proposta')}</h2>
    ${cc.intro ? '<p class="intro">' + utils.rich(cc.intro) + '</p>' : ''}
    <table class="comparativo">
      <colgroup>
        <col style="width:36%">
        <col style="width:32%">
        <col style="width:32%">
      </colgroup>
      <thead>
        <tr>
          <th>Cobertura / Condição</th>
          <th>${utils.esc(cc.nomeConcorrente || 'Proposta Concorrente')}</th>
          <th>${utils.esc(cc.nomeNossa || 'Nossa Proposta')}</th>
        </tr>
      </thead>
      <tbody>${linhasHtml}</tbody>
    </table>
    ${cc.observacao && cc.observacao.trim() ? '<div class="recomendacao" style="margin-top:14px">' + utils.rich(cc.observacao) + '</div>' : ''}
  </div>
  ${rodape}
</section>`;
  }
};