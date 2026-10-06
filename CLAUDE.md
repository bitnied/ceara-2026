# CLAUDE.md: contexto do projeto Ceará 2026

Web app estático (sem build, sem dependências) com o roteiro de férias da família no Ceará, de 11 a 18/10/2026, no Beach Park Acqua Resort. Publicado no GitHub Pages (branch `main`, raiz): site https://bitnied.github.io/ceara-2026/ · repositório público https://github.com/bitnied/ceara-2026 (conta `bitnied`). O usuário (Tiago) fala português: responda e escreva a interface em **português do Brasil**.

## Família (já configurada em `js/data.js` → `PESSOAS_PADRAO`)
Tiago (T) e Elisa (E), casal de 40 anos · Alter (Al) e Arcenia (Ar), casal 60+ · Lizete (Li), 60+, marcada como "ritmo leve" · Luna (Lu), 9 anos · Leo (Le), bebê de 1 ano e meio. Ids p1…p7, nessa ordem. Os idosos variam entre "bem dispostos" e "moderados".

## Decisões já tomadas (não reabrir sem motivo)
- O transporte ainda não foi decidido: cada passeio mostra carro, agência e Uber.
- O app salva no aparelho (localStorage) e compartilha por link `#r=` (JSON comprimido com deflate-raw e base64url) ou arquivo `.json`. Sem backend.
- Voo de ida às 9h15 (pouso estimado em 12h30, ajustável no dia 11). Volta às 16h10.
- Beach Park: na baixa temporada costuma fechar qua/qui e abrir nos feriados. 12/10 é feriado (lotado), por isso o parque ficou na terça 13.
- **Nada de emojis na interface**: o usuário reclamou. Use os ícones SVG de `js/icons.js` (`icon('nome')`), fotos e texto.
- Fotos: Wikimedia Commons, escolhidas à mão em `js/fotos.js`. Thumbs em `/960px-`; o app troca para 330/500 px. Não use fotos com copyright.

## Arquitetura (`js/app.js`)
- `state = { v:2, pessoas, voo:{pouso, volta}, dias:{ 'AAAA-MM-DD': { plano, editado, nota, itens:[{id, a, p, h, q, n, f}] } }, custom, check, favs }`. `a` = id da atividade, `p` = período (derivado de `h` quando há horário), `q` = ids das pessoas, `f` = feito.
- Período pelo horário: antes de 12h é manhã, de 12h a 18h é tarde, depois disso é noite. `dur` (minutos, em `SAIBA_MAIS`) define o fim. `blocos()` agrupa itens sobrepostos do mesmo período ("grupo dividido"). `continuacoes()` mostra os que atravessam períodos.
- Folhas (sheets) com pilha: `mostrar(fn, ...args)` empilha quando uma folha já está aberta, `substituir` troca a do topo, `voltarSheet` volta. `ctxSheet` guarda o contexto (`tipo`: planejar, saber, item, alternativas, ajustes…).
- `escolherPrograma(ctx, actId)`: se as pessoas são as mesmas, troca o programa. Se é um subconjunto, divide o grupo (cria um item no mesmo horário e tira essas pessoas do original e de itens que começam no mesmo horário).
- `deslocar(iso, aPartirMin, delta, pessoas?, excetoId?)` empurra horários. O pouso desloca a partir do horário antigo do pouso; a volta desloca o dia inteiro.
- Todo evento passa por delegação `data-action` (click), `data-input` (input/change) e `data-form` (submit). Mudanças que o usuário pode querer reverter usam `toast(msg, desfazerFn)` com uma cópia (`clone(state)`).
- Tempo e custo: `TEMPO_E_CUSTO` em `data.js` define `clima` (`sol`/`misto`/`coberto`) e `custo` (`gratis`/`baixo`/`medio`/`alto`) de cada passeio. `chuvaDoDia(iso)` lê a previsão (Open-Meteo); a partir de `CHUVA_LIMIAR` (50%), a folha de planejar abre com o filtro "Dia de chuva" (`ctx.tempo`), e `avisoChuva()` alerta nos passeios `sol` (e nos `misto` a partir de 70%). `ctx.custo` filtra por custo máximo.
- Migração: `normalizar()` troca os nomes genéricos antigos (`NOMES_ANTIGOS`) pelos reais e preenche campos novos.

## Armadilhas já encontradas
- `.sheet-wrap[hidden]` precisa de `display:none !important`. Com `display:flex`, a camada invisível bloqueava os toques (o bug "não consigo clicar" no Safari). Durante a animação de saída, `.sheet-wrap:not(.aberto) { pointer-events:none }`.
- Teste com **cliques reais** (`computer left_click`), não só com `el.click()` via JS, que passa por cima de camadas sobrepostas. As capturas de tela do painel do navegador às vezes chegam com um passo de atraso: confirme o estado pelo DOM.
- O servidor de preview não roda dentro da pasta do iCloud (`os.getcwd` dá PermissionError). Copie para uma pasta temporária e sirva de lá (`python3 -m http.server`).
- Ao mudar o planejamento padrão, rode uma checagem de conflitos (itens do mesmo período que se sobrepõem com pessoas em comum) em todos os `DIAS[].planos`.
- **Ao publicar mudanças, aumente `CACHE` em `sw.js`.** Sem isso, os celulares continuam com a versão antiga.

## Como verificar
Abra no tamanho de celular (375×812), nos temas claro e escuro. Fluxos principais: tocar na faixa de pessoas, dividir o grupo e escolher; Saber mais (galeria e links); mudar o pouso no dia 11; editar pela Semana com "mover os próximos"; Explorar com filtros; compartilhar por link (exportar e importar). Console sem erros.
