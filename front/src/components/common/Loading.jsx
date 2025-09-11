import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
