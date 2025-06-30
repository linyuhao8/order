"use client";
// Import the Button component
import Button from "@/components/common/Button";

// Import icons for light and dark mode
import { FaCloudSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

// Import Redux state management utilities
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

// Import custom hook for handling theme switching
import useThemeSwitcher from "@/hooks/ui/useThemeSwitcher";

const ThemeButton = ({ variant = "icon", text = false }) => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Get the current theme mode from the Redux store
  const theme = useSelector((state) => state.theme.mode);

  // Apply the theme switcher effect based on the current theme
  useThemeSwitcher(theme);
  const isIconOnly = !text;
  const label = theme === "dark" ? "Dark" : "Light";
  return (
    // Button to toggle the theme between light and dark mode
    <Button
      onClick={() => dispatch(toggleTheme())}
      variant={variant}
      size={isIconOnly ? "icon" : "md"}
      className={`flex items-center ${!isIconOnly ? "gap-2" : ""}`}
    >
      {theme === "dark" ? <MdDarkMode /> : <FaCloudSun />}
      {!isIconOnly && <span>{label}</span>}
    </Button>
  );
};

export default ThemeButton;
