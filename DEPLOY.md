# 🚀 Деплой на Vercel

## Быстрый старт

### 1. Через веб-интерфейс Vercel (рекомендуется)

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте ваш GitHub репозиторий
4. Vercel автоматически определит настройки:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Нажмите "Deploy"

### 2. Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Деплой
vercel

# Продакшен деплой
vercel --prod
```

## Настройки проекта

Проект уже настроен для Vercel:

- ✅ `vercel.json` - конфигурация деплоя
- ✅ GitHub Actions для автоматического деплоя
- ✅ Правильная структура сборки

## Переменные окружения

Если нужны переменные окружения, добавьте их в настройках проекта Vercel:

- `VITE_API_URL` - URL вашего API
- `VITE_APP_NAME` - название приложения
- И другие переменные с префиксом `VITE_`

## Автоматический деплой

При каждом пуше в ветку `main`:

1. GitHub Actions запускает тесты
2. Если тесты проходят, автоматически деплоит на Vercel
3. Вы получаете уведомление о статусе деплоя

## Полезные ссылки

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vite + Vercel Guide](https://vercel.com/guides/deploying-vitejs-to-vercel)
