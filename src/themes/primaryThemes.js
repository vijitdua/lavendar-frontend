/**
 * Dark theme for the Lavendar app with a cool background effect
 */

// Import inter font (body)
import '@fontsource/inter';

// Import plus jakarta sans (headings)
import '@fontsource/plus-jakarta-sans';

import { createTheme, responsiveFontSizes } from "@mui/material";

let darkTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 750,
            md: 1200,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#A997DF', // Soft Purple Glow
            light: '#DCCFEC', // Lighter Accent
            dark: '#4F517D', // Muted Deep Purple
            contrastText: '#DDC4DD', // Light Lavender Text
        },
        secondary: {
            main: '#DCCFEC', // Misty Lavender
            light: '#DDC4DD',
            dark: '#A997DF',
            contrastText: '#454372', // Dark Background Contrast
        },
        background: {
            default: '#2E2B58', // Even Darker Background for Depth
            paper: '#3A366A', // Slightly Lighter Dark Background for Cards
            gradient: `linear-gradient(135deg, #2E2B58 0%, #454372 100%)`, // Gradient Effect
        },
        text: {
            primary: '#DDC4DD', // Light Text
            secondary: '#DCCFEC', // Softer Lavender Accent
        },
        cardBackground: '#3A366A',
        overviewCard: '#3A366A',
        postBackground: '#3A366A',
        mobileBarDivider: '#A997DF',
        icons: '#DCCFEC',
        customRadio: {
            borderUnchecked: '1px solid #DDC4DD',
            borderChecked: '2px solid #A997DF',
        },
        sidebar: {
            header: '#3A366A',
            background: '#2E2B58',
            banner: '#3A366A',
            iconColor: '#DCCFEC',
            highlight: '#A997DF',
            highlightHover: '#DCCFEC',
        },
        messages: {
            texts: {
                senderBackground: '#A997DF',
                senderText: '#ffffff',
                receiverBackground: '#3A366A',
                receiverText: '#DDC4DD',
            },
            panelBorder: '1px solid #A997DF',
            messageCard: {
                hover: '#5356FF',
            }
        },
        appBar: {
            background: '#3A366A',
        }
    },
    typography: {
        fontFamily: 'Inter, Arial, sans-serif',
        h1: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#DDC4DD',
        },
        h2: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 600,
            fontSize: '2.5rem',
            color: '#DCCFEC',
        },
        h3: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 500,
            fontSize: '2rem',
            color: '#A997DF',
        },
        h4: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 400,
            fontSize: '1.75rem',
            color: '#DCCFEC',
        },
        h5: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 400,
            fontSize: '1.5rem',
            color: '#DDC4DD',
        },
        h6: {
            fontFamily: 'Plus Jakarta Sans, Arial, sans-serif',
            fontWeight: 400,
            fontSize: '1.25rem',
            color: '#DCCFEC',
        },
        body1: {
            fontFamily: 'Inter, Arial, sans-serif',
            color: '#DDC4DD',
        },
        body2: {
            fontFamily: 'Inter, Arial, sans-serif',
            color: '#DCCFEC',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: `linear-gradient(135deg, #2E2B58 0%, #454372 100%)`,
                    backgroundAttachment: 'fixed', // Makes the gradient feel immersive
                    backgroundSize: 'cover',
                    color: '#DDC4DD', // Ensures text remains readable
                },
            },
        },
    },
});

darkTheme = responsiveFontSizes(darkTheme);

export { darkTheme };
