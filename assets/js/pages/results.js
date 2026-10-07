(function () {
  const M = GC.model, root = document.getElementById("app");
  const params = new URLSearchParams(location.search);
  const dirKey = params.get("dir"), score = Number(params.get("score"));
  if (!GC.DIRECTIONS[dirKey] || params.get("score") === null || !(score >= 0 && score <= 140)) {
    root.innerHTML = `<div class="card">No valid input found. <a href="index.html">Go back to the calculator</a>.</div>`; return;
  }
  const stats = M.summarize(score), cur = stats.find(s => s.key === dirKey), r = M.risk(cur.chance);
  const badge = p => { const k = M.risk(p); return `<span class="badge ${k.cls}">${k.label}</span>`; };
  const bar = p => `<div class="bar"><i class="fill-${M.risk(p).cls.slice(5)}" style="width:${p}%"></i></div>`;

  // 1. Main result
  let note = `Best chance: ${cur.best.uni}, "${cur.best.program}". This field has ${cur.dir.competition} applicants per place.`;
  if (score < cur.minThreshold) note = `Your score is below every university threshold in this field (the lowest is ${cur.minThreshold}), so you cannot enter this competition.`;
  else if (cur.chance < M.SAFE_LEVEL) note += ` You need about ${cur.need} points for a ${M.SAFE_LEVEL}% chance.`;
  const summary = `<div class="result ${r.cls}"><p><b>${cur.dir.name} (${cur.dir.code}) · ${score} points</b></p>
    <div class="row center" style="justify-content:flex-start;gap:16px;flex-wrap:wrap"><span class="big display">${cur.chance}%</span><span class="badge">${r.label}</span></div><p>${note}</p></div>`;

  // 2. Safer field suggestion
  const better = stats.filter(s => s.key !== dirKey && s.chance > cur.chance).sort((a, b) => b.chance - a.chance)[0];
  let safe;
  if (cur.chance >= M.SAFE_LEVEL) {
    safe = `<h2>This field is safe for your score</h2><p>Your chance is above ${M.SAFE_LEVEL}%. Add one or two more programs to your shortlist as backups.</p>`;
  } else if (!better) {
    safe = `<h2>No safer field available</h2><p>Your choice already has the best chances among Mathematics–Informatics fields. The nearest safe level is ${cur.need} points.</p>`;
  } else {
    const ok = better.chance >= M.SAFE_LEVEL;
    safe = `<h2>${ok ? "Safe field for your score" : "Closest to a safe option"}</h2>
      <div class="row center" style="justify-content:flex-start;gap:14px;flex-wrap:wrap;margin-top:10px"><span class="big">${better.chance}%</span>${badge(better.chance)}
      <div><b>${better.dir.name} (${better.dir.code})</b><div class="muted small">${better.dir.competition} applicants per place · best university: ${better.best.uni}</div></div></div>
      <p>${ok ? "Competition is lower here and the university thresholds fit your score." : `A ${M.SAFE_LEVEL}% chance starts at about ${better.need} points in this field.`}</p>`;
  }

  // 3. Universities
  const inList = id => GC.store.shortlist().indexOf(id) !== -1;
  const unis = cur.programs.map(p => `<div class="card"><div class="row"><div><h3>${p.uni}</h3><div class="muted small">${p.program} · threshold ${p.threshold}</div></div>
    <div style="text-align:right"><div class="big" style="font-size:1.6rem">${p.chance}%</div>${score < p.threshold ? '<span class="badge risk-high">Below threshold</span>' : badge(p.chance)}</div></div>
    ${bar(p.chance)}<p style="margin-top:10px"><button class="link-btn" data-add="${p.id}">${inList(p.id) ? "In shortlist ✓" : "+ Add to shortlist"}</button></p></div>`).join("");

  // 4. All fields
  const all = stats.slice().sort((a, b) => b.chance - a.chance).map(s => `<div class="card ${s.key === dirKey ? "strong" : ""}"><div class="row">
    <div><h3>${s.dir.name}</h3><div class="muted small">${s.dir.code} · best university: ${s.best.uni} (threshold ${s.best.threshold}) · ${M.SAFE_LEVEL}% from ${s.need} points</div></div>
    <div class="big" style="font-size:1.6rem">${s.chance}%</div></div>${bar(s.chance)}</div>`).join("");

  root.innerHTML = `<a href="index.html">← Change score or field</a>${summary}<div class="card strong">${safe}</div>
    <section class="stack"><h2>Chances by university</h2><p class="muted small">Your score compared with 2026 university thresholds and the competition in this field.</p>${unis}</section>
    <section class="stack"><h2>All fields with your score</h2><p class="muted small">Best chance in each field and the score where the chance reaches ${M.SAFE_LEVEL}%.</p>${all}</section>`;

  root.addEventListener("click", function (e) {
    const id = e.target.getAttribute("data-add"); if (id === null) return;
    const list = GC.store.shortlist(), n = Number(id);
    if (list.indexOf(n) !== -1) return;
    if (list.length >= GC.store.MAX_SHORTLIST) { alert("An application can include at most 4 programs."); return; }
    list.push(n); GC.store.saveShortlist(list);
    e.target.textContent = "In shortlist ✓";
    document.getElementById("shortlist-count").textContent = list.length;
  });
})();
