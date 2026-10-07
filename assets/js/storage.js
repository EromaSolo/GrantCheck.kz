// Browser storage helpers (shortlist and checklist). Every call is wrapped: storage may be blocked.
GC.store = (function () {
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  return {
    MAX_SHORTLIST: 4,
    shortlist: () => read("gc_shortlist", []),
    saveShortlist: list => write("gc_shortlist", list),
    checklist: () => read("gc_checklist", {}),
    saveChecklist: obj => write("gc_checklist", obj)
  };
})();
