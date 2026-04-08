// app/utils/favorites.ts

const FAVORITES_KEY = 'rebalance-favorites';

/** Получить массив id избранных ресурсов */
export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

/** Добавить ресурс в избранное */
export function addFavorite(id: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

/** Удалить ресурс из избранного */
export function removeFavorite(id: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index !== -1) {
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

/** Проверить, есть ли ресурс в избранном */
export function isFavorite(id: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(id);
}