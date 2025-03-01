import React, {useEffect, useState} from "react";
import {Alert, Box, Fade, IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function CloseButton({handleClose}) {

    return (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </>
    );
}

/**
 * SnackBarErrorMessage Component
 *
 * Displays a snackbar error message with a fade-out effect or a close button.
 * The component automatically hides itself after a specified duration, or when manually closed. The message
 * re-renders only if the `messageKey` is updated, ensuring that repeated error messages with the same content
 * don't trigger unnecessary re-renders. The visibility of the component is controlled internally and can be
 * communicated back to the parent through the `isVisible` callback.
 *
 * Example usage:
 * ```jsx
 * const [error, setError] = useState(null);
 * const [errorID, setErrorID] = useState(0);
 * const [alertVisible, setAlertVisible] = useState(false);
 *
 * if (something that causes an error) {
 *   setError('An error occurred');
 *   setErrorID(prevId => prevId + 1); // Increment errorID to trigger re-render
 * }
 *
 * return (
 *   <>
 *     <SnackbarAlertMessage
 *       message={error}
 *       messageKey={errorID}
 *       isVisible={setAlertVisible}
 *     />
 *     {alertVisible && <p>The alert is visible</p>}
 *   </>
 * );
 * ```
 * Ensure that `errorID` is incremented each time a new error occurs to force the
 * component to re-render with the new message.
 *
 * @param {string} message - The error message to display.
 * @param {number} messageKey - A unique key that forces re-render when changed.
 * @param {number} [hideAfterSeconds=10] - Seconds to render the message before disappearing.
 * @param {function} isVisible - Callback function to notify the parent component whether the snackbar is visible.
 *                               It receives `true` when the snackbar opens and `false` when it closes.
 * @returns {React.JSX.Element|null} - The rendered component, or null if not rendering.
 */
function SnackbarAlertMessage({message, messageKey, hideAfterSeconds = 10, isVisible}) {
    const [open, setOpen] = useState(false);
    const timeoutMilliseconds = hideAfterSeconds * 1000;

    useEffect(() => {

        if (!message) return; // Don't render if the component doesn't have a message set.

        setOpen(true); // Component should render when message or message key changes
        isVisible(true);

        const renderTimer = setTimeout(() => {
            handleClose();
        }, timeoutMilliseconds)

    }, [message, messageKey])

    function handleClose() {
        setOpen(false);
        isVisible(false)
    }


    return (
        <>
            {open
                ?
                <Snackbar
                    open={open}
                    autoHideDuration={timeoutMilliseconds}
                >
                    <Fade in={open} timeout={500}>
                        <Box>
                            <Alert severity="error">
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    minWidth: '10rem',
                                }}>
                                    {message}
                                    <CloseButton handleClose={handleClose}/>
                                </Box>
                            </Alert>

                        </Box>
                    </Fade>
                </Snackbar>
                :
                <>
                    {/* Render nothing if not open */}
                </>
            }
        </>
    );
}

export default SnackbarAlertMessage;
