import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import SnackbarAlertMessage from "@/components/feedback-messages/SnackbarAlertMessage";
import SnackbarSuccessMessage from "@/components/feedback-messages/SnackbarSuccessMessage";

// Create Snackbar context
const SnackbarContext = createContext();

/**
 * useGlobalSnackbar - Hook to access the global snackbar functions.
 *
 * Provides access to the `enqueueSuccessFeedbackSnackbar`, `enqueueAlertFeedbackSnackbar`,
 * `replaceAndEnqueueSuccessFeedbackSnackbar`, and `replaceAndEnqueueAlertFeedbackSnackbar` functions, which can be used
 * to trigger a success or alert (error) snackbar from any part of the app.
 *
 * @returns {Object} - An object containing:
 *   - `enqueueSuccessFeedbackSnackbar`: Function to show a success snackbar.
 *   - `enqueueAlertFeedbackSnackbar`: Function to show an alert (error) snackbar.
 *   - `replaceAndEnqueueSuccessFeedbackSnackbar`: Function to replace and show a success snackbar immediately.
 *   - `replaceAndEnqueueAlertFeedbackSnackbar`: Function to replace and show an alert (error) snackbar immediately.
 *
 * Example usage:
 * ```jsx
 * import { useGlobalSnackbar } from './GlobalFeedbackSnackbarProvider';
 *
 * const { enqueueSuccessFeedbackSnackbar, enqueueAlertFeedbackSnackbar, replaceAndEnqueueSuccessFeedbackSnackbar, replaceAndEnqueueAlertFeedbackSnackbar } = useGlobalSnackbar();
 *
 * // Trigger a success snackbar
 * enqueueSuccessFeedbackSnackbar('Operation successful!', 3000);
 *
 * // Trigger an alert (error) snackbar
 * enqueueAlertFeedbackSnackbar('Something went wrong.', 5000);
 *
 * // Replace the current snackbar with a new success message
 * replaceAndEnqueueSuccessFeedbackSnackbar('New success!', 3000);
 *
 * // Replace the current snackbar with a new error message
 * replaceAndEnqueueAlertFeedbackSnackbar('New error occurred.', 5000);
 * ```
 */
export function useGlobalSnackbar(){
    return useContext(SnackbarContext);
}

/**
 * GlobalFeedbackSnackbarProvider - Global provider for managing snackbars.
 *
 * This provider manages a queue of snackbars and provides functions to display
 * either success or alert (error) snackbars globally from anywhere in the app. Snackbars
 * are displayed one at a time, and the next snackbar is shown after the current
 * one is closed.
 *
 * Example usage:
 * In your root component, wrap your application with the `GlobalFeedbackSnackbarProvider`:
 *
 * ```jsx
 * import { GlobalFeedbackSnackbarProvider } from './GlobalFeedbackSnackbarProvider';
 *
 * function App() {
 *   return (
 *     <GlobalFeedbackSnackbarProvider>
 *       <YourMainComponent />
 *     </GlobalFeedbackSnackbarProvider>
 *   );
 * }
 * ```
 *
 * Once wrapped, you can use the `useGlobalSnackbar` hook in any component to trigger
 * a snackbar.
 *
 * @param {React.ReactNode} children - The children components to render inside the provider.
 * @returns {React.JSX.Element} - The provider that enables snackbar functionality.
 */
