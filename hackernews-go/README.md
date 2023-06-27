# Hacker News API | Go

Learn how to build a GraphQL server with [Go](https://golang.org/) and [gqlgen](https://gqlgen.com/)

## Getting Started

```
go mod download

go run server.go
```

Examples:

```
query ListLinks {
	links{
    title
    address,
    user{
      name
    }
  }
}

query ListLinksTitle {
	links{
    title
  }
}
```
