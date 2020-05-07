# Stage 1 - the build process
FROM node:10-alpine as builder
WORKDIR /usr/src/app
COPY . ./
RUN SCHEMA_PATH=https://retrotool.app/api/graph yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
