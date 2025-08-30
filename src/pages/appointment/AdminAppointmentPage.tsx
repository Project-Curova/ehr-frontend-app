import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import DatePicker from "../../components/global/DatePicker";
import Modal from "../../components/global/Modal";
import { NAVIGATION } from "../../lib/definitions";
import { getFormattedDate } from "../../utils/utils";

const AppointmentPage = () => {
    return (
        <div className="h-screen bg-white overflow-y-auto py-4 pt-8">

            <div className="flex flex-col gap-y-8 px-3">
                {/* <SelectConsultation /> */}
                {/* <ChooseSpecialty /> */}
                <SelectDateAndTime />
                {/* <PatientDetailsForm /> */}
            </div>
        </div>
    )
}

const SelectDateAndTime = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectDate, setSelectDate] = useState<boolean>(false);
    const formattedDate = getFormattedDate(selectedDate);

    return (
        <div>
            <Link to={NAVIGATION.HOME}>
                <IoReturnUpBack size={25} />
            </Link>

            <h2 className="text-center font-bold text-2xl">Schedule</h2>

            <div className="p-3 bg-white cursor-pointer" onClick={() => setSelectDate(true)}>
                <div className="flex items-center gap-x-3 bg-[#F7F8FB] p-3 rounded mt-3">
                    <div className="text-pry">
                        <FaCalendarCheck size={20} color="#033856"/>
                    </div>
                    <p className="font-medium cursor-pointer"> Select Date and Time</p>
                </div>

                <div className=" mt-2">
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
            {selectDate && (
                <Modal closeModal={() => setSelectDate(false)}>
                    <DatePicker startDate={new Date()} setDate={(date) => setSelectedDate(date)} onClose={() => setSelectDate(false)} />
                </Modal>
            )}
        </div>
    )
}

export default AppointmentPage
