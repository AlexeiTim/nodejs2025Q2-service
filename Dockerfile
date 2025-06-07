FROM node:20.11-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

   # Add security check during build
RUN npm audit || true

COPY . .

# Add build step to compile TypeScript
RUN npm run build

FROM node:20.11-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 4000

CMD ["npm", "start"]