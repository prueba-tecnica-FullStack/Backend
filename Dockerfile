FROM node:22-alpine

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código
COPY . .

# Prisma
RUN npx prisma generate

# Build Nest
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
