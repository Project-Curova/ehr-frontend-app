import { createBrowserRouter, RouterProvider, type RouteObject, } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import Loader from "./components/global/Loader";
import { AppointmentPageLayout, HomePageLayout } from "./layouts";
import WebLayout from "./layouts/WebLayout";
import { NAVIGATION } from "./lib/definitions";
import { BillingPage, MedicalRecords, PrescriptionPage } from "./pages";
import { LoginPage, SignUpPage } from "./pages/auth";
import ErrorPage from "./pages/error/ErrorPage";

 const routes: RouteObject[] = [
    {
      path: "/",
      // element: <RequireAuth />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <WebLayout />,
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
