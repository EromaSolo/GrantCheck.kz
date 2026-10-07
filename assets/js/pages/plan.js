(function () {
  const done = GC.store.checklist(), ul = document.getElementById("steps");
  ul.innerHTML = GC.STEPS.map((s, i) => `<li><input type="checkbox" id="s${i}" ${done[i] ? "checked" : ""}>
    <label for="s${i}"><b>${s[1]}</b><br><span class="muted small">${s[0]}</span></label></li>`).join("");
  ul.addEventListener("change", e => { done[e.target.id.slice(1)] = e.target.checked; GC.store.saveChecklist(done); });
})();
