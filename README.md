# 🚀 Backend Journey: Level 1 - The Data Architect

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A professional-grade **RESTful Blogging API** built with Node.js, Express, and MongoDB. This project showcases advanced data handling capabilities including sophisticated query processing, pagination, and complete CRUD operations.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [Setup Instructions](#️-setup-instructions)
- [Project Roadmap](#️-roadmap)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Testing:** Postman
- **Environment Management:** dotenv

---

## ✨ Key Features

### 1. 📝 Full CRUD Operations

Complete resource management for blog posts with all standard operations:

- Create new posts
- Read single or multiple posts
- Update existing posts
- Delete posts

### 2. 🔍 Advanced Querying Pipeline

A custom-built URL processing pipeline that handles complex data requests:

- **Filtering:** Query by any schema field
  - Example: `?category=coding&author=John`
- **Sorting:** Dynamic result ordering with ascending/descending support
  - Example: `?sort=-createdAt,title` (newest first, then alphabetically)
- **Field Selection:** Optimize bandwidth by requesting only needed fields
  - Example: `?field=title,author,createdAt`

### 3. 📄 Professional Pagination

Efficient handling of large datasets to ensure optimal performance:

- Configurable page size with `limit` parameter
- Page navigation with `page` parameter
- Automatic `skip` calculation
- Response metadata including:
  - Total document count
  - Total pages
  - Current page number

---

## 🚦 API Endpoints

| Method     | Endpoint     | Description                                             |
| ---------- | ------------ | ------------------------------------------------------- |
| **GET**    | `/posts`     | Retrieve all posts with filtering, sorting & pagination |
| **GET**    | `/posts/:id` | Retrieve a single post by MongoDB ID                    |
| **POST**   | `/posts`     | Create a new blog post                                  |
| **PATCH**  | `/posts/:id` | Update specific fields of an existing post              |
| **DELETE** | `/posts/:id` | Delete a post from the database                         |

---

## 🧪 Usage Examples

### Complex Query Example

```http
GET /posts?category=coding&sort=-createdAt&page=1&limit=5&field=title,author
```

This query will:

- Filter posts where category equals "coding"
- Sort by creation date (newest first)
- Return page 1 with 5 results
- Include only title and author fields

### Success Response Structure

```json
{
  "success": true,
  "results": 5,
  "pagination": {
    "totalDocuments": 42,
    "totalPages": 9,
    "currentPage": 1
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with Node.js",
      "author": "Jane Smith"
    }
  ]
}
```

### Create Post Example

```http
POST /posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe",
  "category": "coding"
}
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/backend-journey.git
cd backend-journey
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/blog-api
# or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-api
```

4. **Start the server**

```bash
# Development mode
npm start

# Production mode
npm run start:prod
```

5. **Verify the setup**
   The server should be running at `http://localhost:5000`

---

## 🧪 Testing

Import the provided Postman collection to test all endpoints:

1. Open Postman
2. Import the collection from `/postman/blog-api.postman_collection.json`
3. Set the base URL to `http://localhost:5000`
4. Execute requests to test functionality

---

## 🗺️ Roadmap

- [x] **Level 1:** Data Architecture & Advanced CRUD ✅
- [ ] **Level 2:** User Authentication & Security (Bcrypt, JWT)
- [ ] **Level 3:** Relationships & File Uploads
- [ ] **Level 4:** Advanced Features (Rate Limiting, Caching, Search)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🚀**
