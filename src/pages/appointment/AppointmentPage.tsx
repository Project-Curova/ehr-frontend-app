import { Select, TimePicker, type TimePickerProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../../components/global/Modal";
import ScheduleDatePicker from "../../components/global/ScheduleDatePicker";
import { getFormattedDate } from "../../utils/utils";

const { Option } = Select;

const AppointmentPage = () => {
    return (
        <div className="h-screen bg-bgpry py-4 pt-8">

            <div className="flex flex-col gap-y-8">
                <SelectConsultation />
                <ChooseSpecialty />
                <SelectDateAndTime />

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

                <div className="flex gap-x-[-5px] mt-4">
                    <div className="bg-pry text-white py-2 w-[150px] flex justify-center rounded cursor-pointer hover:shadow-sm">In Person Visit</div>
                    <div className="text-black border border-[#e6e2e2] border-l-0 py-2 w-[170px] flex justify-center rounded transition-all -translate-x-0.5 cursor-pointer hover:shadow-sm">Video Consultation</div>
                    <div className="text-black border border-[#e6e2e2] border-l-0 py-2 w-[150px] flex justify-center rounded transition-all -translate-x-0.5 cursor-pointer hover:shadow-sm">Phone Call</div>
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
                        className="w-[400px] mt-5"
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
                        <p className="text-white font-bold">2</p>
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
                    ) }
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

export default AppointmentPage
