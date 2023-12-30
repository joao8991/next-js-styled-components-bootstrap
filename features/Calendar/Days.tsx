import { formatDate } from "@/lib/context/dataHelpers";
import Day from "./Day";
import WeekSummary from "./WeekSummary";

const Days = () => {
  const today = new Date();

  const days = (() => {
    //complete week starting on monday
    const start = today;
    const todayWeekDay = today.getDay() - 1;

    const daysBefore = -todayWeekDay - 7 * 30;
    const daysAfter = 6 - todayWeekDay + 7 * 30;

    const days = [];
    for (let i = daysBefore; i <= daysAfter; i++) {
      const newDate = new Date(start);
      newDate.setDate(newDate.getDate() + i);
      days.push(newDate);
    }
    return days;
  })();

  return (
    <>
      {days.map((day, index) => {
        if (day.getDay() === 0) {
          return (
            <>
              <Day key={index} day={formatDate(day)} />
              <WeekSummary key={index} day={formatDate(day)} />
            </>
          );
        }
        return <Day key={index} day={formatDate(day)} />;
      })}
    </>
  );
};

export default Days;