export const GlobalFeedbackSnackbarProvider = ({ children }) => {
    const [snackbarQueue, setSnackbarQueue] = useState([]);
    const [currentSnackbar, setCurrentSnackbar] = useState(null);
    const [isCurrentSnackbarVisible, setIsCurrentSnackbarVisible] = useState(false);

    /**
     * Enqueues a snackbar message to be displayed.
     *
     * @param {React.Component} Component - The snackbar component to render (either success or alert).
     * @param {string} message - The message to display in the snackbar.
     * @param {number} duration - The duration in milliseconds before the snackbar disappears.
     */
    const enqueueSnackbar = useCallback((Component, message, duration = 5000) => {
        setSnackbarQueue((prev) => [
            ...prev,
            { Component, message, duration, key: new Date().getTime() }
        ]);
    }, []);

    /**
     * Replaces the current snackbar and pushes the new snackbar to the front of the queue.
     *
     * This function immediately closes the currently visible snackbar (if any) and shows
     * the new snackbar component, pushing it to the front of the queue.
     *
     * @param {React.Component} Component - The new snackbar component to replace the current one.
     * @param {string} message - The message to display in the snackbar.
     * @param {number} duration - The duration in milliseconds before the snackbar disappears.
     *
     * Example usage:
     * ```jsx
     * replaceAndEnqueueSnackbar(SnackbarSuccessMessage, 'New message', 3000);
     * ```
     */
    const replaceAndEnqueueSnackbar = useCallback((Component, message, duration = 5000) => {
        setSnackbarQueue((prev) => [
            {Component, message, duration, key: new Date().getTime() },
            ...prev
        ]);
        closeCurrentSnackbar(); // Close current snackbar to immediately show the new one
    }, []);

    /**
     * Processes the next snackbar in the queue, setting it as the current snackbar to display.
     */
    const processQueue = useCallback(() => {
        if (snackbarQueue.length > 0) {
            setCurrentSnackbar(snackbarQueue[0]);
            setSnackbarQueue((prev) => prev.slice(1));
        }
    }, [snackbarQueue]);

    // Close current snackbar & remove it from the queue when child component calls for snackbar closing
    useEffect(() => {
        if (!isCurrentSnackbarVisible) {
            closeCurrentSnackbar();
        }
    }, [isCurrentSnackbarVisible]);

    /**
     * Closes the current snackbar and clears it from the screen.
     */
    const closeCurrentSnackbar = useCallback(() => {
        setCurrentSnackbar(null);
    }, []);

    /**
     * Automatically processes the next snackbar in the queue after the current one is closed.
     */
    useEffect(() => {
        if (!currentSnackbar && snackbarQueue.length > 0) {
            processQueue();
        }
    }, [currentSnackbar, processQueue, snackbarQueue]);

    /**
     * Triggers a success snackbar.
     *
     * @param {string} message - The success message to display.
     * @param {number} [duration=5000] - The duration in milliseconds before the snackbar disappears.
     *
     * Example:
     * ```jsx
     * enqueueSuccessFeedbackSnackbar('Operation successful!', 3000);
     * ```
     */
    function enqueueSuccessFeedbackSnackbar(message, duration = 5000) {
        enqueueSnackbar(SnackbarSuccessMessage, message, duration);
    }

    /**
     * Triggers an alert snackbar (used for errors).
     *
     * @param {string} message - The alert (error) message to display.
     * @param {number} [duration=5000] - The duration in milliseconds before the snackbar disappears.
     *
     * Example:
     * ```jsx
     * enqueueAlertFeedbackSnackbar('An error occurred.', 5000);
     * ```
     */
    function enqueueAlertFeedbackSnackbar(message, duration = 5000) {
        enqueueSnackbar(SnackbarAlertMessage, message, duration);
    }

    /**
     * Replaces the current snackbar with a success message and displays it immediately.
     *
     * @param {string} message - The success message to display.
     * @param {number} [duration=5000] - The duration in milliseconds before the snackbar disappears.
     *
     * Example:
     * ```jsx
     * replaceAndEnqueueSuccessFeedbackSnackbar('Operation successful!', 3000);
     * ```
     */
    function replaceAndEnqueueSuccessFeedbackSnackbar(message, duration = 5000) {
        replaceAndEnqueueSnackbar(SnackbarSuccessMessage, message, duration);
    }

    /**
     * Replaces the current snackbar with an alert message (used for errors) and displays it immediately.
     *
     * @param {string} message - The alert (error) message to display.
     * @param {number} [duration=5000] - The duration in milliseconds before the snackbar disappears.
     *
     * Example:
     * ```jsx
     * replaceAndEnqueueAlertFeedbackSnackbar('An error occurred.', 3000);
     * ```
     */
    function replaceAndEnqueueAlertFeedbackSnackbar(message, duration = 5000) {
        replaceAndEnqueueSnackbar(SnackbarAlertMessage, message, duration);
    }

    return (
        <SnackbarContext.Provider value={{ enqueueSuccessFeedbackSnackbar, enqueueAlertFeedbackSnackbar, replaceAndEnqueueSuccessFeedbackSnackbar, replaceAndEnqueueAlertFeedbackSnackbar, closeCurrentSnackbar }}>
            {children}
            {currentSnackbar && (
                <currentSnackbar.Component
                    message={currentSnackbar.message}
                    messageKey={currentSnackbar.key}
                    hideAfterSeconds={currentSnackbar.duration / 1000}
                    isVisible={setIsCurrentSnackbarVisible} // Close the snackbar when it is no longer visible
                />
            )}
        </SnackbarContext.Provider>
    );
};
