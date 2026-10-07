// Shared header and footer, rendered into #site-header / #site-footer on every page.
(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  const link = (href, text, extra) => `<a href="${href}" class="${page === href ? "active" : ""}">${text}${extra || ""}</a>`;
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `<div class="container"><a class="brand display" href="index.html"><b>G</b>GrantCheck<span>.kz</span></a>
      <nav class="nav">${link("index.html", "Calculator")}${link("about.html", "About")}${link("shortlist.html", "Shortlist", ` (<span id="shortlist-count">${GC.store.shortlist().length}</span>)`)}</nav></div>`;
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `<div class="container">GrantCheck.kz · estimates based on 2026 university thresholds, not official forecasts</div>`;
  }
})();
