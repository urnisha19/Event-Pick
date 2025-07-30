EventPick
=========

EventPick is a **responsive event management web application** built with the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to browse and search for events, register for events, manage personal bookings, and for admins to add new events. The app features a modern, intuitive interface designed for seamless event discovery and booking.

Live Demo
---------

*   **Frontend:** [https://event-pick.vercel.app/](https://event-pick.vercel.app/)
    
*   **Backend API:** [https://eventpick-server.onrender.com/](https://eventpick-server.onrender.com/)
    

Features
--------

### Navigation Bar

*   Links to Home, Events, My Bookings, Add Event (admin only), and Profile pages.
    
*   Shows logged-in user's profile picture and name with profile edit options.
    

### Home Page

*   Search bar to filter events by name or category.
    
*   Featured Events section displaying 3 event cards (image, title, date, location, "View Details" button).
    
*   Categories section with buttons/cards for event types (Music, Sports, Tech, Business, etc.).
    
*   Recent Reviews section showing latest user reviews.
    

### Events Page

*   Displays all events in a grid layout.
    
*   Event cards include image, title, date & location, available seats, and a "Details" button.
    
*   Detailed event page includes full description, organizer info, registration deadline, seats left, registration fee, and "Register Now" button.
    

### Registration

*   Users must be logged in to register for events.
    
*   Registration form with pre-filled Name and Email, plus Phone number, Number of tickets, and optional Payment method.
    
*   Successful registrations appear in the user’s "My Bookings" page.
    

### My Bookings

*   Lists all events the user has registered for.
    
*   Shows event name, date, tickets booked, and "Cancel Booking" button.
    
*   Allows users to add a review with rating and comment for each event.
    

### Add Event (Admin Only)

*   Form to add new events: Event Name, Date, Location, Category, Description, Number of seats, and Event Image upload.
    
*   New events appear on the Events page after submission.
    

### Profile

*   Displays and allows editing of user profile information.
    

### Authentication

*   Email/password registration and login.
    
*   Google authentication integration.
    

### Responsive Design

*   Fully responsive and optimized for desktop, tablet, and mobile devices.
    

Technologies Used
-----------------

*   **Frontend:** React.js
    
*   **Backend:** Node.js, Express.js
    
*   **Database:** MongoDB
    
*   **Authentication:** JWT, Google OAuth
    
*   **Deployment:** Vercel (frontend), Render (backend)
    
* 