# Hacker News API | Typescript

Build your own GraphQL server with TypeScript, Apollo Server, Nexus and Prisma

## Run

```sh
yarn run dev
```

Now you should be served GraphQL Playground at http://localhost:3000/.

## Prisma

Initialize Prisma, and manually define models:

```sh
yarn prisma init
```

Generate migrations file named with `--name` flag, also create tables in database:

```sh
yarn prisma migrate dev --name "init"
```

(Re-)generate Prisma Client:

```sh
yarn prisma generate
```
