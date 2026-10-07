// Chance model (a heuristic, not an official forecast).
// 1) Threshold = minimum to compete: score below it -> 1%.
// 2) The real grant cutoff sits only slightly above the threshold (calibrated on real cases: 93 and 99 points got grants at AITU Cybersecurity, threshold 93).
//    Required margin = (applicants per place - 1) * MARGIN_PER_APPLICANT: higher competition -> a bit more margin needed.
// 3) Chance = sigmoid((your margin - required margin) / SPREAD), clamped to 1..99.
GC.model = (function () {
  const MARGIN_PER_APPLICANT = 0.5, SPREAD = 3, SAFE_LEVEL = 75;
  const requiredMargin = dir => (dir.competition - 1) * MARGIN_PER_APPLICANT;

  function probability(score, program, dir) {
    const gap = score - program.threshold;
    if (gap < 0) return 1;
    const p = Math.round(100 / (1 + Math.exp(-(gap - requiredMargin(dir)) / SPREAD)));
    return Math.min(99, Math.max(1, p));
  }
  // Score at which the chance reaches `target` percent.
  function scoreFor(program, dir, target) {
    const t = (target || SAFE_LEVEL) / 100;
    return Math.ceil(program.threshold + requiredMargin(dir) + SPREAD * Math.log(t / (1 - t)));
  }
  function risk(p) {
    if (p >= 75) return { cls: "risk-low", label: "Low risk" };
    if (p >= 40) return { cls: "risk-mid", label: "Medium risk" };
    return { cls: "risk-high", label: "High risk" };
  }
  // Per-direction summary for a score: best program, best chance, score needed for SAFE_LEVEL.
  function summarize(score) {
    return Object.keys(GC.DIRECTIONS).map(key => {
      const dir = GC.DIRECTIONS[key];
      const progs = GC.PROGRAMS.filter(p => p.dir === key).map(p => Object.assign({ chance: probability(score, p, dir) }, p))
        .sort((a, b) => b.chance - a.chance);
      return { key, dir, programs: progs, best: progs[0], chance: progs[0].chance,
        need: Math.min.apply(null, progs.map(p => scoreFor(p, dir))), minThreshold: Math.min.apply(null, progs.map(p => p.threshold)) };
    });
  }
  return { MARGIN_PER_APPLICANT, SPREAD, SAFE_LEVEL, probability, scoreFor, risk, summarize };
})();
