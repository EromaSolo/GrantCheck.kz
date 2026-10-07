(function () {
  const box = document.getElementById("list"), planBtn = document.getElementById("plan-btn");
  function render() {
    const ids = GC.store.shortlist().filter(id => GC.PROGRAMS[id]);
    GC.store.saveShortlist(ids);
    document.getElementById("shortlist-count").textContent = ids.length;
    if (!ids.length) { box.innerHTML = `<div class="card muted">Your shortlist is empty. Calculate your chances and add programs.</div>`; planBtn.hidden = true; return; }
    planBtn.hidden = false;
    box.innerHTML = ids.map((id, i) => { const p = GC.PROGRAMS[id];
      return `<div class="card row center"><div class="row center" style="justify-content:flex-start;gap:14px"><span class="num">${i + 1}</span>
        <div><h3>${p.uni} — ${p.program}</h3><div class="muted small">${GC.DIRECTIONS[p.dir].code} · threshold ${p.threshold}</div></div></div>
        <div style="white-space:nowrap"><button class="link-btn" data-up="${i}" ${i === 0 ? "disabled" : ""} aria-label="Move up">▲</button>
        <button class="link-btn" data-down="${i}" ${i === ids.length - 1 ? "disabled" : ""} aria-label="Move down">▼</button>
        <button class="link-btn danger" data-del="${i}">Remove</button></div></div>`; }).join("");
  }
  box.addEventListener("click", function (e) {
    const t = e.target, list = GC.store.shortlist();
    const up = t.getAttribute("data-up"), down = t.getAttribute("data-down"), del = t.getAttribute("data-del");
    if (up !== null) { const i = +up; [list[i - 1], list[i]] = [list[i], list[i - 1]]; }
    else if (down !== null) { const i = +down; [list[i + 1], list[i]] = [list[i], list[i + 1]]; }
    else if (del !== null) list.splice(+del, 1);
    else return;
    GC.store.saveShortlist(list); render();
  });
  render();
})();
