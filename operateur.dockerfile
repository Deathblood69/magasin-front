FROM node:20 as frontbuilder

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . /usr/src/nuxt-app/
RUN rm -rf .nuxt
RUN rm -rf .output
RUN rm -f package-lock.json
RUN npm install
RUN sed -i 's/ADMINISTRATEUR/OPERATEUR/' .env
RUN npx nuxi generate

FROM nginx:alpine

RUN apk upgrade --no-cache

WORKDIR /usr/src/nuxt-app

COPY --from=frontbuilder /usr/src/nuxt-app/.output/public /usr/share/nginx/html
COPY --from=frontbuilder /usr/src/nuxt-app/nginx/nginx-operateur.conf /etc/nginx/nginx.conf

EXPOSE 4001

# On n'ajoute pas d'ENTRYPOINT car on utilise l'ENTRYPOINT fourni par nginx