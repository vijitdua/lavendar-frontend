import React, {useEffect, useState} from 'react';
import {Alert, Fade, Box} from "@mui/material";

/**
 * ErrorMessage Component
 *
 * Displays an error message with a fade-out effect. The component automatically
 * hides itself after a specified duration. The message re-renders only if the
 * `errID` is updated, ensuring that repeated error messages with the same content
 * don't trigger unnecessary re-renders.
 *
 * Example usage:
 * ```jsx
 * const [error, setError] = useState(null);
 * const [errorID, setErrorID] = useState(0);
 *
 * if (something that causes an error) {
 *   setError('An error occurred');
 *   setErrorID(prevId => prevId + 1); // Increment errorID to trigger re-render
 * }
 *
 * return (
 *   {error && <ErrorMessage message={error} messageKey={errorID} />}
 * );
 * ```
 * Ensure that `errorID` is incremented each time a new error occurs to force the
 * component to re-render with the new message.
 *
 * @param {string} message - The error message to display.
 * @param {number} messageKey - A unique key that forces re-render when changed.
 * @param renderForSeconds - Seconds to render message for before disappearing, 10 seconds by default.
 * @returns {React.JSX.Element|null} - The rendered component, or null if not rendering.
 */
function StaticAlertMessage({message, messageKey, renderForSeconds = 10}) {
    const [shouldRender, setShouldRender] = useState(true);
    const timeoutMilliseconds = renderForSeconds * 1000; //Total render time, including fade

    useEffect(() => {
        setShouldRender(true); // Ensure the component should render when errID or message changes

        const renderTimer = setTimeout(() => {
            setShouldRender(false)
        }, timeoutMilliseconds);

        return () => clearTimeout(renderTimer);
    }, [messageKey, message]);

    if (!shouldRender) {
        return null;
    }

    return (
        <Fade in={shouldRender} timeout={500}>
            <Box>
                <Alert severity="error">{message}</Alert>
            </Box>
        </Fade>
    );


}

export default StaticAlertMessage;
