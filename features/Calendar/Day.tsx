"use client";

import { useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import DataContainer from "./DataContainer";
import { DataContext } from "@/lib/context/DataContext";
import { Button } from "@/styling/common";

const DayContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const PowerInput = styled.input`
  padding: 0;
  width: 50px;
  height: 30px;
  margin: 10px;
  text-align: center;
  transition: 200ms;
  border: 1px solid #c26df366;
  border-radius: 5px;
  &:hover {
    border: 1px solid #c26df3;
  }
`;

const DayText = styled.div`
  ${({ $color }: { $color: string }) => {
    return css`
      font-size: 12px;
      border: 1px solid lightgray;
      background-color: ${$color};
      border-radius: 5px;
      padding: 4px;
    `;
  }}
`;

const AddTrainingPoint = styled.div`
  cursor: pointer;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid black;
  line-height: 100%;
  margin: 0 0 5px 0;
  &:hover {
    opacity: 0.4;
  }
`;
const TrainingInputsHolder = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
`;

const IntensityInput = styled.input`
  max-width: 30px;
`;
const TimeInput = styled.input`
  max-width: 41px;
`;

const TrainingInputs = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  justify-content: center;
`;

const Day = ({ day }: { day: string }) => {
  const dataContext = useContext(DataContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inputRef.current && !dataContext?.isLoading) {
      const tss = dataContext?.dataPerDay?.days[day]?.tss || 0;
      inputRef.current.value = String(tss);
    }
  }, [dataContext]);

  const handleInputChange = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const value = inputRef.current?.value;

      if (value) dataContext?.setDataPerDay(day, Number(value));
    }, 400);
  };

  const getColor = () => {
    if (new Date(day) >= new Date()) {
      return "#c26df3";
    }
    return "lightgreen";
  };

  const addTrainingPoint = () => {
    dataContext?.setTrainingPerDay(day, 0, "00:00");
  };

  return (
    <DayContainer>
      <DayText $color={getColor()}>{day.slice(5)}</DayText>
      <PowerInput onChange={handleInputChange} ref={inputRef} />
      {dataContext?.trainingsPerDay.days[day] && (
        <TrainingInputsHolder>
          int-time-del
          {dataContext?.trainingsPerDay.days[day].map((point, i) => (
            <TrainingInputs key={i}>
              <IntensityInput
                defaultValue={point.intensity}
                max={999}
                maxLength={3}
              />
              <TimeInput defaultValue={point.time} />
              <Button>X</Button>
            </TrainingInputs>
          ))}
        </TrainingInputsHolder>
      )}
      <AddTrainingPoint onClick={addTrainingPoint}>+</AddTrainingPoint>
      <DataContainer day={day} />
    </DayContainer>
  );
};

export default Day;
