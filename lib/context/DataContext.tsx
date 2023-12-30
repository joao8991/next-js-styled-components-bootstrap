import { createContext, useEffect, useMemo, useState } from "react";
import { calculateFitnessFatigueAndForm, fillMissingDays } from "./dataHelpers";

export const DataContext = createContext<DataContextValue | null>(null);

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataPerDay, setDataPerDay] = useState<DayDataT>({
    loading: true,
    days: {},
  });

  const [trainingsPerDay, setTrainingsPerDay] = useState<TrainingPointsT>({
    days: {},
  });

  useEffect(() => {
    const parsedObject = JSON.parse(
      localStorage.getItem("powerData") || '{ "days":{} }'
    );

    const data = { ...parsedObject, loading: false };

    setDataPerDay(data);
  }, []);

  const totalTssWeek = useMemo(() => {
    const daysArray = dataPerDay.days ? Object.entries(dataPerDay.days) : [];
    const weekTss: Record<string, number> = {};

    console.log(daysArray);

    daysArray.forEach(([day]) => {
      const dayIndex = daysArray.findIndex(([dayKey]) => day === dayKey);
      if (dayIndex > -1) {
        let total = 0;

        for (
          let index = dayIndex;
          index >= Math.max(0, dayIndex - 6);
          index--
        ) {
          const tssDay = daysArray[index][1].tss;
          total += tssDay;
        }
        weekTss[day] = total;
      } else {
        weekTss[day] = 0;
      }
    });
    return weekTss;
  }, [dataPerDay]);

  const setTssPerDayEnhanced = (day: string, tss: number) => {
    const newTsses = {
      ...dataPerDay,
      days: {
        ...dataPerDay.days,
        [day]: { tss: Number(tss) },
      },
    };

    const newData = calculateData(newTsses);
    setDataPerDay(newData);

    //local storage
    localStorage.setItem("powerData", JSON.stringify(newData));
  };

  const calculateData = (data: DayDataT) => {
    const tssEnhanced = fillMissingDays(data);
    // const tssBasedOnWorkout = //
    const fitness = calculateFitnessFatigueAndForm(tssEnhanced);

    return fitness;
  };

  const setTrainingPerDay = (day: string, intensity: number, time: string) => {
    const trainingPerDay = trainingsPerDay.days[day] || [];
    const newTrainings = {
      ...trainingsPerDay,
      days: {
        ...trainingsPerDay.days,
        [day]: [
          ...trainingPerDay,
          {
            intensity: Number(intensity),
            time: time,
          },
        ],
      },
    };

    setTrainingsPerDay(newTrainings);
  };

  const weekSummary = {
    totalTssWeek,
  };

  return (
    <DataContext.Provider
      value={{
        dataPerDay,
        trainingsPerDay,
        setTrainingPerDay,
        setDataPerDay: setTssPerDayEnhanced,
        isLoading: dataPerDay.loading,
        weekSummary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
