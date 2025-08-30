import { zodResolver } from "@hookform/resolvers/zod";
import { Select, TimePicker, type TimePickerProps } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Modal from "../../components/global/Modal";
import ScheduleDatePicker from "../../components/global/ScheduleDatePicker";
import { PatentDetailSchema, type PatientDetailFormData } from "../../lib/auth/authLib";
import { getFormattedDate } from "../../utils/utils";

const { Option } = Select;

const AppointmentPage = () => {
    return (
        <div className="h-screen overflow-y-auto bg-bgpry py-4 pt-8">

            <div className="flex flex-col gap-y-8">
                <SelectConsultation />
                <ChooseSpecialty />
                <SelectDateAndTime />
                <PatientDetailsForm />
            </div>
        </div>
    )
}

const SelectConsultation: React.FC = () => {
    return (
        <>
            {/* Appointment step 1 */}
            <div className="p-3 bg-white shadow-xs w-[80%] mx-auto">
                <div className="flex items-center gap-x-5">
                    <div className="bg-pry rounded-full w-[30px] h-[30px] flex justify-center items-center">
                        <p className="text-white font-bold">1</p>
                    </div>
                    <p className="font-medium">Step 1: Select Consultation</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-x-[-5px] mt-4">
                    <div className="bg-pry text-white py-2 w-full sm:w-[150px] flex justify-center rounded cursor-pointer hover:shadow-sm">In Person Visit</div>
                    <div className="text-black border border-[#e6e2e2] border-l-0 py-2 w-full sm:w-[170px] flex justify-center rounded transition-all -translate-x-0.5 cursor-pointer hover:shadow-sm">Video Consultation</div>
                    <div className="text-black border border-[#e6e2e2] border-l-0 py-2 w-full  sm:w-[150px] flex justify-center rounded transition-all -translate-x-0.5 cursor-pointer hover:shadow-sm">Phone Call</div>
                </div>
            </div>
        </>
    )
}

const ChooseSpecialty: React.FC = () => {

    const [specialty, setSpecialty] = useState<string | undefined>(undefined)
    const specialties = ["General Technician", "Surgeon", "ENT"]

    return (
        <>
            {/* Appointment step 1 */}
            <div className="p-3 bg-white shadow-xs w-[80%] mx-auto">
                <div className="flex items-center gap-x-5">
                    <div className="bg-pry rounded-full w-[30px] h-[30px] flex justify-center items-center">
                        <p className="text-white font-bold">2</p>
                    </div>
                    <p className="font-medium">Step 2: Select Specialty</p>
                </div>

                <div className="mt-3">
                    <Select
                        id="Select Specialty"
                        placeholder="Select specialty"
                        value={specialty}
                        showSearch
                        onChange={(e) => {
                            setSpecialty(e)
                        }}
                        className="w-full max-w-[400px] mt-5"
                    >
                        {specialties.map((specialty, index) => {
                            return (
                                <Option key={index} value={specialty}>
                                    {specialty}
                                </Option>
                            )
                        })}
                        <Option>
                            General Technician
                        </Option>
                    </Select>
                </div>

            </div>
        </>
    )
}

const SelectDateAndTime = () => {
    const yesterdayDateObject = new Date(new Date().setDate(new Date().getDate() - 1));
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectDate, setSelectDate] = useState<boolean>(false);

    const formattedDate = getFormattedDate(selectedDate);

    const onChange: TimePickerProps['onChange'] = (time, timeString) => {
        console.log(time, timeString);
    };


    return (
        <>
            {/* Appointment step 1 */}
            <div className="p-3 bg-white shadow-xs w-[80%] mx-auto cursor-pointer" onClick={() => setSelectDate(true)}>
                <div className="flex items-center gap-x-5">
                    <div className="bg-pry rounded-full w-[30px] h-[30px] flex justify-center items-center">
                        <p className="text-white font-bold">3</p>
                    </div>
                    <p className="font-medium cursor-pointer">Step 3: Pick Date and Time</p>
                </div>

                <div className="pl-12 mt-2">
                    {selectedDate && (
                        <div className="flex items-center gap-x-2">
                            <p className="font-bold text-gray-500">Selected Date: </p>
                            <p>
                                {`${formattedDate.day} ${formattedDate.month}, ${formattedDate.year}`}
                            </p>
                        </div>
                    )}

                    {selectedDate && (
                        <div className="mt-3" onClick={e => e.stopPropagation()}>
                            <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                        </div>
                    )}
                </div>

            </div>
            {selectDate && (
                <Modal closeModal={() => setSelectDate(false)}>
                    <ScheduleDatePicker stopDate={yesterdayDateObject} startDate={new Date()} setDate={(date) => setSelectedDate(date)} onClose={() => setSelectDate(false)} />
                </Modal>
            )}
        </>
    )
}

