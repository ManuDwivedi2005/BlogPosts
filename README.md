# Thread - A Simple Blog Post Application

A full-stack CRUD (Create, Read, Update, Delete) application built with Node.js, Express, and PostgreSQL. This project serves as a demonstration of building a RESTful API, connecting to a cloud database, and deploying a web service with security best practices.

**Live Demo:** [https://blogposts-cn7u.onrender.com](https://blogposts-cn7u.onrender.com)

---

## Features

-   **Full CRUD Functionality:** Create, Read, Update, and Delete posts.
-   **RESTful API:** Follows REST principles for a clean and predictable API structure.
-   **Modern Frontend:** Asynchronous post deletion using JavaScript's `fetch` API for a seamless user experience without page reloads.
-   **Server-Side Validation:** Ensures that empty posts cannot be created.
-   **Security:**
    -   **Rate Limiting:** Protects against spam and brute-force attacks on endpoints that modify data.
    -   **Environment Variables:** Keeps sensitive credentials (like database URLs) secure and out of the version-controlled codebase.
    -   **SQL Injection Protection:** Uses parameterized queries (`pg` library feature) to prevent SQL injection attacks.
-   **Cloud Native:** Deployed on Render with a PostgreSQL database hosted on Supabase, demonstrating modern cloud deployment practices.

---

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Frontend:** EJS (Embedded JavaScript templates), CSS, Vanilla JavaScript
-   **Database:** PostgreSQL (with `pg` library)
-   **Cloud Services:**
    -   **Hosting:** Render
    -   **Database:** Supabase
-   **Key Libraries:**
    -   `express-rate-limit`: For API rate limiting.
    -   `method-override`: To use HTTP verbs like `PATCH` or `DELETE` from standard HTML forms.
    -   `dotenv`: To manage environment variables.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v16 or later recommended)
-   npm (comes with Node.js)
-   A PostgreSQL database (you can use a local instance or a free cloud provider like Supabase).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your PostgreSQL database connection string.

    `.env`
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Run the development server:**
    The application will be available at `http://localhost:8080`.
    ```sh
    npm run dev
    ```

---

## API Endpoints

The application exposes the following RESTful endpoints:

| Method | Endpoint             | Description                      |
| :----- | :------------------- | :------------------------------- |
| `GET`  | `/`                  | Get all posts.                   |
| `GET`  | `/posts/new`         | Show form to create a new post.  |
| `POST` | `/posts`             | Create a new post.               |
| `GET`  | `/posts/:id/show`    | Show details of a specific post. |
| `GET`  | `/posts/:id/edit`    | Show form to edit a post.        |
| `PATCH`| `/posts/:id`         | Update a specific post.          |
| `DELETE`| `/posts/:id`        | Delete a specific post.          |

---
