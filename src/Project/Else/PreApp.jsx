// ************** React ****************

import { lazy, Suspense } from "react";

//************* */ MUI ******************

import { Alert, Fab, Snackbar } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

// ************** Component ****************

const Head = lazy(() => import("./Heading"));
const ContCart = lazy(() => import("../Cart/ContCart"));
const ContHome = lazy(() => import("../Home/ContHome"));
const Meals = lazy(() => import("../Main/Meels"));
const Drinks = lazy(() => import("../Main/Drinks"));
const Sweets = lazy(() => import("../Main/Sweet"));
const Profile = lazy(() => import("../Profile/ContProfile"));

import ProtectedRoute from "../Routes/ProtectedRoute";
import ContAboutUs from "../About_Us/ContAboutAs";
import ContLogin from "../Log/ContLogin";
import Logout from "../Log/Logout";
import Footer from "./Footer";

// ************** Router ****************

import { Route, Routes } from "react-router-dom";
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";

// ************** Skeleton ****************
import MealsSkeleton from "../Skeleton/MealsSkeleton";
import DrinksSkeleton from "../Skeleton/DrinksSkeleton";
import SweetsSkiliton from "../Skeleton/SweetsSkiliton";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../Routes/Wrapper";
import SnackbarComp from "./SnackbarComp";

export default function PreApp({
  mode,
  setMode,
  setShowCart,
  handleCloseSnackbar,
  location,
  snackbar,
  setSnackbar,
}) {
  return (
    <>
      {/* //  Heading  */}

      <Head setMode={setMode} mode={mode} />

      {/* Routes */}
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <ProtectedRoute>
                  <ContHome />
                </ProtectedRoute>
              </PageWrapper>
            }
          />
          {/* <Route path="/admin" element={<AdminPage />} /> */}
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
                <Suspense fallback={<DrinksSkeleton />}>
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
                <Suspense fallback={<SweetsSkiliton />}>
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
              <PageWrapper>
                <ContLogin />
              </PageWrapper>
            }
          />
          <Route
            path="/logout"
            element={
              <PageWrapper>
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              </PageWrapper>
            }
          />
        </Routes>
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

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: "0 0 20px rgba(255,152,0,0.6)",
        }}
        onClick={() => setShowCart(true)}
      >
        <ShoppingCart />
      </Fab>
      <ContCart setSnackbar={setSnackbar} />
    </>
  );
}
