import React from "react";
import { Grid } from "@mui/material";

const OuterGrid = ({ children }) => {
  return <Grid container>{children}</Grid>;
};

export default OuterGrid;
