
# 🎫 *EventHive - Professional Event Management System*

EventHive is a full-stack event management platform that connects event organizers with enthusiasts. From booking music fests to managing corporate seminars, EventHive provides a seamless experience with role-based access control, secure payments, and dynamic seat management.



## 🌐 Live Links
- **Client Application:** [URL]()
- **Server API:** [https://github.com/Sahidulislam05/Event-Hive-API](https://github.com/Sahidulislam05/Event-Hive-API)

---

## 🚀 Key Features

### 👤 For Users (Attendees)
- **Firebase Auth:** Social and Email/Password login.
- **Dynamic Browsing:** Search and filter events by category or location.
- **Secure Booking:** Ticket purchase via **Stripe Checkout**.
- **Booking History:** Manage and cancel bookings with a smart refund logic.

### 🏨 For Event Managers
- **Event Dashboard:** Create, update, and delete events.
- **Real-time Analytics:** Track available seats and bookings.
- **Professional Verification:** Request admin approval to become a verified manager.

### 🛡️ For Admins
- **User Management:** Promote users to Manager or Admin roles.
- **Content Control:** Oversight of all users, events, and transactions.
- **System Security:** Delete fraudulent users or outdated events.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Authentication:** Firebase Auth
- **Styling:** Tailwind CSS & DaisyUI
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** Firebase Admin SDK (JWT Verification)
- **Payments:** Stripe API
- **Reliability:** Mongoose Transactions (ACID Properties)

---

## 🏗️ Project Architecture & Logic
- **Smart Refund:** Automatic calculation of 100% or 60% refund based on event proximity (2-day rule).
- **Seat Management:** Atomic updates to prevent overselling of tickets.
- **Cascading Deletion:** When a user is removed, all their associated bookings are cleared and seats are restored.



---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js installed
- Firebase Project & Service Account Key
- MongoDB Atlas Account
- Stripe Account API Keys

### 2. Backend Setup
```bash
cd server
npm install
```
#### Create a .env file in the server directory
```
PORT=5000
DB_USER=your_db_username
DB_PASS=your_db_password
STRIPE_SECRET_KEY=your_stripe_key
FB_SERVICE_KEY=your_base64_firebase_admin_key
CLIENT_DOMAIN=http://localhost:5173
```
### 3. Frontend Setup
```
cd client
npm install
```
#### Create a .env.local file in the client directory
```
VITE_apiKey=...
VITE_authDomain=...
VITE_stripe_pk=your_stripe_publishable_key
```
## 👥 Our Team (Contributors)
### We are a team of 5 developers who collaborated to build this platform from scratch.

| Name  | Role |
| ------------- |:-------------:|
| Sahidul Islam    | Lead Backend & Security     |
| Faisal Mollah     | Frontend Architect     |
| Tanvir Hussain Khan      | UI/UX & Animations|
| Mohammad Siddique Sakib     | Payment Integration|
| Ahsan Habib    | Database & QA|

## 📄 License
> This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit)
---
### ***Built with ❤️ by Team EventHive***
