# Anis Hidra  |  Full-Stack Developer Portfolio

=>  A modern, dynamic portfolio platform built with React and Django REST Framework, featuring a secure content management dashboard and business management system.





# Overview

=>  This is my personal full-stack portfolio, designed not only to showcase my work and technical skills, but also to provide a complete system for managing the website and its business data.

=>  The platform combines a responsive React frontend with a Django REST API and a protected dashboard for managing portfolio content, messages, visitors, clients, projects, income, and expenses.





# Features

=>  Portfolio

    ---> Modern responsive user interface
    ---> Hero Background
    ---> Home
    ---> About
    ---> Skills
    ---> Qualifications (Educations + Certificates)
    ---> Achievements
    ---> Projects
    ---> Services
    ---> Contact

=>  Dashboard

    ---> Overview
        --> Total visitors
        --> Monthly visitors
        --> Visitor analytics
        --> Main recall
        --> Management recall
        --> Message recall
    ---> Main
        --> Home
        --> About
        --> Skills
        --> Qualifications (Educations + Certificates)
        --> Achievements
        --> Projects
        --> Services
    ---> Management
        --> Financial management
        --> Clients Management
    ---> Message
        --> Message Box from "Contact Page"

=>  Responsive Design

    ---> Desktop
    ---> Laptop
    ---> Tablet
    ---> Mobile devices

=>  Design Background and Pages

    ---> (Blue+Purple) UI
    ---> Aurora-inspired visual effects
    ---> A celestial touch with stars
    ---> Wavy lines Aurora
    ---> Cyan-to-violet gradients
    ---> Responsive layouts
    ---> Modern cards
    ---> Interactive dashboard components
    ---> Minimal and professional typography





# Tech Stack

=>  Frontend

    ---> JavaScript - Html5 - Css3 - Jsx - React - Font Awesome...

=>  Backend

    ---> Python - Django - Django REST Framework - PostgreSQL

=>  Deployment

    ---> Gunicorn - Nginx - Namecheap - Render - CloudFlare - Neon - Cloudinary





# Architecture

    React Frontend
          │
          │ REST API
          ▼
    Django REST Framework
          │
          ▼
       Database

=>  The frontend and backend are separated, allowing the application to be developed, deployed, and maintained independently.





# Structure

    AnisHidra/
    │
    ├── frontend_anishidra/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── layouts/
    │   │   ├── pages/
    │   │   ├── styles/
    │   │   └── ...
    │   │
    │   ├── package.json
    │   └── ...
    │
    ├── backend_anishidra/
    │   ├── core/
    │   ├── manage.py
    │   ├── ...
    │   ├── requirements.txt
    │   └── ...
    │
    ├── .gitignore
    └── README.md





# Getting Started

=>  Prerequisites, make sure you have the following installed:

    ---> Python 3.14
    ---> pip3
    ---> Node.js
    ---> npm
    ---> Git

=>  Clone the Repository

    ---> git clone YOUR_GITHUB_REPOSITORY_URL
    ---> cd AnisHidra





# Local Development

=>  Backend:

    ---> cd backend_anishidra
    ---> python3 -m venv .venv
    ---> source .venv/bin/activate
    ---> python3 pip install --upgrade pip
    ---> pip install django
    ---> pip install djangorestframework
    ---> pip install djangocorsheaders
    ---> pip install -r requirements.txt
    ---> python manage.py migrate
    ---> python manage.py runserver

=>  Environment Variables:

    ---> SECRET_KEY=your-secret-key
    ---> DEBUG=True
    ---> note: Create a .env file inside the backend directory. Additional environment variables may be required depending on the deployment configuration. Never commit your .env file or production credentials to GitHub.

=>  Database:

    ---> python3 manage.py makemigrations
    ---> python3 manage.py migrate
    ---> python3 manage.py createsuperuser

=>  Frontend:

    ---> cd frontend_anishidra
    ---> npm install
    ---> npm run dev

=>  API:

    ---> note: The frontend communicates with the Django backend through REST API endpoints. The API is responsible for dynamically providing portfolio content such as "pam". The API also provides authenticated endpoints for protected dashboard operations.
    ---> pam:
        --> Home statics
        --> About informations
        --> Skills Cards
        --> Qualifications (Educations & Certificates cards)
        --> Achievements Profiles
        --> Projects Cards
        --> Services Cards
        --> Contact Messages
        --> Visitors
        --> Management data

=>  Security:

    ---> Environment variables for sensitive configuration
    ---> Token-based authentication
    ---> Protected dashboard endpoints
    ---> CORS configuration
    ---> Django security settings
    ---> Production DEBUG=False
    ---> Gunicorn for application serving
    ---> Nginx as a reverse proxy
    ---> Professional Encryption System





# Links


    =>  Live Portfolio  ---> https://anishidra.com

    =>  GitHub          ---> https://github.com/anishidra76
                        --->  @anishidra76

    =>  LinkedIn        ---> https://linkedin.com/in/anishidra76
                        --->  @anishidra76

    =>  Discord         ---> https://discord.com/users/1522648106154463356
                        --->  @anishidra76

    =>  X (Twitter)     ---> https://x.com/anishidra76
                        --->  @anishidra76

    => Email            ---> anishidracontact@gmail.com

    => Whatsapp         ---> https://wa.me/message/5B6WBDXWYVSWM1
                        --->  +213541174042
                    
    => Telegram         ---> https://t.me/anishidra76
                        --->  @anishidra76





# Author

=>  Anis Hidra
    ---> Full-Stack Web Developer, Building modern web applications, APIs, and digital solutions.

=>  Status: Active Development
