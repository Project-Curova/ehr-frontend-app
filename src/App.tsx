import { createBrowserRouter, RouterProvider, type RouteObject, } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import RequireAuth from "./components/auth/RequireAuth";
import Loader from "./components/global/Loader";
import { AppointmentPageLayout, HomePageLayout } from "./layouts";
import WebLayout from "./layouts/WebLayout";
import { NAVIGATION } from "./lib/definitions";
import { BillingPage, MedicalRecords, PrescriptionPage } from "./pages";
import { LoginPage, SignUpPage } from "./pages/auth";
import AdminLoginPage from "./pages/auth/login/AdminLoginPage";
import ErrorPage from "./pages/error/ErrorPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <WebLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <HomePageLayout />
          },
          {
            path: `${NAVIGATION.APPOINTMENTS}`,
            element: <AppointmentPageLayout />
          },
          {
            path: `${NAVIGATION.PRESCRIPTIONS}`,
            element: <PrescriptionPage />
          },
          {
            path: `${NAVIGATION.RECORDS}`,
            element: <MedicalRecords />
          },

          {
            path: `${NAVIGATION.BILLING}`,
            element: <BillingPage />
          },
        ]
      },

      // Public routes
      {
        path: NAVIGATION.LOGIN,
        element: <LoginPage />
      },
      {
        path: NAVIGATION.ADMIN_LOGIN,
        element: <AdminLoginPage />
      },
      {
        path: NAVIGATION.SIGNUP,
        element: <SignUpPage />
      },
    ]
  },
];

const router = createBrowserRouter(routes)

function App() {
  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  )
}

export default App
