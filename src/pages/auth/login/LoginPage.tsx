import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { useSigninMutation } from "../../../app/services/auth/auth";
import EyeClose from "../../../assets/auth/eye_close.svg";
import EyeOpen from "../../../assets/auth/eye_open.svg";
import googleLogo from "../../../assets/auth/google.png";
import HeroImg from "../../../assets/hero.svg";
import { AuthSliceActions } from "../../../features/auth/AuthSlice";
import { useGoogleLoginHook } from "../../../hooks/auth/useGoogleLoginHook";
import { useAppDispatch } from "../../../hooks/typedHooks";
import { LoginSchema, type LoginFormData } from "../../../lib/auth/authLib";
import { NAVIGATION, override } from "../../../lib/definitions";

const LoginPage = () => {
    return (
        <div id="login" className="block md:grid grid-cols-2 h-screen">
            {/* Login Form */}
            <div className="px-5 sm:px-12 py-9 pt-7 bg-PrimaryColor-50 h-full overflow-y-auto">
                <div className="w-full max-w-[450px] mx-auto">

                    <h1 className="font-HelveticaNeue-Bold text-xl sm:text-2xl text-center mt-5 mb-2">Sign in here</h1>
                    {/* <p className="text-sub-info  leading-normal">Before you use the features in the Activ8 application, <br /> please sign in first.</p> */}
                    <Login />
                </div>
            </div>

            {/* Login Hero Image */}
            <div className="bg-[#033856] p-8 text-white">
                <img src={HeroImg} className="w-[150px] mx-auto" alt="hero" />
                <h3 className="mt-[12%] font-bold text-[30px] text-center">Welcome back to Curova</h3>
                <p className="mt-5 font-medium">The Complete Intelligence Platform for Modern Healthcare.</p>
            </div>
        </div>
    )
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState<boolean>(false);

    const [googleErrorMessage, setGoogleErrorMessage] = useState<string | undefined | null>(null);

    const dispatch = useAppDispatch();

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

    const [signInUser, { isLoading: isSignInUserLoading }] = useSigninMutation();

    const { googleLogin, isGoogleProfileLoading } = useGoogleLoginHook({ setGoogleErrorMessage });

    // Submit from details to server and verify OTP
    async function loginUser(userData: LoginFormData) {

        try {
            // Verify user email
            const response = await signInUser({ username: userData.username, password: userData.password }).unwrap();
            dispatch(AuthSliceActions.setUserDetails({
                token: response.tokens.access,
                user: response.username,
            }));
            navigate(NAVIGATION.HOME);
        } catch (error) {
            if (typeof error == 'object' && error != null) {
                const response = (error as any).data.detail;
                toast.error(response);
            }
            else {
                toast.error("Unable to sign in!");
            }
        }
    }

    const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
        loginUser(data);
    };

    if (googleErrorMessage) {
        setGoogleErrorMessage(null);
        toast.error(googleErrorMessage);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="py-7 pt-6 pb-5 font-OpenSans-Regular">
                <div className="flex flex-col gap-y-7">
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Username <span className="text-red-500">*</span>
                            </label>
                            {errors.username?.message && (<span className="text-red-700 text-sm">{errors.username?.message}</span>)}
                        </div>
                        <input
                            {...register("username")}
                            type="text"
                            placeholder="Enter your username"
                            className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Enter Password <span className="text-red-500">*</span>
                            </label>
                            {errors.password?.message && (<span className="text-red-700 text-sm">{errors.password?.message}</span>)}
                        </div>
                        <div className="bg-white relative rounded-md">
                            <input
                                {...register("password")}
                                type={passwordShown ? "text" : "password"}
                                placeholder="Enter your password"
                                className="mt-1 bg-white block w-full h-full p-3 pr-9 rounded-md shadow-sm sm:text-sm outline-none focus:border focus:border-PrimaryColor-600"
                            />
                            <div className="absolute top-[40%] translate-y-[-25%] right-2 cursor-pointer" onClick={() => setPasswordShown(!passwordShown)} >
                                {passwordShown ? <img src={EyeOpen} alt="password visible" /> : <img src={EyeClose} alt="password visible" />}
                            </div>
                        </div>
                        <Link className="text-brown font-OpenSans-Medium block text-end mt-2 text-sm w-max ml-auto" to={NAVIGATION.FORGOT_PASSWORD}>Forgot Password ?</Link>
                    </div>
                </div>

                <button
                    className={classNames({
                        'rounded px-[2rem] py-3 w-full text-PrimaryColor-50 mt-9 bg-pry text-white': true,
                    })}
                >   {isSignInUserLoading ? (
                    <BeatLoader
                        color={"#ffffff"}
                        loading={true}
                        cssOverride={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : "Login"}</button>

                {/* Sign Up Section */}
                <p className="mt-2 text-sm text-center">
                    Don’t have an account?{' '}
                    <Link to={NAVIGATION.SIGNUP} className="text-brown font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>

            {/* Oauth Form */}
            <p className="font-OpenSans-Bold text-center">OR</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
                {/* Google Sign-In */}
                <button
                    type="button"
                    onClick={() => googleLogin()}
                    className="w-[300px] cursor-pointer mx-auto bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium flex items-center justify-center hover:bg-gray-100 gap-x-4 text-sm"
                >
                    <img width={20} height={20} alt="Google" src={googleLogo} />
                    {isGoogleProfileLoading ? "Signing in..." : " Log in with Google"}
                </button>
            </div>

            <Toaster />
        </>
    )
}

export default LoginPage