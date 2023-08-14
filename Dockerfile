FROM node:20-alpine as base

RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@8

FROM base as build

RUN mkdir -p /usr/src/nuxt-todo-app
WORKDIR /usr/src/nuxt-todo-app

COPY package.json /usr/src/nuxt-todo-app/
COPY pnpm-lock.yaml /usr/src/nuxt-todo-app/
COPY .npmrc /usr/src/nuxt-todo-app/

RUN pnpm i --frozen-lockfile

COPY . /usr/src/nuxt-todo-app/

RUN pnpm run build
RUN pnpm exec mikro-orm-esm

FROM base as run

RUN mkdir -p /usr/opt/nuxt-todo-app

COPY --from=build /usr/src/nuxt-todo-app/.output /usr/opt/nuxt-todo-app/.output/
COPY --from=build /usr/src/nuxt-todo-app/db/data.db /usr/opt/nuxt-todo-app/db/
COPY --from=build /usr/src/nuxt-todo-app/.npmrc /usr/opt/nuxt-todo-app/
COPY --from=build /usr/src/nuxt-todo-app/package.json /usr/opt/nuxt-todo-app/
COPY --from=build /usr/src/nuxt-todo-app/pnpm-lock.yaml /usr/opt/nuxt-todo-app/

WORKDIR /usr/opt/nuxt-todo-app

RUN pnpm i -P --frozen-lockfile --ignore-scripts

CMD ["pnpm", "run", "start"]
