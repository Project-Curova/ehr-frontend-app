import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/typedHooks";

const RequireAuth = () => {

    // Get User previous location h7istory
    const location = useLocation();

    // Check the store for any existing user? Return children routes : Direct them to login page
    const user = useAppSelector((state) => state.authUser)

    // if (!user.jwt) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    return (
        <>
            <Outlet />
        </>
    )
}

export default RequireAuth
