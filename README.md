# Frontend Dashboard

This is a frontend dashboard project designed for managing and displaying user members in a system. The application allows admins to perform CRUD (Create, Read, Update, Delete) operations on user members, track activity logs, and manage member roles and permissions.

## Features

### Member Management
- **Add New Member**: Allows the admin to add new members with details such as name, email, role, and permissions.
- **Edit Member**: Enables the admin to edit the details of existing members, such as their name, email, role, and permissions.
- **Delete Member**: Allows the admin to delete a member from the system.
- **Display Members**: Displays a list of members with their details, such as name, email, role, and permissions (can edit, can delete, can invite).

### Activity Logs
- **Track Actions**: Tracks user actions (e.g., adding, updating, deleting members) and stores them in the system.
- **View Logs**: Displays activity logs with details of each action, including the timestamp and changes made during each operation.

### Responsive UI
- The dashboard is built using TailwindCSS, making the UI fully responsive for both desktop and mobile devices.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for managing application state using Redux Toolkit.
- **Axios**: Library for making HTTP requests to interact with the backend.
- **TailwindCSS**: Utility-first CSS framework used for styling the application.
- **React Router**: For handling routing and navigation between different views (pages) in the dashboard.

## Installation

Follow the steps below to set up the project locally.

### Prerequisites

Ensure that the following software is installed:

- **Node.js**: Version 16 or higher.
- **npm**: Version 7 or higher (or yarn).

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/frontend-dashboard.git
