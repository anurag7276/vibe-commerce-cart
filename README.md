# Vibe Commerce - Mock E-Com Cart Assignment

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

This is a full-stack e-commerce shopping cart application built for the Vibe Commerce screening process. It features a React (with Vite) frontend, a Node.js/Express backend, and a MongoDB database.

Users can view products from the database, add/remove items from a real-time cart, and complete a mock checkout process which returns a success receipt.

## Demo Video

[**<-- PASTE YOUR 1-2 MINUTE LOOM/YOUTUBE LINK HERE**]

## 📸 Screenshots

*(I highly recommend taking 2-3 screenshots and adding them here. Recruiters love visuals.)*

**Main Application (Products & Cart)**

<img width="1884" height="928" alt="Screenshot 1" src="https://github.com/user-attachments/assets/43f454e3-a843-408b-a077-5adbdb359110" />

**Successful Checkout Receipt**


<img width="1644" height="793" alt="Screenshot2" src="https://github.com/user-attachments/assets/3b34082c-26f9-4a22-8894-a74f837b5b86" />

## ✨ Features

* **View Products:** Fetches and displays a grid of products from the MongoDB database.
* **Dynamic Cart:** Uses React Context for global state management. Users can add and remove items with real-time updates to the cart view and total price.
* **Persistent Cart:** The cart is stored in the MongoDB database, not just in local state.
* **Mock Checkout:** A simple form that, upon submission, calls a checkout endpoint, clears the cart from the database, and displays a success receipt.
* **Full-Stack Integration:** A robust backend API built with Express & Mongoose that manages all product, cart, and checkout logic.

## 🛠 Tech Stack

* **Frontend:** React (Vite), `axios` (for API requests), React Context (for state management)
* **Backend:** Node.js, Express, Mongoose
* **Database:** MongoDB Atlas
* **Utilities:** `cors`, `dotenv`, `nodemon` (for development)

## 🚀 How to Run Locally

To get this project running on your local machine, follow these steps.

### Prerequisites

You will need the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (which includes npm)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (a free account for the database)

### 1. Clone the Repository

```bash
# Clone this repository to your local machine
git clone https://github.com/anurag7276/vibe-commerce-cart.git

# Navigate into the main project folder
cd vibe-commerce-cart
```
### 2. Backend Setup

```bash
# 1. Navigate to the backend folder:
cd backend

# 2. Install dependencies:
npm install

# 3. Create your environment file: Create a .env file in the /backend folder.
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
#(Replace YOUR_MONGODB_ATLAS_CONNECTION_STRING with your actual key)

# 4.(Optional) Seed the database: To add the 5-10 mock products to your database, run:

npm run data:import

# 5. Start the backend server:
npm run dev

# Your server should now be running on http://localhost:5000 and connected to MongoDB.

```




### 3. Frontend Setup

```bash
# 1. Open a new terminal.
# 2.Navigate to the frontend folder:
cd frontend

# 3. Install dependencies:
npm install

# 4. Start the frontend server:
npm run dev

#Vite will start the development server.

```
### 4. Open the App
```
Your backend is running on http://localhost:5000. Your frontend app is now running and open in your browser at http://localhost:5173 (or whatever port Vite indicates).

You can now use the application!

```


---

## 🔗 API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | Fetches all products from the database. |
| `GET` | `/cart` | Fetches all items in the cart and the cart total. |
| `POST` | `/cart` | Adds a new item to the cart or updates the quantity of an existing item. |
| `DELETE`| `/cart/:id` | Removes a specific item from the cart by its database ID. |
| `POST` | `/cart/checkout` | Processes a mock checkout, clears all items from the cart, and returns a receipt. |
