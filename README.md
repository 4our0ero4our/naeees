# NAEEES Digital Portal

A comprehensive digital platform designed for the **Nigerian Association of Electrical and Electronics Engineering Students (NAEEES)** at the Federal University of Technology, Minna (FUTMinna). This portal serves as a centralized hub for academic resources, student services, and community engagement.

## About

The NAEEES Digital Portal is a modern web application built to streamline academic activities, enhance student collaboration, and provide easy access to essential resources for Electrical and Electronics Engineering students at FUTMinna. The platform combines academic management tools with community features to create a comprehensive student experience.

## Key Features

### 🎓 Academic Resources
- **Materials Library**: Access to lecture notes, past questions, textbooks, and assignments
- **CGPA Tracker**: Comprehensive grade point average tracking system with semester-by-semester analysis
- **Course Management**: Organized materials by course code, level, and semester
- **File Management**: Secure cloud-based storage and retrieval of academic documents

### 👥 User Management
- **Role-Based Access Control**: Three-tier system (Student, Admin, Super Admin)
- **Membership Verification**: Automated verification for NAEEES members and non-members
- **Student Verification**: Matriculation number and email validation for FUTMinna students
- **Account Management**: User suspension, role promotion/demotion, and status tracking

### 📅 Events & Activities
- **Event Management**: Create, manage, and register for workshops, trainings, conferences, and social events
- **Event Registration**: Ticket generation and payment processing for paid events
- **Event Calendar**: Organized view of upcoming and ongoing events
- **Audience Targeting**: Events can be restricted to members only or open to all students

### 🤝 Community Features
- **User Posts**: Community engagement through posts and discussions
- **Activity Feed**: Recent activity tracking for materials and events
- **Member Directory**: Access to student and member information

### 🔐 Security & Authentication
- **Secure Authentication**: NextAuth.js-based session management
- **Email Verification**: FUTMinna email domain validation (@st.futminna.edu.ng)
- **Password Security**: Bcrypt hashing for secure password storage
- **Session Management**: JWT-based authentication with secure cookie handling

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components with modern design patterns

## Project Structure

The application follows Next.js App Router conventions with a clear separation of concerns:

- **API Routes**: RESTful endpoints for materials, CGPA, events, user management, and authentication
- **Dashboard**: Role-based dashboard with personalized views for students and administrators
- **Components**: Reusable UI components for forms, modals, alerts, and navigation
- **Services**: Business logic layer for data operations
- **Models**: MongoDB schemas for data persistence
- **Utilities**: Helper functions for exports, URL manipulation, and calculations

## User Roles

### Student
- Access academic materials
- Track CGPA
- Register for events
- View community posts
- Upload contributions (pending admin approval)

### Admin
- All student privileges
- Upload and manage academic materials
- Create and manage events
- View active users and statistics

### Super Admin
- All admin privileges
- User management (promote, demote, suspend)
- Full system access
- User statistics and analytics

## Membership System

The platform supports two membership types:

- **Member**: Active NAEEES members with full access to member-only content
- **Non-Member**: Students who have verified their studentship but are not NAEEES members

Membership status affects access to certain events and materials marked as "members only."

## Academic Materials

The platform supports various types of academic resources:

- Lecture Notes
- Past Questions
- Textbooks
- Assignments

All materials are organized by:
- Course Code
- Academic Level
- Semester
- Lecturer
- Material Type

## CGPA Tracking

Students can:
- Create semester records
- Add courses with units and grades
- Automatically calculate GPA
- Track academic progress over time
- Export CGPA records

## Events System

Events can be:
- **Free**: Instant registration and ticket generation
- **Paid**: Requires payment receipt upload and admin approval
- **Member-Only**: Restricted to NAEEES members
- **Public**: Open to all verified students


## Design Philosophy

The platform emphasizes:
- **User Experience**: Intuitive navigation and modern UI/UX design
- **Accessibility**: Responsive design for all device types
- **Performance**: Optimized loading and efficient data management
- **Security**: Robust authentication and authorization mechanisms
- **Scalability**: Architecture designed for growth and future enhancements

## Future Enhancements

Planned features include:
- Opportunities management (internships, scholarships, competitions)
- Enhanced community features (forums, discussions)
- Advanced analytics and reporting
- Mobile application
- Notification system
- Email integration

---

**Developed for**: Nigerian Association of Electrical and Electronics Engineering Students (NAEEES)  
**Institution**: Federal University of Technology, Minna (FUTMinna)  
**Purpose**: Digital transformation of student academic and community activities
