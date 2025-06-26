import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";
import GlobalStyles from "./theme/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import createTheme from "./theme"; 

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/
const theme = createTheme("DARK"); // o il nome del tuo tema

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            {!window.kcContext ? (
                <h1>No Keycloak Context</h1>
            ) : (
                <KcPage kcContext={window.kcContext} />
            )}
        </ThemeProvider>
    </StrictMode>
);
