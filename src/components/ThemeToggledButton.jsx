import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeToggle } from "../hooks/useThemeToggle";

const ThemeToggleButton = () => {
  const { mode, toggle } = useThemeToggle();

  return (
    <IconButton onClick={toggle} color="inherit">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
