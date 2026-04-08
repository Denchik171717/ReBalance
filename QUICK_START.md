# 🚀 Quick Start - PWA Development & Deployment

## ✅ Статус приложения: ГОТОВО К ТЕСТИРОВАНИЮ

Ваше приложение **Mindful Recharge** полностью готово к работе как Progressive Web App.

---

## 📱 Сейчас доступно

### Функционал:
- ✅ **Регистрация/Вход** пользователей
- ✅ **Психологическая оценка** (тест)
- ✅ **Отслеживание прогресса** (графики, статистика)
- ✅ **Обучающие ресурсы** (статьи, видео, упражнения)
- ✅ **Серверное хранилище** данных
- ✅ **Адаптивный дизайн** (мобильные + десктоп)

### PWA Возможности:
- ✅ **Офлайн-режим** (работает без интернета)
- ✅ **Установка на телефон** (как нативное приложение)
- ✅ **Автообновления** (с уведомлениями)
- ✅ **Push-уведомления** (готово к настройке)
- ✅ **Ярлыки** (быстрый доступ к тесту/прогрессу)

---

## 🖥️ Локальное тестирование

### Разработка:

```bash
npm install
npm run dev
```

Откройте: http://localhost:5173

### Production build локально:

```bash
npm run build
npm run start
```

Откройте: http://localhost:3000

### Тест PWA на телефоне (локальная сеть):

1. **Найдите IP компьютера:**
   - Windows: `ipconfig` → IPv4 Address
   - Mac: `ifconfig` → inet

2. **Запустите с доступом:**
```bash
npm run dev -- --host
```

3. **На телефоне:** откройте `http://YOUR_IP:5173`

---

## 🌐 Деплой (Рекомендуется: Vercel)

### Метод 1: Vercel (GUI) - Проще всего

1. **Push в GitHub:**
```bash
git init
git add .
git commit -m "PWA ready"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. **Vercel:**
   - https://vercel.com → New Project
   - Import GitHub репозиторий
   - Deploy (настройки определятся автоматически)

**Время:** 5 минут

### Метод 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Следуйте инструкциям.

### Метод 3: Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build/client
```

---

## 📲 Установка PWA на Android

### После деплоя:

1. **Откройте URL** в Chrome на Android
2. **Подождите** ~30 секунд
3. **Появится баннер** "Установить приложение"
4. **Нажмите "Установить"**
5. **Готово!** Иконка на главном экране

### Альтернативно:

Chrome Menu (`☰`) → `Add to Home Screen`

---

## 📦 Создание APK (Опционально)

Если PWA недостаточно, смотрите: **[APK_CREATION_GUIDE.md](APK_CREATION_GUIDE.md)**

**Требуется:**
- Android Studio (~8 GB)
- 2-3 часа времени

---

## 🔧 Текущая архитектура

### Frontend:
- **React Router v7** (SSR + Client routing)
- **TypeScript**
- **CSS Modules**
- **Radix UI** компоненты

### Backend:
- **React Router API Routes** (`/api/*`)
- **Cookie-based sessions**
- **In-memory storage** (легко мигрировать на БД)

### PWA:
- **Service Worker** (кэширование, офлайн)
- **Web App Manifest** (метаданные для установки)
- **Install/Update Prompts** (UI для пользователя)

---

## 🗂️ Структура файлов

```
app/
├── routes/              # Страницы приложения
│   ├── home.tsx         # Главная
│   ├── assessment.tsx   # Тест
│   ├── progress.tsx     # Прогресс
│   ├── resources.tsx    # Ресурсы
│   └── api/             # API эндпоинты
├── components/          # React компоненты
│   ├── ui/              # UI библиотека (Radix)
│   ├── header.tsx       # Шапка с навигацией
│   ├── auth-guard.tsx   # Защита маршрутов
│   ├── install-prompt.tsx   # Баннер установки
│   └── update-prompt.tsx    # Уведомление об обновлении
├── services/            # Бизнес-логика
│   ├── user.server.ts   # Управление пользователями
│   └── session.server.ts # Сессии
├── hooks/               # React hooks
│   ├── use-service-worker.ts # PWA логика
│   └── use-mobile.tsx   # Определение мобильных
├── data/                # Моковые данные
│   ├── assessments.ts   # Вопросы теста
│   ├── resources.ts     # Обучающие материалы
│   └── progress.ts      # Прогресс (будет из БД)
└── styles/              # Стили
    ├── theme.css        # Цветовая схема
    └── global.css       # Глобальные стили

public/
├── manifest.json        # PWA манифест
├── service-worker.js    # Service Worker (compiled)
├── offline.html         # Офлайн-страница
└── icons/               # Иконки приложения
```

---

## 📚 Документация

- **[PWA_DEPLOYMENT.md](PWA_DEPLOYMENT.md)** - Полная инструкция по деплою PWA
- **[APK_CREATION_GUIDE.md](APK_CREATION_GUIDE.md)** - Создание APK с Capacitor

---

## 🎯 Следующие шаги

### Для тестирования прямо сейчас:

1. **Задеплойте на Vercel** (5 минут)
2. **Откройте на телефоне** в Chrome
3. **Установите PWA** (баннер или меню)
4. **Протестируйте функционал:**
   - Регистрация/вход
   - Прохождение теста
   - Просмотр прогресса
   - Чтение ресурсов
   - Офлайн-режим (отключите интернет)

### Для production:

1. **Подключите БД:**
   - Включите Supabase в Dazl интеграциях
   - Или настройте PostgreSQL/MongoDB
   - Миграция из `services/user.server.ts`

2. **Добавьте аналитику:**
   - Google Analytics
   - Plausible
   - Sentry (для ошибок)

3. **Custom Domain:**
   - Купите домен
   - Настройте DNS в Vercel

4. **Опционально - Google Play:**
   - Создайте APK через Capacitor
   - Публикация в Play Store

---

## ⚡ Быстрые команды

```bash
# Разработка
npm run dev

# Production локально
npm run build && npm run start

# Деплой Vercel
vercel

# Typecheck
npm run typecheck

# Проверка сборки
npm run build
```

---

## 🐛 Поддержка

**Вопросы?** Пишите:
- Проблемы с деплоем → см. [PWA_DEPLOYMENT.md](PWA_DEPLOYMENT.md) Troubleshooting
- Создание APK → см. [APK_CREATION_GUIDE.md](APK_CREATION_GUIDE.md)
- Изменение дизайна → редактируйте `app/styles/theme.css`
- Добавление функций → создавайте issue/спрашивайте

---

## ✨ Готово к запуску!

Ваше приложение полностью функционально и готово к тестированию.

**Рекомендация:** Начните с деплоя на Vercel, протестируйте PWA, затем решайте нужен ли APK.
