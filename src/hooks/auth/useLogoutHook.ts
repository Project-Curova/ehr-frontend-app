import { useNavigate } from "react-router";
import { useSignoutMutation } from "../../app/services/auth/auth";
import { persistor } from "../../app/store";
import { AuthSliceActions } from "../../features/auth/AuthSlice";
import { NAVIGATION } from "../../lib/definitions";
import { useAppDispatch } from "../typedHooks";

const useLogoutHook = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [signOutUser, { isLoading: isSignOutUserLoading }] = useSignoutMutation();

    async function logoutUser() {
        try {
            // Verify user email
            const response = await signOutUser({ refresh: "" }).unwrap();
            console.log(response)
            // Purge local storage
            persistor.purge();
            dispatch(AuthSliceActions.logout());
            dispatch(AuthSliceActions.resetSession());
            navigate(NAVIGATION.LOGIN)
        } catch (error) {
            if (typeof error == 'object' && error != null) {
                const response = (error as any).data.detail;
                console.log(response);
            }
            else {
                console.log("Unable to sign out")
            }
        }
    }

    return (
        {
            logoutUser,
            isSignOutUserLoading
        }
    )
}

export default useLogoutHook