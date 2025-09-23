# Landing Page

Современная лендинг-страница, созданная с использованием React, TypeScript, Vite и TailwindCSS.

## 🚀 Технологии

- **React 18** - библиотека для создания пользовательских интерфейсов
- **TypeScript** - типизированный JavaScript
- **Vite** - быстрый инструмент сборки
- **TailwindCSS** - utility-first CSS фреймворк
- **React Hook Form** - библиотека для работы с формами
- **Yup** - схема валидации
- **React Query** - управление состоянием сервера
- **ESLint** - линтер для JavaScript/TypeScript
- **Prettier** - форматировщик кода
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD
- **Vercel** - хостинг и деплой

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd landing-page
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите проект в режиме разработки:

```bash
npm run dev
```

## 🛠️ Доступные команды

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта для продакшена
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода линтером
- `npm run lint:fix` - автоматическое исправление ошибок линтера
- `npm run format` - форматирование кода с помощью Prettier
- `npm run format:check` - проверка форматирования

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header.tsx      # Шапка сайта
│   ├── Hero.tsx        # Главная секция
│   ├── ContactForm.tsx # Форма обратной связи
│   └── Footer.tsx      # Подвал сайта
├── App.tsx             # Главный компонент
├── main.tsx            # Точка входа
└── index.css           # Глобальные стили
```

## 🔧 Настройка

### TailwindCSS

Конфигурация находится в `tailwind.config.js`. Вы можете настроить темы, цвета и другие параметры.

### ESLint

Конфигурация ESLint находится в `.eslintrc.cjs`. Настроены правила для TypeScript и React.

### Prettier

Конфигурация Prettier находится в `.prettierrc`. Настроено форматирование кода.

### Husky

Настроены pre-commit хуки для автоматического запуска линтера и форматировщика перед коммитом.

## 🚀 Деплой на Vercel

### Автоматический деплой через GitHub

1. **Подключите репозиторий к Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Импортируйте ваш GitHub репозиторий
   - Vercel автоматически определит настройки сборки

2. **Настройте переменные окружения (если нужны):**
   - В настройках проекта добавьте необходимые переменные
   - Например: `VITE_API_URL`, `VITE_APP_NAME` и т.д.

3. **Деплой:**
   - При каждом пуше в ветку `main` автоматически происходит деплой
   - Vercel создаст уникальный URL для каждого деплоя

### Ручной деплой через Vercel CLI

1. **Установите Vercel CLI:**

```bash
npm i -g vercel
```

2. **Войдите в аккаунт:**

```bash
vercel login
```

3. **Деплой:**

```bash
vercel
```

4. **Продакшен деплой:**

```bash
vercel --prod
```

### Настройка GitHub Actions для Vercel

Для автоматического деплоя через GitHub Actions добавьте следующие секреты в настройках репозитория:

- `VERCEL_TOKEN` - токен из Vercel Dashboard → Settings → Tokens
- `ORG_ID` - ID организации из Vercel Dashboard → Settings → General
- `PROJECT_ID` - ID проекта из Vercel Dashboard → Settings → General

## 🚀 CI/CD

Настроен GitHub Actions workflow для:

- Автоматического тестирования на Node.js 18.x и 20.x
- Проверки линтера и форматирования
- Сборки проекта
- Деплоя на Vercel (при пуше в main)

## 📝 Особенности

- ✅ Полностью настроенный TypeScript проект
- ✅ Современная сборка с Vite
- ✅ Стилизация с TailwindCSS
- ✅ Формы с валидацией (React Hook Form + Yup)
- ✅ Управление состоянием сервера (React Query)
- ✅ Автоматическое форматирование кода (Prettier)
- ✅ Проверка качества кода (ESLint)
- ✅ Git hooks для контроля качества (Husky)
- ✅ CI/CD pipeline (GitHub Actions + Vercel)
- ✅ Адаптивный дизайн
- ✅ Русская локализация
- ✅ Готов к деплою на Vercel

## 🎯 Готово к использованию

Проект полностью готов к разработке и деплою. Все инструменты настроены и работают корректно.

## 📝 Лицензия

MIT License
