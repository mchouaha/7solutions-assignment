import React, {Fragment} from "react";
import styled from "@emotion/styled";

// material-ui
import {Button as MuiButton} from "@mui/material";

// interfaces
import {CulinaryItem} from "@/interfaces";

// styled
const Button = styled(MuiButton)`
  width: 180px;
  margin: 0.3em;
`;
const UList = styled('ul')`
  border: 1px solid;
  padding: 5px;
  min-width: inherit;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled('h2')`
  display: flex;
  justify-content: center;
  border: 1px solid;
`;

interface VegetableListProps {
  vegetableList: CulinaryItem[];
  handleRemoveFromSubList: (item: CulinaryItem) => void
  itemTimers: { [key: string]: number }
}

const VegetableList: React.FC<VegetableListProps> = ({vegetableList, handleRemoveFromSubList, itemTimers}) => {
  return (
    <Fragment>
      <Title>Vegetables</Title>
      <UList>
        {vegetableList.map((item: CulinaryItem) => (
          <li
            key={item.name}
            style={{ cursor: "pointer" }}
            onClick={() => handleRemoveFromSubList(item)}
          >
            <Button variant="outlined">
              {item.name} {itemTimers[item.name] ? `(${itemTimers[item.name]}s)` : ""}
            </Button>
          </li>
        ))}
      </UList>
    </Fragment>
  )
}

export default VegetableList;