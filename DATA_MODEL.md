# Data Model Documentation

Ryza Blog uses Firestore with the following collection structure.

## Collections

### `posts`
Stores the blog content. Each document represents a single post.

```json
{
  "id": "auto-generated-id",
  "title": "My First Blog Post",
  "slug": "my-first-blog-post", // Unique index
  "excerpt": "A short summary for SEO and listing...",
  "coverImage": "https://...",
  "status": "published", // draft, published, archived
  
  "createdAt": 1708264372000,
  "updatedAt": 1708264372000,
  "publishedAt": 1708264372000,
  
  "readingTime": 5,
  "viewCount": 120,
  
  "categoryId": "tech",
  "tags": [
      { "id": "react", "name": "React", "slug": "react" }
  ],

  // The core dynamic content
  "sections": [
    {
      "id": "uuid-1",
      "type": "HERO",
      "order": 0,
      "isVisible": true,
      "content": {
        "heading": "Welcome",
        "bgImage": "..."
      }
    },
    {
      "id": "uuid-2",
      "type": "CONTENT",
      "order": 1,
      "isVisible": true,
      "content": {
        "html": "<p>Paragraph 1...</p>"
      }
    }
  ]
}
```

### `categories`
Simple taxonomy reference.

```json
{
  "id": "tech",
  "name": "Technology",
  "slug": "technology",
  "description": "All things tech."
}
```

### `tags`
Simple taxonomy reference.

```json
{
  "id": "react",
  "name": "React",
  "slug": "react"
}
```

### `settings`
Global configurations.

```json
// ID: "general"
{
  "siteName": "Ryza Blog",
  "description": "My Personal Blog",
  "theme": { ... }
}
```

### `admins`
Security whitelist (as requested).

```json
// ID: "fakhrizafauzii@gmail.com"
{}
```
