import { useSelector } from "react-redux";

export function useTheme() {
  return useSelector((state) => state.theme.mode);
}