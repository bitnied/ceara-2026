/* =========================================================
   Ceará 2026 — dados do roteiro
   Tudo que é conteúdo (passeios, dias, sugestões, dicas) fica aqui.
   Preços e horários são estimativas: confirme antes de ir.
   ========================================================= */

const TRIP = {
  titulo: 'Ceará 2026',
  hotel: 'Beach Park Acqua Resort',
  inicio: '2026-10-11',
  fim: '2026-10-18',
  lat: -3.835,
  lon: -38.389,
  tz: 'America/Fortaleza',
};

/* Pessoas do grupo (nomes editáveis em Ajustes) */
/* Nomes genéricos da 1ª versão: quem já tinha o app salvo recebe os nomes novos. */
const NOMES_ANTIGOS = { p1: 'Adulto 1', p2: 'Adulto 2', p3: 'Avô', p4: 'Avó', p5: 'Senhora', p6: 'Criança', p7: 'Bebê' };
const PESSOAS_PADRAO = [
  { id: 'p1', nome: 'Tiago', sigla: 'T', tipo: 'adulto', cor: '#0F7C86' },
  { id: 'p2', nome: 'Elisa', sigla: 'E', tipo: 'adulto', cor: '#E0634A' },
  { id: 'p3', nome: 'Alter', sigla: 'Al', tipo: 'idoso', cor: '#7A5BC7', leve: false },
  { id: 'p4', nome: 'Arcenia', sigla: 'Ar', tipo: 'idoso', cor: '#C2477F', leve: false },
  { id: 'p5', nome: 'Lizete', sigla: 'Li', tipo: 'idoso', cor: '#B7791F', leve: true },
  { id: 'p6', nome: 'Luna', sigla: 'Lu', tipo: 'crianca', cor: '#2F6FD0', idade: 9 },
  { id: 'p7', nome: 'Leo', sigla: 'Le', tipo: 'bebe', cor: '#2E9B5F', idade: 1.5 },
];

