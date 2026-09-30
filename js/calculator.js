export function calculateProbability(score, major) {
  // Математическая сигмоидальная модель расчета шансов
  const probability = Math.round(100 / (1 + Math.exp(-(score - major.c) / major.s)));
  return Math.min(99, Math.max(1, probability));
}

export function getRiskAssessment(probability) {
  if (probability >= 75) {
    return {
      level: "Низкий риск",
      cardBg: "bg-green-50 border-green-600",
      badgeBg: "bg-green-700 text-white"
    };
  } else if (probability >= 40) {
    return {
      level: "Средний риск",
      cardBg: "bg-yellow-50 border-yellow-500",
      badgeBg: "bg-yellow-500 text-slate-900"
    };
  } else {
    return {
      level: "Высокий риск",
      cardBg: "bg-red-50 border-red-600",
      badgeBg: "bg-red-700 text-white"
    };
  }
}