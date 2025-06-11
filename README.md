# Home Library Service

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) (для локального запуска)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Docker Hub

Образ приложения доступен на Docker Hub:

```bash
docker pull alexeitim/nodejs2025q2-service:latest
```

## Downloading

```bash
git clone {repository URL}
cd nodejs2025Q2-service
```

## Environment variables

Создайте файл `.env` в корне проекта на основе `.env.example`:

```env
NODE_ENV=development
PORT=4000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
```

## Running application with Docker Compose

```bash
docker-compose up --build
```

- Приложение будет доступно на http://localhost:4000
- Swagger (OpenAPI): http://localhost:4000/doc/
- PostgreSQL будет доступен на порту 5432 (логин/пароль: postgres/postgres)
- Данные и логи базы сохраняются в volumes

## Hot-reload (разработка)

- Любые изменения в папке `src` автоматически перезапускают приложение внутри контейнера.
- Для этого используется volume: `./src:/app/src` и команда `npm run start:dev`.

## Vulnerability scanning

Для проверки зависимостей на уязвимости выполните:

```bash
npm run security:audit
```

или

```bash
docker-compose run --rm app npm run security:audit
```

## Publishing image to DockerHub

1. Войдите в Docker Hub:
   ```bash
   docker login
   ```
2. Соберите образ:
   ```bash
   docker build -t alexeitim/nodejs2025q2-service:latest .
   ```
3. Запушьте образ:
   ```bash
   docker push alexeitim/nodejs2025q2-service:latest
   ```

## Testing

Для запуска тестов локально:

```bash
npm run test
```

Для запуска тестов в контейнере:

```bash
docker-compose run --rm app npm run test
```

## Lint & Format

```bash
npm run lint
npm run format
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

---

**Для подробностей по OpenAPI/Swagger:** https://swagger.io/
