FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

   # Add security check during build
RUN npm audit || true

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Add build step to compile TypeScript
RUN npm run build

FROM node:22.14.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client in production image
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "start"]