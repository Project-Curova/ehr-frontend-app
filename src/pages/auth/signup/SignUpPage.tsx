import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { useSignupMutation } from "../../../app/services/auth/auth";
import EyeClose from "../../../assets/auth/eye_close.svg";
import EyeOpen from "../../../assets/auth/eye_open.svg";
import HeroImg from "../../../assets/hero.svg";
import Modal from "../../../components/global/Modal";
import { SignUpSchema, type SignUpFormData } from "../../../lib/auth/authLib";
import { NAVIGATION, override, SIGN_UP_TYPE } from "../../../lib/definitions";
import { formatDateToString, getFormattedDate } from "../../../utils/utils";
import DatePicker from "../../../components/global/DatePicker";

const SignUpPage = () => {
    return (
        <div id="login" className="block md:grid grid-cols-2 h-screen">
            {/* Login Hero Image */}
            <div className="bg-[#033856] p-8 text-white">
                <img src={HeroImg} className="w-[150px] mx-auto" alt="hero" />
                <h3 className="mt-[12%] font-bold text-[30px] text-center">Welcome to Curova</h3>
                <p className="mt-5 font-medium">The Complete Intelligence Platform for Modern Healthcare.</p>
            </div>
            
            {/* Login Form */}
            <div className="px-5 sm:px-12 py-9 pt-7 bg-PrimaryColor-50 h-full overflow-y-auto">
                <div className="w-full max-w-[450px] mx-auto">
                    <h1 className="font-HelveticaNeue-Bold text-xl text-pry  sm:text-2xl text-center mt-5 mb-2">Happy to have you!</h1>
                    {/* <p className="text-sub-info  leading-normal">Before you use the features in the Activ8 application, <br /> please sign in first.</p> */}
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}


const SignupForm: React.FC = () => {

    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectDate, setSelectDate] = useState<boolean>(false);

    const formattedDate = getFormattedDate(selectedDate);

    const [signUpUser, { isLoading: isSignUpUserLoading }] = useSignupMutation();

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });

    const passwordWatcher = watch("password", "");

    // Submit from details to server and verify OTP
    async function signupUser(userData: SignUpFormData) {
        const { email, username, password, state, country, fullname } = userData;
        const is_superuser = false;
        const is_staff = false;
        const dob = formatDateToString(selectedDate ?? new Date());

        try {
            // Sign Up user
            const response = await signUpUser({ email, username, password, country, state, full_name: fullname, is_staff, dob, is_superuser, type: SIGN_UP_TYPE.P }).unwrap();
            console.log(response);  
            navigate(NAVIGATION.LOGIN);
        } catch (error) {
            console.log(error);
            if (typeof error == 'object' && error != null) {
                const response = (error as any).data.detail;
                toast.error(response);
            }
            else {
                toast.error("Unable to sign up!");
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

                    {/* Email Address */}
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

                    {/* Date of Birth */}
                    <div>
                        <div className="flex justify-between items-center font-Manrope-Medium text-[14px]">
                            <label htmlFor="email" className="text-sm">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="mt-1 bg-white block w-full p-3 rounded-md shadow-sm sm:text-sm  outline-none focus:border focus:border-PrimaryColor-600" onClick={() => setSelectDate(true)}>
                            {!selectedDate && (
                                <p className="text-gray-600 cursor-pointer">Select Date of Birth</p>
                            )}

                            <div className="pl-12 mt-2">
                                {selectedDate && (
                                    <div className="flex items-center gap-x-2">
                                        <p className="font-bold text-gray-500">Selected Date: </p>
                                        <p>
                                            {`${formattedDate.day} ${formattedDate.month}, ${formattedDate.year}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
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

                        {(passwordWatcher.length < 6) && <p className="text-red-500 font-OpenSans-Medium block text-start mt-2 text-xs">Must be at lest 6 characters</p>}
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


            {selectDate && (
                <Modal closeModal={() => setSelectDate(false)}>
                    <DatePicker startDate={new Date()} setDate={(date) => setSelectedDate(date)} onClose={() => setSelectDate(false)} />
                </Modal>
            )}

            <Toaster />
        </>
    )
}


export default SignUpPage


/**
 * 
 * country: "NIgeria"
​
dob: "2025-10-17"
​
email: "orisekeemmanuel@gmail.com"
​
full_name: "Nnameemka Onyejeme"
​
is_staff: false
​
is_superuser: false
​
password: "pbkdf2_sha256$1000000$08enG1c7hhzOYwG9EX9SX1$ZynscOikbqB77Cg7uwvUM3r7XY3wG6Z+xdeDC0Z1/Qo="
​
state: "Lagos"
​
type: "P"
​
username: "mightGuuy"
 * 
 */