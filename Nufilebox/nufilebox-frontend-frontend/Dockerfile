# Stage 1: Build React application
FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve the production build
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]