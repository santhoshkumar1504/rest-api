
# **📌 REST API for Authentication, Email Verification, File Upload & CRUD**

A fully functional REST API built using **Node.js**, **Express**, and **MongoDB**, with support for authentication, email verification, file uploads, and full CRUD operations.

---

## **🚀 Features**

### **🔐 Authentication**

* Register new users
* Secure password hashing using **bcryptjs**
* JWT token generation
* Login with email & password
* Authentication middleware for protected routes

### **📧 Email Verification**

* OTP / verification code generation
* Sends verification email using **Nodemailer**
* Validates verification codes

### **📁 File Upload**

* Upload files/images using **Multer**
* Stores file locally or can be configured for cloud storage

### **🗄️ CRUD Operations**

* Create, Read, Update, Delete protected resources

---

## **🛠️ Technologies Used**

| Library               | Purpose                        |
| --------------------- | ------------------------------ |
| **express**           | REST API framework             |
| **mongoose**          | MongoDB object modeling        |
| **bcryptjs**          | Hashing passwords              |
| **jsonwebtoken**      | JWT generation & verification  |
| **nodemailer**        | Sending email verification     |
| **multer**            | Handling file uploads          |
| **express-validator** | Validate API inputs            |
| **dotenv**            | Manage environment variables   |
| **body-parser**       | Parse incoming requests        |
| **nodemon**           | Auto-reload during development |

---

## **📂 Project Setup**

### **1️⃣ Clone the Repository**

```bash
git clone <your-repo-url>
cd blog-rest-api
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the project root:

```
PORT=5000
URL=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret_key
SEND_EMAIL=your-email@example.com
EMAIL_PASS=your-email-password
```

---

## **📌 Running the Server**

### **▶ Development Mode (with nodemon)**

```bash
npm start
```

### **▶ Production Mode**

```bash
npm start
```

---

## **📘 Folder Structure**

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

## **🔐 Authentication Flow Diagram**

```
User → Register → Email Sent → Enter Code → Verified → Login → JWT Token
```

---

## **🧪 Testing the API**

You can test the API using tools like:

* **Postman**
* Thunder Client (VS Code)
