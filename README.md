# **Lavender** - Sac Hacks VI (2025)

---

## **🚀 Elevator Pitch**

**Turn your notes into quizzes with AI and test your knowledge!**  
Lavender helps students and professionals **convert their lecture slides, notes, or PDFs into AI-generated quizzes** to
reinforce learning through interactive testing.

---

> **Note:** This repository contains only the frontend.  
> The backend is repository is located [lavender-backend](https://github.com/ehsaanisme/lavendar-backend), and the
> frontend requires the backend to be running.  
> Please refer to the backend repository for setup instructions.

---

## **🔧 Built With**

- **Frontend**: Next.js, React.js, Material UI
- **Backend**: Express.js, Node.js, Multer (for file uploads), OpenAI API, PDF.js

---

## **📸 Preview**

- todo: add images

---

## **🛠 Tech Stack**

### **Frontend**

- **Next.js** (Server-side rendering & routing)
- **React.js** (Component-based UI)
- **Material UI** (Styling & UI components)

### **Backend**

*(Refer to the [lavender-backend](https://github.com/ehsaanisme/lavendar-backend) for full details)*

- **Express.js** (REST API)
- **Node.js** (Backend runtime)
- **Multer** (File upload handling)
- **PDF.js** (Parsing and processing PDFs)
- **OpenAI API** (Generating quiz questions from notes)

---

## **💻 Run Locally**

This guide assumes you are running on a Unix-based machine (Linux or macOS).  
For Windows users, adapt the commands accordingly.

### **Prerequisites**

- Install **Node.js** and **npm**
- Clone this repository:
  ```bash
  git clone [Frontend Repository URL]
  cd [Frontend Repository Folder]
  ```
- Copy the `.env.example` file to `.env` and configure it:
  ```bash
  cp .env.example .env
  ```
  **Set the correct backend server URL inside `.env`**.

---

### **🚀 Frontend Setup**

#### **Run with npm**

```bash
npm install
npm run dev
```

This starts the frontend on **http://localhost:3000/**.

> **Note:** The backend must be running before launching the frontend.

---

## **👨‍💻 Developed By**

- **[Vijit Dua](https://vijitdua.com/)**
    - **Frontend:** Everything.
    - **Backend:** Repository initialization and setup.

- **[Ehsaan Mohammed](https://github.com/ehsaanisme)**
    - **Backend:** Worked on the LLM Integration.

- **[Alex Zhu Zhou](https://alexzhuzhou.github.io/AlexWebsite/)**
    - **Backend:** Worked on setting up the server and client requests.

- **[Taha Abdullah](https://github.com/tmabdull)**
    - **Backend:** Worked on the pdf parser and integration with the backend pdfController.

---