/* Atalhos de grupo usados nas sugestões e nos botões rápidos */
const GRUPOS = {
  todos: { nome: 'Todos', pessoas: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'] },
  casal: { nome: 'Tiago e Elisa', pessoas: ['p1', 'p2'] },
  idosos: { nome: 'Idosos', pessoas: ['p3', 'p4', 'p5'] },
  criancas: { nome: 'Luna e Leo', pessoas: ['p6', 'p7'] },
};

const PERIODOS = [
  { id: 'manha', nome: 'Manhã' },
  { id: 'tarde', nome: 'Tarde' },
  { id: 'noite', nome: 'Noite' },
];

const CATEGORIAS = {
  complexo: { nome: 'Beach Park' },
  praia: { nome: 'Praias perto' },
  batevolta: { nome: 'Bate-volta' },
  fortaleza: { nome: 'Fortaleza' },
  gastronomia: { nome: 'Comer' },
  logistica: { nome: 'Logística' },
};

/* publico: 2 = ótimo · 1 = dá, com ressalvas · 0 = não recomendado
   dias: dias da semana em que funciona (0 = dom ... 6 = sáb). null = todos */
const ATIVIDADES = [
  /* ---------------- Complexo Beach Park ---------------- */
  {
    id: 'bp-aquapark', nome: 'Beach Park Aqua Park', cat: 'complexo',
    local: 'Porto das Dunas, Aquiraz', tempo: 'Pelo Acqualink', km: 0,
    duracao: '11h–17h (dia todo)', preco: 'R$ 230–325 por pessoa (site oficial); idosos e crianças têm categorias próprias',
    periodos: ['manha', 'tarde'], dias: [0, 1, 2, 5, 6], abreFeriado: true, intensidade: 'moderada',
    publico: { bebe: 1, idosos: 2, crianca: 2 },
    publicoNota: {
      bebe: 'Áreas infantis rasas e o rio lento, com fralda de piscina. Faça a soneca no quarto: o resort fica ao lado.',
      idosos: 'Rio lento, piscinas e áreas com sombra. Quem é mais disposto encara os toboáguas médios.',
      crianca: 'Aos 9 anos a Luna aproveita quase tudo. Confira a altura mínima dos brinquedos radicais.',
    },
    resumo: 'O parque aquático pé na areia, colado no resort. Tem toboáguas radicais, rio lento e áreas infantis.',
    descricao: 'Do Acqua Resort se chega ao parque a pé, pelo Acqualink, o rio que corta o resort. Dá para chegar na abertura, voltar ao quarto para a soneca do bebê e retornar depois. Entre as atrações estão o Insano, um dos toboáguas mais altos do mundo, a Surreal, montanha-russa aquática que está no Guinness, o Kalafrio e a Correnteza Encantada (rio lento), além das áreas infantis.',
    destaques: ['Insano e Surreal para os radicais', 'Correnteza Encantada (rio lento) para todas as idades', 'Áreas infantis para bebê e criança', 'Na baixa temporada costuma abrir de sexta a terça (fecha qua/qui), mas abre nos feriados'],
    dicas: ['Compre os ingressos online, que sai mais barato que na bilheteria', 'Chegue às 11h e vá primeiro nos radicais, antes das filas', 'Use camiseta UV, reaplique o protetor e beba muita água', 'Confira se compensa o ingresso de 2 dias'],
    transporte: { carro: 'Não precisa: a entrada é pelo resort.', agencia: '—', uber: '—' },
    maps: 'Beach Park Aqua Park Aquiraz', link: 'https://beachpark.com.br',
  },
  {
    id: 'resort-piscinas', nome: 'Piscinas do Acqua Resort', cat: 'complexo',
    local: 'No resort', tempo: '0 min', km: 0, duracao: 'Livre', preco: 'Incluso',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Piscinas, Acqualink (rio que corta o resort), playground e jogos. Bom para o ritmo da família.',
    descricao: 'O resort tem várias piscinas, uma com borda infinita, playground e espaço de jogos (pebolim, sinuca, pingue-pongue). Também tem bar molhado. É a base perfeita para os momentos em que o grupo se divide.',
    destaques: ['Piscina de borda infinita', 'Acqualink: um rio que conecta o resort ao parque', 'Playground e salão de jogos', 'Bar molhado'],
    dicas: ['Bebê no sol só antes das 10h e depois das 15h', 'Reserve a espreguiçadeira na sombra cedo'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort',
  },
  {
    id: 'kids-club', nome: 'Kids Club do resort', cat: 'complexo',
    local: 'No resort', tempo: '0 min', km: 0, duracao: '2–4 h', preco: 'Confirmar na recepção',
    periodos: ['manha', 'tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 0, idosos: 0, crianca: 2 },
    publicoNota: { bebe: 'É a partir de 4 anos.', crianca: 'A turma "Radical" é de 8 a 12 anos, perfeita para a Luna.' },
    resumo: 'Recreação monitorada para a criança enquanto os adultos descansam ou passeiam.',
    descricao: 'O Kids Club tem duas turmas: Kid\'s (4 a 7 anos) e Radical (8 a 12 anos). Ajuda nos dias em que os adultos querem um tempo livre ou fazer um passeio que não combina com a criança.',
    destaques: ['Turma Radical: 8 a 12 anos', 'Programação diária na recepção'],
    dicas: ['Pergunte a programação do dia no check-in', 'No feriado de 12/10 (Dia das Crianças) deve ter programação especial'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort',
  },
  {
    id: 'praia-porto-dunas', nome: 'Praia de Porto das Dunas', cat: 'complexo',
    local: 'Na frente do complexo', tempo: '5 min a pé', km: 0, duracao: '1–3 h', preco: 'Grátis',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Caminhada cedinho na areia, banho de mar e castelinho com o bebê.',
    descricao: 'É a praia em frente ao Beach Park, com areia larga e boa para caminhar. O melhor horário é de manhã cedo, quando o sol nasce por volta das 5h20 e o vento ainda está fraco.',
    destaques: ['Caminhada no nascer do sol', 'Água morna o ano todo'],
    dicas: ['Respeite as bandeiras: pode ter correnteza', 'Em outubro venta bastante à tarde'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Praia Porto das Dunas',
  },
  {
    id: 'vila-azul', nome: 'Vila Azul do Mar', cat: 'complexo',
    local: 'Complexo Beach Park', tempo: '5 min', km: 0, duracao: '1–2 h', preco: 'Grátis (consumo à parte)',
    periodos: ['tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Área de lojas, restaurantes e atrações à beira-mar dentro do complexo.',
    descricao: 'Fica dentro do complexo Beach Park, à beira-mar, com lojinhas, sorvete e restaurantes. É um programa de fim de tarde ou noite sem pegar estrada.',
    destaques: ['Pôr do sol por volta das 17h30', 'Opções de jantar sem sair do complexo'],
    dicas: ['Bom plano para a 1ª noite, depois da viagem'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Vila Azul do Mar Beach Park',
  },
  {
    id: 'arvorar', nome: 'Arvorar (parque de natureza)', cat: 'complexo',
    local: 'Vila Terra Brasilis, Aquiraz', tempo: '20 min', km: 12, duracao: '2–3 h', preco: '≈ R$ 79 (promo Pix); menores de 1 ano não pagam (o Leo, com 1 ano e meio, deve pagar)',
    periodos: ['manha', 'tarde'], dias: [5, 6, 0], intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    publicoNota: { bebe: 'Gratuidade só para menores de 1 ano. Confirme a regra para o Leo (1 ano e meio).', idosos: 'Trajeto monitorado, sem grandes esforços.' },
    resumo: 'Parque do Beach Park com aviários de imersão (cerca de 250 aves), arvorismo e educação ambiental.',
    descricao: 'Inaugurado pelo Beach Park, tem três grandes aviários de imersão (3 mil m², cerca de 250 aves), répteis, pequenos mamíferos e arvorismo, num trajeto guiado por educadores ambientais. É um dos poucos passeios que agradam ao bebê, à criança e aos avós ao mesmo tempo.',
    destaques: ['Aviários de imersão', 'Arvorismo para a criança e os adultos', 'Programa para todas as idades'],
    dicas: ['Abria de sexta a domingo, das 9h às 17h: confira os dias atuais no site', 'Vá cedo, com menos calor'],
    transporte: { carro: '20 min do resort', agencia: 'Pergunte na recepção sobre traslado', uber: '≈ R$ 25–40 por carro' },
    maps: 'Arvorar Parque Aquiraz', link: 'https://beachpark.com.br',
  },
  {
    id: 'jantar-resort', nome: 'Jantar no resort', cat: 'complexo',
    local: 'No resort', tempo: '0 min', km: 0, duracao: '1–2 h', preco: 'Conforme o pacote (muitas diárias incluem jantar)',
    periodos: ['noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Buffet do resort, a opção prática para as noites com bebê.',
    descricao: 'Muitas diárias do Acqua incluem café da manhã e jantar em buffet. Confira o que o seu pacote inclui.',
    destaques: ['Zero deslocamento', 'Bom para a hora do bebê dormir'],
    dicas: [],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort',
  },
  {
    id: 'jantar-especial', nome: 'Jantar especial no complexo', cat: 'complexo',
    local: 'Restaurante Aquiraz (resort) ou Vila Azul do Mar', tempo: '0–5 min', km: 0, duracao: '2 h', preco: '$$$',
    periodos: ['noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 2 },
    resumo: 'Jantar de despedida ou noite a dois sem pegar estrada.',
    descricao: 'O resort tem espaço de alta gastronomia (Restaurante Aquiraz) e bar molhado (Toaçu). Serve para a despedida em família ou para o casal enquanto os avós ficam com as crianças.',
    destaques: ['Sem estrada à noite'],
    dicas: ['Reserve com antecedência'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort restaurante',
  },

  /* ---------------- Praias e passeios perto ---------------- */
  {
    id: 'prainha-rendeiras', nome: 'Prainha + Centro das Rendeiras', cat: 'praia',
    local: 'Prainha, Aquiraz', tempo: '15 min', km: 12, duracao: '2–3 h', preco: 'Grátis (compras à parte)',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 1 },
    resumo: 'Praia de pescadores e a renda de bilro feita na hora pelas rendeiras.',
    descricao: 'O Centro das Rendeiras reúne artesãs que fazem renda de bilro ao vivo, com toalhas, roupas e bicos. A praia em frente tem jangadas e barracas simples. É perto, tranquilo e do agrado dos avós.',
    destaques: ['Renda de bilro feita na hora', 'Jangadas na areia', 'Fim de tarde agradável'],
    dicas: ['Leve dinheiro/Pix: as rendeiras são pequenas artesãs', 'Combina com o pôr do sol no Iguape'],
    transporte: { carro: '15 min', agencia: '—', uber: '≈ R$ 25–40 por carro' },
    maps: 'Centro das Rendeiras Prainha Aquiraz',
  },
  {
    id: 'iguape', nome: 'Praia do Iguape e dunas', cat: 'praia',
    local: 'Iguape, Aquiraz', tempo: '25 min', km: 20, duracao: '2–4 h', preco: 'Grátis; skibunda ≈ R$ 10–20',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 1, idosos: 1, crianca: 2 },
    publicoNota: { idosos: 'Subir as dunas cansa. Quem prefere fica na barraca.', bebe: 'Na barraca, na sombra.' },
    resumo: 'Dunas altas na beira do mar, skibunda e pôr do sol. A criança adora.',
    descricao: 'Praia com dunas grandes a poucos metros do mar, rendeiras e jangadas. Lá perto fica a Lagoa do Catu, com barracas na beira d\'água, boa para almoçar.',
    destaques: ['Skibunda nas dunas', 'Pôr do sol do alto da duna', 'Lagoa do Catu ali perto'],
    dicas: ['Vá depois das 15h, com a areia menos quente'],
    transporte: { carro: '25 min', agencia: 'Bugueiros locais na praia', uber: '≈ R$ 40–60 por carro' },
    maps: 'Praia do Iguape Aquiraz',
  },
  {
    id: 'aquiraz-historico', nome: 'Centro histórico de Aquiraz', cat: 'praia',
    local: 'Aquiraz', tempo: '20 min', km: 15, duracao: '1–2 h', preco: 'Grátis / baixo',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 1 },
    resumo: 'A primeira capital do Ceará: igreja matriz, casario e Museu Sacro.',
    descricao: 'Passeio curto e cultural, bom para os avós. Inclui a Igreja Matriz de São José de Ribamar, o Museu Sacro e o casario colonial. Combina com a Prainha no mesmo dia.',
    destaques: ['Igreja Matriz', 'Museu Sacro São José de Ribamar'],
    dicas: ['Confira os horários do museu; costuma fechar às segundas'],
    transporte: { carro: '20 min', agencia: '—', uber: '≈ R$ 30–45 por carro' },
    maps: 'Igreja Matriz Aquiraz',
  },
  {
    id: 'aguas-belas', nome: 'Águas Belas (rio encontra o mar)', cat: 'praia',
    local: 'Cascavel', tempo: '50 min', km: 45, duracao: 'Meio dia a dia todo', preco: 'Barco ≈ R$ 20–40 por pessoa; barracas',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Um rio de águas calmas encontra o mar, com passeio de barco no mangue. É o bate-volta mais leve.',
    descricao: 'O Rio Malcozinhado deságua no mar e forma piscinas calmas, ótimas para o bebê e para os avós. Tem passeio de barco pelo rio e mangue, caiaque e barracas com almoço. Fica perto, é tranquilo e serve para toda a família.',
    destaques: ['Água calma de rio ao lado do mar', 'Passeio de barco no mangue', 'Pouca estrada'],
    dicas: ['Melhor na maré baixa: veja a tábua de marés'],
    transporte: { carro: '50 min', agencia: 'Van privativa ≈ R$ 400–600', uber: '≈ R$ 80–120 por carro' },
    maps: 'Águas Belas Cascavel Ceará',
  },

  /* ---------------- Bate-voltas ---------------- */
  {
    id: 'morro-branco', nome: 'Morro Branco + Praia das Fontes', cat: 'batevolta',
    local: 'Beberibe (litoral leste)', tempo: '1h10', km: 65, duracao: 'Dia todo (8h–16h)', preco: 'Agência ≈ R$ 70–110 por pessoa · buggy opcional',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 1, idosos: 1, crianca: 2 },
    publicoNota: { idosos: 'O labirinto tem trechos de areia e subidas. Quem prefere ritmo leve espera na barraca da Praia das Fontes.', bebe: 'Vá de carregador (sling), porque o carrinho não anda na areia.' },
    resumo: 'Falésias coloridas, o labirinto de areia e as garrafinhas de areia colorida.',
    descricao: 'Em Morro Branco se caminha pelo labirinto das falésias coloridas e se vê os artesãos montando paisagens com areia colorida dentro de garrafas. Depois, a Praia das Fontes tem bicas de água doce saindo das falésias, grutas e barracas boas para almoçar.',
    destaques: ['Labirinto das falésias', 'Garrafinhas de areia colorida', 'Bicas de água doce na Praia das Fontes', 'Buggy opcional até a Lagoa do Uruaú'],
    dicas: ['As grutas da Praia das Fontes ficam melhores na maré baixa', 'Leve tênis ou papete para o labirinto'],
    transporte: { carro: '1h10 pela CE-040', agencia: 'Agências buscam no Beach Park (confirme). Van privativa ≈ R$ 600–900', uber: 'Não recomendado (volta difícil)' },
    maps: 'Labirinto das Falésias Morro Branco Beberibe',
  },
  {
    id: 'cumbuco', nome: 'Cumbuco + Lagoa do Banana', cat: 'batevolta',
    local: 'Caucaia (litoral oeste)', tempo: '1h10', km: 55, duracao: 'Dia todo', preco: 'Buggy ≈ R$ 300–500 por buggy (até 4 pessoas) · agência ≈ R$ 60–100 por pessoa',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 1, idosos: 1, crianca: 2 },
    publicoNota: { bebe: 'O Leo não deve andar de buggy nas dunas. Fica na barraca da lagoa (há cadeiras dentro d\'água).', idosos: 'Peça o buggy "sem emoção". Quem preferir pode esperar na lagoa.' },
    resumo: 'Buggy nas dunas, skibunda, aerobunda e almoço com os pés na lagoa.',
    descricao: 'O clássico do litoral oeste. Tem passeio de buggy pelas dunas, "com" ou "sem emoção", skibunda, aerobunda (uma tirolesa que cai na lagoa) e a Lagoa do Banana, com barracas que põem mesa e cadeira dentro d\'água. É ótimo para a criança e dá para dividir o grupo: os radicais no buggy e os outros na lagoa.',
    destaques: ['Buggy com ou sem emoção', 'Aerobunda e skibunda', 'Mesas dentro da lagoa', 'Jangada na praia do Cumbuco'],
    dicas: ['Feche o preço do buggy antes de sair', 'Use bugueiro credenciado', 'Sexta é mais vazio que o fim de semana'],
    transporte: { carro: '1h10 pelo Anel Viário', agencia: 'Excursões saem de manhã e voltam no fim da tarde. Van privativa ≈ R$ 600–900', uber: 'Ida possível, volta difícil' },
    maps: 'Lagoa do Banana Caucaia',
  },
  {
    id: 'canoa-quebrada', nome: 'Canoa Quebrada', cat: 'batevolta',
    local: 'Aracati (litoral leste)', tempo: '2h', km: 140, duracao: 'Dia todo (7h–18h)', preco: 'Agência ≈ R$ 90–140 por pessoa · buggy ≈ R$ 300–450',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'intensa',
    publico: { bebe: 0, idosos: 1, crianca: 2 },
    publicoNota: { bebe: 'São 4h de estrada no dia e buggy. Melhor ficar no resort.', idosos: 'É cansativo. Só para quem está bem disposto.' },
    resumo: 'Falésias vermelhas com a lua e a estrela, Broadway, buggy e parapente. Ótimo para o casal.',
    descricao: 'O símbolo de lua e estrela entalhado na falésia, a rua Broadway cheia de barzinhos, passeio de buggy pelas dunas e falésias, e voo duplo de parapente para os corajosos. É um dia longo e combina com o casal, se quiser com a criança, enquanto os avós ficam no resort com o bebê.',
    destaques: ['Mirante da lua e estrela', 'Rua Broadway', 'Buggy pelas falésias', 'Parapente duplo'],
    dicas: ['Saia cedo (7h) para render', 'Dá para dormir uma noite lá se o casal quiser'],
    transporte: { carro: '2h pela CE-040', agencia: 'Excursões com saída por volta das 7h', uber: 'Não' },
    maps: 'Canoa Quebrada Aracati',
  },
  {
    id: 'lagoinha', nome: 'Lagoinha', cat: 'batevolta',
    local: 'Paraipaba (litoral oeste)', tempo: '2h', km: 120, duracao: 'Dia todo', preco: 'Agência ≈ R$ 80–120 por pessoa',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 0, idosos: 1, crianca: 2 },
    resumo: 'Coqueiral na beira de uma enseada linda, dunas e lagoa. Bom programa a dois.',
    descricao: 'Uma das praias mais bonitas do litoral oeste: uma enseada com coqueiral, mar verde e dunas com lagoa. É um dia de praia "de cartão-postal", bom para o casal.',
    destaques: ['Mirante da enseada', 'Coqueiral pé na areia', 'Lagoa nas dunas'],
    dicas: ['Combine com Flecheiras só se sair bem cedo'],
    transporte: { carro: '2h', agencia: 'Excursões diárias', uber: 'Não' },
    maps: 'Praia de Lagoinha Paraipaba',
  },
  {
    id: 'flecheiras', nome: 'Flecheiras (piscinas naturais)', cat: 'batevolta',
    local: 'Trairi (litoral oeste)', tempo: '2h20', km: 145, duracao: 'Dia todo', preco: 'Agência ≈ R$ 90–130 por pessoa',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 0, idosos: 1, crianca: 2 },
    resumo: 'Vila de pescadores com piscinas naturais entre os arrecifes na maré baixa.',
    descricao: 'Na maré baixa formam-se piscinas naturais com peixinhos entre os arrecifes. A vila de pescadores é charmosa e tranquila. O passeio depende da maré.',
    destaques: ['Piscinas naturais', 'Vila de pescadores'],
    dicas: ['Só vale com maré baixa durante o dia: confira a tábua de marés'],
    transporte: { carro: '2h20', agencia: 'Excursões (às vezes junto com Lagoinha)', uber: 'Não' },
    maps: 'Flecheiras Trairi',
  },
  {
    id: 'jericoacoara', nome: 'Jericoacoara (2 dias / 1 noite)', cat: 'batevolta',
    local: 'Jijoca de Jericoacoara', tempo: '5h–6h', km: 300, duracao: '2 dias', preco: 'Pacote de agência + pousada · $$$',
    periodos: ['manha', 'tarde', 'noite'], dias: null, intensidade: 'intensa',
    publico: { bebe: 0, idosos: 0, crianca: 1 },
    publicoNota: { bebe: 'Estrada longa e trecho em 4x4: não recomendado.', idosos: 'Viagem cansativa.', crianca: 'Possível, mas cansativo.' },
    resumo: 'A opção ousada: escapada do casal para Jeri, com pôr do sol na duna, Pedra Furada e lagoas.',
    descricao: 'É longe para um bate-volta. Só faz sentido como escapada de 2 dias do casal (por exemplo, sexta e sábado) enquanto os avós ficam com as crianças no resort. Inclui o pôr do sol na Duna do Pôr do Sol, a Pedra Furada e a Lagoa do Paraíso.',
    destaques: ['Duna do Pôr do Sol', 'Pedra Furada', 'Lagoa do Paraíso (redes na água)'],
    dicas: ['Ocupa 2 dias: adicione na sexta e no sábado', 'Combine bem com os avós antes'],
    transporte: { carro: 'Não recomendado (trecho final de areia)', agencia: 'Van até Jijoca + jardineira 4x4', uber: 'Não' },
    maps: 'Jericoacoara',
  },
  {
    id: 'guaramiranga', nome: 'Serra de Guaramiranga', cat: 'batevolta',
    local: 'Maciço de Baturité', tempo: '2h', km: 110, duracao: 'Dia todo', preco: 'Agência ≈ R$ 90–130 por pessoa',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'moderada',
    publico: { bebe: 1, idosos: 2, crianca: 1 },
    publicoNota: { bebe: 'A estrada é cheia de curvas e pode enjoar.' },
    resumo: 'Clima de serra (18–25°C), cafés, flores e mirantes. Um contraponto à praia que agrada aos avós.',
    descricao: 'A serra a 865 m de altitude tem clima ameno, mata atlântica, cafezinhos, o Pico Alto com vista e o Mosteiro dos Jesuítas em Baturité.',
    destaques: ['Pico Alto', 'Cafés e docerias', 'Mosteiro dos Jesuítas'],
    dicas: ['Leve um casaquinho', 'A estrada tem muitas curvas'],
    transporte: { carro: '2h (as curvas no fim)', agencia: 'Excursões diárias', uber: 'Não' },
    maps: 'Guaramiranga Ceará',
  },

  /* ---------------- Fortaleza ---------------- */
  {
    id: 'mercado-central', nome: 'Mercado Central', cat: 'fortaleza',
    local: 'Centro, Fortaleza', tempo: '50 min', km: 32, duracao: '2 h', preco: 'Grátis (compras à parte)',
    periodos: ['manha', 'tarde'], dias: [1, 2, 3, 4, 5, 6, 0], intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 1 },
    resumo: 'Quatro andares de redes, castanha, rendas, cachaça, rapadura e lembrancinhas.',
    descricao: 'É o melhor lugar para as compras: castanha de caju, doce de caju, cachaça, redes, rendas, camisetas e artesanato. Tem elevador, o que facilita para os avós e para o carrinho.',
    destaques: ['Castanha de caju e doces', 'Redes e rendas', 'Preços para pechinchar'],
    dicas: ['Seg–sáb ~8h–17h; domingo só de manhã (confirme)', 'Pechinche e compare entre lojas', 'Combine com a Catedral, que fica em frente'],
    transporte: { carro: '50 min; estacionamento pago ao redor', agencia: 'City tour de agência inclui', uber: '≈ R$ 60–90 por carro' },
    maps: 'Mercado Central de Fortaleza',
  },
  {
    id: 'centro-historico', nome: 'Catedral + Theatro José de Alencar', cat: 'fortaleza',
    local: 'Centro, Fortaleza', tempo: '50 min', km: 32, duracao: '1–2 h', preco: 'Visita ao teatro ≈ R$ 10–20',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 1 },
    resumo: 'A Catedral gótica em frente ao Mercado e o teatro art nouveau de ferro, com seus jardins.',
    descricao: 'A Catedral Metropolitana fica ao lado do Mercado Central. A poucos minutos está o Theatro José de Alencar, com estrutura de ferro vinda da Escócia e jardins de Burle Marx. Tem visitas guiadas.',
    destaques: ['Catedral Metropolitana', 'Theatro José de Alencar', 'Passeio Público'],
    dicas: ['Confira os horários das visitas guiadas do teatro'],
    transporte: { carro: '50 min', agencia: 'City tour', uber: '≈ R$ 60–90 por carro' },
    maps: 'Theatro José de Alencar',
  },
  {
    id: 'praia-futuro', nome: 'Barraca na Praia do Futuro', cat: 'fortaleza',
    local: 'Praia do Futuro, Fortaleza', tempo: '30 min', km: 22, duracao: 'Meio dia', preco: 'Consumo $$',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'As megabarracas de Fortaleza: piscina, parquinho, ducha e peixe frito pé na areia.',
    descricao: 'As barracas da Praia do Futuro são famosas pela estrutura completa: cadeiras, guarda-sol, piscina, parquinho, banheiro, ducha e cardápio grande (caranguejo, peixe, camarão, tapioca). A Crocobeach, por exemplo, é bem estruturada para famílias.',
    destaques: ['Estrutura completa para bebê e avós', 'Caranguejo e peixe frito', 'Parquinho e piscina em algumas barracas'],
    dicas: ['Chegue cedo para pegar mesa na sombra', 'Confira os preços no cardápio antes'],
    transporte: { carro: '30 min', agencia: '—', uber: '≈ R$ 45–70 por carro' },
    maps: 'Crocobeach Praia do Futuro',
  },
  {
    id: 'quinta-caranguejo', nome: 'Quinta do Caranguejo', cat: 'fortaleza',
    local: 'Praia do Futuro, Fortaleza', tempo: '30 min', km: 22, duracao: '2–3 h', preco: '$$',
    periodos: ['noite'], dias: [4], intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 1 },
    resumo: 'A tradição de Fortaleza: quinta-feira à noite é dia de caranguejo e forró nas barracas.',
    descricao: 'Toda quinta à noite as barracas da Praia do Futuro lotam para comer caranguejo na tábua com martelinho, ao som de forró e música ao vivo. Boa noite para o casal (e os avós dispostos) enquanto o bebê dorme.',
    destaques: ['Caranguejo com martelinho', 'Forró ao vivo'],
    dicas: ['Só às quintas!', 'Barracas tradicionais: Chico do Caranguejo e outras da orla'],
    transporte: { carro: '30 min (evite dirigir após beber)', agencia: '—', uber: '≈ R$ 45–70 por carro' },
    maps: 'Chico do Caranguejo Praia do Futuro',
  },
  {
    id: 'beira-mar', nome: 'Beira-Mar + Feirinha', cat: 'fortaleza',
    local: 'Meireles / Mucuripe, Fortaleza', tempo: '45 min', km: 30, duracao: '2–3 h', preco: 'Grátis (compras à parte)',
    periodos: ['tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Calçadão à beira-mar, feirinha de artesanato à noite, sorvete e o pôr do sol no Mucuripe.',
    descricao: 'O cartão-postal de Fortaleza é o calçadão plano, ótimo para carrinho e para os avós. À noite funciona a feirinha de artesanato. No fim do calçadão, o Mercado dos Peixes do Mucuripe recebe as jangadas, e lá você compra o peixe e eles preparam na hora. Tem sorveterias de frutas regionais.',
    destaques: ['Feirinha de artesanato (noite)', 'Pôr do sol com jangadas no Mucuripe', 'Sorvete de cajá, tapioca, graviola'],
    dicas: ['O pôr do sol é por volta das 17h30'],
    transporte: { carro: '45 min; estacionamento na orla', agencia: '—', uber: '≈ R$ 60–90 por carro' },
    maps: 'Feirinha da Beira Mar Fortaleza',
  },
  {
    id: 'dragao-do-mar', nome: 'Dragão do Mar + Ponte dos Ingleses', cat: 'fortaleza',
    local: 'Praia de Iracema, Fortaleza', tempo: '50 min', km: 32, duracao: '2–3 h', preco: 'Museus e planetário: baixo custo',
    periodos: ['tarde', 'noite'], dias: [0, 2, 3, 4, 5, 6], intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 2 },
    resumo: 'Centro cultural com museus e planetário, e o pôr do sol na Ponte dos Ingleses.',
    descricao: 'O Centro Dragão do Mar reúne museus, cinema, planetário e bares no casario antigo. Ali perto, a Ponte dos Ingleses é o point do pôr do sol em Fortaleza.',
    destaques: ['Planetário', 'Pôr do sol na Ponte dos Ingleses', 'Bares no casario à noite'],
    dicas: ['Os museus geralmente fecham às segundas'],
    transporte: { carro: '50 min', agencia: 'City tour', uber: '≈ R$ 60–90 por carro' },
    maps: 'Centro Dragão do Mar de Arte e Cultura',
  },
  {
    id: 'passeio-barco', nome: 'Passeio de barco na orla', cat: 'fortaleza',
    local: 'Beira-Mar / Mucuripe', tempo: '45 min', km: 30, duracao: '1h30–2h', preco: '≈ R$ 60–120 por pessoa',
    periodos: ['tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 1, idosos: 2, crianca: 2 },
    resumo: 'Escuna pela orla de Fortaleza no fim da tarde (ex.: Barco Pirata), às vezes com golfinhos.',
    descricao: 'Barcos e escunas saem da orla para um passeio pela enseada do Mucuripe, com a vista dos prédios e o pôr do sol.',
    destaques: ['Vista da cidade pelo mar', 'Pôr do sol'],
    dicas: ['Confira os horários e se aceitam bebê', 'Pode balançar: leve remédio para enjoo'],
    transporte: { carro: '45 min', agencia: '—', uber: '≈ R$ 60–90 por carro' },
    maps: 'passeio de barco Beira Mar Fortaleza',
  },
  {
    id: 'parque-coco', nome: 'Parque do Cocó', cat: 'fortaleza',
    local: 'Fortaleza', tempo: '40 min', km: 25, duracao: '1–2 h', preco: 'Grátis',
    periodos: ['manha'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Parque urbano com passarelas sobre o mangue. Uma manhã verde e tranquila.',
    descricao: 'É o grande parque de Fortaleza, com trilhas, passarelas no manguezal e parquinho. Vale como pausa verde num dia de cidade.',
    destaques: ['Passarelas no mangue', 'Programa grátis'],
    dicas: ['Vá cedo por causa do calor'],
    transporte: { carro: '40 min', agencia: '—', uber: '≈ R$ 50–80 por carro' },
    maps: 'Parque do Cocó Fortaleza',
  },
  {
    id: 'show-humor', nome: 'Show de humor cearense', cat: 'fortaleza',
    local: 'Fortaleza', tempo: '45 min', km: 30, duracao: '2 h', preco: '≈ R$ 50–100',
    periodos: ['noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 0, idosos: 2, crianca: 1 },
    resumo: 'Fortaleza é a "capital do humor". Uma noite de risadas para o casal e os avós.',
    descricao: 'A cidade tem tradição em humoristas e casas de show de humor. Veja a programação da semana: muitas casas têm shows de quinta a sábado.',
    destaques: ['Humor regional'],
    dicas: ['Confira a programação e a classificação etária'],
    transporte: { carro: '45 min', agencia: '—', uber: '≈ R$ 60–90 por carro' },
    maps: 'show de humor Fortaleza',
  },
  {
    id: 'shopping', nome: 'Shopping (Iguatemi / RioMar)', cat: 'fortaleza',
    local: 'Fortaleza', tempo: '35–45 min', km: 25, duracao: '2 h', preco: '—',
    periodos: ['manha', 'tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Plano B para dia de chuva, almoço no caminho do aeroporto ou compras de última hora.',
    descricao: 'Tem ar-condicionado, fraldário e praça de alimentação. O Iguatemi Bosque fica a ~20 min do aeroporto, bom para almoçar no dia da volta.',
    destaques: ['Fraldário', 'Praça de alimentação'],
    dicas: [],
    transporte: { carro: '35–45 min', agencia: '—', uber: '≈ R$ 50–80 por carro' },
    maps: 'Shopping Iguatemi Bosque Fortaleza',
  },

  /* ---------------- Onde comer ---------------- */
  {
    id: 'tapioqueiras', nome: 'Centro das Tapioqueiras', cat: 'gastronomia',
    local: 'Messejana (no caminho aeroporto ↔ resort)', tempo: '25 min', km: 18, duracao: '45 min', preco: '$',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Boxes de tapioca feita na hora, com café e suco de frutas. Parada perfeita no caminho.',
    descricao: 'São vários boxes de tapioqueiras com recheios doces e salgados, cuscuz, café e sucos regionais. Fica na saída de Fortaleza rumo ao litoral leste e ao Beach Park.',
    destaques: ['Tapioca de carne de sol com queijo coalho', 'Sucos de cajá, graviola e caju'],
    dicas: ['Bom para a chegada ou a volta'],
    transporte: { carro: 'No caminho', agencia: 'Peça ao transfer para parar', uber: '—' },
    maps: 'Centro das Tapioqueiras Messejana',
  },
  {
    id: 'coco-bambu', nome: 'Coco Bambu', cat: 'gastronomia',
    local: 'Meireles, Fortaleza', tempo: '45 min', km: 30, duracao: '1h30', preco: '$$$ (pratos para 3–4)',
    periodos: ['tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'A rede de frutos do mar que nasceu em Fortaleza, com pratos fartos para dividir em família.',
    descricao: 'Os pratos servem 3–4 pessoas, o que é ótimo para um grupo de 7. Tem espaço kids em algumas unidades.',
    destaques: ['Camarão internacional', 'Pratos para compartilhar'],
    dicas: ['Lota no almoço de fim de semana'],
    transporte: { carro: '45 min', agencia: '—', uber: '≈ R$ 60–90 por carro' },
    maps: 'Coco Bambu Meireles Fortaleza',
  },
  {
    id: 'comida-regional', nome: 'Comida cearense (Varjota)', cat: 'gastronomia',
    local: 'Varjota, Fortaleza', tempo: '45 min', km: 30, duracao: '1h30', preco: '$$',
    periodos: ['tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Baião de dois, carne de sol com macaxeira, paçoca e peixe. Ex.: Colher de Pau ou Cantinho do Faustino.',
    descricao: 'O bairro da Varjota concentra os restaurantes de comida regional. O Colher de Pau é clássico e farto. O Cantinho do Faustino faz uma cozinha cearense mais autoral.',
    destaques: ['Baião de dois', 'Carne de sol', 'Paçoca de pilão', 'Cajuína'],
    dicas: ['Combina com a tarde na Beira-Mar'],
    transporte: { carro: '45 min', agencia: '—', uber: '≈ R$ 60–90 por carro' },
    maps: 'Colher de Pau Varjota Fortaleza',
  },

  /* ---------------- Logística ---------------- */
  {
    id: 'voo-ida', nome: 'Voo para Fortaleza', cat: 'logistica',
    local: 'Saída às 9h15', tempo: '—', km: 0, duracao: 'Até o pouso', preco: '—',
    periodos: ['manha'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Embarque às 9h15. Ajuste o horário do pouso no topo do dia 11: o resto do dia acompanha.',
    descricao: 'Chegue ao aeroporto com 2h de antecedência. Leve na bagagem de mão: troca de roupa e fraldas do Leo, remédios dos avós, protetor solar e roupa de banho (para já curtir a piscina se o quarto demorar).',
    destaques: [], dicas: ['Documento da Luna e do Leo para o embarque', 'Lanchinhos e água para o Leo no avião'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Aeroporto Internacional de Fortaleza',
  },
  {
    id: 'voo-volta', nome: 'Voo de volta', cat: 'logistica',
    local: 'Aeroporto de Fortaleza', tempo: '—', km: 0, duracao: '—', preco: '—',
    periodos: ['tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Voo às 16h10. Mude o horário no topo do dia 18: o dia todo se ajusta.',
    descricao: 'Chegue ao aeroporto 2h antes. Domingo à tarde pode ter trânsito na volta das praias.',
    destaques: [], dicas: [],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Aeroporto Internacional de Fortaleza',
  },
  {
    id: 'transfer-chegada', nome: 'Chegada: aeroporto → resort', cat: 'logistica',
    local: 'Aeroporto Pinto Martins → Porto das Dunas', tempo: '40–50 min', km: 35, duracao: '1 h', preco: 'Van ≈ R$ 200–300 · 2 Ubers ≈ R$ 160–220',
    periodos: ['manha', 'tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Transfer do aeroporto para o resort. Para 7 pessoas com bagagem e bebê, o ideal é uma van.',
    descricao: 'São 7 pessoas, malas e um bebê. Reserve uma van com antecedência (pela agência, pelo resort ou por um transfer privativo) e peça a cadeirinha. Se for alugar carro, retire no aeroporto.',
    destaques: ['Reserve com antecedência', 'Peça cadeirinha para o bebê'],
    dicas: ['Dá para parar no supermercado ou nas tapioqueiras no caminho'],
    transporte: { carro: 'Retirada no aeroporto', agencia: 'Transfer privativo', uber: '2 carros (UberX não leva 7 pessoas)' },
    maps: 'Aeroporto Internacional de Fortaleza',
  },
  {
    id: 'mercado-bebe', nome: 'Parada: mercado/farmácia', cat: 'logistica',
    local: 'No caminho (Fortaleza / Eusébio)', tempo: 'No caminho', km: 0, duracao: '30–45 min', preco: '—',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Fraldas (inclusive de piscina), água, frutas, lanches e remédios. Sai bem mais barato que no resort.',
    descricao: 'Porto das Dunas tem pouco comércio. Faça uma parada estratégica para os itens do bebê e os lanches da semana.',
    destaques: ['Fralda de piscina', 'Água e frutas', 'Protetor solar extra'],
    dicas: [],
    transporte: { carro: '—', agencia: 'Combine a parada com o transfer', uber: '—' },
    maps: 'supermercado Eusébio Ceará',
  },
  {
    id: 'descanso', nome: 'Descanso / soneca', cat: 'logistica',
    local: 'No resort', tempo: '0 min', km: 0, duracao: 'Livre', preco: '—',
    periodos: ['manha', 'tarde', 'noite'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Hora de recarregar: soneca do bebê, cochilo dos avós, horas sem programação.',
    descricao: 'Viajar com bebê e idosos pede pausas. Deixe esses espaços livres no roteiro.',
    destaques: [], dicas: [],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort',
  },
  {
    id: 'checkout', nome: 'Malas e check-out', cat: 'logistica',
    local: 'No resort', tempo: '0 min', km: 0, duracao: '1 h', preco: '—',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Fechar as malas, almoço leve e check-out.',
    descricao: 'Confirme o horário de check-out (geralmente ao meio-dia) e se dá para guardar as malas e usar as áreas comuns depois.',
    destaques: [], dicas: ['Pergunte sobre late check-out'],
    transporte: { carro: '—', agencia: '—', uber: '—' },
    maps: 'Beach Park Acqua Resort',
  },
  {
    id: 'transfer-volta', nome: 'Volta: resort → aeroporto', cat: 'logistica',
    local: 'Porto das Dunas → Aeroporto', tempo: '40–50 min', km: 35, duracao: '1 h', preco: 'Van ≈ R$ 200–300',
    periodos: ['manha', 'tarde'], dias: null, intensidade: 'leve',
    publico: { bebe: 2, idosos: 2, crianca: 2 },
    resumo: 'Voo às 16h10. Chegue ao aeroporto até ~14h10.',
    descricao: 'Para voo doméstico, chegue 2h antes com a família grande. Considere trânsito de domingo na volta das praias.',
    destaques: [], dicas: ['Devolva o carro alugado com folga'],
    transporte: { carro: 'Devolução no aeroporto', agencia: 'Transfer privativo', uber: '2 carros' },
    maps: 'Aeroporto Internacional de Fortaleza',
  },
];

/* ---------------------------------------------------------
   Dias da viagem + planos sugeridos (o primeiro é o padrão).
   quem: chaves de GRUPOS ou ids de pessoas.
   --------------------------------------------------------- */
const DIAS = [
  {
    data: '2026-10-11', titulo: 'Chegada e primeiro mergulho',
    avisos: ['Do aeroporto ao resort são ~35 km (40–50 min).'],
    planos: [
      {
        nome: 'Chegada tranquila', resumo: 'Transfer com parada para os itens do bebê, tarde de piscina e Vila Azul ao entardecer.',
        itens: [
          { a: 'voo-ida', p: 'manha', h: '09:15', q: ['todos'] },
          { a: 'transfer-chegada', p: 'tarde', h: '13:00', q: ['todos'], n: 'Muda junto com o horário do pouso' },
          { a: 'mercado-bebe', p: 'tarde', h: '14:00', q: ['casal'], n: 'Tiago e Elisa descem; o resto da turma espera na van' },
          { a: 'resort-piscinas', p: 'tarde', h: '16:00', q: ['todos'], n: 'Check-in e primeiro mergulho' },
          { a: 'vila-azul', p: 'noite', h: '18:00', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:30', q: ['todos'] },
        ],
      },
      {
        nome: 'Chegada com tapioca', resumo: 'Parada no Centro das Tapioqueiras, que fica no caminho, para já entrar no clima.',
        itens: [
          { a: 'voo-ida', p: 'manha', h: '09:15', q: ['todos'] },
          { a: 'transfer-chegada', p: 'tarde', h: '13:00', q: ['todos'], n: 'Muda junto com o horário do pouso' },
          { a: 'tapioqueiras', p: 'tarde', h: '14:00', q: ['todos'] },
          { a: 'resort-piscinas', p: 'tarde', h: '16:30', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-12', titulo: 'Feriado: resort, praia e rendeiras', feriado: 'N. Sra. Aparecida · Dia das Crianças',
    avisos: ['Feriado nacional: o Beach Park costuma lotar. Bom dia para curtir o resort.', 'O Kids Club deve ter programação de Dia das Crianças.'],
    planos: [
      {
        nome: 'Resort + Prainha no fim da tarde', resumo: 'Manhã de praia e piscina, soneca, e as rendeiras da Prainha quando o sol baixar.',
        itens: [
          { a: 'praia-porto-dunas', p: 'manha', h: '07:30', q: ['todos'], n: 'Caminhada e banho de mar cedinho' },
          { a: 'resort-piscinas', p: 'manha', h: '09:30', q: ['todos'] },
          { a: 'descanso', p: 'tarde', h: '13:00', q: ['idosos', 'p7'] },
          { a: 'kids-club', p: 'tarde', h: '13:30', q: ['p6'], n: 'Programação de Dia das Crianças' },
          { a: 'prainha-rendeiras', p: 'tarde', h: '15:30', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
      {
        nome: 'Dia 100% resort', resumo: 'Sem estrada nenhuma. Tiago e Elisa ganham uma tarde livre enquanto a Luna vai ao Kids Club.',
        itens: [
          { a: 'resort-piscinas', p: 'manha', h: '08:30', q: ['todos'] },
          { a: 'kids-club', p: 'tarde', h: '14:00', q: ['p6'] },
          { a: 'descanso', p: 'tarde', h: '13:00', q: ['idosos', 'p7'] },
          { a: 'praia-porto-dunas', p: 'tarde', h: '15:00', q: ['casal'], n: 'Tarde livre do Tiago e da Elisa' },
          { a: 'vila-azul', p: 'noite', h: '18:00', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:30', q: ['todos'] },
        ],
      },
      {
        nome: 'Encarar o Beach Park no feriado', resumo: 'Para quem não aguenta esperar. Vai estar cheio: chegue na abertura.',
        itens: [
          { a: 'bp-aquapark', p: 'manha', h: '10:45', q: ['todos'], n: 'Feriado = filas. Radicais logo na abertura.' },
          { a: 'descanso', p: 'tarde', h: '13:30', q: ['p5', 'p7'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-13', titulo: 'Dia de Beach Park',
    avisos: ['Dia pós-feriado: o parque fica mais vazio.', 'Abre às 11h (bilheteria às 10h30). Saída direto do resort pelo Acqualink.'],
    planos: [
      {
        nome: 'Parque com toda a família', resumo: 'Todos no parque; o grupo se divide lá dentro entre os radicais e o rio lento, e o bebê faz a soneca no quarto.',
        itens: [
          { a: 'praia-porto-dunas', p: 'manha', h: '08:00', q: ['todos'] },
          { a: 'bp-aquapark', p: 'manha', h: '11:00', q: ['todos'], n: 'Radicais: Tiago, Elisa e Luna (+ Alter e Arcenia, se quiserem). Rio lento e áreas infantis: avós com o Leo.' },
          { a: 'descanso', p: 'tarde', h: '13:30', q: ['p5', 'p7'], n: 'Soneca do Leo no quarto. Voltam ao parque depois, se quiserem.' },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
      {
        nome: 'Parque para os radicais, resort para os demais', resumo: 'Tiago, Elisa e Luna no parque; os avós e o Leo nas piscinas do resort.',
        itens: [
          { a: 'bp-aquapark', p: 'manha', h: '11:00', q: ['casal', 'p6'] },
          { a: 'resort-piscinas', p: 'manha', h: '09:00', q: ['idosos', 'p7'] },
          { a: 'descanso', p: 'tarde', h: '13:00', q: ['idosos', 'p7'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-14', titulo: 'Falésias do litoral leste',
    avisos: ['O Beach Park costuma fechar às quartas e quintas na baixa temporada: confirme no calendário oficial.', 'Dia ideal para um bate-volta.'],
    planos: [
      {
        nome: 'Morro Branco + Praia das Fontes', resumo: 'Labirinto das falésias coloridas e almoço pé na areia. Quem prefere ritmo leve fica na barraca.',
        itens: [
          { a: 'morro-branco', p: 'manha', h: '08:00', q: ['todos'], n: 'Saída 8h · labirinto de manhã · almoço na Praia das Fontes · volta ~16h' },
          { a: 'descanso', p: 'tarde', h: '17:00', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:30', q: ['todos'] },
        ],
      },
      {
        nome: 'Águas Belas (dia leve)', resumo: 'Rio calmo encontrando o mar, passeio de barco e pouca estrada.',
        itens: [
          { a: 'aguas-belas', p: 'manha', h: '08:30', q: ['todos'], n: 'Melhor na maré baixa' },
          { a: 'descanso', p: 'tarde', h: '15:00', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
      {
        nome: 'Casal em Canoa Quebrada', resumo: 'Tiago e Elisa fazem o passeio longo; os avós ficam com Luna e Leo no resort, e a Luna vai ao Kids Club.',
        itens: [
          { a: 'canoa-quebrada', p: 'manha', h: '07:00', q: ['casal'], n: 'Buggy, mirante da lua e estrela, almoço na Broadway' },
          { a: 'resort-piscinas', p: 'manha', h: '09:00', q: ['idosos', 'criancas'] },
          { a: 'kids-club', p: 'tarde', h: '14:00', q: ['p6'] },
          { a: 'descanso', p: 'tarde', h: '13:00', q: ['idosos', 'p7'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['idosos', 'criancas'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-15', titulo: 'Fortaleza e Quinta do Caranguejo',
    avisos: ['Quinta-feira é dia de caranguejo na Praia do Futuro, tradição de Fortaleza.', 'É um dia longo: os avós e o bebê podem voltar mais cedo.'],
    planos: [
      {
        nome: 'Fortaleza completa', resumo: 'Centro e Mercado de manhã, barraca na Praia do Futuro à tarde, e o casal fica para o caranguejo.',
        itens: [
          { a: 'mercado-central', p: 'manha', h: '08:30', q: ['todos'] },
          { a: 'centro-historico', p: 'manha', h: '10:30', q: ['todos'] },
          { a: 'praia-futuro', p: 'tarde', h: '12:30', q: ['todos'], n: 'Almoço na barraca' },
          { a: 'descanso', p: 'tarde', h: '16:30', q: ['idosos', 'criancas'], n: 'Voltam ao resort de van ou Uber' },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['idosos', 'criancas'] },
          { a: 'quinta-caranguejo', p: 'noite', h: '19:00', q: ['casal'], n: 'Noite do Tiago e da Elisa' },
        ],
      },
      {
        nome: 'Praia do Futuro + noite do casal', resumo: 'Dia de barraca para todos e, à noite, Tiago e Elisa saem enquanto os avós ficam com Luna e Leo.',
        itens: [
          { a: 'praia-futuro', p: 'manha', h: '09:00', q: ['todos'] },
          { a: 'descanso', p: 'tarde', h: '15:00', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['idosos', 'criancas'] },
          { a: 'quinta-caranguejo', p: 'noite', h: '19:00', q: ['casal'] },
        ],
      },
      {
        nome: 'Beira-Mar e pôr do sol', resumo: 'Manhã no resort; tarde no Dragão do Mar, pôr do sol na Ponte dos Ingleses e feirinha à noite.',
        itens: [
          { a: 'resort-piscinas', p: 'manha', h: '08:30', q: ['todos'] },
          { a: 'dragao-do-mar', p: 'tarde', h: '15:00', q: ['todos'] },
          { a: 'beira-mar', p: 'noite', h: '18:00', q: ['todos'] },
          { a: 'comida-regional', p: 'noite', h: '20:00', q: ['todos'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-16', titulo: 'Dunas e lagoas',
    avisos: ['Sexta é mais vazia que o fim de semana nos passeios.', 'O Beach Park volta a abrir.'],
    planos: [
      {
        nome: 'Cumbuco + Lagoa do Banana', resumo: 'Buggy para os radicais, mesa dentro da lagoa para os demais.',
        itens: [
          { a: 'cumbuco', p: 'manha', h: '07:30', q: ['todos'], n: 'Buggy: Tiago, Elisa e Luna (+ avós dispostos, "sem emoção"). O Leo fica na barraca da lagoa.' },
          { a: 'descanso', p: 'tarde', h: '16:30', q: ['todos'] },
          { a: 'jantar-resort', p: 'noite', h: '19:30', q: ['todos'] },
        ],
      },
      {
        nome: 'Arvorar + Beach Park', resumo: 'Aves e arvorismo de manhã; à tarde, o 2º dia de parque para quem quiser.',
        itens: [
          { a: 'arvorar', p: 'manha', h: '09:00', q: ['todos'] },
          { a: 'bp-aquapark', p: 'tarde', h: '13:00', q: ['casal', 'p6'] },
          { a: 'resort-piscinas', p: 'tarde', h: '14:00', q: ['idosos', 'p7'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
      {
        nome: 'Casal em Lagoinha', resumo: 'Praia de cartão-postal para Tiago e Elisa; os avós ficam com Luna e Leo no resort, e a Luna vai ao Kids Club.',
        itens: [
          { a: 'lagoinha', p: 'manha', h: '07:00', q: ['casal'] },
          { a: 'resort-piscinas', p: 'manha', h: '09:00', q: ['idosos', 'criancas'] },
          { a: 'kids-club', p: 'tarde', h: '14:00', q: ['p6'] },
          { a: 'jantar-resort', p: 'noite', h: '19:00', q: ['todos'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-17', titulo: 'Último dia cheio e despedida',
    avisos: ['Sábado: os passeios e o parque ficam mais cheios.', 'Jantar de despedida: reserve.'],
    planos: [
      {
        nome: 'Arvorar, parque e jantar de despedida', resumo: 'Aves pela manhã, último parque para os radicais e jantar especial em família.',
        itens: [
          { a: 'arvorar', p: 'manha', h: '09:00', q: ['todos'] },
          { a: 'bp-aquapark', p: 'tarde', h: '13:00', q: ['casal', 'p6'], n: 'Alter e Arcenia podem ir junto, se estiverem dispostos' },
          { a: 'resort-piscinas', p: 'tarde', h: '14:00', q: ['idosos', 'p7'] },
          { a: 'jantar-especial', p: 'noite', h: '19:00', q: ['todos'], n: 'Despedida' },
        ],
      },
      {
        nome: 'Iguape e pôr do sol nas dunas', resumo: 'Manhã de resort; à tarde, as dunas do Iguape e a Lagoa do Catu, perto de casa.',
        itens: [
          { a: 'resort-piscinas', p: 'manha', h: '08:30', q: ['todos'] },
          { a: 'iguape', p: 'tarde', h: '15:00', q: ['todos'] },
          { a: 'jantar-especial', p: 'noite', h: '19:30', q: ['todos'] },
        ],
      },
      {
        nome: 'Noite em Fortaleza', resumo: 'Dia de resort e noite na Beira-Mar com feirinha e jantar regional (e show de humor para quem quiser).',
        itens: [
          { a: 'resort-piscinas', p: 'manha', h: '08:30', q: ['todos'] },
          { a: 'descanso', p: 'tarde', h: '13:30', q: ['todos'] },
          { a: 'beira-mar', p: 'tarde', h: '16:30', q: ['todos'] },
          { a: 'comida-regional', p: 'noite', h: '19:00', q: ['todos'] },
          { a: 'show-humor', p: 'noite', h: '21:00', q: ['casal', 'p3', 'p4'] },
        ],
      },
    ],
  },
  {
    data: '2026-10-18', titulo: 'Volta para casa',
    avisos: ['Voo às 16h10: chegar ao aeroporto até ~14h10.', 'Saída do resort ~13h. Confirme o horário de check-out.'],
    planos: [
      {
        nome: 'Manhã de praia e volta', resumo: 'Último banho de mar cedinho, malas, almoço no resort e transfer.',
        itens: [
          { a: 'praia-porto-dunas', p: 'manha', h: '07:30', q: ['todos'] },
          { a: 'checkout', p: 'manha', h: '11:00', q: ['todos'], n: 'Almoço leve no resort' },
          { a: 'transfer-volta', p: 'tarde', h: '13:00', q: ['todos'] },
          { a: 'voo-volta', p: 'tarde', h: '16:10', q: ['todos'] },
        ],
      },
      {
        nome: 'Almoço e compras no caminho', resumo: 'Sai mais cedo, almoça no shopping perto do aeroporto e faz as últimas compras.',
        itens: [
          { a: 'praia-porto-dunas', p: 'manha', h: '07:30', q: ['todos'] },
          { a: 'checkout', p: 'manha', h: '10:00', q: ['todos'] },
          { a: 'shopping', p: 'tarde', h: '12:00', q: ['todos'], n: 'Almoço + últimas castanhas' },
          { a: 'transfer-volta', p: 'tarde', h: '13:45', q: ['todos'], n: 'Do shopping ao aeroporto ~15–20 min' },
          { a: 'voo-volta', p: 'tarde', h: '16:10', q: ['todos'] },
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------
   Checklists e dicas
   --------------------------------------------------------- */
const CHECKLISTS = [
  {
    id: 'reservas', titulo: 'Reservas e confirmações',
    itens: [
      ['bp-calendario', 'Conferir o calendário de funcionamento do Beach Park (11–18/out)'],
      ['bp-ingressos', 'Comprar os ingressos do Aqua Park online (ver categoria de idoso, criança e bebê)'],
      ['bp-altura', 'Conferir a altura mínima dos toboáguas para a criança'],
      ['transfer', 'Reservar o transfer aeroporto ↔ resort (van para 7 + cadeirinha)'],
      ['transporte', 'Decidir o transporte: carro/van alugado × agência × van privativa'],
      ['agencia', 'Reservar os bate-voltas (2–3 dias antes)'],
      ['kids', 'Perguntar a programação do Kids Club no check-in'],
      ['pacote', 'Conferir o que o pacote do resort inclui (jantar? almoço?)'],
      ['checkout', 'Confirmar o check-out e a guarda de malas no dia 18'],
      ['jantar', 'Reservar o jantar de despedida'],
      ['arvorar', 'Conferir os dias e horários do Arvorar'],
    ],
  },
  {
    id: 'docs', titulo: 'Documentos',
    itens: [
      ['rg', 'RG/CNH de todos os adultos e idosos'],
      ['certidao', 'Documento das crianças para o embarque (RG ou certidão de nascimento)'],
      ['plano', 'Carteirinhas do plano de saúde'],
      ['receitas', 'Receitas dos remédios de uso contínuo dos avós'],
      ['vacina', 'Caderneta de vacinação do bebê'],
    ],
  },
  {
    id: 'mala', titulo: 'Mala de praia e sol',
    itens: [
      ['protetor', 'Protetor FPS 50+ (adulto e infantil): o índice UV é extremo'],
      ['uv', 'Camisetas UV (principalmente para o bebê e os avós)'],
      ['chapeu', 'Chapéus, bonés e óculos de sol'],
      ['repelente', 'Repelente infantil'],
      ['fralda-piscina', 'Fraldas de piscina'],
      ['chinelo', 'Chinelos antiderrapantes / papetes'],
      ['estanque', 'Bolsa estanque para o celular'],
      ['garrafas', 'Garrafinhas de água'],
      ['casaco', 'Casaquinho leve (vento à noite e ar-condicionado)'],
      ['remedios', 'Kit de remédios (febre, enjoo, alergia, curativos)'],
    ],
  },
  {
    id: 'bebe', titulo: 'Bebê (Leo, 1 ano e meio)',
    itens: [
      ['carrinho', 'Carrinho leve/guarda-chuva'],
      ['sling', 'Sling ou canguru (para areia, dunas e labirinto)'],
      ['cadeirinha', 'Cadeirinha de carro (levar ou pedir no transfer)'],
      ['boia', 'Boia/colete adequado à idade'],
      ['lanches', 'Lanchinhos e potes'],
      ['termometro', 'Termômetro e soro fisiológico'],
    ],
  },
];

const DICAS = [
  {
    titulo: 'Clima em outubro',
    texto: 'Época seca, sol quase todos os dias, 27–31°C e muito vento, ótimo para kite. O sol nasce por volta das 5h20 e se põe por volta das 17h30, então os passeios rendem mais cedo. Evite sol forte no bebê e nos avós entre 10h e 15h.',
  },
  {
    titulo: 'Como dividir o grupo',
    texto: 'Um bom padrão é: radicais (Tiago, Elisa, Luna e, quando quiserem, Alter e Arcenia) no buggy, nos toboáguas e nos passeios longos; ritmo leve (Lizete e o Leo, com quem mais quiser ficar) na barraca, na piscina e na soneca. Em Ajustes, marque "ritmo leve" em quem prefere passeios tranquilos e o app avisa quando algo for puxado. O Kids Club (8–12 anos) recebe a Luna e libera o Tiago e a Elisa para uma tarde a dois.',
  },
  {
    titulo: 'Transporte: comparativo',
    texto: 'Carro alugado: com 7 pessoas e bebê precisa de uma minivan de 7 lugares (aperta com bagagem) ou de 2 carros. Dá liberdade, mas alguém dirige em todos os passeios. Agência (excursão): é o mais barato por pessoa e muitas buscam no Beach Park, mas tem horário fixo e paradas em lojas. Van privativa com motorista: no Ceará é bastante comum para grupos (R$ 600–1.000 por dia, conforme o destino). Vocês fazem o horário, cabe todo mundo e ninguém dirige. Uber: bom para Fortaleza, Prainha e Arvorar, mas precisa de 2 carros e a volta dos bate-voltas é difícil.',
  },
  {
    titulo: 'Buggy com bebê e idosos',
    texto: 'Bebê (o Leo) não deve andar de buggy nas dunas, porque não há cadeirinha nem cinto adequado. Avós: peçam o passeio "sem emoção". Use sempre bugueiro credenciado e feche o roteiro e o preço antes de sair.',
  },
  {
    titulo: 'Marés',
    texto: 'As piscinas naturais de Flecheiras, as grutas da Praia das Fontes e Águas Belas ficam melhores na maré baixa. Confira a tábua de marés de Fortaleza antes de marcar.',
    link: ['Tábua de marés', 'https://tabuademares.com/br/ceara/fortaleza'],
  },
  {
    titulo: 'O que provar',
    texto: 'Caranguejo (quinta à noite!), baião de dois, carne de sol com macaxeira, paçoca de pilão, peixe frito, tapioca, cuscuz, cajuína, água de coco, sorvetes de cajá, graviola e tapioca, e castanha de caju para levar.',
  },
  {
    titulo: 'Compras',
    texto: 'Castanhas, cachaça, redes e rendas no Mercado Central (pechinche). Renda de bilro direto das rendeiras na Prainha. Garrafinhas de areia colorida em Morro Branco. Artesanato na feirinha da Beira-Mar.',
  },
];

const LINKS = [
  ['Beach Park (site oficial)', 'https://beachpark.com.br'],
  ['Ingressos Beach Park', 'https://ingresso.beachpark.com.br'],
  ['Tábua de marés · Fortaleza', 'https://tabuademares.com/br/ceara/fortaleza'],
  ['Previsão do tempo · Aquiraz', 'https://www.windy.com/-3.835/-38.389'],
];

const CONTATOS = [
  ['SAMU', '192'],
  ['Bombeiros', '193'],
  ['Polícia Militar', '190'],
  ['Disque Denúncia', '181'],
];

/* ---------------------------------------------------------
   "Saber mais": duração estimada (min), Wikipédia, site e
   seções detalhadas de cada passeio.
   --------------------------------------------------------- */
const SAIBA_MAIS = {
  'bp-aquapark': {
    dur: 360, wiki: 'Beach Park', site: 'https://beachpark.com.br',
    secoes: [
      { t: 'Radicais (Tiago, Elisa e talvez a Luna)', itens: [
        ['Insano', 'O símbolo do parque: 41 m de altura (um prédio de 14 andares), descida de ~5 segundos a até ~105 km/h. Altura mínima de 1,40 m.'],
        ['Surreal', 'Montanha-russa aquática reconhecida pelo Guinness, a novidade mais recente do parque.'],
        ['Vaikuntudo', 'Toboágua tipo "tornado" de 25 m de altura, com boia para até 4 pessoas (~43 km/h). Ótimo para ir em família.'],
        ['Arrepius', 'Torre de 25 m com 5 toboáguas de níveis diferentes (até ~60 km/h), alguns com efeito de queda livre.'],
        ['Kalafrio', 'Rampa estilo half-pipe de 11 m, em boia dupla: sobe quase na vertical e volta.'],
      ] },
      { t: 'Moderados (Luna, Alter e Arcenia)', itens: [
        ['Atlantis', 'Torre de 17,5 m, boia para até 4 pessoas, ~34 km/h.'],
        ['Ramubrinká', 'Torre de 24 m com 7 toboáguas variados.'],
        ['Tobomusik', 'Toboágua de 13 m com música e efeitos de luz.'],
        ['Hupa & Hopa', 'Dois toboáguas de 7,5 m que caem numa piscina.'],
      ] },
      { t: 'Para toda a família e para o Leo', itens: [
        ['Maremoto', 'Piscina de ondas com 3 milhões de litros (até 1,80 m de profundidade), como uma praia de água doce.'],
        ['Correnteza (rio lento)', 'Passeio de boia levado pela correnteza. Perfeito para a Lizete, os avós e o Leo no colo.'],
        ['Acqua Show', 'Brinquedão com 78 jatos e escorregas e um baldão que vira mais de 1.800 litros de água.'],
        ['Acqua Circo e Arca de Noé', 'Áreas infantis rasas com escorregadores pequenos (crianças até 1,30–1,50 m). Ideal para o Leo, com um adulto junto.'],
        ['Ilha do Tesouro', 'Área temática de piratas com canhões d\'água e escorregador em espiral.'],
      ] },
      { t: 'Bom saber', texto: 'Na baixa temporada o parque costuma abrir de sexta a terça e fechar às quartas e quintas, mas abre nos feriados. Funciona das 11h às 17h. A lista de atrações pode mudar e algumas fecham para manutenção: confira no site. Leve fralda de piscina para o Leo.' },
    ],
  },
  'resort-piscinas': {
    dur: 180,
    secoes: [
      { t: 'O que tem no resort', itens: [
        ['Piscina de borda infinita', 'De frente para o mar, a mais bonita para fotos.'],
        ['Acqualink', 'Um rio que corta o resort e leva até a entrada do parque. Dá para ir de boia!'],
        ['Bar molhado (Toaçu)', 'Bar dentro da piscina.'],
        ['Playground e salão de jogos', 'Pebolim, sinuca e pingue-pongue para a Luna e os avós.'],
        ['Kids Club', 'Recreação monitorada para a Luna (turma Radical, 8 a 12 anos).'],
      ] },
      { t: 'Com o Leo', texto: 'Procure as áreas rasas e com sombra. Evite o sol forte entre 10h e 15h e reaplique o protetor a cada saída da água.' },
    ],
  },
  'kids-club': { dur: 120, secoes: [{ t: 'Como funciona', texto: 'Duas turmas: Kid\'s (4 a 7 anos) e Radical (8 a 12 anos). A Luna entra na Radical. A programação muda a cada dia (gincanas, oficinas, atividades na piscina); pergunte na recepção no check-in.' }] },
  'praia-porto-dunas': { dur: 120, wiki: 'Praia de Porto das Dunas', secoes: [{ t: 'Como é', texto: 'Praia urbana de casas de veraneio e resorts, com faixa de areia larga e plana, boa para caminhar. O mar tem ondas moderadas: fique onde dá pé e respeite as bandeiras. Em outubro venta mais à tarde, então de manhã cedo é o melhor horário.' }] },
  'vila-azul': { dur: 90, secoes: [{ t: 'O que tem', texto: 'Espaço do complexo Beach Park à beira-mar, com lojas, sorveteria, restaurantes e atrações. É bom para ver o fim de tarde sem pegar carro.' }] },
  'arvorar': {
    dur: 150, site: 'https://beachpark.com.br',
    secoes: [
      { t: 'O que tem', itens: [
        ['Aviários de imersão', 'São três grandes viveiros (3 mil m² ao todo) com cerca de 250 aves soltas. Você caminha entre elas.'],
        ['Répteis e pequenos mamíferos', 'Animais da fauna brasileira, apresentados por educadores ambientais.'],
        ['Arvorismo', 'Circuito nas árvores para a Luna e os adultos.'],
      ] },
      { t: 'Para a família', texto: 'É um dos raros programas que agradam ao Leo, à Luna e aos avós ao mesmo tempo. O percurso é guiado e sem grandes esforços. Fica na Vila Terra Brasilis, a ~20 min do resort.' },
    ],
  },
  'jantar-resort': { dur: 90 },
  'jantar-especial': { dur: 120 },
  'prainha-rendeiras': {
    dur: 150, wiki: 'Prainha (Aquiraz)',
    secoes: [
      { t: 'O que fazer', itens: [
        ['Centro das Rendeiras', 'Artesãs fazem renda de bilro ao vivo, com o barulhinho dos bilros batendo. Toalhas, roupas, caminhos de mesa e lembrancinhas.'],
        ['Praia', 'Praia de pescadores com jangadas na areia e barracas simples para um peixe frito.'],
      ] },
      { t: 'Para os avós', texto: 'É curto, plano e cheio de tradição. Costuma ser um dos passeios preferidos de quem gosta de artesanato.' },
    ],
  },
  'iguape': {
    dur: 180, wiki: 'Praia do Iguape',
    secoes: [{ t: 'O que fazer', itens: [
      ['Dunas', 'Dunas altas coladas no mar. Dá para descer de skibunda (prancha) e ver o pôr do sol lá de cima.'],
      ['Rendeiras do Iguape', 'O Iguape também tem um centro de rendeiras.'],
      ['Lagoa do Catu', 'Lagoa ali perto, com barracas na beira d\'água, boa para almoçar com calma.'],
    ] }],
  },
  'aquiraz-historico': {
    dur: 90, wiki: 'Igreja Matriz de São José de Ribamar',
    secoes: [{ t: 'O que ver', itens: [
      ['Igreja Matriz de São José de Ribamar', 'Igreja do período colonial, símbolo de Aquiraz, a primeira capital do Ceará.'],
      ['Museu Sacro', 'Imagens e peças de arte sacra ao lado da matriz.'],
      ['Casario', 'Ruas com casas antigas no entorno da praça.'],
    ] }],
  },
  'aguas-belas': {
    dur: 300, wiki: 'Cascavel (Ceará)',
    secoes: [{ t: 'O que fazer', itens: [
      ['Encontro do rio com o mar', 'O rio Malcozinhado chega ao mar formando águas calmas e mornas. Muito bom para o Leo e para os avós.'],
      ['Passeio de barco', 'Barquinhos sobem o rio pelo mangue.'],
      ['Caiaque e stand-up', 'Na parte calma do rio.'],
      ['Barracas', 'Almoço pé na areia, com peixe e camarão.'],
    ] }],
  },
  'morro-branco': {
    dur: 480, wiki: 'Praia de Morro Branco',
    secoes: [{ t: 'O que fazer', itens: [
      ['Labirinto das Falésias', 'Caminho entre falésias de areia em até dezenas de tons, com guias locais. Tem trechos de areia e degraus.'],
      ['Garrafinhas de areia colorida', 'Artesãos desenham paisagens com a areia colorida das falésias dentro de garrafas, ao vivo. É a lembrancinha clássica.'],
      ['Praia das Fontes', 'Ao lado, com bicas de água doce saindo das falésias, grutas (melhor na maré baixa) e barracas para almoçar.'],
      ['Buggy (opcional)', 'Passeio até a Lagoa do Uruaú e as dunas da região.'],
    ] }, { t: 'Como dividir', texto: 'Tiago, Elisa, Luna, Alter e Arcenia fazem o labirinto. Lizete e o Leo esperam na barraca com sombra na Praia das Fontes.' }],
  },
  'cumbuco': {
    dur: 480, wiki: 'Lagoa do Banana',
    secoes: [{ t: 'O que fazer', itens: [
      ['Buggy nas dunas', 'Escolha "com emoção" (subidas e descidas radicais) ou "sem emoção" (paisagem). Cabe até 4 pessoas por buggy.'],
      ['Lagoa do Banana', 'Barracas põem mesas e cadeiras dentro da água rasa. É o ponto de encontro de quem não for de buggy.'],
      ['Aerobunda e skibunda', 'Tirolesa que termina com um mergulho na lagoa, e descida de prancha na duna. A Luna vai adorar.'],
      ['Jangada', 'Passeio curto de jangada na praia do Cumbuco.'],
      ['Kitesurf', 'Outubro tem muito vento: dá para ver dezenas de kites no céu (e fazer aula experimental).'],
    ] }, { t: 'Como dividir', texto: 'Buggy: Tiago, Elisa, Luna (e Alter e Arcenia se toparem, "sem emoção"). Lizete e o Leo ficam na Lagoa do Banana, e todos almoçam juntos lá.' }],
  },
  'canoa-quebrada': {
    dur: 660, wiki: 'Canoa Quebrada',
    secoes: [{ t: 'O que fazer', itens: [
      ['Mirante da lua e estrela', 'O símbolo de Canoa, entalhado na falésia vermelha.'],
      ['Broadway', 'A rua principal, cheia de restaurantes, bares e lojinhas.'],
      ['Buggy pelas falésias', 'Passeio pelas dunas e falésias, até praias vizinhas como Majorlândia.'],
      ['Parapente', 'Voo duplo com instrutor sobre as falésias.'],
      ['Jangada', 'Passeio de jangada no mar.'],
    ] }],
  },
  'lagoinha': { dur: 540, wiki: 'Paraipaba', secoes: [{ t: 'O que fazer', itens: [['Mirante da enseada', 'Vista da praia em meia-lua com coqueiral.'], ['Praia', 'Mar verde, barracas no coqueiral.'], ['Dunas e lagoa', 'Passeio de buggy até a lagoa nas dunas.']] }] },
  'flecheiras': { dur: 540, wiki: 'Trairi', secoes: [{ t: 'O que fazer', itens: [['Piscinas naturais', 'Na maré baixa, poças entre os arrecifes com peixinhos. Leve sapatilha.'], ['Vila', 'Vila de pescadores tranquila, boa para almoçar peixe fresco.']] }] },
  'jericoacoara': {
    dur: 1440, wiki: 'Parque Nacional de Jericoacoara',
    secoes: [{ t: 'O que fazer', itens: [
      ['Duna do Pôr do Sol', 'O ritual da vila: todo mundo sobe a duna para ver o sol se pôr no mar.'],
      ['Pedra Furada', 'Formação rochosa símbolo de Jeri, acessível a pé na maré baixa.'],
      ['Lagoa do Paraíso e Lagoa Azul', 'Lagoas de água cristalina com redes dentro da água.'],
      ['Árvore da Preguiça', 'Árvore moldada pelo vento, parada clássica do passeio de buggy.'],
    ] }, { t: 'Logística', texto: 'São ~300 km. As agências vão de van até Jijoca e fazem o trecho final em jardineira 4x4 pela areia. Só faz sentido com uma noite lá, como uma escapada do Tiago e da Elisa.' }],
  },
  'guaramiranga': {
    dur: 600, wiki: 'Guaramiranga',
    secoes: [{ t: 'O que fazer', itens: [
      ['Pico Alto', 'Mirante no alto do Maciço de Baturité, com vista para o sertão.'],
      ['Cafés e docerias', 'A serra produz café e tem cafeterias charmosas.'],
      ['Mosteiro dos Jesuítas', 'Em Baturité: construção histórica com vista.'],
    ] }, { t: 'Clima', texto: 'A serra fica a ~865 m e é bem mais fresca que o litoral (18–25°C). Leve um casaco.' }],
  },
  'mercado-central': {
    dur: 120, wiki: 'Mercado Central de Fortaleza',
    secoes: [{ t: 'O que comprar', itens: [
      ['Castanha de caju', 'Torrada, com sal, caramelizada. Compare os preços entre as lojas.'],
      ['Doces', 'Doce de caju, rapadura e cocada.'],
      ['Redes e rendas', 'Redes de dormir, toalhas e roupas de renda.'],
      ['Cachaça e licores', 'De cajá, de caju e artesanais.'],
    ] }, { t: 'Dica', texto: 'São quatro andares com elevador. Pechinche, principalmente se for comprar várias peças. Do outro lado da rua fica a Catedral.' }],
  },
  'centro-historico': {
    dur: 90, wiki: 'Theatro José de Alencar',
    secoes: [{ t: 'O que ver', itens: [
      ['Catedral Metropolitana', 'Grande igreja de estilo neogótico, em frente ao Mercado Central.'],
      ['Theatro José de Alencar', 'Teatro de 1910 com estrutura de ferro trazida da Escócia e jardins de Burle Marx. Tem visitas guiadas.'],
      ['Passeio Público', 'A praça mais antiga de Fortaleza, com árvores centenárias e vista para o mar.'],
    ] }],
  },
  'praia-futuro': {
    dur: 240, wiki: 'Praia do Futuro',
    secoes: [{ t: 'Como são as barracas', texto: 'São verdadeiros clubes de praia: cadeiras e guarda-sol, piscinas, parquinho, banheiros, ducha e cardápio enorme. Para a família, escolha uma barraca grande com parquinho, como a Crocobeach.' }, { t: 'O que pedir', itens: [['Caranguejo', 'Na tábua, com martelinho.'], ['Peixe frito', 'Com baião e macaxeira.'], ['Camarão', 'Ao alho e óleo ou empanado.'], ['Tapioca e água de coco', 'Para a sobremesa e para refrescar.']] }],
  },
  'quinta-caranguejo': { dur: 150, wiki: 'Praia do Futuro', secoes: [{ t: 'A tradição', texto: 'Toda quinta à noite as barracas da Praia do Futuro lotam para comer caranguejo com música ao vivo e forró. O caranguejo vem inteiro com um martelinho de madeira. Peça babador! É um programa animado e vai até tarde.' }] },
  'beira-mar': {
    dur: 120, wiki: 'Ponte dos Ingleses',
    secoes: [{ t: 'O que fazer', itens: [
      ['Calçadão', 'Passeio plano à beira-mar, bom para carrinho e para os avós.'],
      ['Feirinha da Beira-Mar', 'Feira de artesanato à noite: rendas, roupas, castanhas e lembrancinhas.'],
      ['Mercado dos Peixes (Mucuripe)', 'Os jangadeiros chegam com o peixe; você escolhe e eles preparam na hora.'],
      ['Sorvete regional', 'Sabores de cajá, graviola, tapioca e milho nas sorveterias da orla.'],
    ] }],
  },
  'dragao-do-mar': {
    dur: 150, wiki: 'Centro Dragão do Mar de Arte e Cultura',
    secoes: [{ t: 'O que fazer', itens: [
      ['Museus', 'Museu de Arte Contemporânea e Memorial da Cultura Cearense.'],
      ['Planetário', 'Sessões para crianças; a Luna vai gostar.'],
      ['Ponte dos Ingleses', 'Píer antigo na Praia de Iracema, o point do pôr do sol.'],
      ['Bares e restaurantes', 'No casario restaurado em volta, animado à noite.'],
    ] }],
  },
  'passeio-barco': { dur: 120, secoes: [{ t: 'Como é', texto: 'Barcos e escunas saem da orla para 1h30–2h pela enseada do Mucuripe, com música, vista da cidade e o pôr do sol. Pode balançar: leve remédio para enjoo e confirme se aceitam bebê.' }] },
  'parque-coco': { dur: 90, wiki: 'Parque Estadual do Cocó', secoes: [{ t: 'Como é', texto: 'É o maior parque natural em área urbana do Norte e Nordeste: mangue, trilhas, passarelas e parquinho. Vá cedo, por causa do calor.' }] },
  'show-humor': { dur: 120, secoes: [{ t: 'Como é', texto: 'Fortaleza tem tradição forte de humoristas. Veja a programação da semana e a classificação etária antes de levar a Luna.' }] },
  'shopping': { dur: 90 },
  'tapioqueiras': { dur: 45, secoes: [{ t: 'O que pedir', itens: [['Tapioca de carne de sol com queijo coalho', 'O clássico.'], ['Tapioca de coco com leite condensado', 'A doce mais pedida.'], ['Cuscuz e café', 'Bom café da manhã regional.'], ['Sucos', 'Cajá, graviola, caju, acerola.']] }] },
  'coco-bambu': { dur: 90, site: 'https://www.cocobambu.com' },
  'comida-regional': { dur: 90, wiki: 'Baião de dois', secoes: [{ t: 'Pratos para provar', itens: [['Baião de dois', 'Arroz com feijão-verde e queijo coalho.'], ['Carne de sol com macaxeira', 'Com manteiga de garrafa.'], ['Paçoca de pilão', 'Carne de sol pilada com farinha.'], ['Cajuína', 'Bebida de caju clarificado, criada no Ceará.']] }] },
  'voo-ida': { dur: 195 },
  'voo-volta': { dur: 180 },
  'transfer-chegada': { dur: 60, wiki: 'Aeroporto Internacional de Fortaleza' },
  'mercado-bebe': { dur: 40 },
  'descanso': { dur: 120 },
  'checkout': { dur: 90 },
  'transfer-volta': { dur: 60, wiki: 'Aeroporto Internacional de Fortaleza' },
};
ATIVIDADES.forEach((a) => Object.assign(a, SAIBA_MAIS[a.id] || {}));
