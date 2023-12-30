"use client";

import { DataContext } from "@/lib/context/DataContext";
import { formatDate } from "@/lib/context/dataHelpers";
import { useContext, useMemo } from "react";
import styled from "styled-components";

const WeekSummaryContainer = styled.div`
  border: 1px solid black;
  padding: 4px 10px;
  text-align: center;
  background: lightgray;
  flex: 1;
  font-size: 12px;
`;

const WeekSummary = ({ day }: { day: string }) => {
  const dataContext = useContext(DataContext);

  const getWeekAgo = useMemo(() => {
    let date = new Date(day);
    date.setDate(date.getDate() - 7);
    return dataContext?.weekSummary.totalTssWeek[formatDate(date)];
  }, [dataContext?.weekSummary, day]);

  const dayTotalTssWeek = dataContext?.weekSummary.totalTssWeek[day];

  const increase =
    dayTotalTssWeek && getWeekAgo
      ? (dayTotalTssWeek / getWeekAgo - 1) * 100
      : 0;

  return (
    <WeekSummaryContainer>
      <div>tss: {dayTotalTssWeek}</div>
      <div>
        {dayTotalTssWeek ? (dayTotalTssWeek / 7).toFixed(1) : 0} per day
      </div>
      <div>increase: {increase.toFixed(1)}%</div>
    </WeekSummaryContainer>
  );
};

export default WeekSummary;
