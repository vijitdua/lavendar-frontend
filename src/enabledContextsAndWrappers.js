import ThemeWrapper from "@/wrappers/ThemeWrapper";

function enabledContextsAndWrappers({children}) {
    return (
        <ThemeWrapper>
            {children}
        </ThemeWrapper>
    );
}

export default enabledContextsAndWrappers;
