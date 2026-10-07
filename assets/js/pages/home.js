(function () {
  const box = document.getElementById("directions");
  box.innerHTML = Object.keys(GC.DIRECTIONS).map((k, i) => {
    const d = GC.DIRECTIONS[k];
    return `<label class="option"><input type="radio" name="dir" value="${k}" ${i === 0 ? "checked" : ""}>
      <span class="box"><span class="row"><b>${d.name}</b><span class="muted small">${d.code}</span></span>
      <span class="muted small" style="display:block">${d.about}</span>
      <span style="display:block;margin-top:10px"><span class="big">${d.competition}</span> applicants per place</span>
      <span class="muted small">grants: ${d.grantsRange}</span></span></label>`;
  }).join("");

  document.getElementById("calc-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const score = Number(document.getElementById("score").value), err = document.getElementById("error");
    if (!(score >= 0 && score <= 140)) { err.textContent = "Enter a score between 0 and 140."; err.hidden = false; return; }
    const dir = document.querySelector("input[name=dir]:checked").value;
    location.href = `results.html?dir=${dir}&score=${score}`;
  });
})();
