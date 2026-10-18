# TrackHire — Intelligent Job Application Tracker

TrackHire is a full-stack web application designed to help job seekers organize their job applications and keep track of recruitment updates in one place.

Recruitment updates often arrive through emails, making it difficult to remember application statuses, interview schedules, assessments, and upcoming hiring stages. TrackHire aims to simplify this process by converting recruitment emails into structured application information.

## 🎯 Problem Statement

Job seekers often apply to multiple companies simultaneously. Keeping track of application details and recruitment updates manually can become confusing and time-consuming.

TrackHire aims to address this problem by providing a centralized platform to organize applications and monitor recruitment progress.

## ✨ Key Features

- **Application Management:** Organize job applications and maintain important application details.
- **Dynamic Hiring Pipeline:** Track recruitment progress through customizable stages that vary between companies.
- **Email-Based Extraction:** Analyze recruitment email content to identify relevant application information.
- **Application Review:** Review extracted information before saving it to the application tracker.
- **Dashboard:** View application summaries and recent activity in one place.

*Note: Features are being developed iteratively. Availability may vary as the project evolves.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modeling and operations |
| Git & GitHub | Version control |

## ⚙️ How It Works

1. The user adds an application manually or provides recruitment email content.
2. TrackHire analyzes the available email information.
3. Relevant details, such as the company, job role, recruitment stage, and schedule, are extracted where possible.
4. The user reviews and corrects the extracted information.
5. The application is saved or updated in the database.
6. The recruitment pipeline reflects the application's progress.

## 🧠 Email Extraction Approach

TrackHire initially uses rule-based techniques, including regular expressions and keyword classification, to extract information from recruitment emails.

During development, several limitations became apparent:

- Recruiters may send emails from personal email addresses, making company identification difficult.
- Job titles can appear in many different formats.
- Similar keywords can represent different recruitment events.
- An acknowledgement email does not necessarily indicate shortlisting, and mentioning an interview does not necessarily mean it has been completed.

These challenges motivate exploring a **hybrid extraction approach** that combines deterministic rules with Large Language Models (LLMs) for context-dependent interpretation.

The intended approach is to validate extracted information and allow users to review uncertain results before modifying their application records.

## 📁 Project Structure

The project contains separate frontend and backend components.

```text
TrackHire/
├── frontend/       # React application
├── backend/        # Node.js and Express API
└── README.md
```

*Adjust the directory names above if your actual repository structure differs.*

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB, locally or through MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Deepikav123/TrackHire.git
cd TrackHire
```

### 2. Install dependencies

Navigate to the frontend and backend directories and install their dependencies using npm.

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

*These commands assume your project uses the `frontend` and `backend` directory names shown above.*

### 3. Configure environment variables

Create a `.env` file in the backend directory and configure the environment variables required by your application.

For example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use your actual configuration values. Keep `.env` out of version control and never commit database credentials or secret keys.

### 4. Run the application

Start the backend and frontend using the scripts configured in their respective `package.json` files.

Open the local frontend URL displayed by your development server.

## 🔐 Security Considerations

- Passwords should be hashed before storage.
- Protected API routes should verify authentication tokens.
- Each user should only be able to access their own applications.
- Extracted email information should be validated before it updates application records.
- Secrets and database credentials should be stored in environment variables.

## 🌱 Future Improvements

- LLM-assisted extraction for varied recruitment email formats.
- Improved classification of acknowledgements, assessments, interviews, reschedules, offers, and rejections.
- Search and filtering by company, job role, and application stage.
- Interview reminders and scheduling support.
- Application analytics and progress summaries.
- Optional Gmail integration with appropriate user authorization.

## 👩‍💻 Author

**Deepika V.**

Computer Science Engineering Student | Aspiring Software Developer

- GitHub: [Deepikav123](https://github.com/Deepikav123)
- LinkedIn: [deepikav09](https://www.linkedin.com/in/deepikav09)

---

*TrackHire is a project in development, built to explore full-stack development, recruitment workflow management, and structured information extraction.*
