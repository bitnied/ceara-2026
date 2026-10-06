# Ceará 2026 · Roteiro da família

Web app (HTML, CSS e JavaScript puros, sem build) com o roteiro da viagem ao Ceará de **11 a 18 de outubro de 2026**, hospedados no **Beach Park Acqua Resort** (Porto das Dunas, Aquiraz).

- **Site publicado:** _ver seção [Publicação](#publicação-github-pages)_
- **Funciona no celular** e pode ser adicionado à tela inicial (PWA). Depois do primeiro acesso, funciona offline.

---

## A viagem

| | |
|---|---|
| Datas | Domingo 11/10 a domingo 18/10/2026 (7 noites) |
| Hospedagem | Beach Park Acqua Resort |
| Voo de ida | Saída às 9h15. O pouso foi estimado em 12h30 e é ajustável no app |
| Voo de volta | 16h10 (chegar ao aeroporto até 14h10) |
| Transporte | Ainda não decidido. O app mostra carro, agência e Uber em cada passeio |

**Grupo (7 pessoas):**

| Pessoa | Sigla | Perfil no app |
|---|---|---|
| Tiago | T | adulto (40) |
| Elisa | E | adulta (40) |
| Alter | Al | idoso (60+), casal com a Arcenia |
| Arcenia | Ar | idosa (60+) |
| Lizete | Li | idosa (60+), marcada como "ritmo leve" |
| Luna | Lu | criança, 9 anos |
| Leo | Le | bebê, 1 ano e meio |

**Datas e premissas que guiaram o roteiro:**
- **12/10 é feriado** (N. Sra. Aparecida e Dia das Crianças): o Beach Park lota. O roteiro sugerido deixa o parque para **terça 13**.
- Na baixa temporada o **Beach Park costuma abrir de sexta a terça e fechar às quartas e quintas** (abre nos feriados). Por isso os passeios ficaram na quarta (litoral leste) e na quinta (Fortaleza). **Confirmar no calendário oficial.**
- **Quinta à noite é dia de caranguejo** na Praia do Futuro.
- Outubro: seco, 27–31°C, muito vento, pôr do sol por volta das 17h30.
- Preços e horários são **estimativas** (pesquisa de outubro/2026). Confirme antes de reservar.

## Roteiro sugerido (plano padrão de cada dia)

| Dia | Plano padrão | Alternativas no app |
|---|---|---|
| Dom 11 | Voo, transfer, mercado para os itens do bebê, piscina, Vila Azul | Parada nas tapioqueiras |
| Seg 12 (feriado) | Praia e piscina, soneca, Kids Club para a Luna, Prainha/rendeiras | Dia 100% resort; Beach Park mesmo com o feriado |
| Ter 13 | **Beach Park** (radicais × rio lento; soneca do Leo no quarto) | Só Tiago, Elisa e Luna no parque |
| Qua 14 | Morro Branco + Praia das Fontes | Águas Belas (leve); Tiago e Elisa em Canoa Quebrada |
| Qui 15 | Mercado Central e Centro, Praia do Futuro, caranguejo do casal | Barraca + noite do casal; Beira-Mar e pôr do sol |
| Sex 16 | Cumbuco + Lagoa do Banana | Arvorar + Beach Park; Tiago e Elisa em Lagoinha |
| Sáb 17 | Arvorar, 2º dia de parque, jantar de despedida | Iguape; noite em Fortaleza |
| Dom 18 | Praia cedo, check-out, transfer às 13h, voo às 16h10 | Almoço no shopping perto do aeroporto |

## Como usar o app

- **Dia a dia:** a timeline de cada dia por manhã, tarde e noite.
  - **Faixa de pessoas** em cada programa ("Todos (7)", "Lizete e Leo"): ao tocar, abre **Opções para o grupo**, com sugestões que combinam com aquelas pessoas, o "Saber mais" de cada uma e o botão "Escolher". Desmarcar pessoas e escolher outro programa **divide o grupo** (os dois programas acontecem no mesmo horário).
  - **Grupo dividido:** programas simultâneos aparecem juntos. O app avisa se alguém estiver em dois lugares.
  - **Continua:** programas longos (como o Beach Park, das 11h às 17h) também aparecem no período seguinte.
  - **Sem programa:** mostra quem ficou livre no período, com atalho para ver opções.
  - **Lápis:** edita horário, pessoas, dia e observação. Ao mudar o horário, oferece **mover junto os próximos programas** daquelas pessoas.
  - **✓:** marca como feito (para usar durante a viagem).
  - **Pouso / Voo de volta** (topo dos dias 11 e 18): ao mudar o horário, o dia inteiro se ajusta.
  - **Plano do dia:** troca por um dos planos prontos (2–3 por dia).
- **Semana:** visão geral editável. Tocar num programa edita; "+ Adicionar" em cada período; "Planos" troca o plano do dia; o filtro por pessoa mostra a semana de cada um.
- **Explorar:** 39 passeios e programas com fotos, filtros (bom para o Leo, para os idosos, para a Luna, ritmo leve, até 30 km) e **Saber mais** (galeria de fotos, atrações detalhadas, "Para a família", como ir, links para mapa, site, Wikipédia, fotos, vídeos e Google).
- **Preparar:** checklists (reservas, documentos, mala, bebê) e dicas.
- **Ícone de pessoas (topo):** nomes, siglas, "ritmo leve", horários dos voos, compartilhar e restaurar.
- **Desfazer:** toda mudança pode ser desfeita pelo aviso que aparece embaixo.

### Onde ficam os dados (importante)

- O roteiro editado fica salvo **no navegador de cada aparelho** (localStorage). Não há servidor nem sincronização automática.
- Para passar o roteiro para outra pessoa ou aparelho, use **Compartilhar**:
  - **Gerar link:** o roteiro vai compactado dentro do link (`#r=...`). Quem abre escolhe se quer substituir o roteiro dele.
  - **Baixar arquivo / Abrir arquivo:** um `.json` com o roteiro.
- Cada aparelho mantém a sua versão. Depois de mexer, gere um novo link para atualizar os outros.

## Estrutura dos arquivos

```
index.html            página única (abas, folha de detalhes, toast)
css/styles.css        visual: tokens de cor (claro/escuro), mobile first
js/icons.js           ícones SVG de traço (sem emojis)
js/data.js            TODO o conteúdo: viagem, pessoas, grupos, passeios,
                      planos de cada dia, "Saber mais", checklists, dicas
js/fotos.js           fotos do Wikimedia Commons por passeio (URL, página, autor)
js/app.js             lógica: estado, telas, folhas, compartilhamento
sw.js                 service worker (offline + cache das fotos)
manifest.webmanifest  PWA (adicionar à tela inicial)
icons/icon.svg        ícone do app
.nojekyll             faz o GitHub Pages servir os arquivos como estão
CLAUDE.md             contexto para continuar o projeto com o Claude Code
```

### Como editar o conteúdo (`js/data.js`)

- `PESSOAS_PADRAO`: nomes, siglas, tipo (`adulto`, `idoso`, `crianca`, `bebe`) e `leve`.
- `GRUPOS`: atalhos (Todos, Tiago e Elisa, Idosos, Luna e Leo).
- `ATIVIDADES`: cada passeio. Campos principais:
  - `id`, `nome`, `cat` (`complexo`, `praia`, `batevolta`, `fortaleza`, `gastronomia`, `logistica`);
  - `local`, `tempo`, `km`, `duracao`, `preco`;
  - `periodos`, `dias` (dias da semana em que funciona; 0 = domingo), `abreFeriado`, `intensidade`;
  - `publico: { bebe, idosos, crianca }`: 2 = ótimo, 1 = com ressalvas, 0 = não recomendado;
  - `publicoNota`, `resumo`, `descricao`, `destaques`, `dicas`, `transporte`, `maps`.
- `DIAS`: para cada data, `titulo`, `avisos` e `planos` (o primeiro é o padrão). Cada item do plano: `{ a: idAtividade, p: período, h: 'HH:MM', q: [grupos ou ids], n: 'observação' }`.
- `SAIBA_MAIS`: por id, `dur` (duração em minutos, usada para detectar programas simultâneos), `wiki` (título na Wikipédia em português), `site` e `secoes` (`{ t, texto }` ou `{ t, itens: [[nome, texto]] }`).
- `CHECKLISTS`, `DICAS`, `LINKS`, `CONTATOS`.

> Mudanças nos planos prontos só aparecem para quem tocar em "Voltar ao roteiro sugerido" (nas Ajustes) ou trocar o plano do dia. Isso acontece porque o roteiro editado de cada pessoa fica salvo no aparelho dela.

## Rodar localmente

```bash
cd ceara-2026
python3 -m http.server 8000
```

Abra http://localhost:8000. Abrindo o `index.html` direto (file://) tudo funciona, menos o link de compartilhamento e o modo offline.

## Publicação (GitHub Pages)

O site é servido pelo GitHub Pages a partir da branch `main`, pasta raiz (`/`).

**Para publicar uma atualização:**

1. Edite os arquivos.
2. Em `sw.js`, aumente a versão em `const CACHE = 'ceara2026-vN'`. Sem isso, os celulares continuam com a versão antiga em cache.
3. Envie para o GitHub:

```bash
git add -A
git commit -m "Descreva a mudança"
git push
```

O Pages atualiza em 1–2 minutos (veja em **Actions** no GitHub).

**Para continuar em outra máquina:**

```bash
git clone https://github.com/<usuario>/ceara-2026.git
cd ceara-2026
```

Para continuar com o Claude Code, abra a pasta e peça o que quiser: o arquivo `CLAUDE.md` traz todo o contexto.

**Privacidade:** o repositório e o site do GitHub Pages são **públicos**. Qualquer pessoa com o link vê os primeiros nomes, as datas e o hotel. O roteiro editado de cada um fica só no próprio aparelho.

## Créditos

- Fotos: [Wikimedia Commons](https://commons.wikimedia.org). Licenças livres, com autor e original no link de cada foto.
- Previsão do tempo: [Open-Meteo](https://open-meteo.com) (sem chave).
- Atrações do Beach Park: [Melhores Destinos](https://www.melhoresdestinos.com.br/beach-park-atracoes-brinquedos.html) e o site oficial do [Beach Park](https://beachpark.com.br).
- Fonte: Nunito (Google Fonts).

## Histórico

- **v1:** roteiro com 8 dias e planos alternativos, explorar passeios, checklists, compartilhamento por link ou arquivo, previsão do tempo, PWA.
- **v2:** nomes da família, sem emojis (ícones de traço e fotos), "Opções para o grupo" ao tocar nas pessoas, grupos divididos no mesmo horário, "Saber mais" com galeria e links, horário do voo que ajusta o dia, empurrar os próximos horários, Semana editável. Também corrigiu a camada invisível que bloqueava os toques no Safari.

### Ideias para depois

- Sincronizar o roteiro entre os celulares da família (ex.: Firebase ou Supabase).
- Estimativa de custos por dia.
- Duração editável por programa (hoje vem do passeio).
- Ajustar as observações dos planos quando o grupo é dividido.
