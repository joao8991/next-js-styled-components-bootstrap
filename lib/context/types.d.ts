type DayDataT = {
  loading: boolean;
  days: {
    [day: string]: {
      tss: number;
      fitness?: number;
      form?: number;
      fatigue?: number;
    };
  };
};

type TrainingPointsT = {
  days: {
    [day: string]: {
      intensity: number;
      time: string;
    }[];
  };
};

type DataContextValue = {
  trainingsPerDay: TrainingPointsT;
  setTrainingPerDay: (day: string, intensity: number, time: string) => void;
  dataPerDay: DayDataT;
  setDataPerDay: (day: string, tss: number) => void;
  isLoading: boolean;
  weekSummary: {
    totalTssWeek: Record<string, number>;
  };
};
