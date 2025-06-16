# 🚚 Delivery Label Dashboard

A minimal full-stack app to generate and preview delivery labels in **PDF format**. Includes login, delivery form, and barcode generation. Built with the **MERN stack (without MongoDB)**.

---

## 🧩 Features

- 🔒 Hardcoded Login (`test` / `test123`)
- 📋 Order form with sender & receiver details
- 🆔 Unique Delivery ID
- 🕒 Timestamp
- 🧾 Auto-generated **PDF label**
- 📦 Includes a **Code128 barcode**
- 👁️ Preview PDF before downloading
- 🚫 No DB or complex setup — lightweight and fast

---

## 🚀 Setup Instructions

### 🔧 Backend

cd backend
npm install
node server.js


###  🎨 Frontend
cd frontend
npm install
npm start


### 🔐 Login Credentials
Username: test
Password: test123



## 📦 Dependencies

### Backend:
express
cors
pdfkit
bwip-js

### Frontend:
react
axios