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
 * SnackbarSuccessMessage Component
 *
 * Displays a snackbar success message with a fade-out effect or close button.
 * The component automatically hides itself after a specified duration, or when manually closed.
 * The message re-renders only if the `messageKey` is updated, ensuring that repeated success messages
 * with the same content don't trigger unnecessary re-renders. The visibility of the component can be
 * communicated back to the parent through the `isVisible` callback.
 *
 * Example usage:
 * ```jsx
 * const [successMessage, setSuccessMessage] = useState(null);
 * const [successMessageID, setSuccessMessageID] = useState(0);
 * const [alertVisible, setAlertVisible] = useState(false);
 *
 * if (something that causes success) {
 *   setSuccessMessage('Your task was successful');
 *   setSuccessMessageID(prevId => prevId + 1); // Increment successMessageID to trigger re-render
 * }
 *
 * return (
 *   <>
 *     <SnackbarSuccessMessage
 *       message={successMessage}
 *       messageKey={successMessageID}
 *       isVisible={setAlertVisible}
 *     />
 *     {alertVisible && <p>The success message is visible</p>}
 *   </>
 * );
 * ```
 * Ensure that `successMessageID` is incremented each time a new success event occurs to force the
 * component to re-render with the new message.
 *
 * @param {string} message - The success message to display.
 * @param {number} messageKey - A unique key that forces re-render when changed.
 * @param {number} [hideAfterSeconds=10] - Seconds to render the message before disappearing.
 * @param {function} isVisible - Callback function to notify the parent component whether the snackbar is visible.
 *                               It receives `true` when the snackbar opens and `false` when it closes.
 * @returns {React.JSX.Element|null} - The rendered component, or null if not rendering.
 */
function SnackbarSuccessMessage({message, messageKey, hideAfterSeconds = 10, isVisible}) {
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
        isVisible(false);
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
                            <Alert severity="success">
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

export default SnackbarSuccessMessage;
