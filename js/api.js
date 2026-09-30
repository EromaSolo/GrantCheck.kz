import { MAJORS_DB, SUBJECTS, APPLICATION_STEPS } from './data.js';

// Асинхронный интерфейс (Promise-based) для имитации запросов к REST API / БД
export async function fetchMajors() {
  return new Promise((resolve) => setTimeout(() => resolve(MAJORS_DB), 50));
}

export async function fetchMajorById(id) {
  return new Promise((resolve) => resolve(MAJORS_DB[id] || null));
}

export async function fetchSubjects() {
  return new Promise((resolve) => resolve(SUBJECTS));
}

export async function fetchSteps() {
  return new Promise((resolve) => resolve(APPLICATION_STEPS));
}

// Работа со списком выбранных специальностей (Shortlist) через localStorage
export function getShortlistFromStorage() {
  const saved = localStorage.getItem('grantcheck_shortlist');
  return saved ? JSON.parse(saved) : [];
}

export function saveShortlistToStorage(list) {
  localStorage.setItem('grantcheck_shortlist', JSON.stringify(list));
}