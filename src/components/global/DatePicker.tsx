import React, { useEffect, useState } from "react";
import { generateCalendarDays } from "../../utils/utils";
import Modal from "./Modal";

// export default DatePicker;
type DatePickerProps = {
    startDate: Date
    setDate: (date: Date) => void
    autoSubmit?: boolean
    onClose: () => void
    position?: "right"
}

const DatePicker: React.FC<DatePickerProps> = ({ startDate, setDate, onClose, autoSubmit, position }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(startDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startDate.getFullYear());

    useEffect(() => {
        if (autoSubmit && selectedDate) {
            handleApply();
        }
    }, [autoSubmit, selectedDate]);

    const daysInMonth = generateCalendarDays(currentMonth, currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const handleDateClick = (day: Date | null) => {
        if (day) {
            setSelectedDate(day);
        }
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
            <Modal bare closeModal={() => null} position={position}>
                <div className="">
                    <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                        {/* Month and Year Dropdowns */}
                        <div className="flex justify-between items-center mb-4">
                            <select
                                className="border p-2 rounded-md bg-white"
                                value={currentMonth}
                                onChange={(e) => {
                                    setCurrentMonth(Number(e.target.value));
                                    setSelectedDate(null);
                                }}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border p-2 rounded-md bg-white"
                                value={currentYear}
                                onChange={(e) => {
                                    setCurrentYear(Number(e.target.value));
                                    setSelectedDate(null);
                                }}
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
                        <input
                            type="text"
                            className="border w-full p-2 rounded-md text-center mb-4 outline-none"
                            value={selectedDate ? selectedDate.toDateString() : ""}
                            readOnly
                        />

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
                            {daysInMonth.map((day, index) => {
                                const isCurrentMonth = day?.getMonth() === currentMonth;

                                return (
                                    <div
                                        key={index}
                                        className={`text-center p-2 w-[40px] rounded-full cursor-pointer ${isCurrentMonth
                                            ? selectedDate?.getTime() === day?.getTime()
                                                ? "bg-[#956F3E] text-white"
                                                : "hover:bg-gray-200"
                                            : "text-gray-400" // Muted style for other months
                                            }`}
                                        onClick={() => isCurrentMonth && handleDateClick(day)}
                                    >
                                        {day?.getDate()}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Buttons */}
                        {!autoSubmit && (
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 "
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={!selectedDate}
                                    className="px-4 py-2 bg-black text-white rounded-md"
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

export default DatePicker;