const PatientDetailsForm: React.FC = () => {

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<PatientDetailFormData>({ resolver: zodResolver(PatentDetailSchema) });

    const onSubmit: SubmitHandler<PatientDetailFormData> = (data: PatientDetailFormData) => {
        console.log(data);
    };

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectDate, setSelectDate] = useState<boolean>(false);
    const formattedDate = getFormattedDate(selectedDate);


    return (
        <>
            <div className="p-3 bg-white shadow-xs w-[80%] mx-auto">
                <div className="flex items-center gap-x-5">
                    <div className="bg-pry rounded-full w-[30px] h-[30px] flex justify-center items-center">
                        <p className="text-white font-bold">4</p>
                    </div>
                    <p className="font-medium cursor-pointer">Enter Patient Details</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="py-5 pb-5 f1333ont-OpenSans-Regular flex flex-col gap-y-3">
                    {/* Patient name */}
                    <div>
                        <label htmlFor="fullname" className="text-sm">
                            Full name<span className="text-red-500">*</span>
                        </label>
                        {errors.fullname?.message && (<span className="text-red-700 text-sm">{errors.fullname?.message}</span>)}
                        <input
                            {...register("fullname")}
                            type="text"
                            id="fullname"
                            required
                            placeholder="Enter your fullname"
                            className="mt-1 bg-white text-sm block w-full p-2 rounded-md outline-none border border-gray-200 focus:border-pry"
                        />
                    </div>


                    <div className="grid sm:[grid-template-columns:2fr_3fr] gap-2">
                        {/* Date of Birth */}
                        <div onClick={() => setSelectDate(true)}>
                            <label htmlFor="username" className="text-sm">
                                Date of Birth<span className="text-red-500">*</span>
                            </label>
                            {errors.fullname?.message && (<span className="text-red-700 text-sm">{errors.fullname?.message}</span>)}
                            <p>
                                <div className="mt-1 text-sm bg-white block w-full p-2 rounded-md outline-none border border-gray-200 focus:border-pry">
                                    <p>
                                        {`${formattedDate.day} ${formattedDate.month}, ${formattedDate.year}`}
                                    </p>
                                </div>
                            </p>
                        </div>

                        {/* Contact Number */}
                        <div className="">
                            <label htmlFor="username" className="text-sm">
                                Contact Number<span className="text-red-500">*</span>
                            </label>
                            {errors.phoneNumber?.message && (<span className="text-red-700 text-sm">{errors.phoneNumber?.message}</span>)}
                            <input
                                {...register("phoneNumber")}
                                onInput={(e) => {
                                    // Keep only numeric characters (0-9)
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                                }}
                                type="text"
                                id="contactNumber"
                                required
                                placeholder="Contact number"
                                className="mt-1 bg-white block w-full text-sm p-2 rounded-md outline-none border border-gray-200 focus:border-pry"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="font-medium cursor-pointer mt-2">AI Powered Symtom Checker</p>
                        {errors.symptoms?.message && (<span className="text-red-700 text-sm">{errors.symptoms?.message}</span>)}
                        <input
                            {...register("symptoms")}
                            onInput={(e) => {
                                // Keep only numeric characters (0-9)
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                            }}
                            type="text"
                            id="contactNumber"
                            required
                            placeholder="Enter your symptoms"
                            className="mt-1 bg-white block w-full text-sm p-2 rounded-md outline-none border border-gray-200 focus:border-pry"
                        />
                    </div>

                    <div className="w-full">
                        <p className="font-medium cursor-pointer mt-2">Insurance Information</p>
                        {errors.insurance?.message && (<span className="text-red-700 text-sm">{errors.insurance?.message}</span>)}
                        <input
                            {...register("insurance")}
                            onInput={(e) => {
                                // Keep only numeric characters (0-9)
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                            }}
                            type="text"
                            id="insurance"
                            required
                            placeholder="Enter your Insurance Provider"
                            className="mt-1 bg-white block w-full text-sm p-2 rounded-md outline-none border border-gray-200 focus:border-pry"
                        />
                    </div>

                    <button
                        type="submit"
                        className={classNames({
                            'rounded px-[2rem] py-3 w-full text-white mt-2 font-bold': true, // Default button styles
                            'bg-gray-400 cursor-not-allowed': !isValid, // Gray and disabled when form is invalid
                            'bg-pry': isValid, // Black when form is valid
                        })}
                    >
                        Confirm your booking!
                    </button>
                </form>
            </div>

            {selectDate && (
                <Modal closeModal={() => setSelectDate(false)}>
                    <ScheduleDatePicker startDate={new Date()} setDate={(date) => setSelectedDate(date)} onClose={() => setSelectDate(false)} />
                </Modal>
            )}
        </>
    )
}

export default AppointmentPage
