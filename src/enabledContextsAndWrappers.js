import ThemeWrapper from "@/wrappers/ThemeWrapper";
import {DialogProvider} from "@/contexts/dialogProvider";
import {GlobalFeedbackSnackbarProvider} from "@/contexts/globalFeedbackSnackbarProvider";

function enabledContextsAndWrappers({children}) {
    return (
        <ThemeWrapper>
            <GlobalFeedbackSnackbarProvider>
                <DialogProvider>
                    {children}
                </DialogProvider>
            </GlobalFeedbackSnackbarProvider>
        </ThemeWrapper>
    );
}

export default enabledContextsAndWrappers;
