import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "../store/theme/theme.reducer";

export const useThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const toggle = () => dispatch(toggleThemeMode());
  return { mode, toggle };
};
