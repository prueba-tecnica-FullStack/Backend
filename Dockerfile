FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Prisma Client (NO toca DB)
ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/social_db"
RUN npx prisma generate

# Build Nest
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
