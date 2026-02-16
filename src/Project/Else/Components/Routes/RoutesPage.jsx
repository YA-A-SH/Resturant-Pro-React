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
const ContAdmin = lazy(() => import("@admin/Main/ContAdmin"));
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
                <ContAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ContUsers />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />
          <Route
            path="/admin/manage-users/chef"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ChefProfile />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />{" "}
          <Route
            path="/admin/manage-users/manager"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ManagerProfile />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />{" "}
          <Route
            path="/admin/manage-users/user"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <UserProfile />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />
          <Route
            path="/admin/manageMeals"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ManageMeals />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />
          <Route
            path="/admin/manageDrinks"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ManageDrinks />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />
          <Route
            path="/admin/manageSweets"
            element={
              <PageWrapper>
                <AdminProtectedRoute>
                  <ManageSweets />
                </AdminProtectedRoute>
              </PageWrapper>
            }
          />
          <Route
            path="/meals"
            element={
              <PageWrapper>
                <Suspense fallback={<MealsSkeleton />}>
                  <ProtectedRoute>
                    <Meals />
                  </ProtectedRoute>
                </Suspense>
              </PageWrapper>
            }
          />
          <Route
            path="/drinks"
            element={
              <PageWrapper>
                <Suspense fallback={<DrinksAndSweetsSkeleton />}>
                  <ProtectedRoute>
                    <Drinks />
                  </ProtectedRoute>
                </Suspense>
              </PageWrapper>
            }
          />
          <Route
            path="/sweet"
            element={
              <PageWrapper>
                <Suspense fallback={<DrinksAndSweetsSkeleton />}>
                  <ProtectedRoute>
                    <Sweets />
                  </ProtectedRoute>
                </Suspense>
              </PageWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <PageWrapper>
                <Suspense fallback={<ProfileSkeleton />}>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Suspense>
              </PageWrapper>
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
