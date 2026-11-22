'use strict';

window.PRODUTOS.rcp = {
  id: 'rcp',
  nomeMenu: 'RC Profissional (E&O)',
  aceitaCpf: true,
  mostraEndereco: false,
  dicaCards: 'O primeiro quadro (CPF/CNPJ) é automático. Aqui entram os demais: enquadramento, faturamento, vigência, retroatividade...',
  gruposCoberturas: null,

  conteudoPadrao: function (leiNota) {
    return {
      tipoTexto: 'Seguro de Responsabilidade Civil Profissional (E&O)',
      seloVigencia: 'Vigência do seguro: 12 meses',
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
      tituloRequisitos: 'Requisitos de Aceitação do Seguro',
      requisitos: [],
      notaLegal: leiNota
    };
  },

  aplicarExemplo: function (e, d) {
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
    d.destaqueCol = 0;
  },

  validarExtra: null,
  renderizarPaginaExtra: null
};