import { createContext, useCallback, useContext, useEffect, useState } from "react";

const DialogContext = createContext();

/**
 * useDialog - Custom hook to access the global dialog functions.
 *
 * Provides access to the `enqueueDialog`, `replaceAndEnqueueDialog`, and `closeCurrentlyVisibleDialog` functions,
 * which can be used to trigger, replace, or close a dialog from any part of the app.
 *
 * This hook allows you to manage dialogs by enqueuing them in a queue, replacing the current dialog with a new one,
 * or closing the currently visible dialog. Each dialog is rendered one at a time, and the next dialog will be shown after
 * the current one is closed.
 *
 * To use the hook properly, pass the dialog component (not a JSX element) to `enqueueDialog` or `replaceAndEnqueueDialog`,
 * and optionally, pass props that the dialog might need (e.g., `open`, `onClose`).
 *
 * @returns {Object} - An object containing:
 *   - `enqueueDialog`: Function to add a dialog to the queue. Pass the dialog component and props.
 *   - `replaceAndEnqueueDialog`: Function to replace the current dialog with a new one and push every dialog back by 1 position. Pass the dialog component and props.
 *   - `closeCurrentlyVisibleDialog`: Function to close the current dialog.
 *
 * Example usage:
 * ```jsx
 * import { useDialog } from './DialogProvider';
 * import BetaPopup from './BetaPopup'; // Your dialog component
 *
 * const { enqueueDialog, replaceAndEnqueueDialog, closeCurrentlyVisibleDialog } = useDialog();
 *
 * // Trigger a dialog with props (e.g., 'open' and 'onClose')
 * enqueueDialog(BetaPopup, { open: true, onClose: () => {} });
 *
 * // Replace and enqueue a dialog with props
 * replaceAndEnqueueDialog(NewDialogComponent, { someProp: value });
 *
 * // Close the currently visible dialog
 * closeCurrentlyVisibleDialog();
 * ```
 *
 * Notes:
 * - `enqueueDialog` and `replaceAndEnqueueDialog` expect a **component** (not an element) as the first argument, followed by any props the dialog requires.
 * - When the dialog is displayed, the props are passed down and managed automatically by the `DialogProvider`.
 * - The dialogs are displayed in a FIFO (First In, First Out) order, and the next dialog will be shown once the current dialog is closed.
 */

export function useDialog() {
    return useContext(DialogContext);
}

/**
 * DialogProvider - Global provider for managing dialogs.
 *
 * This provider manages a queue of dialogs and provides functions to display
 * dialogs globally from anywhere in the app. Dialogs are displayed one at a time,
 * in a First In, First Out (FIFO) order, and the next dialog is shown after the
 * current one is closed.
 *
 * Example usage:
 * In your root component, wrap your application with the `DialogProvider`:
 *
 * ```jsx
 * import { DialogProvider } from './DialogProvider';
 *
 * function App() {
 *   return (
 *     <DialogProvider>
 *       <YourMainComponent />
 *     </DialogProvider>
 *   );
 * }
 * ```
 *
 * Once wrapped, you can use the `useDialog` hook in any component to trigger,
 * replace or close dialogs.
 *
 * @param {React.ReactNode} children - The children components to render inside the provider.
 * @returns {React.JSX.Element} - The provider that enables dialog functionality.
 */
export function DialogProvider({ children }) {
    const [dialogQueue, setDialogQueue] = useState([]);
    const [currentlyVisibleDialog, setCurrentlyVisibleDialog] = useState(null);

    /**
     * Enqueues a dialog to be displayed.
     *
     * @param {React.Component} DialogComponent - The dialog component to render.
     */
    const enqueueDialog = useCallback((DialogComponent, props = {}) => {
        setDialogQueue((prevQueue) => [...prevQueue, { Component: DialogComponent, props }]);
    }, []);

    /**
     * Replaces the current dialog and pushes the previous dialog to front of the queue after new dialog.
     *
     * @param {React.Component} DialogComponent - The new dialog component to replace the current one.
     */
    const replaceAndEnqueueDialog = useCallback((DialogComponent, props = {}) => {
        setDialogQueue((prevQueue) => [{ Component: DialogComponent, props }, ...prevQueue]);
        closeCurrentlyVisibleDialog(); // Close current dialog to immediately show the new one
    }, []);

    /**
     * Closes the currently visible dialog and clears it from the screen.
     */
    const closeCurrentlyVisibleDialog = useCallback(() => {
        setCurrentlyVisibleDialog(null);
    }, []);

    /**
     * Processes the next dialog in the queue, setting it as the current dialog to display.
     */
    const processQueue = useCallback(() => {
        if (dialogQueue.length > 0) {
            setCurrentlyVisibleDialog(dialogQueue[0]);
            setDialogQueue((prevQueue) => prevQueue.slice(1));
        }
    }, [dialogQueue]);

    /**
     * Automatically processes the next dialog in the queue after the current one is closed.
     */
    useEffect(() => {
        if (dialogQueue.length > 0 && !currentlyVisibleDialog) {
            processQueue();
        }
    }, [dialogQueue, currentlyVisibleDialog, processQueue]);

    return (
        <DialogContext.Provider value={{ enqueueDialog, replaceAndEnqueueDialog, closeCurrentlyVisibleDialog }}>
            {children}
            {currentlyVisibleDialog && (
                <currentlyVisibleDialog.Component
                    {...currentlyVisibleDialog.props}
                    onClose={closeCurrentlyVisibleDialog}
                />
            )}
        </DialogContext.Provider>
    );
}