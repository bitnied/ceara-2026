/* =========================================================
   Ceará 2026 — app
   Sem dependências. Estado salvo no aparelho (localStorage)
   e compartilhável por link (#r=...) ou arquivo .json.
   ========================================================= */
(function () {
  'use strict';

  const STORE_KEY = 'ceara2026:roteiro:v1';
  const UI_KEY = 'ceara2026:ui:v1';
  const WX_KEY = 'ceara2026:tempo:v1';

  const DIAS_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const DIAS_CURTO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const TIPOS = { adulto: 'Adulto', idoso: 'Idoso(a)', crianca: 'Criança', bebe: 'Bebê' };
  const FAIXA_PERIODO = { manha: 'até 12h', tarde: '12h às 18h', noite: 'depois das 18h' };
  const ARTIGO_PERIODO = { manha: 'a manhã', tarde: 'a tarde', noite: 'a noite' };
  const HORA_PADRAO = { manha: '09:00', tarde: '14:00', noite: '19:00' };
  const VOO_PADRAO = { pouso: '12:30', volta: '16:10' };

  /* ---------------- utilidades ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => 'i' + Math.random().toString(36).slice(2, 9);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  function lerStorage(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function gravarStorage(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* modo privado etc. */ }
  }

  function parseData(iso) { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); }
  function diaSemana(iso) { return parseData(iso).getDay(); }
  function dataLonga(iso) { const d = parseData(iso); return `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`; }
  function dataCurta(iso) { const d = parseData(iso); return `${DIAS_CURTO[d.getDay()]} ${d.getDate()}`; }
  function hojeISO() {
    try { return new Intl.DateTimeFormat('en-CA', { timeZone: TRIP.tz }).format(new Date()); }
    catch (e) { return new Date().toISOString().slice(0, 10); }
  }
  function diffDias(a, b) { return Math.round((parseData(b) - parseData(a)) / 86400000); }

  const paraMin = (h) => { if (!h) return null; const [a, b] = h.split(':').map(Number); return a * 60 + (b || 0); };
  const paraHora = (m) => { m = Math.max(0, Math.min(23 * 60 + 59, Math.round(m))); return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
  const periodoDe = (h) => { const m = paraMin(h); return m == null ? null : m < 12 * 60 ? 'manha' : m < 18 * 60 ? 'tarde' : 'noite'; };
  function duracaoTxt(min) {
    if (!min) return '';
    if (min >= 1440) return `${Math.round(min / 1440)} dia(s)`;
    if (min < 60) return `~${min} min`;
    const h = min / 60;
    return `~${Number.isInteger(h) ? h : h.toFixed(1).replace('.', ',')}h`;
  }
  function deltaTxt(min) {
    const s = min > 0 ? '+' : '−';
    const a = Math.abs(min);
    return `${s}${a >= 60 ? `${Math.floor(a / 60)}h${a % 60 ? String(a % 60).padStart(2, '0') : ''}` : `${a} min`}`;
  }
  function listaNomes(nomes) { return nomes.length <= 1 ? (nomes[0] || '') : `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`; }

  const DATAS = DIAS.map((d) => d.data);
  const infoDia = (iso) => DIAS.find((d) => d.data === iso);
  const periodoInfo = (id) => PERIODOS.find((p) => p.id === id);

  /* ---------------- estado ---------------- */
  function expandirQuem(q) {
    const ids = [];
    (q || []).forEach((k) => (GRUPOS[k] ? GRUPOS[k].pessoas : [k]).forEach((id) => { if (!ids.includes(id)) ids.push(id); }));
    return ids;
  }
  function itensDoPlano(plano) {
    return plano.itens.map((it) => ({ id: uid(), a: it.a, p: periodoDe(it.h) || it.p, h: it.h || '', q: expandirQuem(it.q), n: it.n || '', f: false }));
  }
  function estadoPadrao() {
    const dias = {};
    DIAS.forEach((d) => { dias[d.data] = { plano: 0, editado: false, nota: '', itens: itensDoPlano(d.planos[0]) }; });
    return { v: 2, pessoas: clone(PESSOAS_PADRAO), voo: { ...VOO_PADRAO }, dias, custom: [], check: {}, favs: [] };
  }
  function normalizar(s) {
    const base = estadoPadrao();
    if (!s || typeof s !== 'object' || !s.dias) return base;
    s.pessoas = Array.isArray(s.pessoas) && s.pessoas.length ? s.pessoas : base.pessoas;
    s.pessoas.forEach((p) => {
      const padrao = PESSOAS_PADRAO.find((x) => x.id === p.id);
      if (padrao && p.nome === NOMES_ANTIGOS[p.id]) { p.nome = padrao.nome; p.sigla = padrao.sigla; }
      if (!p.sigla) p.sigla = (p.nome || '?').slice(0, 1).toUpperCase();
    });
    s.voo = Object.assign({ ...VOO_PADRAO }, s.voo || {});
    s.custom = Array.isArray(s.custom) ? s.custom : [];
    s.check = s.check && typeof s.check === 'object' ? s.check : {};
    s.favs = Array.isArray(s.favs) ? s.favs : [];
    DATAS.forEach((d) => {
      const dia = s.dias[d];
      if (!dia || !Array.isArray(dia.itens)) s.dias[d] = base.dias[d];
      else dia.itens.forEach((it) => { if (!it.id) it.id = uid(); if (!Array.isArray(it.q)) it.q = []; if (it.h) it.p = periodoDe(it.h); });
    });
    s.v = 2;
    return s;
  }

  let state = normalizar(lerStorage(STORE_KEY));
  const ui = Object.assign({ view: 'roteiro', dia: DATAS[0], cat: 'todas', filtros: [], busca: '', semanaPessoa: 'todos' }, lerStorage(UI_KEY) || {});
  if (!DATAS.includes(ui.dia)) ui.dia = DATAS[0];
  const hoje = hojeISO();
  if (DATAS.includes(hoje)) ui.dia = hoje;

  function salvar() { gravarStorage(STORE_KEY, state); }
  function salvarUI() { gravarStorage(UI_KEY, { view: ui.view, dia: ui.dia, cat: ui.cat, filtros: ui.filtros, semanaPessoa: ui.semanaPessoa }); }
  salvar();

  /* ---------------- consultas ---------------- */
  function atividade(id) { return ATIVIDADES.find((a) => a.id === id) || state.custom.find((a) => a.id === id) || null; }
  function pessoa(id) { return state.pessoas.find((p) => p.id === id); }
  function todasPessoas() { return state.pessoas.map((p) => p.id); }
  function nomesDe(ids) {
    const ps = ids.map(pessoa).filter(Boolean);
    if (!ps.length) return 'ninguém';
    if (ps.length === state.pessoas.length) return 'Todos';
    for (const g of Object.values(GRUPOS)) {
      if (g.pessoas.length === ps.length && g.pessoas.every((id) => ids.includes(id))) return g.nome;
    }
    return listaNomes(ps.map((p) => p.nome));
  }
  const chavePublico = (p) => (p.tipo === 'bebe' ? 'bebe' : p.tipo === 'idoso' ? 'idosos' : p.tipo === 'crianca' ? 'crianca' : null);
  function nomeTipo(tipo) {
    const ps = state.pessoas.filter((p) => p.tipo === tipo);
    return ps.length ? listaNomes(ps.map((p) => p.nome)) : TIPOS[tipo];
  }

  function itensDoPeriodo(iso, per) {
    return state.dias[iso].itens.filter((i) => i.p === per)
      .sort((a, b) => (paraMin(a.h) ?? 9999) - (paraMin(b.h) ?? 9999));
  }
  function inicioFim(it) {
    const ini = paraMin(it.h);
    if (ini == null) return null;
    return [ini, ini + ((atividade(it.a) || {}).dur || 90)];
  }

  /* Agrupa itens que acontecem ao mesmo tempo (grupo dividido) */
  function blocos(iso, per) {
    const out = [];
    let atual = null;
    let fimAtual = -1;
    itensDoPeriodo(iso, per).forEach((it) => {
      const r = inicioFim(it);
      if (r && atual && r[0] < fimAtual) { atual.push(it); fimAtual = Math.max(fimAtual, r[1]); }
      else { atual = [it]; out.push(atual); fimAtual = r ? r[1] : -1; }
    });
    return out;
  }
  function conflitosDoBloco(bloco) {
    const vistos = {};
    const dup = new Set();
    bloco.forEach((it) => it.q.forEach((id) => { if (vistos[id]) dup.add(id); vistos[id] = true; }));
    return [...dup].map(pessoa).filter(Boolean).map((p) => p.nome);
  }

  function abreNoDia(act, iso) {
    if (!act || !act.dias) return true;
    if (act.abreFeriado && infoDia(iso)?.feriado) return true;
    return act.dias.includes(diaSemana(iso));
  }

  /* Quão bem um programa combina com um conjunto de pessoas */
  function encaixe(act, ids, iso, per) {
    const res = { nivel: 2, ressalvas: [], nao: [], fechado: false, foraPeriodo: false };
    if (!act) return res;
    ids.map(pessoa).filter(Boolean).forEach((p) => {
      const k = chavePublico(p);
      let n = k && act.publico ? (act.publico[k] ?? 2) : 2;
      if (p.leve && act.intensidade === 'intensa') n = Math.min(n, 1);
      if (n === 0) res.nao.push(p.nome); else if (n === 1) res.ressalvas.push(p.nome);
      res.nivel = Math.min(res.nivel, n);
    });
    if (iso && !abreNoDia(act, iso)) res.fechado = true;
    if (per && act.periodos && !act.periodos.includes(per)) res.foraPeriodo = true;
    return res;
  }
  function textoEncaixe(e) {
    if (e.fechado) return { cls: 'ruim', txt: 'Normalmente fechado neste dia' };
    if (e.climaRuim) return { cls: 'ruim', txt: 'Depende de tempo bom' };
    if (e.nao.length) return { cls: 'ruim', txt: `Não recomendado para ${listaNomes(e.nao)}` };
    if (e.ressalvas.length) return { cls: 'medio', txt: `Com ressalvas para ${listaNomes(e.ressalvas)}` };
    if (e.climaMedio) return { cls: 'medio', txt: 'Melhor com tempo bom' };
    if (e.foraPeriodo) return { cls: 'medio', txt: 'Combina mais com outro período' };
    return { cls: 'bom', txt: 'Combina com todos do grupo' };
  }

  /* ---- tempo e custo ---- */
  const CHUVA_LIMIAR = 50;
  const CUSTO_TXT = { gratis: 'Grátis', baixo: '$ baixo', medio: '$$ médio', alto: '$$$ alto' };
  const ORDEM_CUSTO = { gratis: 0, baixo: 1, medio: 2, alto: 3 };
  function chuvaDoDia(iso) { const t = tempo && tempo[iso]; return t ? (t.chuva ?? 0) : null; }
  function tagClima(a) {
    if (!a || !a.clima || a.cat === 'logistica') return '';
    return `<span class="tag clima-${a.clima}" title="${esc(NIVEIS_CLIMA[a.clima].nome)}">${icon(ICONE_CLIMA[a.clima])}${esc(NIVEIS_CLIMA[a.clima].curto)}</span>`;
  }
  function tagCusto(a) {
    if (!a || !a.custo) return '';
    return `<span class="tag custo-${a.custo}" title="${esc(NIVEIS_CUSTO[a.custo].nome)}: ${esc(NIVEIS_CUSTO[a.custo].faixa)}">${esc(CUSTO_TXT[a.custo])}</span>`;
  }
  function avisoChuva(act, iso) {
    const c = chuvaDoDia(iso);
    if (c == null || !act || !act.clima) return '';
    if (act.clima === 'sol' && c >= CHUVA_LIMIAR) return `Previsão de chuva (${c}%): este passeio depende de tempo bom`;
    if (act.clima === 'misto' && c >= 70) return `Previsão de chuva (${c}%): vale ter um plano B`;
    return '';
  }

  function avisosDoItem(item, iso) {
    const act = atividade(item.a);
    const out = [];
    if (!act) return out;
    if (!item.q.length) out.push('Ninguém escalado para este programa');
    const e = encaixe(act, item.q, iso);
    if (e.fechado) out.push(`Normalmente fechado às ${DIAS_SEMANA[diaSemana(iso)]}s. Confirme`);
    if (e.nao.length) out.push(`Não recomendado para ${listaNomes(e.nao)}`);
    const leves = item.q.map(pessoa).filter((p) => p && p.leve);
    if (act.intensidade === 'intensa' && leves.length) out.push(`Puxado para quem prefere ritmo leve (${listaNomes(leves.map((p) => p.nome))})`);
    const ch = avisoChuva(act, iso);
    if (ch) out.push(ch);
    return out;
  }

  const JANELA = { manha: [0, 720], tarde: [720, 1080], noite: [1080, 1440] };
  /* Programas que começaram num período anterior e ainda estão acontecendo neste */
  function continuacoes(iso, per) {
    const [ini] = JANELA[per];
    return state.dias[iso].itens.filter((it) => {
      if (it.p === per) return false;
      const r = inicioFim(it);
      return r && r[0] < ini && r[1] > ini + 30;
    });
  }
  function livresNoPeriodo(iso, per) {
    const ocupados = new Set([...state.dias[iso].itens.filter((i) => i.p === per), ...continuacoes(iso, per)].flatMap((i) => i.q));
    return state.pessoas.filter((p) => !ocupados.has(p.id));
  }
  function horaSugerida(iso, per, ids) {
    let fim = null;
    state.dias[iso].itens.filter((i) => i.p === per && i.q.some((id) => ids.includes(id))).forEach((i) => {
      const r = inicioFim(i);
      if (r) fim = Math.max(fim ?? 0, r[1]);
    });
    if (fim == null) return HORA_PADRAO[per];
    const h = paraHora(Math.ceil(fim / 30) * 30);
    return periodoDe(h) === per ? h : HORA_PADRAO[per];
  }
  function ondeNoRoteiro(actId) {
    const out = [];
    DATAS.forEach((d) => state.dias[d].itens.forEach((i) => { if (i.a === actId) out.push({ d, p: i.p, h: i.h, id: i.id }); }));
    return out;
  }

  /* Empurra horários: itens do dia a partir de `aPartir` (min) ganham `delta` minutos */
  function deslocar(iso, aPartir, delta, filtroPessoas, excetoId) {
    let n = 0;
    state.dias[iso].itens.forEach((it) => {
      if (it.id === excetoId) return;
      const m = paraMin(it.h);
      if (m == null || m < aPartir) return;
      if (filtroPessoas && !it.q.some((id) => filtroPessoas.includes(id))) return;
      it.h = paraHora(m + delta);
      it.p = periodoDe(it.h);
      n++;
    });
    return n;
  }

  /* ---------------- fotos (Wikimedia Commons) ---------------- */
  const FOTOS_DE = (typeof FOTOS !== 'undefined') ? FOTOS : {};
  function fotos(actId) { return FOTOS_DE[actId] || []; }
  /* tenta de novo uma vez (rede instável); se falhar, fica o ícone da categoria */
  const ERRO_IMG = "if(!this.dataset.r){this.dataset.r=1;var i=this;setTimeout(function(){i.src=i.src.split('?')[0]+'?r=1'},1500)}else{this.remove()}";
  function fotoUrl(f, largura) { return largura ? f.t.replace(/\/\d+px-/, `/${largura}px-`) : f.t; }
  function miniatura(act, cls = 'thumb', largura = 330) {
    const f = act && fotos(act.id)[0];
    const ic = ICONE_CATEGORIA[act?.cat] || 'star';
    if (!f) return `<span class="${cls} sem-foto cat-${esc(act?.cat || 'custom')}">${icon(ic)}</span>`;
    return `<span class="${cls} cat-${esc(act.cat)}">${icon(ic)}<img src="${esc(fotoUrl(f, largura))}" alt="" loading="lazy" decoding="async" onerror="${ERRO_IMG}"></span>`;
  }

  /* ---------------- tempo (Open-Meteo, sem chave) ---------------- */
  let tempo = (lerStorage(WX_KEY) || {}).dados || null;
  function descTempo(c) {
    if (c === 0) return 'céu limpo';
    if (c <= 2) return 'poucas nuvens';
    if (c === 3) return 'nublado';
    if (c <= 48) return 'neblina';
    if (c <= 57) return 'garoa';
    if (c <= 67) return 'chuva';
    if (c <= 77) return 'neve';
    if (c <= 82) return 'pancadas de chuva';
    return 'trovoadas';
  }
  async function carregarTempo() {
    const cache = lerStorage(WX_KEY);
    if (cache && Date.now() - cache.t < 3 * 3600 * 1000) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TRIP.lat}&longitude=${TRIP.lon}` +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset' +
      `&timezone=${encodeURIComponent(TRIP.tz)}&start_date=${TRIP.inicio}&end_date=${TRIP.fim}`;
    try {
      const r = await fetch(url);
      if (!r.ok) return;
      const j = await r.json();
      if (!j.daily || !j.daily.time) return;
      const dados = {};
      j.daily.time.forEach((d, k) => {
        if (j.daily.temperature_2m_max[k] == null) return;
        dados[d] = {
          cod: j.daily.weather_code[k], max: Math.round(j.daily.temperature_2m_max[k]), min: Math.round(j.daily.temperature_2m_min[k]),
          chuva: j.daily.precipitation_probability_max[k], vento: Math.round(j.daily.wind_speed_10m_max[k]),
          uv: Math.round(j.daily.uv_index_max[k] ?? 0), nasce: (j.daily.sunrise[k] || '').slice(11), poe: (j.daily.sunset[k] || '').slice(11),
        };
      });
      tempo = dados;
      gravarStorage(WX_KEY, { t: Date.now(), dados });
      if (sheetEl.hidden) render();
    } catch (e) { /* offline: sem previsão */ }
  }

  /* ---------------- componentes ---------------- */
  function sigla(p) { return (p.sigla || p.nome || '?').slice(0, 2); }
  function avatar(p, extra = '') {
    return `<span class="av ${extra}" style="--c:${esc(p.cor)}" title="${esc(p.nome)}" aria-hidden="true">${esc(sigla(p))}</span>`;
  }
  function avatares(ids, extra = '') {
    return `<span class="avs">${ids.map(pessoa).filter(Boolean).map((p) => avatar(p, extra)).join('')}</span>`;
  }
  function pontos(n) { return `<span class="dots d${n}" aria-hidden="true"><i></i><i></i></span>`; }

  function badgesDia(iso) {
    const d = infoDia(iso);
    const b = [];
    if (iso === hoje) b.push('<span class="badge hoje">Hoje</span>');
    if (d.feriado) b.push(`<span class="badge feriado">Feriado · ${esc(d.feriado)}</span>`);
    if (!abreNoDia(atividade('bp-aquapark'), iso)) b.push('<span class="badge fechado">Beach Park costuma fechar</span>');
    const c = chuvaDoDia(iso);
    if (c != null && c >= CHUVA_LIMIAR) b.push(`<span class="badge chuva">${icon('rain')}Chance de chuva ${c}%</span>`);
    return b.join('');
  }
  function linhaTempo(iso) {
    const t = tempo && tempo[iso];
    if (!t) {
      const falta = diffDias(hoje, iso);
      return `<p class="tempo vazio">${falta > 15 ? 'A previsão aparece cerca de 15 dias antes.' : 'Previsão indisponível agora.'} Média de outubro: 27–31°C, seco e com vento.</p>`;
    }
    return `<p class="tempo"><b>${t.max}°</b> / ${t.min}° · ${descTempo(t.cod)} · chuva ${t.chuva ?? 0}% · vento ${t.vento} km/h · UV ${t.uv} · pôr do sol ${esc(t.poe)}</p>`;
  }

  /* ---------------- views ---------------- */
  function faixaDias() {
    return `<nav class="faixa-dias" aria-label="Dias da viagem">${DATAS.map((d) => {
      const dt = parseData(d);
      const t = tempo && tempo[d];
      return `<button class="chip-dia ${d === ui.dia ? 'ativo' : ''} ${d === hoje ? 'hoje' : ''}" data-action="ir-dia" data-d="${d}" ${d === ui.dia ? 'aria-current="date"' : ''}>
        <span class="cd-sem">${DIAS_CURTO[dt.getDay()]}</span>
        <span class="cd-num">${dt.getDate()}</span>
        <span class="cd-extra">${t ? `${t.max}°` : infoDia(d).feriado ? 'feriado' : '&nbsp;'}</span>
      </button>`;
    }).join('')}</nav>`;
  }

  function controleVoo(iso) {
    if (iso === DATAS[0]) {
      return `<div class="voo">
        <span class="voo-ic">${icon('plane')}</span>
        <label class="voo-txt" for="voo-pouso"><b>Pouso em Fortaleza</b><small>Saída às 9h15. Ao mudar, o dia todo acompanha.</small></label>
        <input type="time" id="voo-pouso" data-input="voo-pouso" value="${esc(state.voo.pouso)}">
      </div>`;
    }
    if (iso === DATAS[DATAS.length - 1]) {
      const chegar = paraHora(paraMin(state.voo.volta) - 120);
      return `<div class="voo">
        <span class="voo-ic">${icon('plane')}</span>
        <label class="voo-txt" for="voo-volta"><b>Voo de volta</b><small>Chegar ao aeroporto até ${chegar}. Ao mudar, o dia todo acompanha.</small></label>
        <input type="time" id="voo-volta" data-input="voo-volta" value="${esc(state.voo.volta)}">
      </div>`;
    }
    return '';
  }

  function viewRoteiro() {
    const iso = ui.dia;
    const info = infoDia(iso);
    const dia = state.dias[iso];
    const idx = DATAS.indexOf(iso);
    const plano = info.planos[dia.plano];
    const nomePlano = plano ? `${esc(plano.nome)}${dia.editado ? ' <em>(editado)</em>' : ''}` : 'Personalizado';

    const periodos = PERIODOS.map((per) => {
      const bl = blocos(iso, per.id);
      const cont = continuacoes(iso, per.id);
      const livres = livresNoPeriodo(iso, per.id);
      const temAlgo = bl.length || cont.length;
      return `<section class="periodo" aria-labelledby="per-${per.id}">
        <header class="periodo-head">
          <h3 id="per-${per.id}">${icon(ICONE_PERIODO[per.id])}${per.nome}<small>${FAIXA_PERIODO[per.id]}</small></h3>
          <button class="btn-txt" data-action="planejar" data-p="${per.id}">${icon('plus')}Adicionar</button>
        </header>
        ${cont.map((it) => {
          const a = atividade(it.a);
          return `<button class="continua" data-action="editar" data-id="${it.id}">${avatares(it.q, 'xs')}<span>Continua: <b>${esc(a.nome)}</b> até ~${paraHora(inicioFim(it)[1])}</span>${icon('right')}</button>`;
        }).join('')}
        ${!temAlgo ? `<button class="vazio-periodo" data-action="planejar" data-p="${per.id}">Nada planejado. <u>Ver opções para ${ARTIGO_PERIODO[per.id]}</u></button>` : bl.map((b) => blocoHTML(b, iso)).join('')}
        ${temAlgo && livres.length ? `<button class="livres" data-action="planejar" data-p="${per.id}" data-q="${livres.map((p) => p.id).join(',')}">
          ${avatares(livres.map((p) => p.id), 'sm')}<span>Sem programa: ${esc(listaNomes(livres.map((p) => p.nome)))}</span><u>Ver opções</u></button>` : ''}
      </section>`;
    }).join('');

    return `
      ${faixaDias()}
      <article class="dia-hero">
        <div class="dia-hero-top">
          <button class="nav-dia" data-action="dia-ant" ${idx === 0 ? 'disabled' : ''} aria-label="Dia anterior">${icon('left')}</button>
          <div class="dia-hero-txt">
            <p class="eyebrow">Dia ${idx + 1} de ${DATAS.length} · ${dataLonga(iso)}</p>
            <h2>${esc(info.titulo)}</h2>
          </div>
          <button class="nav-dia" data-action="dia-prox" ${idx === DATAS.length - 1 ? 'disabled' : ''} aria-label="Próximo dia">${icon('right')}</button>
        </div>
        ${linhaTempo(iso)}
        <div class="badges">${badgesDia(iso)}</div>
        ${controleVoo(iso)}
        ${info.avisos?.length ? `<ul class="avisos">${info.avisos.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
        <button class="plano-atual" data-action="alternativas" data-d="${iso}">
          <span><small>Plano do dia</small><strong>${nomePlano}</strong></span>
          <span class="plano-trocar">${info.planos.length} opções${icon('right')}</span>
        </button>
      </article>
      ${periodos}
      <section class="nota-dia">
        <label for="nota-dia">Anotações do dia</label>
        <textarea id="nota-dia" data-input="nota-dia" rows="2" placeholder="Reservas, telefones, o que levar…">${esc(dia.nota)}</textarea>
      </section>`;
  }

  function blocoHTML(bloco, iso) {
    if (bloco.length === 1) return cardItem(bloco[0], iso);
    const conflito = conflitosDoBloco(bloco);
    return `<div class="paralelo">
      <p class="paralelo-head">${icon('split')}Grupo dividido · ao mesmo tempo</p>
      <div class="lanes">${bloco.map((it) => cardItem(it, iso)).join('')}</div>
      ${conflito.length ? `<p class="aviso">${icon('alert')}${esc(listaNomes(conflito))} ${conflito.length > 1 ? 'estão' : 'está'} em dois programas no mesmo horário</p>` : ''}
    </div>`;
  }

  function cardItem(it, iso) {
    const act = atividade(it.a);
    if (!act) return '';
    const avisos = avisosDoItem(it, iso);
    const meta = [act.local, act.km ? `${act.tempo} de carro` : ''].filter(Boolean).map(esc).join(' · ');
    return `<article class="item ${it.f ? 'feito' : ''}" data-id="${it.id}">
      <button class="item-foto" data-action="saber" data-a="${act.id}" aria-label="Saber mais sobre ${esc(act.nome)}">${miniatura(act, 'thumb')}</button>
      <div class="item-corpo">
        <p class="item-quando"><b>${it.h ? esc(it.h) : 'Sem horário'}</b>${act.dur ? ` · ${duracaoTxt(act.dur)}` : ''}</p>
        <h4 class="item-titulo"><button data-action="saber" data-a="${act.id}">${esc(act.nome)}</button></h4>
        ${meta ? `<p class="item-meta">${meta}</p>` : ''}
        ${act.cat !== 'logistica' && (act.clima || act.custo) ? `<p class="tags">${tagClima(act)}${tagCusto(act)}</p>` : ''}
        ${it.n ? `<p class="item-nota">${esc(it.n)}</p>` : ''}
      </div>
      <div class="item-acoes">
        <button class="check ${it.f ? 'on' : ''}" data-action="feito" data-id="${it.id}" aria-label="${it.f ? 'Desmarcar como feito' : 'Marcar como feito'}" aria-pressed="${it.f}">${icon('check')}</button>
        <button class="mais" data-action="editar" data-id="${it.id}" aria-label="Editar horário e pessoas">${icon('edit')}</button>
      </div>
      <div class="item-rodape">
        <button class="item-quem" data-action="grupo-item" data-id="${it.id}">
          ${it.q.length && it.q.length < state.pessoas.length ? avatares(it.q, 'sm') : `<span class="iq-ic">${icon('users')}</span>`}<span class="iq-nome">${esc(it.q.length ? (it.q.length === state.pessoas.length ? `Todos (${it.q.length})` : nomesDe(it.q)) : 'Ninguém')}</span><span class="iq-acao">Opções${icon('right')}</span>
        </button>
        ${avisos.map((a) => `<p class="aviso">${icon('alert')}${esc(a)}</p>`).join('')}
        ${avisoChuva(act, iso) ? `<button class="btn-txt" data-action="grupo-item" data-id="${it.id}" data-chuva="1">${icon('roof')}Ver opções para dia de chuva</button>` : ''}
      </div>
    </article>`;
  }

  function viewSemana() {
    const filtro = ui.semanaPessoa;
    const opcoes = [{ id: 'todos', nome: 'Todos' }, ...state.pessoas];
    return `
      <div class="secao-head">
        <h2>A semana</h2>
        <p class="sub">Toque num programa para editar, ou em + para adicionar.</p>
      </div>
      <div class="chips-filtro rolagem" role="group" aria-label="Ver a semana de">
        ${opcoes.map((o) => `<button class="chip ${filtro === o.id ? 'on' : ''}" data-action="semana-pessoa" data-id="${o.id}" aria-pressed="${filtro === o.id}">${o.cor ? avatar(o, 'sm') : ''}${esc(o.nome)}</button>`).join('')}
      </div>
      <div class="semana-grid">
        ${DATAS.map((d) => {
          const info = infoDia(d);
          const t = tempo && tempo[d];
          return `<article class="semana-dia ${d === hoje ? 'hoje' : ''}">
            <header class="sd-head">
              <button class="sd-abrir" data-action="abrir-dia" data-d="${d}">
                <span class="sd-data">${dataCurta(d)}${t ? ` <small>${t.max}°${t.chuva >= CHUVA_LIMIAR ? ` · chuva ${t.chuva}%` : ''}</small>` : ''}${info.feriado ? ' <small>feriado</small>' : ''}</span>
                <span class="sd-titulo">${esc(info.titulo)}</span>
              </button>
              <button class="btn-txt" data-action="alternativas" data-d="${d}">Planos</button>
            </header>
            ${PERIODOS.map((per) => {
              let itens = itensDoPeriodo(d, per.id);
              if (filtro !== 'todos') itens = itens.filter((i) => i.q.includes(filtro));
              return `<div class="sp">
                <span class="sp-nome">${per.nome}</span>
                <ul>${itens.map((i) => {
                  const a = atividade(i.a);
                  if (!a) return '';
                  const todos = i.q.length === state.pessoas.length;
                  return `<li><button class="sp-item ${i.f ? 'feito' : ''}" data-action="editar" data-id="${i.id}">
                    <span class="sp-hora">${esc(i.h || '—')}</span><span class="sp-txt">${esc(a.nome)}</span>${filtro === 'todos' && !todos ? avatares(i.q, 'xs') : ''}
                  </button></li>`;
                }).join('')}
                <li><button class="sp-add" data-action="planejar" data-d="${d}" data-p="${per.id}">${icon('plus')}<span>Adicionar</span></button></li></ul>
              </div>`;
            }).join('')}
          </article>`;
        }).join('')}
      </div>`;
  }

  function filtrarAtividades() {
    const busca = ui.busca.trim().toLowerCase();
    return [...ATIVIDADES, ...state.custom].filter((a) => {
      if (ui.cat === 'favs') { if (!state.favs.includes(a.id)) return false; }
      else if (ui.cat !== 'todas' && a.cat !== ui.cat) return false;
      if (busca && !(`${a.nome} ${a.local} ${a.resumo}`.toLowerCase().includes(busca))) return false;
      for (const f of ui.filtros) {
        if (f === 'bebe' && (a.publico?.bebe ?? 2) < 2) return false;
        if (f === 'idosos' && (a.publico?.idosos ?? 2) < 2) return false;
        if (f === 'crianca' && (a.publico?.crianca ?? 2) < 2) return false;
        if (f === 'perto' && (a.km || 0) > 30) return false;
        if (f === 'leve' && a.intensidade !== 'leve') return false;
        if (f === 'chuva' && (a.clima !== 'coberto' || a.cat === 'logistica')) return false;
        if (f === 'barato' && (!(a.custo === 'gratis' || a.custo === 'baixo') || a.cat === 'logistica')) return false;
      }
      return true;
    });
  }

  function viewExplorar() {
    const cats = [['todas', 'Tudo'], ['favs', 'Favoritos'], ...Object.entries(CATEGORIAS).map(([k, v]) => [k, v.nome])];
    const filtros = [['bebe', `Bom para ${nomeTipo('bebe')}`], ['idosos', 'Bom para os idosos'], ['crianca', `Bom para ${nomeTipo('crianca')}`], ['leve', 'Ritmo leve'], ['perto', 'Até 30 km'], ['chuva', 'Funciona com chuva'], ['barato', 'Grátis ou baixo custo']];
    return `
      <div class="secao-head">
        <h2>Explorar</h2>
        <p class="sub">${ATIVIDADES.length} passeios e programas. Toque para ver fotos, detalhes e links.</p>
      </div>
      <div class="busca">${icon('search')}<input type="search" data-input="busca" placeholder="Buscar: buggy, caranguejo, lagoa…" value="${esc(ui.busca)}" aria-label="Buscar passeios"></div>
      <div class="chips-filtro rolagem" role="group" aria-label="Categoria">
        ${cats.map(([k, n]) => `<button class="chip ${ui.cat === k ? 'on' : ''}" data-action="cat" data-c="${k}" aria-pressed="${ui.cat === k}">${n}</button>`).join('')}
      </div>
      <div class="chips-filtro rolagem" role="group" aria-label="Filtros">
        ${filtros.map(([k, n]) => `<button class="chip sutil ${ui.filtros.includes(k) ? 'on' : ''}" data-action="filtro" data-f="${k}" aria-pressed="${ui.filtros.includes(k)}">${ui.filtros.includes(k) ? icon('check') : ''}${esc(n)}</button>`).join('')}
      </div>
      <div class="cards-grid" id="cards-grid">${cardsAtividades(filtrarAtividades())}</div>`;
  }

  function cardsAtividades(lista) {
    if (!lista.length) return '<p class="vazio">Nada encontrado com esses filtros.</p>';
    return lista.map((a) => {
      const onde = ondeNoRoteiro(a.id);
      const pub = a.publico || {};
      return `<article class="card-atv">
        <button class="ca-link" data-action="saber" data-a="${a.id}">
          ${miniatura(a, 'ca-foto', 500)}
          <span class="ca-corpo">
            <span class="ca-cat">${esc(CATEGORIAS[a.cat]?.nome || 'Personalizado')}${a.km ? ` · ${esc(a.tempo)}` : ''}${state.favs.includes(a.id) ? ' · ★ favorito' : ''}</span>
            <span class="ca-nome">${esc(a.nome)}</span>
            <span class="ca-resumo">${esc(a.resumo || '')}</span>
            ${a.clima || a.custo ? `<span class="tags">${tagClima(a)}${tagCusto(a)}</span>` : ''}
          </span>
        </button>
        <div class="ca-rodape">
          <span class="ca-publico">
            <span>${esc(nomeTipo('bebe'))} ${pontos(pub.bebe ?? 2)}</span><span>Idosos ${pontos(pub.idosos ?? 2)}</span><span>${esc(nomeTipo('crianca'))} ${pontos(pub.crianca ?? 2)}</span>
          </span>
          ${onde.length ? `<span class="ca-no-roteiro">${icon('check')}${onde.length}× no roteiro</span>` : ''}
          <button class="btn-txt" data-action="saber" data-a="${a.id}">Saber mais${icon('right')}</button>
        </div>
      </article>`;
    }).join('');
  }

  const blocosAbertos = new Set(['reservas']);
  function viewDicas() {
    const total = CHECKLISTS.reduce((s, c) => s + c.itens.length, 0);
    const feitos = CHECKLISTS.reduce((s, c) => s + c.itens.filter(([k]) => state.check[`${c.id}:${k}`]).length, 0);
    return `
      <div class="secao-head">
        <h2>Preparar</h2>
        <p class="sub">${feitos} de ${total} itens prontos</p>
        <div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${feitos}"><span style="width:${Math.round((feitos / total) * 100)}%"></span></div>
      </div>
      ${CHECKLISTS.map((c) => {
        const n = c.itens.filter(([k]) => state.check[`${c.id}:${k}`]).length;
        return `<details class="bloco" data-bloco="${c.id}" ${blocosAbertos.has(c.id) ? 'open' : ''}>
          <summary><span>${esc(c.titulo)}</span><span class="contagem ${n === c.itens.length ? 'ok' : ''}">${n}/${c.itens.length}</span>${icon('down', 'seta')}</summary>
          <ul class="checklist">${c.itens.map(([k, txt]) => {
            const key = `${c.id}:${k}`;
            return `<li><label><input type="checkbox" data-input="check" data-k="${key}" ${state.check[key] ? 'checked' : ''}><span>${esc(txt)}</span></label></li>`;
          }).join('')}</ul>
        </details>`;
      }).join('')}
      <h3 class="sub-titulo">Dicas</h3>
      <div class="dicas-grid">
        ${DICAS.map((d) => `<article class="dica"><h4>${esc(d.titulo)}</h4><p>${esc(d.texto)}</p>${d.link ? `<a href="${esc(d.link[1])}" target="_blank" rel="noopener">${esc(d.link[0])}${icon('external')}</a>` : ''}</article>`).join('')}
      </div>
      <div class="dicas-grid duas">
        <article class="dica"><h4>Emergência</h4><ul class="lista-simples">${CONTATOS.map(([n, t]) => `<li><span>${esc(n)}</span><a href="tel:${esc(t)}">${esc(t)}</a></li>`).join('')}</ul></article>
        <article class="dica"><h4>Links úteis</h4><ul class="lista-simples">${LINKS.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}${icon('external')}</a></li>`).join('')}</ul></article>
      </div>
      <p class="rodape-nota">Preços e horários são estimativas e podem mudar. Confirme nos sites oficiais e com as agências antes de reservar. Fotos: Wikimedia Commons.</p>`;
  }

  /* ---------------- folhas (sheets) com histórico ---------------- */
  const sheetEl = $('#sheet');
  const sheetBody = $('#sheet-body');
  let pilha = [];
  let ctxSheet = null;
  let focoAntes = null;

  /* Abre uma folha. Se já houver uma aberta, empilha (permite "voltar"). */
  function mostrar(fn, ...args) {
    if (sheetEl.hidden || !sheetEl.classList.contains('aberto')) { pilha = []; focoAntes = document.activeElement; }
    pilha.push({ fn, args });
    fn(...args);
  }
  function substituir(fn, ...args) {
    if (pilha.length) pilha[pilha.length - 1] = { fn, args }; else pilha.push({ fn, args });
    fn(...args);
  }
  function voltarSheet() {
    pilha.pop();
    const ant = pilha[pilha.length - 1];
    if (ant) ant.fn(...ant.args); else fecharSheet();
  }
  function abrirSheet(html, ctx) {
    ctxSheet = ctx || null;
    sheetBody.innerHTML = html;
    sheetEl.hidden = false;
    document.body.classList.add('travado');
    sheetBody.scrollTop = 0;
    requestAnimationFrame(() => {
      sheetEl.classList.add('aberto');
      const alvo = sheetBody.querySelector('[autofocus]') || sheetBody.querySelector('h2');
      if (alvo) alvo.focus({ preventScroll: true });
    });
  }
  function fecharSheet() {
    sheetEl.classList.remove('aberto');
    document.body.classList.remove('travado');
    ctxSheet = null;
    pilha = [];
    setTimeout(() => { if (!sheetEl.classList.contains('aberto')) { sheetEl.hidden = true; sheetBody.innerHTML = ''; } }, 220);
    if (focoAntes && focoAntes.isConnected && focoAntes.focus) focoAntes.focus({ preventScroll: true });
  }
  function sheetHead(titulo, sub) {
    const voltar = pilha.length > 1 ? `<button class="sh-btn" data-action="voltar" aria-label="Voltar">${icon('left')}</button>` : '';
    return `<header class="sh-head">${voltar}<div class="sh-tit"><h2 tabindex="-1">${titulo}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div><button class="sh-btn" data-action="fechar" aria-label="Fechar">${icon('x')}</button></header>`;
  }

  function seletorPessoas(sel, acao) {
    return `<div class="atalhos-grupo" role="group" aria-label="Grupos">
        ${Object.entries(GRUPOS).map(([k, g]) => {
          const on = g.pessoas.length === sel.length && g.pessoas.every((id) => sel.includes(id));
          return `<button type="button" class="chip sutil ${on ? 'on' : ''}" data-action="${acao}" data-g="${k}" aria-pressed="${on}">${esc(g.nome)}</button>`;
        }).join('')}
      </div>
      <div class="pessoas-sel" role="group" aria-label="Pessoas">
        ${state.pessoas.map((p) => {
          const on = sel.includes(p.id);
          return `<button type="button" class="pessoa-opt ${on ? 'on' : ''}" data-action="${acao}" data-id="${p.id}" aria-pressed="${on}">${avatar(p)}<span>${esc(p.nome)}</span></button>`;
        }).join('')}
      </div>`;
  }

  /* ---- Planejar: opções de programa para um grupo de pessoas ---- */
  function sheetPlanejar(ctx) {
    // ctx: { d, p, h?, itemId?, q:[], busca }
    const item = ctx.itemId ? acharItem(ctx.itemId)?.it : null;
    const actAtual = item ? atividade(item.a) : null;
    const per = periodoInfo(ctx.p);
    const titulo = ctx.q.length ? `Opções para ${esc(nomesDe(ctx.q))}` : 'Escolha quem vai';
    const divide = item && ctx.q.length && ctx.q.length < item.q.length && ctx.q.every((id) => item.q.includes(id));
    abrirSheet(`
      ${sheetHead(titulo, `${dataCurta(ctx.d)} · ${per.nome}${ctx.h ? ` · ${esc(ctx.h)}` : ''}`)}
      ${actAtual ? `<div class="atual">
        ${miniatura(actAtual, 'thumb')}
        <div class="atual-txt"><small>Programa atual${item.q.length ? ` de ${esc(nomesDe(item.q))}` : ''}</small><b>${esc(actAtual.nome)}</b>
          <span class="atual-acoes">
            <button class="btn-txt" data-action="saber" data-a="${actAtual.id}">${icon('info')}Saber mais</button>
            <button class="btn-txt" data-action="editar" data-id="${item.id}">${icon('edit')}Horário e pessoas</button>
          </span>
        </div>
      </div>` : ''}
      <h3 class="sh-sub">Para quem?</h3>
      ${seletorPessoas(ctx.q, 'plan-pessoa')}
      ${item ? `<p class="dica-sel">${divide
        ? `${icon('split')}<span>Escolher agora <b>divide o grupo</b>: ${esc(nomesDe(ctx.q))} vão para o novo programa no mesmo horário e os demais continuam em ${esc(actAtual.nome)}.</span>`
        : `${icon('swap')}<span>Desmarque pessoas para dividir o grupo. Com todos marcados, a escolha troca o programa inteiro.</span>`}</p>` : ''}
      ${filtrosPlanejar(ctx)}
      <div class="busca">${icon('search')}<input type="search" data-input="busca-plan" placeholder="Buscar…" value="${esc(ctx.busca || '')}" aria-label="Buscar programa"></div>
      <div id="plan-lista">${listaPlanejar(ctx)}</div>
      <button class="btn largo" data-action="custom-novo">${icon('plus')}Criar programa personalizado</button>
    `, { tipo: 'planejar', ref: ctx });
  }

  function filtrosPlanejar(ctx) {
    const c = chuvaDoDia(ctx.d);
    const opcao = (acao, v, atual, txt, ic) => `<button type="button" class="chip sutil ${atual === v ? 'on' : ''}" data-action="${acao}" data-v="${v}" aria-pressed="${atual === v}">${ic ? icon(ic) : ''}${txt}</button>`;
    return `<div class="filtros-plan">
      <div class="filtro-linha" role="group" aria-label="Tempo">
        <span class="fl-rot">Tempo</span>
        ${opcao('plan-tempo', 'qualquer', ctx.tempo, 'Qualquer tempo')}
        ${opcao('plan-tempo', 'chuva', ctx.tempo, 'Dia de chuva', 'rain')}
      </div>
      ${c != null ? `<p class="fl-nota">Previsão para ${dataCurta(ctx.d)}: chance de chuva de ${c}%.${c >= CHUVA_LIMIAR ? ' Por isso o filtro de dia de chuva já veio ligado.' : ''}</p>` : ''}
      <div class="filtro-linha" role="group" aria-label="Custo">
        <span class="fl-rot">Custo</span>
        ${opcao('plan-custo', 'qualquer', ctx.custo, 'Qualquer')}
        ${opcao('plan-custo', 'baixo', ctx.custo, 'Grátis ou baixo')}
        ${opcao('plan-custo', 'medio', ctx.custo, 'Até médio')}
      </div>
    </div>`;
  }

  function listaPlanejar(ctx) {
    if (!ctx.q.length) return '<p class="vazio">Selecione pelo menos uma pessoa para ver as opções.</p>';
    const busca = (ctx.busca || '').toLowerCase();
    const item = ctx.itemId ? acharItem(ctx.itemId)?.it : null;
    const lista = [...ATIVIDADES, ...state.custom]
      .filter((a) => !item || a.id !== item.a)
      .filter((a) => busca ? `${a.nome} ${a.local} ${a.resumo}`.toLowerCase().includes(busca) : (a.cat !== 'logistica' || a.id === 'descanso'))
      .filter((a) => ctx.custo === 'qualquer' || !a.custo || ORDEM_CUSTO[a.custo] <= ORDEM_CUSTO[ctx.custo])
      .map((a) => {
        const e = encaixe(a, ctx.q, ctx.d, ctx.p);
        e.climaRuim = ctx.tempo === 'chuva' && a.clima === 'sol';
        e.climaMedio = ctx.tempo === 'chuva' && a.clima === 'misto';
        return { a, e };
      });
    const bons = []; const medios = []; const ruins = [];
    lista.forEach((x) => {
      if (x.e.fechado || x.e.nivel === 0 || x.e.climaRuim) ruins.push(x);
      else if (x.e.nivel === 1 || x.e.foraPeriodo || x.e.climaMedio) medios.push(x);
      else bons.push(x);
    });
    const ord = (a, b) => (a.a.km || 0) - (b.a.km || 0);
    [bons, medios, ruins].forEach((l) => l.sort(ord));
    const linha = ({ a, e }) => {
      const t = textoEncaixe(e);
      return `<li class="sug">
        <button class="sug-info" data-action="saber" data-a="${a.id}">
          ${miniatura(a, 'thumb')}
          <span class="sug-txt"><b>${esc(a.nome)}</b><small>${[a.km ? `${a.tempo} de carro` : 'Perto do resort', duracaoTxt(a.dur)].filter(Boolean).map(esc).join(' · ')}</small><span class="tags">${tagClima(a)}${tagCusto(a)}</span><small class="enc ${t.cls}">${esc(t.txt)}</small></span>
        </button>
        <button class="btn-mini" data-action="escolher" data-a="${a.id}">Escolher</button>
      </li>`;
    };
    return `
      ${bons.length ? `<h3 class="sh-sub">Combinam com ${esc(nomesDe(ctx.q))}</h3><ul class="sugestoes">${bons.map(linha).join('')}</ul>` : ''}
      ${medios.length ? `<h3 class="sh-sub">Possíveis, com ressalvas</h3><ul class="sugestoes">${medios.map(linha).join('')}</ul>` : ''}
      ${ruins.length ? `<details class="mais-opcoes"><summary>${ctx.tempo === 'chuva' ? 'Dependem de tempo bom, não recomendados ou fechados' : 'Não recomendados ou fechados neste dia'} (${ruins.length})</summary><ul class="sugestoes">${ruins.map(linha).join('')}</ul></details>` : ''}
      ${!lista.length ? '<p class="vazio">Nada encontrado.</p>' : ''}`;
  }

  function novoCtxPlan(base, tempoForcado) {
    const c = chuvaDoDia(base.d);
    return { busca: '', custo: 'qualquer', tempo: tempoForcado || (c != null && c >= CHUVA_LIMIAR ? 'chuva' : 'qualquer'), ...base };
  }

  /* Aplica a escolha feita na folha de planejar */
  function escolherPrograma(ctx, actId) {
    const antes = clone(state);
    const dia = state.dias[ctx.d];
    const q = [...ctx.q];
    const item = ctx.itemId ? dia.itens.find((i) => i.id === ctx.itemId) : null;
    const nomeAct = atividade(actId).nome;
    let msg;
    if (item && q.length === item.q.length && q.every((id) => item.q.includes(id))) {
      item.a = actId;
      msg = `Trocado por ${nomeAct}`;
    } else {
      const h = item ? item.h : (ctx.h || horaSugerida(ctx.d, ctx.p, q));
      const novo = { id: uid(), a: actId, p: periodoDe(h) || ctx.p, h, q, n: '', f: false };
      // quem vai para o novo programa sai do programa dividido e de outros que começam no mesmo horário
      const afetados = dia.itens.filter((it) => it === item || (h && it.h === h && it.q.some((id) => q.includes(id))));
      afetados.forEach((it) => { it.q = it.q.filter((id) => !q.includes(id)); });
      dia.itens = dia.itens.filter((it) => !afetados.includes(it) || it.q.length);
      dia.itens.push(novo);
      msg = item ? `Grupo dividido: ${nomesDe(q)} vão para ${nomeAct}` : `${nomeAct} adicionado${h ? ` às ${h}` : ''}`;
    }
    dia.editado = true;
    salvar();
    fecharSheet();
    if (ui.view !== 'semana') ui.view = 'roteiro';
    ui.dia = ctx.d; salvarUI(); render();
    toast(msg, () => { state = antes; salvar(); render(); });
  }

  /* ---- Saber mais ---- */
  function sheetSaber(actId, ctxPlan) {
    const a = atividade(actId);
    if (!a) return;
    const pub = a.publico || {};
    const pn = a.publicoNota || {};
    const fav = state.favs.includes(a.id);
    const onde = ondeNoRoteiro(a.id);
    const fts = fotos(a.id);
    const diasTxt = a.dias ? (a.dias.length === 7 ? 'Todos os dias' : a.dias.map((d) => DIAS_CURTO[d]).join(', ') + (a.abreFeriado ? ' e feriados' : '')) : 'Todos os dias';
    const q = encodeURIComponent(`${a.nome} ${a.km ? a.local : 'Beach Park Ceará'}`);
    const links = [
      ['map', 'Mapa e avaliações', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.maps || a.nome)}`],
      a.site || a.link ? ['globe', 'Site oficial', a.site || a.link] : null,
      a.wiki ? ['book', 'Wikipédia', `https://pt.wikipedia.org/wiki/${encodeURIComponent(a.wiki.replace(/ /g, '_'))}`] : null,
      ['image', 'Mais fotos', `https://www.google.com/search?tbm=isch&q=${q}`],
      ['video', 'Vídeos', `https://www.youtube.com/results?search_query=${q}`],
      ['search', 'Pesquisar no Google', `https://www.google.com/search?q=${q}`],
    ].filter(Boolean);
    const linhaPub = (k, rotulo) => {
      const n = pub[k] ?? 2;
      return `<li>${pontos(n)}<span><b>${esc(rotulo)}</b>: ${['não recomendado', 'dá, com ressalvas', 'ótimo'][n]}${pn[k] ? `. ${esc(pn[k])}` : ''}</span></li>`;
    };
    const tr = a.transporte || {};
    const comoIr = [['Carro ou van', tr.carro], ['Agência ou transfer', tr.agencia], ['Uber / 99', tr.uber]].filter(([, v]) => v && v !== '—');
    abrirSheet(`
      ${sheetHead(esc(a.nome), `${esc(CATEGORIAS[a.cat]?.nome || 'Programa personalizado')}${a.local ? ` · ${esc(a.local)}` : ''}`)}
      ${fts.length ? `<div class="galeria" aria-label="Fotos">
        ${fts.map((f, i) => `<a class="gal-item" href="${esc(f.p)}" target="_blank" rel="noopener" title="${esc(f.a ? `Foto: ${f.a}` : 'Wikimedia Commons')}">
          <img src="${esc(fotoUrl(f, i === 0 ? 960 : 500))}" alt="${esc(a.nome)}, foto ${i + 1} de ${fts.length}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" onerror="${ERRO_IMG}">
        </a>`).join('')}
      </div><p class="credito">${fts.length} foto(s) do Wikimedia Commons${fts[0].a ? `, de ${esc(fts[0].a)} e outros` : ''}. Deslize para ver mais; toque para abrir a original.</p>` : ''}
      <p class="lead">${esc(a.resumo || '')}</p>
      <dl class="fatos">
        ${a.tempo ? `<div><dt>Do resort</dt><dd>${esc(a.tempo)}${a.km ? ` · ${a.km} km` : ''}</dd></div>` : ''}
        ${a.duracao ? `<div><dt>Duração</dt><dd>${esc(a.duracao)}</dd></div>` : ''}
        ${a.cat !== 'custom' ? `<div><dt>Funciona</dt><dd>${diasTxt}</dd></div>` : ''}
        ${a.intensidade ? `<div><dt>Ritmo</dt><dd>${esc(a.intensidade[0].toUpperCase() + a.intensidade.slice(1))}</dd></div>` : ''}
        ${a.custo || a.preco ? `<div class="largo"><dt>Custo</dt><dd>${a.custo ? `<b>${esc(NIVEIS_CUSTO[a.custo].nome)}</b> (${esc(NIVEIS_CUSTO[a.custo].faixa)})` : ''}${a.preco && a.preco !== '—' ? `${a.custo ? '<br>' : ''}${esc(a.preco)}` : ''}${a.custoNota ? `<br>${esc(a.custoNota)}` : ''}</dd></div>` : ''}
        ${a.clima && a.cat !== 'logistica' ? `<div class="largo"><dt>Tempo</dt><dd><b>${esc(NIVEIS_CLIMA[a.clima].nome)}</b>${a.climaNota ? `. ${esc(a.climaNota)}` : ''}</dd></div>` : ''}
      </dl>
      ${a.publico ? `<h3 class="sh-sub">Para a família</h3><ul class="publico">
        ${linhaPub('bebe', nomeTipo('bebe'))}${linhaPub('idosos', nomeTipo('idoso'))}${linhaPub('crianca', nomeTipo('crianca'))}
      </ul>` : ''}
      ${a.descricao ? `<h3 class="sh-sub">Sobre</h3><p>${esc(a.descricao)}</p>` : ''}
      ${(a.secoes || []).map((s) => `<h3 class="sh-sub">${esc(s.t)}</h3>${s.texto ? `<p>${esc(s.texto)}</p>` : ''}${s.itens ? `<ul class="atracoes">${s.itens.map(([n, t]) => `<li><b>${esc(n)}</b><span>${esc(t)}</span></li>`).join('')}</ul>` : ''}`).join('')}
      ${a.dicas?.length ? `<h3 class="sh-sub">Dicas</h3><ul class="bullets">${a.dicas.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      ${comoIr.length ? `<h3 class="sh-sub">Como ir</h3><dl class="transp">${comoIr.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      <h3 class="sh-sub">Saiba mais na internet</h3>
      <ul class="links-ext">${links.map(([ic, n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${icon(ic)}<span>${esc(n)}</span>${icon('external', 'ext')}</a></li>`).join('')}</ul>
      ${onde.length ? `<h3 class="sh-sub">Já está no roteiro</h3><ul class="no-roteiro">${onde.map((o) => `<li><button class="btn-txt" data-action="abrir-dia" data-d="${o.d}">${dataCurta(o.d)} · ${o.h || periodoInfo(o.p).nome}${icon('right')}</button></li>`).join('')}</ul>` : ''}
      <div class="acoes-linha">
        <button class="btn" data-action="fav" data-a="${a.id}" aria-pressed="${fav}">${icon('star', fav ? 'cheio' : '')}${fav ? 'Favorito' : 'Favoritar'}</button>
        ${a.cat === 'custom' ? `<button class="btn perigo" data-action="apagar-custom" data-a="${a.id}">${icon('trash')}Apagar programa</button>` : ''}
      </div>
      <div class="sh-rodape">
        ${ctxPlan ? `<button class="btn primary grande" data-action="escolher" data-a="${a.id}">Escolher para ${esc(nomesDe(ctxPlan.q))}</button>`
          : `<button class="btn primary grande" data-action="add-de-saber" data-a="${a.id}">${icon('plus')}Adicionar ao roteiro</button>`}
      </div>
    `, { tipo: 'saber', a: a.id, plan: ctxPlan || null });
  }

  /* ---- Editor de item (novo ou edição) ---- */
  function sheetItem(opts) {
    // opts: { modo:'novo'|'editar', a, d, p, h, q, n, id }
    const a = atividade(opts.a);
    if (!a) return;
    const novo = opts.modo === 'novo';
    abrirSheet(`
      ${sheetHead(esc(a.nome), novo ? 'Adicionar ao roteiro' : 'Editar horário e pessoas')}
      <form class="form" data-form="item">
        <fieldset>
          <legend>Quem vai?</legend>
          ${seletorPessoas(opts.q, 'item-pessoa')}
        </fieldset>
        <div class="linha2">
          <label class="campo">Dia
            <select name="d">${DATAS.map((d) => `<option value="${d}" ${d === opts.d ? 'selected' : ''}>${dataCurta(d)}/10</option>`).join('')}</select>
          </label>
          <label class="campo">Horário <input type="time" name="h" value="${esc(opts.h || '')}"></label>
        </div>
        <label class="empurrar" hidden><input type="checkbox" name="empurrar" checked><span id="empurrar-txt"></span></label>
        <fieldset class="so-sem-hora">
          <legend>Período</legend>
          <div class="segmentado">
            ${PERIODOS.map((p) => `<label><input type="radio" name="p" value="${p.id}" ${p.id === opts.p ? 'checked' : ''}><span>${p.nome}</span></label>`).join('')}
          </div>
        </fieldset>
        <label class="campo">Observação <textarea name="n" rows="2" placeholder="Ex.: o Leo fica na barraca com a Lizete">${esc(opts.n || '')}</textarea></label>
        <div class="aviso-form" id="aviso-form" aria-live="polite"></div>
        ${novo ? '' : `<div class="acoes-sec">
          <button type="button" class="btn" data-action="grupo-item" data-id="${opts.id}">${icon('swap')}Outras opções</button>
          <button type="button" class="btn" data-action="saber" data-a="${a.id}">${icon('info')}Saber mais</button>
          <button type="button" class="btn perigo" data-action="remover" data-id="${opts.id}">${icon('trash')}Remover</button>
        </div>`}
        <div class="sh-rodape">
          <button type="button" class="btn" data-action="fechar">Cancelar</button>
          <button type="submit" class="btn primary grande">${novo ? 'Adicionar' : 'Salvar'}</button>
        </div>
      </form>
    `, { tipo: 'item', ...opts, q: [...opts.q] });
    atualizarForm();
  }
  function lerFormItem(form) {
    const fd = new FormData(form);
    return { q: [...ctxSheet.q], d: fd.get('d'), h: fd.get('h') || '', p: fd.get('p'), n: (fd.get('n') || '').trim(), empurrar: fd.get('empurrar') === 'on' };
  }
  function atualizarForm() {
    const form = sheetBody.querySelector('[data-form="item"]');
    if (!form || !ctxSheet) return;
    const v = lerFormItem(form);
    const perH = periodoDe(v.h);
    form.querySelector('.so-sem-hora').hidden = !!perH;
    if (perH) form.querySelector(`input[name="p"][value="${perH}"]`).checked = true;
    const emp = form.querySelector('.empurrar');
    const antes = paraMin(ctxSheet.h);
    const depois = paraMin(v.h);
    let mostrarEmp = false;
    if (ctxSheet.modo === 'editar' && antes != null && depois != null && antes !== depois && v.d === ctxSheet.d) {
      const n = state.dias[ctxSheet.d].itens.filter((it) => it.id !== ctxSheet.id && paraMin(it.h) != null && paraMin(it.h) > antes && it.q.some((id) => v.q.includes(id))).length;
      if (n) {
        mostrarEmp = true;
        $('#empurrar-txt').textContent = `Mover junto os ${n} programa(s) seguinte(s) dessas pessoas neste dia (${deltaTxt(depois - antes)})`;
      }
    }
    emp.hidden = !mostrarEmp;
    const avisos = avisosDoItem({ a: ctxSheet.a, q: v.q, p: v.p }, v.d);
    $('#aviso-form').innerHTML = avisos.map((x) => `<p class="aviso">${icon('alert')}${esc(x)}</p>`).join('');
  }

  /* ---- Planos prontos do dia ---- */
  function sheetAlternativas(iso) {
    const info = infoDia(iso);
    const dia = state.dias[iso];
    abrirSheet(`
      ${sheetHead('Planos para o dia', dataLonga(iso))}
      <p class="sub">Escolha um plano pronto e depois ajuste à vontade.${dia.editado ? ' <b>Atenção:</b> isso substitui as mudanças que você fez neste dia.' : ''}</p>
      <div class="alternativas">
        ${info.planos.map((pl, k) => {
          const atual = dia.plano === k;
          const emUso = atual && !dia.editado;
          return `<article class="alt ${atual ? 'atual' : ''}">
            <header><h3>${esc(pl.nome)}</h3>${atual ? `<span class="badge">${dia.editado ? 'Atual, editado' : 'Atual'}</span>` : ''}</header>
            <p>${esc(pl.resumo)}</p>
            <ol class="alt-lista">${pl.itens.map((it) => {
              const a = atividade(it.a);
              const ids = expandirQuem(it.q);
              return `<li><span class="alt-h">${esc(it.h || '')}</span><span class="alt-nome">${esc(a.nome)}</span><span class="alt-quem">${esc(nomesDe(ids))}</span></li>`;
            }).join('')}</ol>
            <div class="alt-acoes">
              <button class="btn ${emUso ? '' : 'primary'}" data-action="usar-plano" data-d="${iso}" data-k="${k}" ${emUso ? 'disabled' : ''}>${emUso ? 'Em uso' : 'Usar este plano'}</button>
            </div>
          </article>`;
        }).join('')}
        <article class="alt">
          <header><h3>Começar do zero</h3></header>
          <p>Limpa o dia para você montar com os programas que quiser.</p>
          <div class="alt-acoes"><button class="btn" data-action="limpar-dia" data-d="${iso}">Limpar dia</button></div>
        </article>
      </div>
    `, { tipo: 'alternativas', d: iso });
  }

  /* ---- Programa personalizado ---- */
  function sheetCustom(plan) {
    abrirSheet(`
      ${sheetHead('Novo programa', 'Algo que não está na lista: um restaurante indicado, visita a amigos…')}
      <form class="form" data-form="custom">
        <label class="campo">Nome <input name="nome" required placeholder="Ex.: Almoço no restaurante X" autofocus></label>
        <label class="campo">Onde <input name="local" placeholder="Bairro, cidade"></label>
        <label class="campo">Descrição <textarea name="resumo" rows="2"></textarea></label>
        <div class="linha2">
          <label class="campo">Tempo
            <select name="clima">${Object.entries(NIVEIS_CLIMA).map(([k, v]) => `<option value="${k}" ${k === 'misto' ? 'selected' : ''}>${esc(v.nome)}</option>`).join('')}</select>
          </label>
          <label class="campo">Custo
            <select name="custo">${Object.entries(NIVEIS_CUSTO).map(([k, v]) => `<option value="${k}" ${k === 'medio' ? 'selected' : ''}>${esc(v.nome)}</option>`).join('')}</select>
          </label>
        </div>
        <div class="sh-rodape"><button class="btn primary grande" type="submit">${plan ? `Criar e escolher para ${esc(nomesDe(plan.q))}` : 'Criar'}</button></div>
      </form>
    `, { tipo: 'custom', plan });
  }

  /* ---- Ajustes ---- */
  function sheetAjustes() {
    abrirSheet(`
      ${sheetHead('Ajustes', 'Pessoas, voos e dados do roteiro')}
      <h3 class="sh-sub">Pessoas</h3>
      <p class="sub">Marque "ritmo leve" em quem prefere passeios tranquilos: o app avisa quando algo for puxado demais.</p>
      <ul class="pessoas-edit">
        ${state.pessoas.map((p) => `<li>
          ${avatar(p)}
          <input value="${esc(p.nome)}" data-input="pessoa-nome" data-id="${p.id}" aria-label="Nome" maxlength="20">
          <input class="sigla" value="${esc(sigla(p))}" data-input="pessoa-sigla" data-id="${p.id}" aria-label="Sigla de ${esc(p.nome)} (até 2 letras)" maxlength="2">
          <span class="tipo">${TIPOS[p.tipo] || ''}</span>
          ${p.tipo === 'idoso' || p.tipo === 'adulto' ? `<label class="leve"><input type="checkbox" data-input="pessoa-leve" data-id="${p.id}" ${p.leve ? 'checked' : ''}> ritmo leve</label>` : ''}
        </li>`).join('')}
      </ul>
      <h3 class="sh-sub">Voos</h3>
      <div class="linha2">
        <label class="campo">Pouso em Fortaleza (dia 11)<input type="time" data-input="voo-pouso" value="${esc(state.voo.pouso)}"></label>
        <label class="campo">Voo de volta (dia 18)<input type="time" data-input="voo-volta" value="${esc(state.voo.volta)}"></label>
      </div>
      <p class="sub">Ao mudar um horário de voo, os programas daquele dia se ajustam juntos.</p>
      <h3 class="sh-sub">Compartilhar e guardar</h3>
      <p class="sub">O roteiro fica salvo neste aparelho. Para passar para outra pessoa, gere um link ou um arquivo.</p>
      <div class="grade-botoes">
        <button class="btn" data-action="compartilhar">${icon('share')}Gerar link</button>
        <button class="btn" data-action="exportar">Baixar arquivo</button>
        <label class="btn">Abrir arquivo<input type="file" accept="application/json,.json" data-input="importar" hidden></label>
      </div>
      <h3 class="sh-sub">Recomeçar</h3>
      <div class="grade-botoes">
        <button class="btn" data-action="desmarcar-feitos">Desmarcar todos os feitos</button>
        <button class="btn perigo" data-action="resetar">Voltar ao roteiro sugerido</button>
      </div>
    `, { tipo: 'ajustes' });
  }

  async function sheetCompartilhar() {
    let link = '';
    try { link = `${location.origin}${location.pathname}#r=${await empacotar(dadosParaCompartilhar())}`; }
    catch (e) { link = ''; }
    abrirSheet(`
      ${sheetHead('Compartilhar roteiro', 'Quem abrir o link recebe uma cópia do roteiro atual')}
      ${location.protocol === 'file:' ? `<p class="aviso">${icon('alert')}O app está aberto como arquivo local. O link só funciona depois de publicado (GitHub Pages). Por enquanto, use "Baixar arquivo".</p>` : ''}
      <label class="campo">Link <textarea readonly rows="4" class="mono" id="link-share">${esc(link)}</textarea></label>
      <div class="grade-botoes">
        <button class="btn primary" data-action="copiar-link">Copiar link</button>
        ${navigator.share ? `<button class="btn" data-action="share-nativo">${icon('share')}Enviar…</button>` : ''}
        <button class="btn" data-action="exportar">Baixar arquivo</button>
      </div>
      <p class="sub">Cada aparelho guarda a sua própria versão. Depois de mexer, gere um novo link para atualizar os outros.</p>
    `, { tipo: 'compartilhar', link });
  }

  function sheetConfirmar(titulo, texto, acaoOk, rotuloOk, perigo) {
    abrirSheet(`
      ${sheetHead(titulo)}
      <p>${texto}</p>
      <div class="sh-rodape">
        <button class="btn" data-action="fechar">Cancelar</button>
        <button class="btn ${perigo ? 'perigo-cheio' : 'primary'} grande" data-action="confirmar-ok">${rotuloOk}</button>
      </div>
    `, { tipo: 'confirmar', ok: acaoOk });
  }

  /* ---------------- compartilhamento ---------------- */
  function dadosParaCompartilhar() {
    const dias = {};
    DATAS.forEach((d) => {
      const x = state.dias[d];
      dias[d] = { plano: x.plano, editado: x.editado, nota: x.nota, itens: x.itens.map(({ a, p, h, q, n, f }) => ({ a, p, h, q, n, f })) };
    });
    return { v: 2, pessoas: state.pessoas, voo: state.voo, dias, custom: state.custom, check: state.check, favs: state.favs };
  }
  function b64url(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function deB64url(str) {
    const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }
  async function empacotar(obj) {
    const json = JSON.stringify(obj);
    if ('CompressionStream' in window) {
      const stream = new Blob([json]).stream().pipeThrough(new CompressionStream('deflate-raw'));
      return 'z' + b64url(new Uint8Array(await new Response(stream).arrayBuffer()));
    }
    return 'j' + b64url(new TextEncoder().encode(json));
  }
  async function desempacotar(str) {
    const bytes = deB64url(str.slice(1));
    if (str[0] === 'z') {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return JSON.parse(await new Response(stream).text());
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function importarDados(obj) {
    if (!obj || !obj.dias) throw new Error('Arquivo inválido');
    state = normalizar(obj);
    salvar();
    render();
  }
  async function verificarHash() {
    const m = location.hash.match(/^#r=(.+)$/);
    if (!m) return;
    history.replaceState(null, '', location.pathname + location.search);
    try {
      const dados = await desempacotar(m[1]);
      mostrar(sheetConfirmar, 'Abrir roteiro compartilhado?', 'Alguém te mandou um roteiro. Abrir substitui o roteiro salvo neste aparelho.', () => { importarDados(dados); toast('Roteiro importado'); }, 'Abrir roteiro');
    } catch (e) {
      toast('Não consegui ler o link compartilhado');
    }
  }
  function exportarArquivo() {
    const blob = new Blob([JSON.stringify(dadosParaCompartilhar(), null, 1)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roteiro-ceara-2026-${hojeISO()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  let desfazer = null;
  function toast(msg, undoFn) {
    const el = $('#toast');
    desfazer = undoFn || null;
    el.innerHTML = `<span>${esc(msg)}</span>${undoFn ? `<button data-action="desfazer">${icon('undo')}Desfazer</button>` : ''}`;
    el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('on'), undoFn ? 7000 : 2600);
  }

  /* ---------------- render ---------------- */
  function cabecalho() {
    const falta = diffDias(hoje, TRIP.inicio);
    const passou = diffDias(TRIP.fim, hoje);
    let sub;
    if (falta > 0) sub = `Faltam <b>${falta}</b> dia${falta > 1 ? 's' : ''} · 11 a 18 de outubro`;
    else if (passou > 0) sub = 'Viagem concluída';
    else sub = `Dia <b>${DATAS.indexOf(hoje) + 1}</b> de ${DATAS.length} · aproveitem!`;
    $('#sub-cabecalho').innerHTML = sub;
  }
  function render() {
    cabecalho();
    const main = $('#main');
    const views = { roteiro: viewRoteiro, semana: viewSemana, explorar: viewExplorar, dicas: viewDicas };
    main.innerHTML = (views[ui.view] || viewRoteiro)();
    main.dataset.view = ui.view;
    document.querySelectorAll('.tab').forEach((t) => {
      const on = t.dataset.view === ui.view;
      t.classList.toggle('on', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    if (ui.view === 'roteiro') {
      const faixa = main.querySelector('.faixa-dias');
      const ativo = main.querySelector('.chip-dia.ativo');
      if (faixa && ativo) faixa.scrollLeft = ativo.offsetLeft - faixa.clientWidth / 2 + ativo.clientWidth / 2;
    }
  }
  function irPara(view, opts = {}) {
    ui.view = view;
    if (opts.dia) ui.dia = opts.dia;
    salvarUI();
    render();
    window.scrollTo({ top: 0 });
  }
  function acharItem(id) {
    for (const d of DATAS) {
      const it = state.dias[d].itens.find((i) => i.id === id);
      if (it) return { d, it };
    }
    return null;
  }
  function togglePessoa(sel, el) {
    if (el.dataset.g) {
      const g = GRUPOS[el.dataset.g].pessoas;
      const igual = g.length === sel.length && g.every((id) => sel.includes(id));
      sel.length = 0;
      if (!igual) g.forEach((id) => sel.push(id));
    } else {
      const i = sel.indexOf(el.dataset.id);
      if (i >= 0) sel.splice(i, 1); else sel.push(el.dataset.id);
    }
  }
  function atualizarSeletor(container, sel) {
    container.querySelectorAll('.pessoa-opt').forEach((b) => { const on = sel.includes(b.dataset.id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    container.querySelectorAll('.atalhos-grupo .chip').forEach((b) => {
      const g = GRUPOS[b.dataset.g].pessoas;
      const on = g.length === sel.length && g.every((id) => sel.includes(id));
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    });
  }

  function mudarVoo(tipo, valor) {
    if (!valor) return;
    const iso = tipo === 'pouso' ? DATAS[0] : DATAS[DATAS.length - 1];
    const delta = paraMin(valor) - paraMin(state.voo[tipo]);
    if (!delta) return;
    const antes = clone(state);
    state.voo[tipo] = valor;
    // pouso: move o que vem depois da chegada; volta: move o dia inteiro
    const n = deslocar(iso, tipo === 'pouso' ? paraMin(antes.voo.pouso) : 0, delta);
    state.dias[iso].editado = true;
    salvar(); render();
    if (ctxSheet?.tipo === 'ajustes') substituir(sheetAjustes);
    toast(`${n} programa(s) de ${dataCurta(iso)} ajustado(s) (${deltaTxt(delta)})`, () => { state = antes; salvar(); render(); });
  }

  /* ---------------- eventos ---------------- */
  document.addEventListener('click', async (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) { if (e.target === sheetEl) fecharSheet(); return; }
    const act = el.dataset.action;
    switch (act) {
      case 'tab': irPara(el.dataset.view); break;
      case 'ir-dia': ui.dia = el.dataset.d; salvarUI(); render(); break;
      case 'abrir-dia': if (!sheetEl.hidden) fecharSheet(); irPara('roteiro', { dia: el.dataset.d }); break;
      case 'dia-ant': case 'dia-prox': {
        const i = DATAS.indexOf(ui.dia) + (act === 'dia-ant' ? -1 : 1);
        if (DATAS[i]) { ui.dia = DATAS[i]; salvarUI(); render(); }
        break;
      }
      case 'fechar': fecharSheet(); break;
      case 'voltar': voltarSheet(); break;
      case 'alternativas': mostrar(sheetAlternativas, el.dataset.d || ui.dia); break;
      case 'usar-plano': {
        const iso = el.dataset.d;
        const k = Number(el.dataset.k);
        const antes = clone(state);
        state.dias[iso] = { plano: k, editado: false, nota: state.dias[iso].nota, itens: itensDoPlano(infoDia(iso).planos[k]) };
        if (iso === DATAS[0]) deslocar(iso, paraMin(VOO_PADRAO.pouso), paraMin(state.voo.pouso) - paraMin(VOO_PADRAO.pouso));
        if (iso === DATAS[DATAS.length - 1]) deslocar(iso, 0, paraMin(state.voo.volta) - paraMin(VOO_PADRAO.volta));
        salvar(); fecharSheet(); render();
        toast(`Plano "${infoDia(iso).planos[k].nome}" aplicado`, () => { state = antes; salvar(); render(); });
        break;
      }
      case 'limpar-dia': {
        const iso = el.dataset.d;
        const antes = clone(state);
        Object.assign(state.dias[iso], { itens: [], plano: null, editado: true });
        salvar(); fecharSheet(); render();
        toast('Dia limpo', () => { state = antes; salvar(); render(); });
        break;
      }
      case 'planejar': {
        const d = el.dataset.d || ui.dia;
        const p = el.dataset.p;
        const livres = livresNoPeriodo(d, p).map((x) => x.id);
        const q = el.dataset.q ? el.dataset.q.split(',') : (livres.length ? livres : todasPessoas());
        mostrar(sheetPlanejar, novoCtxPlan({ d, p, q }));
        break;
      }
      case 'grupo-item': {
        const r = acharItem(el.dataset.id);
        if (r) mostrar(sheetPlanejar, novoCtxPlan({ d: r.d, p: r.it.p, h: r.it.h, itemId: r.it.id, q: [...r.it.q] }, el.dataset.chuva ? 'chuva' : null));
        break;
      }
      case 'plan-pessoa': {
        const ctx = ctxSheet.ref;
        const st = sheetBody.scrollTop;
        togglePessoa(ctx.q, el);
        substituir(sheetPlanejar, ctx);
        sheetBody.scrollTop = st;
        break;
      }
      case 'plan-tempo': case 'plan-custo': {
        const ctx = ctxSheet.ref;
        const st = sheetBody.scrollTop;
        ctx[act === 'plan-tempo' ? 'tempo' : 'custo'] = el.dataset.v;
        substituir(sheetPlanejar, ctx);
        sheetBody.scrollTop = st;
        break;
      }
      case 'item-pessoa': togglePessoa(ctxSheet.q, el); atualizarSeletor(sheetBody, ctxSheet.q); atualizarForm(); break;
      case 'escolher': {
        const plan = ctxSheet && (ctxSheet.tipo === 'planejar' ? ctxSheet.ref : ctxSheet.plan);
        if (plan) escolherPrograma(plan, el.dataset.a);
        break;
      }
      case 'saber': {
        const plan = ctxSheet ? (ctxSheet.tipo === 'planejar' ? ctxSheet.ref : ctxSheet.tipo === 'saber' ? ctxSheet.plan : null) : null;
        mostrar(sheetSaber, el.dataset.a, plan);
        break;
      }
      case 'add-de-saber': {
        const a = atividade(el.dataset.a);
        const per = (a.periodos && a.periodos[0]) || 'manha';
        mostrar(sheetItem, { modo: 'novo', a: a.id, d: ui.dia, p: per, h: horaSugerida(ui.dia, per, todasPessoas()), q: todasPessoas(), n: '' });
        break;
      }
      case 'custom-novo': mostrar(sheetCustom, ctxSheet && ctxSheet.tipo === 'planejar' ? ctxSheet.ref : null); break;
      case 'editar': {
        const r = acharItem(el.dataset.id);
        if (r) mostrar(sheetItem, { modo: 'editar', id: r.it.id, a: r.it.a, d: r.d, p: r.it.p, h: r.it.h, q: r.it.q, n: r.it.n });
        break;
      }
      case 'feito': {
        const r = acharItem(el.dataset.id);
        if (r) { r.it.f = !r.it.f; salvar(); render(); }
        break;
      }
      case 'remover': {
        const r = acharItem(el.dataset.id);
        if (!r) break;
        const antes = clone(state);
        state.dias[r.d].itens = state.dias[r.d].itens.filter((i) => i.id !== r.it.id);
        state.dias[r.d].editado = true;
        salvar(); fecharSheet(); render();
        toast(`${atividade(r.it.a)?.nome || 'Programa'} removido`, () => { state = antes; salvar(); render(); });
        break;
      }
      case 'fav': {
        const id = el.dataset.a;
        const i = state.favs.indexOf(id);
        if (i >= 0) state.favs.splice(i, 1); else state.favs.push(id);
        salvar();
        el.setAttribute('aria-pressed', String(i < 0));
        el.innerHTML = `${icon('star', i < 0 ? 'cheio' : '')}${i < 0 ? 'Favorito' : 'Favoritar'}`;
        if (ui.view === 'explorar') render();
        break;
      }
      case 'apagar-custom': {
        const id = el.dataset.a;
        mostrar(sheetConfirmar, 'Apagar programa?', 'Ele também sai de todos os dias do roteiro.', () => {
          state.custom = state.custom.filter((c) => c.id !== id);
          DATAS.forEach((d) => { state.dias[d].itens = state.dias[d].itens.filter((i) => i.a !== id); });
          salvar(); render(); toast('Programa apagado');
        }, 'Apagar', true);
        break;
      }
      case 'cat': ui.cat = el.dataset.c; salvarUI(); render(); break;
      case 'filtro': {
        const f = el.dataset.f;
        ui.filtros = ui.filtros.includes(f) ? ui.filtros.filter((x) => x !== f) : [...ui.filtros, f];
        salvarUI(); render();
        break;
      }
      case 'semana-pessoa': ui.semanaPessoa = el.dataset.id; salvarUI(); render(); break;
      case 'ajustes': mostrar(sheetAjustes); break;
      case 'compartilhar': mostrar(sheetCompartilhar); break;
      case 'copiar-link': {
        const t = $('#link-share');
        try { await navigator.clipboard.writeText(t.value); } catch (err) { t.select(); document.execCommand('copy'); }
        toast('Link copiado');
        break;
      }
      case 'share-nativo':
        try { await navigator.share({ title: 'Roteiro Ceará 2026', text: 'Nosso roteiro no Ceará', url: ctxSheet.link }); } catch (err) { /* cancelado */ }
        break;
      case 'exportar': exportarArquivo(); toast('Arquivo baixado'); break;
      case 'desmarcar-feitos': DATAS.forEach((d) => state.dias[d].itens.forEach((i) => { i.f = false; })); salvar(); render(); toast('Marcações limpas'); break;
      case 'resetar':
        mostrar(sheetConfirmar, 'Voltar ao roteiro sugerido?', 'Todas as mudanças nos dias serão perdidas. Nomes, checklists e favoritos são mantidos; os voos voltam ao padrão.', () => {
          const antes = clone(state);
          const base = estadoPadrao();
          state = { ...base, pessoas: state.pessoas, check: state.check, favs: state.favs, custom: state.custom };
          salvar(); render();
          toast('Roteiro sugerido restaurado', () => { state = antes; salvar(); render(); });
        }, 'Restaurar', true);
        break;
      case 'confirmar-ok': { const fn = ctxSheet && ctxSheet.ok; fecharSheet(); if (fn) fn(); break; }
      case 'desfazer': if (desfazer) { desfazer(); desfazer = null; $('#toast').classList.remove('on'); } break;
      default: break;
    }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.dataset.form === 'item') {
      e.preventDefault();
      const v = lerFormItem(form);
      const c = ctxSheet;
      const antes = clone(state);
      const p = periodoDe(v.h) || v.p;
      if (c.modo === 'novo') {
        state.dias[v.d].itens.push({ id: uid(), a: c.a, p, h: v.h, q: v.q, n: v.n, f: false });
        state.dias[v.d].editado = true;
        salvar(); fecharSheet();
        ui.dia = v.d; if (ui.view !== 'semana') ui.view = 'roteiro';
        salvarUI(); render();
        toast(`Adicionado em ${dataCurta(v.d)}${v.h ? ` às ${v.h}` : ''}`, () => { state = antes; salvar(); render(); });
      } else {
        const r = acharItem(c.id);
        let extra = '';
        if (r) {
          const hAntes = paraMin(r.it.h);
          const empurrarVisivel = !form.querySelector('.empurrar').hidden;
          Object.assign(r.it, { p, h: v.h, q: v.q, n: v.n });
          if (r.d !== v.d) {
            state.dias[r.d].itens = state.dias[r.d].itens.filter((i) => i.id !== r.it.id);
            state.dias[v.d].itens.push(r.it);
            state.dias[v.d].editado = true;
          } else if (v.empurrar && empurrarVisivel) {
            const delta = paraMin(v.h) - hAntes;
            const n = deslocar(r.d, hAntes + 1, delta, v.q, r.it.id);
            if (n) extra = ` · ${n} programa(s) seguinte(s) ${deltaTxt(delta)}`;
          }
          state.dias[r.d].editado = true;
          salvar();
        }
        fecharSheet(); render();
        toast(`Salvo${extra}`, () => { state = antes; salvar(); render(); });
      }
    } else if (form.dataset.form === 'custom') {
      e.preventDefault();
      const fd = new FormData(form);
      const nome = (fd.get('nome') || '').trim();
      if (!nome) return;
      const local = (fd.get('local') || '').trim();
      const nova = { id: 'c' + Math.random().toString(36).slice(2, 8), nome, cat: 'custom', local, resumo: (fd.get('resumo') || '').trim(), periodos: null, dias: null, maps: `${nome} ${local}`, dur: 90, clima: fd.get('clima') || 'misto', custo: fd.get('custo') || null };
      state.custom.push(nova);
      salvar();
      const plan = ctxSheet.plan;
      if (plan) escolherPrograma(plan, nova.id);
      else { fecharSheet(); render(); toast('Programa criado'); }
    }
  });

  let buscaTimer = null;
  document.addEventListener('input', (e) => {
    const el = e.target;
    const tipo = el.dataset.input;
    if (!tipo) { if (el.closest('[data-form="item"]')) atualizarForm(); return; }
    if (tipo === 'nota-dia') { state.dias[ui.dia].nota = el.value; salvar(); }
    else if (tipo === 'busca') {
      ui.busca = el.value;
      clearTimeout(buscaTimer);
      buscaTimer = setTimeout(() => { const g = $('#cards-grid'); if (g) g.innerHTML = cardsAtividades(filtrarAtividades()); }, 120);
    } else if (tipo === 'busca-plan') {
      ctxSheet.ref.busca = el.value;
      $('#plan-lista').innerHTML = listaPlanejar(ctxSheet.ref);
    } else if (tipo === 'pessoa-sigla') {
      const p = pessoa(el.dataset.id);
      if (p && el.value.trim()) { p.sigla = el.value.trim(); salvar(); render(); }
    } else if (tipo === 'pessoa-nome') {
      const p = pessoa(el.dataset.id);
      if (p && el.value.trim()) { p.nome = el.value.trim(); salvar(); render(); }
    }
  });

  document.addEventListener('change', async (e) => {
    const el = e.target;
    const tipo = el.dataset.input;
    if (el.closest('[data-form="item"]')) { atualizarForm(); return; }
    if (tipo === 'check') {
      if (el.checked) state.check[el.dataset.k] = true; else delete state.check[el.dataset.k];
      salvar(); render();
    } else if (tipo === 'pessoa-leve') {
      const p = pessoa(el.dataset.id);
      if (p) { p.leve = el.checked; salvar(); render(); }
    } else if (tipo === 'voo-pouso') mudarVoo('pouso', el.value);
    else if (tipo === 'voo-volta') mudarVoo('volta', el.value);
    else if (tipo === 'importar') {
      const file = el.files && el.files[0];
      if (!file) return;
      try {
        const obj = JSON.parse(await file.text());
        mostrar(sheetConfirmar, 'Abrir este arquivo?', 'Isso substitui o roteiro salvo neste aparelho.', () => { try { importarDados(obj); toast('Roteiro importado'); } catch (err) { toast('Arquivo inválido'); } }, 'Abrir');
      } catch (err) { toast('Não consegui ler o arquivo'); }
    }
  });

  document.addEventListener('toggle', (e) => {
    const id = e.target.dataset && e.target.dataset.bloco;
    if (!id) return;
    if (e.target.open) blocosAbertos.add(id); else blocosAbertos.delete(id);
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sheetEl.hidden) fecharSheet();
  });

  /* ---------------- início ---------------- */
  document.querySelectorAll('[data-icon]').forEach((el) => { el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)); });
  render();
  verificarHash();
  carregarTempo();
  window.addEventListener('hashchange', verificarHash);

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
