import React, { useEffect, useState } from "react";
import { generateCalendarDays } from "../../utils/utils";
import Modal from "./Modal";

// export default DatePicker;
type DatePickerProps = {
    stopDate?: Date
    startDate: Date
    setDate: (date: Date) => void
    autoSubmit?: boolean
    onClose: () => void
}

const ScheduleDatePicker: React.FC<DatePickerProps> = ({ startDate, setDate, onClose, autoSubmit, stopDate: selectedStopDate }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(startDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startDate.getFullYear());

    const stopDate = selectedStopDate || new Date();

    useEffect(() => {
        if (autoSubmit) {
            if (selectedDate) {
                handleApply();
            }
        }
    });

    const today = new Date(); // Current date
    today.setHours(0, 0, 0, 0); // Normalize time to midnight for comparison

    const daysInMonth = generateCalendarDays(currentMonth, currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const handleDateClick = (day: Date) => {
        if (day < stopDate) {
            return; // Prevent selection of past dates
        }
        setSelectedDate(day);
    };

    const handleApply = () => {
        if (!selectedDate) return;
        setDate(selectedDate);
        onClose();
    };

    const handleCancel = () => {
        setSelectedDate(null);
        onClose();
    };

    return (
        <>
            <Modal bare closeModal={onClose}>
                <div className="">
                    <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                        {/* Month and Year Dropdowns */}
                        <div className="flex justify-between items-center mb-4">
                            <select
                                className="border border-pry p-2 rounded-md bg-white"
                                value={currentMonth}
                                onChange={(e) => { setCurrentMonth(Number(e.target.value)); setSelectedDate(null); }}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border border-pry p-2 rounded-md bg-white"
                                value={currentYear}
                                onChange={(e) => { setCurrentYear(Number(e.target.value)); setSelectedDate(null); }}
                            >
                                {Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - 50 + i).map(
                                    (year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Selected Date Input */}
                        {!autoSubmit && (
                            <input
                                type="text"
                                className="border border-pry w-full p-2 rounded-md text-center mb-4 outline-none"
                                value={selectedDate ? selectedDate.toDateString() : ""}
                                readOnly
                            />
                        )}

                        {/* Calendar Body (Days) */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Weekday labels */}
                            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-gray-600 font-semibold"
                                >
                                    {day}
                                </div>
                            ))}

                            {/* Calendar days */}
                            {daysInMonth.map((day) => {
                                const isPastDate = day < stopDate;

                                return (
                                    <div
                                        key={day.getTime()}
                                        className={`text-center p-2 w-[40px] rounded-full cursor-pointer ${isPastDate
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : selectedDate?.getTime() === day.getTime()
                                                ? "bg-pry text-white"
                                                : "hover:bg-gray-200"
                                            }`}
                                        onClick={() => handleDateClick(day)}
                                    >
                                        {day.getDate()}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Buttons */}
                        {!autoSubmit && (
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={!selectedDate}
                                    className="px-4 py-2 bg-pry text-white rounded-md"
                                    onClick={handleApply}
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ScheduleDatePicker;
