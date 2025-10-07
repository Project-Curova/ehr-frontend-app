
export const generateCalendarDays = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days: (Date)[] = [];

    // Get the previous month and year
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;

    // Get the number of days in the previous month
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    // Get the day of the week the first day falls on (adjust for Monday start)
    const firstDayOfWeek = (date.getDay() + 6) % 7; // Map Sunday (0) -> Monday (1)

    // Add the last few days of the previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
    }

    // Add actual days of the current month
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    // Add days from the next month to complete the grid (if necessary)
    const totalDays = days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; totalDays + days.length < 42; i++) {
        days.push(new Date(nextYear, nextMonth, i));
    }

    return days;
};

export function getFormattedDate(date: Date = new Date()) {
    // const date = new Date();

    const time = date.toLocaleTimeString(["en-US"], { hour: "2-digit", minute: "2-digit" });

    const year = date.getFullYear();

    const month = date.toLocaleString('default', { month: "long" });

    const monthShort = date.toLocaleString('default', { month: "short" });

    const day = date.toLocaleString('default', { day: "2-digit" });

    const hours = date.getHours();

    const minutes = date.getMinutes()

    return { year, month, monthShort, day, time, hours, minutes };
}

export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
