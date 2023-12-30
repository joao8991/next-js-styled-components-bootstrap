export const fillMissingDays = (dataArray: DayDataT) => {
  let dataArrayEntries = Object.entries(dataArray.days);
  dataArrayEntries.sort((day1: [string, any], day2: [string, any]) =>
    day1[0].localeCompare(day2[0])
  );
  const resultArray: [string, { tss: number }][] = [];

  // Helper function to check if a date exists in the array
  const hasDate = (date: string) => {
    return dataArrayEntries.some((entry) => entry[0] === date);
  };

  // Get the min and max dates in the array
  const minDate = new Date(dataArrayEntries[0][0]);

  const maxDateHelper = new Date(
    dataArrayEntries[dataArrayEntries.length - 1][0]
  );
  const maxDate = new Date(maxDateHelper.setDate(maxDateHelper.getDate() + 5));

  // Loop through all dates between min and max dates
  for (
    let currentDate = new Date(minDate);
    currentDate <= maxDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Check if the date exists in the original array, if not, add the default entry
    if (!hasDate(formattedDate)) {
      resultArray.push([formattedDate, { tss: 0 }]);
    }

    // Add the existing entries from the original array
    const existingEntry = dataArrayEntries.find(
      (entry) => entry[0] === formattedDate
    );
    if (existingEntry) {
      resultArray.push(existingEntry);
    }
  }

  return resultArray;
};

export const calculateFitnessFatigueAndForm = (
  dataArray: [string, { tss: number }][]
) => {
  let fitnessYesterday = 0;
  let fatigueYesterday = 0;

  const resultObject: DayDataT = { loading: false, days: {} };

  dataArray.forEach((entry) => {
    const currentDate = entry[0];
    const tssToday = entry[1].tss;

    const fitnessToday =
      fitnessYesterday + (tssToday - fitnessYesterday) * (1 / 42);
    const fatigueToday =
      fatigueYesterday + (tssToday - fatigueYesterday) * (1 / 7);

    // Update fitness and fatigue for the next iteration
    fitnessYesterday = fitnessToday;
    fatigueYesterday = fatigueToday;

    resultObject.days[currentDate] = {
      tss: tssToday,
      fitness: fitnessToday,
      fatigue: fatigueToday,
      form: fitnessToday - fatigueToday,
    };
  });

  return resultObject;
};

export const formatDate = (date: Date) => {
  let dd = date.getDate().toString();
  let mm = (date.getMonth() + 1).toString();
  const yyyy = date.getFullYear();

  if (dd.length < 2) {
    dd = "0" + dd;
  }

  if (mm.length < 2) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
};
