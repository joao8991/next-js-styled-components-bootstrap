"use client";

import styled from "styled-components";
import Weekday from "./Weekday";
import DataContextProvider from "@/lib/context/DataContext";

const CalendarContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 750px;
`;

const WeekdaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(100% / 8), 1fr));
`;

const ChildrenContainer = styled.div`
  display: grid;
  flex: 1;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fill, minmax(calc(100% / 8), 1fr));
`;

const Calendar = ({ children }: { children: any }) => {
  return (
    <DataContextProvider>
      <CalendarContainer>
        <WeekdaysContainer>
          <Weekday day={"Mon"} />
          <Weekday day={"Tue"} />
          <Weekday day={"Wed"} />
          <Weekday day={"Thu"} />
          <Weekday day={"Fri"} />
          <Weekday day={"Sat"} />
          <Weekday day={"Sun"} />
          <Weekday day={"Week Summary"} />
        </WeekdaysContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
      </CalendarContainer>
    </DataContextProvider>
  );
};

export default Calendar;
