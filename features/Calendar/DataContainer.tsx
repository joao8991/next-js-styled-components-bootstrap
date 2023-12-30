import { DataContext } from "@/lib/context/DataContext";
import { useContext } from "react";
import styled from "styled-components";

const DataContainerStyled = styled.div`
  font-size: 12px;
`;

const DataContainer = ({ day }: { day: string }) => {
  const data = useContext(DataContext);

  const getForm = () => {
    let form = data?.dataPerDay?.days[day]?.form;
    if (form) {
      return Math.round(form * 100) / 100;
    }
    return 0;
  };
  const getFitness = () => {
    let form = data?.dataPerDay?.days[day]?.fitness;
    if (form) {
      return Math.round(form * 100) / 100;
    }
    return 0;
  };

  if (data?.isLoading) return <></>;

  return (
    <DataContainerStyled>
      {getForm() + " fit:" + getFitness()}{" "}
    </DataContainerStyled>
  );
};

export default DataContainer;
