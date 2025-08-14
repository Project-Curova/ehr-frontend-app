import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { useSignupMutation } from "../../../app/services/auth/auth";
import Activ8Logo from "../../../assets/Activ8Logo.svg";
import EyeClose from "../../../assets/auth/eye_close.svg";
import EyeOpen from "../../../assets/auth/eye_open.svg";
import { SignUpSchema, type SignUpFormData, type SignupResponse } from "../../../lib/auth/authLib";
import { NAVIGATION, override, SIGN_UP_TYPE } from "../../../lib/definitions";

const SignUpPage = () => {
    return (
        <div id="login" className="block md:grid grid-cols-2 h-screen">
            {/* Login Form */}
            <div className="px-5 sm:px-12 py-9 pt-7 bg-PrimaryColor-50 h-full overflow-y-auto">
                <div className="w-full max-w-[450px] mx-auto">
                    <img src={Activ8Logo} width={90} height={41} alt="Activ8 logo" className="hidden sm:block" />

                    <h1 className="font-HelveticaNeue-Bold text-xl text-pry  sm:text-2xl text-center mt-5 mb-2">Welcome to Curova</h1>
                    {/* <p className="text-sub-info  leading-normal">Before you use the features in the Activ8 application, <br /> please sign in first.</p> */}
                    <SignupForm />
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


const SignupForm: React.FC = () => {

    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);

    const [signUpUser, { isLoading: isSignUpUserLoading }] = useSignupMutation();

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });

      // Submit from details to server and verify OTP
    async function signupUser(userData: SignUpFormData) {
        const { email, username, password, state, country, fullname } = userData;
        const is_superuser = false;
        const is_staff = false;
        const dob = "";

        try {
            // Sign Up user
            const response = await signUpUser({ email, username, password, country, state, fullname, is_staff, dob, is_superuser, type: SIGN_UP_TYPE.P }).unwrap();
            console.log(response);
            navigate(NAVIGATION.LOGIN)
        } catch (error) {
            if (typeof error == 'object' && error != null) {
                const errorMessage = (error as SignupResponse).data.message
                toast.error(errorMessage);
            }
            else {
                toast.error("An unknown error has occurred!");
            }
        }
    }

    const onSubmit: SubmitHandler<SignUpFormData> = (data: SignUpFormData) => {
        signupUser(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="py-7 pt-6 pb-5 font-OpenSans-Regular">
                <div className="flex flex-col gap-y-7">
                    {/* Username */}
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="username" className="text-sm">
                                Username <span className="text-red-500">*</span>
                            </label>
                            {errors.username?.message && (<span className="text-red-700 text-sm">{errors.username?.message}</span>)}
                        </div>
                        <input
                            {...register("username")}
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600"
                        />
                    </div>

                    {/* Fullname */}
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="fullname" className="text-sm">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            {errors.fullname?.message && (<span className="text-red-700 text-sm">{errors.fullname?.message}</span>)}
                        </div>
                        <input
                            {...register("fullname")}
                            id="fullname"
                            type="text"
                            placeholder="Enter your fullname"
                            className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="state" className="text-sm">
                                State <span className="text-red-500">*</span>
                            </label>
                            {errors.state?.message && (<span className="text-red-700 text-sm">{errors.state?.message}</span>)}
                        </div>
                        <input
                            {...register("state")}
                            id="state"
                            type="text"
                            placeholder="Enter your state"
                            className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="country" className="text-sm">
                                Country <span className="text-red-500">*</span>
                            </label>
                            {errors.country?.message && (<span className="text-red-700 text-sm">{errors.country?.message}</span>)}
                        </div>
                        <input
                            {...register("country")}
                            id="country"
                            type="text"
                            placeholder="Enter your country"
                            className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600"
                        />
                    </div>

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

                    <div className="mt-">
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Create Password <span className="text-red-500">*</span>
                            </label>
                            {errors.password?.message && (<span className="text-red-700 text-sm">{errors.password?.message}</span>)}
                        </div>
                        <div className="bg-white relative rounded-md">
                            <input
                                {...register("password")}
                                type={passwordShown ? "text" : "password"}
                                // onChange={() => {
                                //     trigger("password")
                                // }}
                                required
                                placeholder="Enter your password"
                                className="mt-1 bg-white block w-full h-full p-3 pr-9 rounded-md shadow-sm sm:text-sm outline-none focus:border focus:border-PrimaryColor-600"
                            />
                            <div className="absolute top-[40%] translate-y-[-25%] right-2 cursor-pointer" onClick={() => setPasswordShown(!passwordShown)} >
                                {passwordShown ? <img src={EyeOpen} alt="password visible" /> : <img src={EyeClose} alt="password visible" />}
                            </div>
                        </div>
                        <p className="text-red-500 font-OpenSans-Medium block text-start mt-2 text-xs">Must be at lest 6 characters</p>
                    </div>

                    <div className="mt-">
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            {errors.confirmPassword?.message && (<span className="text-red-700 text-sm">{errors.confirmPassword?.message}</span>)}
                        </div>
                        <div className="bg-white relative rounded-md">
                            <input
                                {...register("confirmPassword")}
                                // onChange={() => trigger("confirmPassword")}
                                required
                                type={confirmPasswordShown ? "text" : "password"}
                                placeholder="Enter your password"
                                className="mt-1 bg-white block w-full h-full p-3 pr-9 rounded-md shadow-sm sm:text-sm outline-none focus:border focus:border-PrimaryColor-600"
                            />
                            <div className="absolute top-[40%] translate-y-[-25%] right-2 cursor-pointer" onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} >
                                {confirmPasswordShown ? <img src={EyeOpen} alt="password visible" /> : <img src={EyeClose} alt="password visible" />}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className={classNames({
                        'rounded px-[2rem] py-3 w-full text-PrimaryColor-50 mt-9 bg-pry text-white cursor-pointer': true,
                    })}
                >   {isSignUpUserLoading ? (
                    <BeatLoader
                        color={"#ffffff"}
                        loading={true}
                        cssOverride={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : "Sign up"}</button>

                {/* Sign Up Section */}
                <p className="mt-2 text-sm text-center">
                    Already have an account?{' '}
                    <Link to={NAVIGATION.LOGIN} className="text-brown font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>

            <Toaster />
        </>
    )
}


export default SignUpPage
