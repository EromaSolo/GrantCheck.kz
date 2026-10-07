(function () {
  const form = document.getElementById("subscribe-form"), msg = document.getElementById("msg");
  function show(text, ok) { msg.textContent = text; msg.className = ok ? "muted" : "error"; msg.hidden = false; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    fetch("/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email }) })
      .then(r => r.json().then(d => ({ ok: r.ok && d.ok, d: d })))
      .then(function (r) {
        if (!r.ok) return show(r.d.error || "Something went wrong. Try again.", false);
        show(r.d.status === "exists" ? "This email is already subscribed." : "Done! You are subscribed.", true);
        if (r.d.status === "added") form.reset();
      })
      .catch(function () { show("Subscriptions need the server. Run \"node server/server.js\" and open http://localhost:3000.", false); });
  });
})();
