import { fetchMajors, fetchSubjects, getShortlistFromStorage, saveShortlistToStorage } from './api.js';

// Обновление счетчика в шапке сайта
export async function updateHeaderShortlistBadge() {
  const list = getShortlistFromStorage();
  const badge = document.getElementById('shortlist-count');
  if (badge) badge.textContent = list.length;
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderShortlistBadge();
});