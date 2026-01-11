#🍽️ Restaurant Management Web Application (React)
##📌 Overview

This project is a fully featured restaurant web application built with React, designed to demonstrate my approach to clean code, performance optimization, and real-world problem solving.

The application simulates a modern restaurant experience, from browsing meals and placing orders to managing user profiles, while maintaining scalable architecture and an excellent user experience (UX).

##✨ Key Features
###🔐 Authentication & Security

User authentication using Firebase Authentication

Password reset functionality

Protected Routes for all pages that perform real actions

Logout functionality available from:

Navigation bar

User profile page

###🛒 Cart & Orders

Add items to the cart

Persist cart items until the user completes the purchase

Update item quantity inside the cart (increase / decrease)

Items are automatically removed when quantity reaches zero

Ability to delete orders in waiting status

Only one order status (waiting) was implemented, since an order becomes successful only after delivery (which is out of scope)

###❤️ Favorites Management

Add and remove items from favorites

Manage favorites directly from the Profile page

Favorites state is synchronized across all pages:

Home

Meals

Drinks

Sweets

Profile

Favorite status is persisted using LocalStorage

###🍕 Products & UI

Meals displayed using modern Card-based UI

Each card includes:

Meal image

Name

Rating

Price

Actions:

Purchase

Add to favorites

View more details

Category filtering:

Breakfast

Lunch

Dinner

Pagination when the number of items exceeds 12

Price sorting:

Ascending

Descending

###🎨 User Experience (UX)

Modern Skeleton Loading instead of traditional loaders

Global Snackbar & Alert system for user feedback

Automatic Scroll to Top on route change

Dynamic document title updates

Animated navigation bar with modern icons

Support for Light / Dark themes

Smooth animations across the app using Framer Motion

Page transition animations included

###👤 User Profile

Limited profile editing based on authentication method

Centralized management of:

Orders

Favorites

Logout

###📄 Additional Pages

####About Us page

Simple layout enhanced with subtle animations

##🧠 Architecture & Code Quality

Clean, maintainable, and scalable codebase

Applied Container / Presenter pattern

Performance optimization through memoization

Usage of:

useMemo for expensive calculations

useCallback to prevent unnecessary function recreation

React.memo to reduce unnecessary re-renders

useRef for animation control

Lazy loading with React.lazy and Suspense

Lazy initialization

Functional state updates to avoid stale state

Proper cleanup to prevent memory leaks in useEffect

State management using Redux Toolkit (RTK)

##⚠️ Challenges & Solutions
###1️⃣ API & Data Limitations

No single free API provided:

Meals

Drinks

Desserts

Solution:

Integrated three different APIs, one for each category

API data lacked:

Price

Rating

Favorite status (isFav)

###2️⃣ Pricing & Rating Handling

Prices and ratings were generated using Math.round

Issue encountered:

Values changed on every re-render

Solution:

Values initialized once inside useEffect

This is a temporary workaround until a proper API is available

###3️⃣ Favorites Synchronization

Items appear in multiple sections of the app

Changes must be reflected globally

Solution:

Persist favorite state in LocalStorage

Rehydrate favorites on initial render

##🧩 Technical Considerations

Considered using createEntityAdapter for normalized state

Decided against it due to the relatively small data size

##🚀 Future Improvements

Migrate data fetching to RTK Query (fetchBaseQuery)

Add multi-language support using i18n (Arabic / English)

Build an Admin Dashboard

Planned as a separate module within the same project

Add Guest Login functionality (under consideration)

##🛠️ Tech Stack

Frontend:
React, JavaScript

State Management:
Redux Toolkit (RTK)

Routing:
React Router

UI & Animations:
Material UI (MUI), Framer Motion

Data Fetching:
Axios

Authentication:
Firebase

Utilities:
UUID

API Testing:
Postman

##📦 Deployment Notes

Added a vercel.json configuration

Redirects all routes to index.html

Fixes 404 issues when refreshing non-home routes

#🎯 Project Purpose

This project was built as a practical showcase of my development mindset, focusing on how I structure applications, solve real-world problems, and optimize performance.

Over roughly a month of development, many challenges were identified and resolved, and what initially seemed complex has now become part of my everyday workflow.
