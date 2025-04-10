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
const MasterList = styled('ul')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface CulinaryListProps {
  culinaryList: CulinaryItem[];
  handleItemClick: (item: CulinaryItem) => void
}

const CulinaryList: React.FC<CulinaryListProps> = ({culinaryList, handleItemClick}) => {
  return (
    <Fragment>
      {/*<h2>Culinary List</h2>*/}
      <MasterList>
        {culinaryList.map((item, index) => (
          <li
            key={index}
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => handleItemClick(item)}
          >
            <Button variant="outlined">
              {item.name}
            </Button>
          </li>
        ))}
      </MasterList>
    </Fragment>
  )
}

export default CulinaryList;