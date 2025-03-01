import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "@/themes/primaryThemes";
/**
 * ThemeWrapper that provides the theme to the application
 * @param {Object} children - The child components that can consume the provided theme.
 * @returns {JSX.Element} - Provider component that wraps child components.
 */
function ThemeWrapper({children}) {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}

export default ThemeWrapper;
