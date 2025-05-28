FROM node:20 AS build


# variable VITE_BACKEND_URL as argument
ARG VITE_BACKEND_URL=http://localhost:3000/api/v1

# Variable is made available as ENV for VITE 
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .