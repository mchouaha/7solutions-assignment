import React, {Fragment} from "react";

// material-ui
import {Button as MuiButton} from "@mui/material";
import {CulinaryItem} from "@/interfaces";
import styled from "@emotion/styled";

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

interface FruitListProps {
  fruitList: CulinaryItem[];
  handleRemoveFromSubList: (item: CulinaryItem) => void
  itemTimers: { [key: string]: number }
}

const FruitList: React.FC<FruitListProps> = ({fruitList, handleRemoveFromSubList, itemTimers}) => {
  return (
    <Fragment>
      <Title>Fruits</Title>
      <UList>
        {fruitList.map((item: CulinaryItem) => (
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

export default FruitList;