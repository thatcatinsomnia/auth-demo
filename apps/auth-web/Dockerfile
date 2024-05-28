FROM node:20-alpine

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

EXPOSE 1333

USER node

WORKDIR /app

COPY --chown=node:node package.json .

RUN pnpm i && pnpm store prune --force

COPY --chown=node:node . .

CMD ["pnpm", "dev"]
