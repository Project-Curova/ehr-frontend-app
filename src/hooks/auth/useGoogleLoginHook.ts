import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGoogleSigninMutation } from "../../app/services/auth/auth";
import { AuthSliceActions } from "../../features/auth/AuthSlice";
import type { GoogleSigninResponse } from "../../lib/auth/authLib";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, NAVIGATION } from "../../lib/definitions";
import { useAppDispatch } from "../typedHooks";

type UseGoogleLoginHookProp = {
    setGoogleErrorMessage: React.Dispatch<React.SetStateAction<string | undefined | null>>
}

export const useGoogleLoginHook = ({ setGoogleErrorMessage }: UseGoogleLoginHookProp) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState<boolean>(false);
    const [googleLoginResponse, setGoogleLoginResponse] = useState<GoogleSigninResponse | null>(null);
    const [signinWithGoogle, { error: GoogleProfileLoginError, isError: isGoogleProfileLoginError, isLoading: isGoogleProfileLoginLoading, isSuccess: isGoogleProfileLoginSuccess }] = useGoogleSigninMutation();

    console.log(GOOGLE_CLIENT_ID);
    console.log(GOOGLE_CLIENT_SECRET);
    console.log(GOOGLE_REDIRECT_URL);

    const googleLogin = useGoogleLogin({
        flow: 'auth-code', // Use 'auth-code' to fetch tokens, including id_token
        scope: "openid profile email",
        onSuccess: async (codeResponse) => {
            setIsGoogleSigninLoading(true);
            try {
                console.log(codeResponse);
                // Exchange the authorization code for tokens
                const tokens = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        code: codeResponse.code,
                        client_id: GOOGLE_CLIENT_ID,
                        client_secret: GOOGLE_CLIENT_SECRET,
                        redirect_uri: GOOGLE_REDIRECT_URL,
                        grant_type: 'authorization_code',
                    }),
                });

                const tokenResponse = await tokens.json();
                const response = await signinWithGoogle({ token: tokenResponse.id_token }).unwrap();
                setIsGoogleSigninLoading(false);
                setGoogleLoginResponse(response);

                dispatch(AuthSliceActions.setUserDetails({
                  token: response.data.access,
                  user: response.data.user.full_name,
                  id: `${response.data.user.id}`,
                  type: response.data.user.type
                }));

                navigate(NAVIGATION.HOME);
            } catch (error) {
                console.error('Error during token exchange:', error);
                setGoogleErrorMessage("Error signing into Google!");
            }
        },
    })

    return {
        googleLogin,
        googleLoginResponse,
        isGoogleProfileLoading: isGoogleProfileLoginLoading || isGoogleSigninLoading,
        isGoogleProfileError: isGoogleProfileLoginError,
        GoogleProfileError: GoogleProfileLoginError,
        isGoogleProfileSuccess: isGoogleProfileLoginSuccess
    }
}