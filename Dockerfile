# develop stage
FROM node:16.14 as develop-stage
WORKDIR /app
COPY package*.json .npmrc ./

RUN yarn global add @quasar/cli
EXPOSE 8080
COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build

# production stage
FROM docker.uclv.cu/nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
