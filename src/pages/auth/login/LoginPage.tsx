import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import Activ8Logo from "../../../assets/Activ8Logo.svg";
import EyeClose from "../../../assets/auth/eye_close.svg";
import EyeOpen from "../../../assets/auth/eye_open.svg";
import googleLogo from "../../../assets/auth/google.png";
import { LoginSchema, type LoginFormData } from "../../../lib/auth/authLib";
import { NAVIGATION, override } from "../../../lib/definitions";

const LoginPage = () => {
    return (
        <div id="login" className="block md:grid grid-cols-2 h-screen">
            {/* Login Form */}
            <div className="px-5 sm:px-12 py-9 pt-7 bg-PrimaryColor-50 h-full overflow-y-auto">
                <div className="w-full max-w-[450px] mx-auto">
                    <img src={Activ8Logo} width={90} height={41} alt="Activ8 logo" className="hidden sm:block" />

                    <h1 className="font-HelveticaNeue-Bold text-xl sm:text-2xl text-center mt-5 mb-2">Welcome back to Curova</h1>
                    {/* <p className="text-sub-info  leading-normal">Before you use the features in the Activ8 application, <br /> please sign in first.</p> */}
                    <Login />
                </div>
            </div>

            {/* Login Hero Image */}
            <div className="hidden md:flex px-8 flex-col justify-center items-center">
                <div id="hero" className="h-[90vh] px-12 w-full max-w-[1000px] max-h-1000px rounded-xl">
                    <h3 className="mt-[12%] text-white font-Inter-Bold text-[30px]">Your gateway to a <br /> smarter lifestyle.</h3>
                </div>
            </div>
        </div>
    )
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState<boolean>(false);

      /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

    // const [verificationOpen, setVerificationOpen] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
        console.log(data);
        navigate(NAVIGATION.HOME)
    };

    return (
              <>
            <form onSubmit={handleSubmit(onSubmit)} className="py-7 pt-6 pb-5 font-OpenSans-Regular">
                <div className="flex flex-col gap-y-7">
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            {errors.email?.message && (<span className="text-red-700 text-sm">{errors.email?.message}</span>)}
                        </div>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email"
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
                        'rounded px-[2rem] py-3 w-full text-PrimaryColor-50 mt-9 bg-[#12076F] text-white': true,
                    })}
                >   {false ? (
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
                    // onClick={}
                    className="w-[300px] mx-auto bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium flex items-center justify-center hover:bg-gray-100 gap-x-4 text-sm"
                >
                    <img width={20} height={20} alt="Google" src={googleLogo} />
                    {false ? "Signing in..." : " Log in with Google"}
                </button>
            </div>

            <Toaster />
        </>
    )
}

export default LoginPage