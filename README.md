# Mindful Recharge 🧘‍♀️

**Progressive Web App для профилактики эмоционального выгорания и управления стрессом**

[![Deploy Status](https://img.shields.io/badge/PWA-Ready-success)](PWA_DEPLOYMENT.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React%20Router-v7-red)](https://reactrouter.com/)

---

## 📱 Что это?

Полнофункциональное веб-приложение для:
- ✅ Оценки эмоционального состояния (психологические тесты)
- ✅ Отслеживания прогресса развития эмоционального интеллекта
- ✅ Доступа к обучающим ресурсам (статьи, видео, упражнения)
- ✅ Работы в офлайн-режиме (PWA)
- ✅ Установки на мобильные устройства (без магазина)

---

## 🚀 Быстрый старт

### Локальная разработка:

```bash
npm install
npm run dev
```

Откройте: http://localhost:5173

### Production сборка:

```bash
npm run build
npm run start
```

Откройте: http://localhost:3000

---

## 📦 Деплой

### Vercel (рекомендуется):

```bash
npm install -g vercel
vercel
```

Или через GitHub: https://vercel.com → Import Repository

**Подробнее:** [PWA_DEPLOYMENT.md](PWA_DEPLOYMENT.md)

---

## 🛠️ Технологии

- **Frontend:** React 19, TypeScript, CSS Modules
- **Routing:** React Router v7 (SSR)
- **UI:** Radix UI, Lucide Icons
- **Charts:** Recharts
- **Backend:** React Router API Routes
- **PWA:** Service Worker, Web App Manifest
- **State:** React Hooks, Context

---

## 📂 Структура проекта

```
app/
├── routes/          # Страницы и API
├── components/      # React компоненты
├── services/        # Серверная логика
├── hooks/           # Пользовательские hooks
├── data/            # Моковые данные
└── styles/          # CSS стили

public/
├── manifest.json    # PWA манифест
├── service-worker.js # Офлайн-кэш
└── icons/           # Иконки
```

---

## 📱 PWA Возможности

- ✅ **Офлайн-режим** - работает без интернета
- ✅ **Установка** - как нативное приложение
- ✅ **Автообновления** - с уведомлениями
- ✅ **Ярлыки** - быстрый доступ к функциям
- ✅ **Push-уведомления** - ready to use

**Как установить на Android:**
1. Откройте в Chrome
2. Нажмите баннер "Установить"
3. Или: Menu → Add to Home Screen

---

## 🧪 Тестирование

### TypeCheck:
```bash
npm run typecheck
```

### Build проверка:
```bash
npm run build
```

### PWA на телефоне (локально):
```bash
npm run dev -- --host
# Откройте http://YOUR_IP:5173 на телефоне
```

---

## 📚 Документация

- **[QUICK_START.md](QUICK_START.md)** - Краткое руководство
- **[PWA_DEPLOYMENT.md](PWA_DEPLOYMENT.md)** - Деплой PWA
- **[APK_CREATION_GUIDE.md](APK_CREATION_GUIDE.md)** - Создание APK

---

## 🗺️ Roadmap

### ✅ Готово:
- [x] Основной функционал приложения
- [x] Серверная часть (API routes)
- [x] PWA с офлайн-поддержкой
- [x] Адаптивный дизайн
- [x] Аутентификация пользователей

### 🔄 В планах:
- [ ] Интеграция с базой данных (Supabase/PostgreSQL)
- [ ] Push-уведомления
- [ ] Персонализированные рекомендации (AI)
- [ ] Экспорт прогресса (PDF)
- [ ] Интеграция с календарем
- [ ] Социальные функции (сообщество)

---

## 🤝 Вклад

Приветствуются Pull Requests!

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменений (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📄 Лицензия

MIT License - см. LICENSE для деталей

---

## 💬 Поддержка

Вопросы? Создайте Issue или свяжитесь с командой.

---

**Готово к использованию!** 🎉 Задеплойте и протестируйте PWA прямо сейчас.
