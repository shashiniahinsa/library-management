# Library Management System - Frontend

A modern React TypeScript application for managing library operations, including book inventory, member management, lending records, and staff administration.

## Overview

This is the frontend component of a comprehensive library management system. It provides a user-friendly interface for librarians and staff to manage books, members, lending transactions, and system administration.

## Features

- **Authentication & Authorization**: Secure user login and signup with role-based access control
- **Book Management**: Add, view, edit, and manage book inventory
- **Member Management**: Register and manage library members
- **Lending Management**: Track and manage book lending transactions
- **Staff Management**: Administer staff members and their roles
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: CSS
- **State Management**: React Context API (AuthProvider)
- **Build Tool**: Create React App
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── components/
│   ├── NavBar.tsx                 # Navigation component
│   ├── UnAuth.tsx                 # Unauthenticated user view
│   ├── auth/                      # Authentication components
│   │   ├── AuthProvider.tsx       # Auth context provider
│   │   ├── Home.tsx               # Dashboard home page
│   │   ├── SignIn.tsx             # User login
│   │   └── SignUp.tsx             # User registration
│   ├── book/                      # Book management
│   │   ├── Book.tsx               # Book list view
│   │   ├── AddBook.tsx            # Add new book
│   │   └── BookEdit.tsx           # Edit book details
│   ├── member/                    # Member management
│   │   ├── Member.tsx             # Member list view
│   │   ├── AddMember.tsx          # Register new member
│   │   └── MemberEdit.tsx         # Edit member details
│   ├── lending/                   # Lending management
│   │   ├── Lending.tsx            # Lending transactions view
│   │   ├── AddLending.tsx         # Create new lending record
│   │   └── LendingEdit.tsx        # Edit lending details
│   └── staff/                     # Staff management
│       ├── Staff.tsx              # Staff list view
│       ├── AddStaff.tsx           # Add new staff member
│       └── StaffEdit.tsx          # Edit staff details
├── service/                       # API service layer
│   ├── Book.ts                    # Book service
│   ├── Member.ts                  # Member service
│   ├── Staff.ts                   # Staff service
│   ├── Lending.ts                 # Lending service
│   ├── Login.ts                   # Authentication service
│   └── AuthProcess/
│       └── Auths.ts               # Auth utilities
├── App.tsx                        # Main app component
├── index.tsx                      # Entry point
└── styles/
    ├── App.css                    # App styles
    └── index.css                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd libmgmt
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

#### Development Server
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page reloads on edits.

#### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

#### Production Build
```bash
npm run build
```
Builds the app for production in the `build` folder. The build is minified and optimized.

#### Eject (Advanced)
```bash
npm run eject
```
**Note: This is a one-way operation.** Ejects from Create React App configuration to have full control over build configuration.

## Key Components

### Authentication
- **AuthProvider**: Manages user authentication state and context
- **SignIn/SignUp**: Handle user authentication flows
- **Home**: Main dashboard for authenticated users

### Management Modules
Each module (Book, Member, Lending, Staff) follows a consistent pattern:
- **List Component**: Display all records
- **Add Component**: Create new records
- **Edit Component**: Modify existing records

### Service Layer
The `service/` directory contains all API communication logic, keeping components clean and reusable.

## Development Workflow

1. Create features in isolated components
2. Use the service layer for backend communication
3. Leverage AuthProvider for authentication state
4. Maintain TypeScript type safety throughout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/)
