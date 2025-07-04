import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ThemeToggleButton from "./ThemeToggledButton";
import { Outlet } from "react-router";

import { useTheme } from "@emotion/react";

const Navbar = React.memo(() => {
  const theme = useTheme(); // get current theme

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          width: "100%",
          top: 0,
        }}
      >
        <Toolbar
          disableGutters
          className="h-[50px] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        >
          <Typography variant="h6" component="h1">
            GOAL TRACKER
          </Typography>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
});

export default Navbar;
