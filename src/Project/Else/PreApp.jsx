// ************** React ****************

import { lazy, Suspense } from "react";

//************* */ MUI ******************

import { Box, Fab } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

// ************** Component ****************

const Head = lazy(() => import("../Else/Components/Heading"));
const ContCart = lazy(() => import("../User/Cart/ContCart"));
const ContHome = lazy(() => import("../User/Home/ContHome"));
const Meals = lazy(() => import("../User/Main/Components/Meels"));
const Drinks = lazy(() => import("../User/Main/Components/Drinks"));
const Sweets = lazy(() => import("../User/Main/Components/Sweet"));
const Profile = lazy(() => import("../User/Profile/ContProfile"));
const ContAdmin = lazy(() => import("../Admin/Main/ContAdmin"));
const ChefProfile = lazy(
  () => import("../Admin/ManageUsers/Components/ProfilePages/ChefProfile"),
);
const UserProfile = lazy(
  () => import("../Admin/ManageUsers/Components/ProfilePages/UserProfile"),
);
const ManagerProfile = lazy(
  () => import("../Admin/ManageUsers/Components/ProfilePages/ManagerProfile"),
);

import ProtectedRoute from "../User/Routes/ProtectedRoute";
import ContAboutUs from "../User/About_Us/ContAboutAs";
import ContLogin from "../User/Log/ContLogin";
import Logout from "../User/Log/Logout";
import Footer from "../Else/Components/Footer";
import SnackbarComp from "../Else/Components/SnackbarComp";

// ************** Router ****************

import { Navigate, Route, Routes } from "react-router-dom";
import ProfileSkeleton from "../User/Skeleton/ProfileSkeleton";
import PageWrapper from "../User/Routes/Wrapper";

// ************** Skeleton ****************
import MealsSkeleton from "../User/Skeleton/MealsSkeleton";
import DrinksAndSweetsSkeleton from "../User/Skeleton/DrinksAndSweetsSkiliton";

// ************** Else ****************
import { AnimatePresence } from "framer-motion";
import AdminProtectedRoute from "../User/Routes/AdminProtectedRoute";
import ContUsers from "../Admin/ManageUsers/ContUsers";
import ManageMeals from "../Admin/ManageDishes/ManageMeals";
import ManageDrinks from "../Admin/ManageDishes/ManageDrinks";
import ManageSweets from "../Admin/ManageDishes/ManageSweets";

export default function PreApp({
  mode,
  setMode,
  setShowCart,
  handleCloseSnackbar,
  location,
  snackbar,
  setSnackbar,
  isAdmin,
}) {
  return (
    <Box component="main">
      {/* //  Heading  */}

      <Head setMode={setMode} mode={mode} />

      {/* Routes */}
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
              <PageWrapper>
                <AdminProtectedRoute>
                  <ContAdmin />
                </AdminProtectedRoute>
              </PageWrapper>
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
        </Routes>{" "}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Else  */}

      <SnackbarComp
        openSnackbar={snackbar.open}
        msg={snackbar.message}
        color={snackbar.color}
        handleClose={handleCloseSnackbar}
      />

      {isAdmin ? null : (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            boxShadow: "0 0 20px rgba(255,152,0,0.6)",
          }}
          onClick={() => setShowCart(true)}
          aria-label="Shopping Cart"
        >
          <ShoppingCart />
        </Fab>
      )}

      <ContCart setSnackbar={setSnackbar} />
    </Box>
  );
}
