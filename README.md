# 🏙️ UrbanX — Smart Civic Issue Reporting Platform

**UrbanX (CityConnect)** is a modern, citizen-first platform that enables people to report civic problems such as **potholes, broken streetlights, and waste management issues** directly to local authorities.
It brings together **citizens, administrators, and technology** for a cleaner, smarter, and more responsive city.

---

## ✨ Key Features

* 🗺️ **Geo-Pin Issue Reporting:** Citizens can easily drop a pin on the map to report an exact problem location.
* 🔍 **Transparent Status Tracking:** Each issue gets a unique tracking ID with live status updates.
* 📊 **Public Dashboard:** View total reports, resolved issues, and active problem zones in one glance.
* 🧩 **Category-Based Routing:** Issues are auto-classified into domains like *Infrastructure, Electricity,* or *Waste Management*.
* 🧑‍💼 **Admin Console:** Authorized personnel can manage reports, verify submissions, and monitor a **heatmap** of reported areas.
* 🔒 **Tamper-Proof Logging:** Each report entry is hashed for **blockchain-style integrity verification** (no data manipulation possible).

---

## 🛠️ Tech Stack

| Area                   | Technologies Used                                |
| ---------------------- | ------------------------------------------------ |
| **Backend**            | Node.js, Express.js                              |
| **Database**           | MongoDB (Mongoose ORM)                           |
| **Frontend / Views**   | EJS, Bootstrap 5, Custom CSS                     |
| **Mapping & Geo Data** | Leaflet.js, OpenStreetMap API                    |
| **Security**           | Passport.js (Authentication), Session Management |
| **Audit Layer**        | SHA-256 Hashing, Blockchain-Inspired Audit Trail |

---

## ⚙️ Setup and Installation

Follow these simple steps to run **UrbanX** locally.

### 🧩 Prerequisites

* [Node.js](https://nodejs.org/) v18 or later
* [MongoDB](https://www.mongodb.com/) (local or Atlas)
* Git

### 📥 1. Clone the Repository

```bash
git clone <YOUR_REPO_URL>
cd urbanx
```

### 📦 2. Install Dependencies

```bash
npm install
```

### 🔐 3. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```bash
# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urbanx

# Application Security
SESSION_SECRET=supersecretkey

# Admin Access
ADMIN_CODE=UrbanXAdmin
```

> ⚠️ **Note:** Never commit your `.env` file to version control.

### ▶️ 4. Start the Application

```bash
npm run dev
# or
npm start
```

Now visit:
🌐 `http://localhost:4000` (default port)

---

## 🧑‍💻 Folder Structure

```
urbanx/
│
├── models/           # Mongoose models (User, Report, etc.)
├── routes/           # Express routes (auth, admin, reports)
├── controllers/      # Controller logic
├── views/            # EJS templates (auth, reports, admin)
├── public/           # Static assets (CSS, JS, images)
├── uploads/          # Uploaded report images (for demo)
├── db.js             # MongoDB connection
├── app.js            # Main server file
└── .env.example      # Environment config sample
```

---

## 🔑 Admin Access

To access the **Admin Dashboard**:

1. Go to `/register`
2. Choose **Admin** as your role.
3. Enter the correct `ADMIN_CODE` from your `.env` file.
4. Upon registration, you’ll gain access to `/admin/reports`.

---

## 🌍 Future Enhancements

* ✅ Integrate **Cloudinary** for image storage
* ✅ Add **email/SMS notifications** for report updates
* ✅ Implement **machine learning–based issue prioritization**
* ✅ Expand to a **progressive web app (PWA)** for offline usage

---

## 💡 Vision

UrbanX aims to create **smart, transparent, and connected cities** by empowering citizens with technology that makes public issue resolution **faster, fairer, and data-driven**.


