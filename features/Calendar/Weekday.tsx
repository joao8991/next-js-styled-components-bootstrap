"use client";

import styled from "styled-components";

const WeekdayContainer = styled.div`
  border: 1px solid black;
  padding: 4px 10px;
  text-align: center;
  background: lightgray;
  flex: 1;
`;

const Weekday = ({ day }: { day: string }) => {
  return <WeekdayContainer>{day}</WeekdayContainer>;
};

export default Weekday;
