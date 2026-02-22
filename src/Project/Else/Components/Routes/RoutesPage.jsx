// ************** Else ****************

import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense, useContext } from "react";

// ************** Components ****************

import ContAboutUs from "@user/About_Us/ContAboutAs";
import ContLogin from ".././Log/ContLogin";
import Logout from ".././Log/Logout";
const ContUsers = lazy(() => import("@admin/ManageUsers/ContUsers"));
const ManageMeals = lazy(() => import("@admin/ManageDishes/ManageMeals"));
const ManageDrinks = lazy(() => import("@admin/ManageDishes/ManageDrinks"));
const ManageSweets = lazy(() => import("@admin/ManageDishes/ManageSweets"));
import NotFound from "./PageNotFound";
import ProfileSkeleton from "@user/Skeleton/ProfileSkeleton";

// ************** Lazy Components ****************

const ContHome = lazy(() => import("@user/Home/ContHome"));
const Meals = lazy(() => import("@user/Main/Components/Meels"));
const Drinks = lazy(() => import("@user/Main/Components/Drinks"));
const Sweets = lazy(() => import("@user/Main/Components/Sweet"));
const Profile = lazy(() => import("@user/Profile/ContProfile"));
const PreAdmin = lazy(() => import("@admin/Main/PreAdmin"));
const ChefProfile = lazy(
  () => import("@admin/ManageUsers/Components/ProfilePages/ChefProfile"),
);
const UserProfile = lazy(
  () => import("@admin/ManageUsers/Components/ProfilePages/UserProfile"),
);
const ManagerProfile = lazy(
  () => import("@admin/ManageUsers/Components/ProfilePages/ManagerProfile"),
);

// ************** Router ****************

import PageWrapper from "./Wrapper";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// ************** Skeleton ****************

import MealsSkeleton from "@user/Skeleton/MealsSkeleton";
import DrinksAndSweetsSkeleton from "@user/Skeleton/DrinksAndSweetsSkiliton";
import Loader from "../Else/Loader";
import { IsAdminContext } from "../Context/MainContext";

const AdminRoute = ({ children }) => {
  return (
    <Suspense fallback={<Loader id="admin" />}>
      <PageWrapper>
        <AdminProtectedRoute>{children}</AdminProtectedRoute>
      </PageWrapper>
    </Suspense>
  );
};

const UserRoute = ({ children, Load }) => {
  return (
    <PageWrapper>
      <Suspense fallback={Load}>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Suspense>
    </PageWrapper>
  );
};

const RoutesComp = React.memo(() => {
  const location = useLocation();
  const { isAdmin } = useContext(IsAdminContext);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <PageWrapper>
                  <ProtectedRoute>
                    <ContHome />
                  </ProtectedRoute>
                </PageWrapper>
              )
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                {" "}
                <PreAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <AdminRoute>
                <ContUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-users/chef"
            element={
              <AdminRoute>
                <ChefProfile />
              </AdminRoute>
            }
          />{" "}
          <Route
            path="/admin/manage-users/manager"
            element={
              <AdminRoute>
                {" "}
                <ManagerProfile />
              </AdminRoute>
            }
          />{" "}
          <Route
            path="/admin/manage-users/user"
            element={
              <AdminRoute>
                {" "}
                <UserProfile />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manageMeals"
            element={
              <AdminRoute>
                {" "}
                <ManageMeals />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manageDrinks"
            element={
              <AdminRoute>
                {" "}
                <ManageDrinks />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manageSweets"
            element={
              <AdminRoute>
                {" "}
                <ManageSweets />
              </AdminRoute>
            }
          />
          <Route
            path="/meals"
            element={
              <UserRoute Load={<MealsSkeleton />}>
                <Meals />
              </UserRoute>
            }
          />
          <Route
            path="/drinks"
            element={
              <UserRoute Load={<DrinksAndSweetsSkeleton />}>
                <Drinks />
              </UserRoute>
            }
          />
          <Route
            path="/sweet"
            element={
              <UserRoute Load={<DrinksAndSweetsSkeleton />}>
                <Sweets />
              </UserRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserRoute Load={<ProfileSkeleton />}>
                <Profile />
              </UserRoute>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <PageWrapper>
                {" "}
                <ContAboutUs />{" "}
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <PageWrapper>
                  <ContLogin />
                </PageWrapper>
              )
            }
          />
          <Route
            path="/logout"
            element={
              <PageWrapper>
                <Logout />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>{" "}
      </AnimatePresence>
    </>
  );
});

export default RoutesComp;
