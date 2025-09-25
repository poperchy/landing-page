# Инструкция по деплою

## Обзор проекта

**Landing Page** - React приложение с формой регистрации, построенное на современном стеке:

- **React 18** + **TypeScript**
- **Vite** - быстрая сборка
- **TailwindCSS** - стилизация
- **React Hook Form** + **Yup** - формы и валидация
- **React Query** - управление серверным состоянием
- **ESLint** + **Prettier** - качество кода
- **Husky** - Git hooks

## Деплой на Vercel (Рекомендуется)

### 1. Подготовка

```bash
# Убедитесь что проект собирается
npm run build

# Проверьте линтер
npm run lint
```

### 2. Деплой через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Деплой
vercel

# Для продакшена
vercel --prod
```

### 3. Деплой через GitHub

1. **Подключите репозиторий к Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Подключите GitHub репозиторий

2. **Настройки сборки:**

   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Переменные окружения (если нужны):**
   ```
   VITE_API_URL=https://your-api.com
   ```

## Деплой через Docker

### 1. Создайте Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Nginx конфигурация

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. Сборка и запуск

```bash
# Сборка образа
docker build -t landing-page .

# Запуск контейнера
docker run -p 80:80 landing-page
```

## Деплой на Netlify

### 1. Через Netlify CLI

```bash
# Установите Netlify CLI
npm i -g netlify-cli

# Войдите в аккаунт
netlify login

# Деплой
netlify deploy --prod --dir=dist
```

### 2. Через веб-интерфейс

1. Зайдите на [netlify.com](https://netlify.com)
2. Перетащите папку `dist` в область деплоя
3. Или подключите GitHub репозиторий

## Деплой на GitHub Pages

### 1. Установите gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Добавьте скрипты в package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/landing-page"
}
```

### 3. Деплой

```bash
npm run deploy
```

## Деплой на собственный сервер

### 1. Сборка проекта

```bash
npm run build
```

### 2. Загрузка файлов

```bash
# Через SCP
scp -r dist/* user@server:/var/www/html/

# Через rsync
rsync -av dist/ user@server:/var/www/html/
```

### 3. Настройка Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Проверка после деплоя

### Чек-лист

- [ ] Сайт открывается без ошибок
- [ ] Форма регистрации работает
- [ ] Валидация полей работает
- [ ] Маска телефона работает
- [ ] Адаптивность на мобильных
- [ ] Все изображения загружаются
- [ ] Шрифты подключаются
- [ ] Консоль браузера без ошибок

### Тестирование

```bash
# Локальное тестирование сборки
npm run build
npm run preview

# Проверка линтера
npm run lint

# Проверка типов
npm run build
```

## Troubleshooting

### Проблема: 404 на refresh

**Решение:** Настройте fallback на `index.html`

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Проблема: Не загружаются изображения

**Решение:** Проверьте пути к ассетам в `vite.config.ts`

```typescript
export default defineConfig({
  base: '/', // или '/your-repo-name/' для GitHub Pages
  // ...
});
```

### Проблема: CORS ошибки

**Решение:** Настройте CORS на сервере или используйте прокси

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
```

## Мониторинг

### Vercel Analytics

```bash
# Установите Vercel Analytics
npm install @vercel/analytics

# Добавьте в App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* ваш контент */}
      <Analytics />
    </>
  );
}
```

### Google Analytics

```typescript
// Добавьте в index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Рекомендации

1. **Используйте Vercel** для быстрого деплоя
2. **Настройте CI/CD** через GitHub Actions
3. **Используйте CDN** для статических файлов
4. **Настройте мониторинг** производительности
5. **Регулярно обновляйте** зависимости

---
