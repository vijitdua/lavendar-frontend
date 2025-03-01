import React, {useEffect, useState} from 'react';
import {Alert, Fade, Box} from "@mui/material";

/**
 * StaticSuccessMessage Component
 *
 * Displays a success message with a fade-out effect. The component automatically
 * hides itself after a specified duration. The message re-renders only if the
 * `messageKey` is updated, ensuring that repeated success messages with the same content
 * don't trigger unnecessary re-renders.
 *
 * Example usage:
 * ```jsx
 * const [success, setSuccess] = useState(null);
 * const [successID, setSuccessID] = useState(0);
 *
 * if (something that causes success) {
 *   setSuccess('Operation successful');
 *   setSuccessID(prevId => prevId + 1); // Increment successID to trigger re-render
 * }
 *
 * return (
 *   {success && <StaticSuccessMessage message={success} messageKey={successID} />}
 * );
 * ```
 * Ensure that `successID` is incremented each time a new success occurs to force the
 * component to re-render with the new message.
 *
 * @param {string} message - The success message to display.
 * @param {number} messageKey - A unique key that forces re-render when changed.
 * @param renderForSeconds - Seconds to render message for before disappearing, 10 seconds by default.
 * @returns {React.JSX.Element|null} - The rendered component, or null if not rendering.
 */
function StaticSuccessMessage({message, messageKey, renderForSeconds = 10}) {
    const [shouldRender, setShouldRender] = useState(true);
    const timeoutMilliseconds = renderForSeconds * 1000; // Total render time, including fade

    useEffect(() => {
        setShouldRender(true); // Ensure the component should render when messageKey or message changes

        const renderTimer = setTimeout(() => {
            setShouldRender(false);
        }, timeoutMilliseconds);

        return () => clearTimeout(renderTimer);
    }, [messageKey, message]);

    if (!shouldRender) {
        return null;
    }

    return (
        <Fade in={shouldRender} timeout={500}>
            <Box>
                <Alert severity="success">{message}</Alert>
            </Box>
        </Fade>
    );
}

export default StaticSuccessMessage;
