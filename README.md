# 🚀 Advanced Blog API - Complete Backend Journey

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

A **production-ready RESTful API** for a blogging platform featuring robust authentication, data relationships, advanced querying, and professional security architecture. Built progressively from foundational CRUD operations to enterprise-level features.

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [Setup Instructions](#️-setup-instructions)
- [Security Implementation](#-security-implementation)
- [Error Handling](#-error-handling)
- [Project Architecture](#-project-architecture)
- [Testing Guide](#-testing-guide)
- [Environment Variables](#-environment-variables)
- [Project Roadmap](#️-roadmap)
- [Contributing](#-contributing)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** Bcrypt.js
- **Testing:** Postman
- **Environment Management:** dotenv
- **Code Quality:** ESLint (optional)

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

### 🔑 Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| **POST** | `/api/v1/users/signup` | Register a new user account | Public |
| **POST** | `/api/v1/users/login` | Login and receive JWT token | Public |

### 📝 Blog Post Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| **GET** | `/api/v1/posts` | Retrieve all posts with filtering, sorting & pagination | Public |
| **GET** | `/api/v1/posts/:id` | Retrieve a single post by MongoDB ID | Public |
| **POST** | `/api/v1/posts` | Create a new blog post | 🔒 Private |
| **PATCH** | `/api/v1/posts/:id` | Update specific fields of an existing post | 🔒 Private (Owner Only) |
| **DELETE** | `/api/v1/posts/:id` | Delete a post from the database | 🔒 Private (Owner Only) |

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
PORT=8000
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
The server should be running at `http://localhost:8000`

---

## 🧪 Testing

Import the provided Postman collection to test all endpoints:
1. Open Postman
2. Import the collection from `/postman/blog-api.postman_collection.json`
3. Set the base URL to `http://localhost:8000`
4. Execute requests to test functionality

---

## 🗺️ Roadmap

### Completed ✅
- [x] **Level 1:** Data Architecture & Advanced CRUD
  - ✅ Complete CRUD operations
  - ✅ Advanced query pipeline (filter, sort, paginate)
  - ✅ Field selection
  - ✅ Professional response formatting

- [x] **Level 2:** User Authentication & Security
  - ✅ JWT-based authentication
  - ✅ Password hashing with bcrypt
  - ✅ Protected routes middleware
  - ✅ User registration and login

- [x] **Level 3:** Data Relationships
  - ✅ One-to-many user-post relationship
  - ✅ Ownership-based authorization
  - ✅ Data population

### Coming Soon 🚀
- [ ] **Level 4:** Advanced Features
  - [ ] Rate limiting
  - [ ] Request caching with Redis
  - [ ] Full-text search
  - [ ] Email verification
  - [ ] Password reset functionality

- [ ] **Level 5:** File Management
  - [ ] Image upload for posts
  - [ ] User profile pictures
  - [ ] Cloudinary integration

- [ ] **Level 6:** Social Features
  - [ ] Comments system
  - [ ] Like/Unlike posts
  - [ ] Follow/Unfollow users
  - [ ] User feed algorithm

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code structure
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📚 Learning Resources

This project implements concepts from:
- RESTful API design principles
- JWT authentication best practices
- MongoDB relationship patterns
- Express.js middleware architecture

**Recommended Reading:**
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [MongoDB Schema Design Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)
- [JWT.io Introduction](https://jwt.io/introduction)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---


## 🙏 Acknowledgments

- Inspired by real-world blogging platforms
- Built as part of a progressive backend learning journey
- Special thanks to the Node.js and MongoDB communities

---

## 💡 Key Takeaways

This project demonstrates:
- **Iterative Development:** Built progressively from basic CRUD to complex features
- **Security First:** Implemented industry-standard authentication and authorization
- **Scalable Architecture:** Designed for growth with proper separation of concerns
- **Best Practices:** Follows RESTful conventions and coding standards

---

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/backend-journey/issues) page
2. Review the [Documentation](#-usage-examples)
3. Open a new issue with detailed information

---

## ⭐ Show Your Support

If this project helped you learn backend development:
- Give it a ⭐️ on GitHub
- Share it with fellow developers
- Contribute improvements or features

---

**Happy Coding! 🚀**

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/backend-journey)
![GitHub stars](https://img.shields.io/github/stars/yourusername/backend-journey?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/backend-journey?style=social)