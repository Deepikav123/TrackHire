# TrackHire — Intelligent Job Application Tracker

TrackHire is a full-stack web application that helps job seekers organize job applications and track recruitment progress in one place. It is designed to reduce the effort of manually managing application details, hiring stages, assessments, and interview updates.

The project also explores extracting structured information from recruitment emails to make application tracking more efficient.

## 🎯 Problem Statement

Job seekers often apply to multiple companies simultaneously. Tracking application statuses, interview schedules, assessments, and recruiter updates across different platforms and emails can become difficult.

TrackHire addresses this problem by providing a centralized application tracker with a structured recruitment pipeline and an approach to converting recruitment email content into useful application data.

## ✨ Key Features

- **Application Management:** Create, view, update, and delete job application records.
- **Recruitment Pipeline:** Track application progress through hiring stages.
- **Application Dashboard:** View application information and monitor recruitment progress.
- **Email-Based Extraction:** Extract relevant information from recruitment email content using rule-based techniques.
- **Review Before Saving:** Review extracted information before using it to create or update an application.
- **User Authentication:** Protect user-specific application data through authenticated API access.

*Note: TrackHire is actively being developed. Feature availability depends on the current implementation.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| JavaScript | Application logic |
| Vite | Frontend development and build tooling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modeling and operations |
| JWT | Authentication and protected API access |
| Git & GitHub | Version control |

## ⚙️ How It Works

1. The user adds a job application manually or provides recruitment email content.
2. TrackHire processes the available email text using extraction rules.
3. Relevant details, such as company name, job role, recruitment stage, and schedule, are identified where possible.
4. The user reviews the extracted information and corrects it when necessary.
5. The application information is saved or updated through the backend.
6. The dashboard and recruitment pipeline help the user monitor application progress.

## 🧠 Email Extraction Approach

The initial email extraction approach uses rule-based techniques, including regular expressions and keyword classification.

While developing this approach, several challenges became apparent:

- Recruiters may use personal email addresses, making company identification difficult.
- Job titles can appear in different formats.
- Similar keywords can represent different recruitment events.
- An acknowledgement email does not necessarily mean a candidate has been shortlisted.
- An email mentioning an interview does not necessarily mean the interview has been completed.

These limitations motivate exploring a **hybrid extraction approach** that combines deterministic rules with Large Language Models (LLMs) for context-dependent interpretation.

The intended approach is to validate extracted information and allow users to review uncertain results before modifying application records.

## 📁 Project Structure

```text
TrackHire/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

*The structure above is illustrative. Adjust it to match the actual repository, including any additional folders and files.*

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or a locally running MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Deepikav123/TrackHire.git
cd TrackHire
```

### 2. Install dependencies

Install the backend dependencies:

```bash
cd backend
npm install
```

Install the frontend dependencies in a separate terminal:

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory and add the environment variables required by your backend.

For example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use the exact variable names expected by your backend code. Replace the example values with your own configuration.

**Important:** Never commit your `.env` file, database credentials, or JWT secret to GitHub.

### 4. Start the application

Start the backend using the script configured in `backend/package.json`. For example:

```bash
npm run dev
```

If your backend does not have a `dev` script, use the start command configured in its `package.json`.

In a separate terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open the local frontend URL displayed by Vite in your browser.

If you use MongoDB Atlas, an active internet connection is required for the backend to reach the database.

## 🔐 Security Considerations

- Passwords should be hashed before storage.
- Protected API routes should verify authentication tokens.
- Users should only be able to access their own application records.
- Extracted email information should be validated before it modifies application data.
- Database credentials and secret keys should be stored in environment variables.

## 🌱 Future Improvements

- LLM-assisted extraction for varied recruitment email formats.
- More accurate classification of acknowledgements, assessments, interviews, reschedules, offers, and rejections.
- Search and filtering by company, role, and recruitment stage.
- Interview reminders and scheduling support.
- Application analytics and progress summaries.
- Optional Gmail integration with appropriate user authorization.

## 👩‍💻 Author

**Deepika V.**

Computer Science Engineering Student | Aspiring Software Developer

- **GitHub:** [Deepikav123](https://github.com/Deepikav123)
- **LinkedIn:** [deepikav09](https://www.linkedin.com/in/deepikav09)

---

*TrackHire is a project in development focused on full-stack application development, recruitment workflow management, and structured information extraction.*
