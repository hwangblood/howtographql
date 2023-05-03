# Hacker News API | Typescript

Build your own GraphQL server with TypeScript, Apollo Server, Nexus and Prisma

## Run Locally

PostgresQL datababse:

```sh
docker-compose up
```

Install dependencies:

```sh
yarn
```

Generate Prisma CLient:

```sh
yarn prisma generate
```

Run server:

```sh
yarn run dev
```

Now you should be served GraphQL Playground at http://localhost:3000/.

## GraphQL Examples

Run the following queries one after another to test out the `signup`, `post` mutation and the `feed` query. Make sure to set the `Authorization` header after the first query.

```graphql
mutation SignUpMutation {
  signup(name: "Alice", email: "alice@prisma.io", password: "graphql") {
    token
    user {
      id
    }
  }
}

mutation FirstPostMutation {
  post(
    url: "nexusjs.org"
    description: "Code-First GraphQL schemas for JavaScript/TypeScript"
  ) {
    id
    description
    url
    postedBy {
      id
      name
      email
    }
  }
}

mutation SecondPostMutation {
  post(
    url: "www.prisma.io"
    description: "Next-generation Node.js and TypeScript ORM"
  ) {
    id
    description
    url
    postedBy {
      id
      name
      email
    }
  }
}

query FeedQuery {
  feed {
    count
    links {
      id
      createdAt
      description
    }
  }
}
```
