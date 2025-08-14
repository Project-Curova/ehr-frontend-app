import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { AuthSliceActions } from "../../features/auth/AuthSlice";

// Create a middleware intercept unauthenticated response errors and direct users to authenticate requests
export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isRejectedWithValue(action) && (action.payload as any).status == 401) {
        // Clear user session upon token expiry
        dispatch(AuthSliceActions.expireSession());
    }
    
    return next(action);
}