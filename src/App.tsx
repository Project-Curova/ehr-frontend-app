import { createBrowserRouter, RouterProvider, type RouteObject, } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import Loader from "./components/global/Loader";
import WebLayout from "./layouts/WebLayout";
import { NAVIGATION } from "./lib/definitions";
import { AppointmentPage, HomePage, MedicalRecords, PrescriptionPage } from "./pages";
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
              element: <HomePage />
            },
            {
              path: `${NAVIGATION.APPOINTMENTS}`,
              element: <AppointmentPage />
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
              element: <MedicalRecords />
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
