#  📌 REST API for Authentication, Email Verification, File Upload & CRUD

A fully functional REST API built using **Node.js**, **Express**, **MongoDB**, and various middleware libraries.
This API supports:

* User Sign-Up & Sign-In
* Password hashing using **bcryptjs**
* JWT-based Authentication
* Email verification using **Nodemailer**
* File Upload using **Multer**
* Input Validation using **express-validator**
* CRUD Operations for protected resources

---

##  🚀 Features

### 🔐 **Authentication**

* Register new users
* Secure password hashing
* JWT token generation
* Login with email & password
* Auth middleware for protected routes

### 📧 **Email Verification**

* Generates OTP / verification code
* Sends email to user using Nodemailer
* Validates verification codes

### 📁 **File Upload**

* Upload images/files using Multer
* Store local file path or cloud link

### 🗄️ **CRUD Operations**

* Create / Read / Update / Delete protected resources

---

## 🛠️ Technologies Used

| Library               | Purpose                         |
| --------------------- | ------------------------------- |
| **express**           | REST API framework              |
| **mongoose**          | MongoDB object modeling         |
| **bcryptjs**          | Hashing passwords               |
| **jsonwebtoken**      | Generating & verifying JWTs     |
| **nodemailer**        | Sending verification email      |
| **multer**            | File uploads                    |
| **express-validator** | Request validation              |
| **dotenv**            | Environment variable management |
| **body-parser**       | Parse request body              |
| **nodemon**           | Auto restart during development |

---

## 📂 Project Setup

### 1️⃣ **Clone the repository**

```bash
git clone <your-repo-url>
cd blog-rest-api
```

### 2️⃣ **Install dependencies**

```bash
npm install
```

### 3️⃣ **Environment Variables**

Create a `.env` file in the root folder:

```
PORT=5000
URL=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret_key
SEND_EMAIL=your-email@example.com
EMAIL_PASS=your-email-password

```

---

## 📌 Running the Server

### ▶ Development Mode (with nodemon)

```bash
npm start
```

### ▶ Production Mode

```bash
npm start
```


## 📘 Folder Structure 

```
project/
│── controllers/
│── validators/
│── models/
│── routes/
│── middleware/
│── uploads/
│── config/
│── utils/
│── index.js
│── package.json
│── .env
```
---

## 🔐 Authentication Flow Diagram

```
User → Register → Email Sent → Enter Code → Verified → Login → JWT Token
```
---

## 🧪 Testing the API

You can use:

* **Postman**






