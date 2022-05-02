import React from "react";
import { Grid } from "@mui/material";

const OuterGrid = ({ children }) => {
  return (
    <Grid style={{ position: "relative" }} container>
      {children}
    </Grid>
  );
};

export default OuterGrid;
