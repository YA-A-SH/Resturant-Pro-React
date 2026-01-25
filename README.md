# 🍽️ Restaurant Management Web Application (React)
## 📌 Overview

This project is a full-featured Restaurant Management Web Application built with React, designed to simulate a real-world restaurant system with a strong focus on clean code, scalable architecture, performance optimization, and user experience.

The application includes a complete customer-facing experience (browsing products, managing orders and favorites, user profiles) as well as a fully implemented Admin Dashboard for managing the system.

## ✨ Core Features

### 🔐 Authentication & Security

User authentication using Firebase Authentication

Password reset functionality

Protected routes for all sensitive actions

Logout available from:

Navigation bar

User profile page

🛒 Cart & Orders

Add products to cart

Persist cart items until checkout

Update item quantities (increase / decrease)

Automatically remove items when quantity reaches zero

Delete orders with waiting status

Only one order status implemented (waiting)
(Order success depends on delivery, which is out of scope)

### ❤️ Favorites Management

Add and remove items from favorites

Manage favorites from the Profile page

Favorites are synchronized across:

Home

Meals

Drinks

Sweets

Profile

Favorite state persisted using LocalStorage

Favorites rehydrated on app initialization

### 🍕 Products & UI

Products displayed using a modern Card-based UI

Each card includes:

Image

Name

Rating

Price

Available actions:

Purchase

Add to favorites

View details

Filtering & Sorting

Category filtering:

Breakfast

Lunch

Dinner

Pagination when items exceed 12

Price sorting:

Ascending

Descending

### 🎨 User Experience (UX)

Skeleton loading instead of traditional loaders

Global Snackbar & Alert system

Automatic scroll-to-top on route change

Dynamic document title updates

Animated navigation bar with modern icons

Light / Dark mode support

Smooth animations using Framer Motion

Page transition animations

### 👤 User Profile

Limited profile editing based on authentication method

Centralized management of:

Orders

Favorites

Logout

### 📄 Additional Pages
About Us

Simple and clean layout

Subtle animations for better visual experience

### 🛠️ Admin Dashboard

A fully implemented Admin Dashboard is included as part of the project.
It is logically and visually separated from the user-facing application and designed to manage the system efficiently.

# To Try Admin This Is The Code (770304)

Key Features:

Admin Authentication

Login using a private admin-only access code

All admin routes are fully protected

Main Dashboard

General statistics (revenue, users, orders, stock)

Stats Cards for quick insights

Export reports functionality

Users Management

View users with full details

Search users by name

Enable / disable users

Verify users with a single action

Staff (Chefs) Management

Add and edit chef information

Manage salaries and employment status

Professional Admin UX

Dedicated admin interface

Light / Dark mode support

Fully responsive design across all devices

Smooth animations and transitions

## ⚠️ Note:
Multi-language support is planned but not implemented yet in the Admin Dashboard.

## 🧠 Architecture & Code Quality

Clean, maintainable, and scalable codebase

Applied Container / Presenter pattern

Performance optimizations using:

useMemo

useCallback

React.memo

useRef

Lazy loading with React.lazy and Suspense

Functional state updates to avoid stale state

Proper cleanup in useEffect to prevent memory leaks

State management using Redux Toolkit (RTK)

## ⚠️ Challenges & Solutions
API Limitations

No single free API provided meals, drinks, and desserts

Solution: Integrated three different APIs

Pricing & Rating

Values generated temporarily

Initialized once inside useEffect to prevent changes on re-render

Favorites Synchronization

Solved using LocalStorage

Favorites restored on initial render

## 🚀 Future Improvements

Migrate data fetching to RTK Query

Add multi-language support (Arabic / English)

Add Login as Guest functionality

## 🛠️ Tech Stack
Frontend

React

JavaScript

State Management

Redux Toolkit (RTK)

Routing

React Router

UI & Animations

Material UI (MUI)

Framer Motion

Data Fetching

Axios

Authentication

Firebase

## 🧰 Additional Tools

UUID

Postman

Recharts

i18n

## 📦 Deployment

vercel.json configuration added

All routes redirected to index.html

Fixes 404 issues when refreshing non-home routes

## 🎯 Project Purpose

This project was built as a practical showcase of my development mindset, focusing on application structure, real-world problem solving, and performance optimization.

Over approximately one month of development, multiple challenges were identified and resolved, turning complex requirements into a solid and reusable workflow.

# AI-assisted design enhancements were used in selected parts of the application to improve the overall UI and user experience.
