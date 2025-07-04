import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppThemeProvider from "./context/AppTheme";
import { KcPage } from "./kc.gen";
import GlobalStyles from "./theme/GlobalStyles";

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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppThemeProvider>
            <GlobalStyles/>
            {!window.kcContext ? (
                <h1>No Keycloak Context</h1>
            ) : (
                <KcPage kcContext={window.kcContext} />
            )}
        </AppThemeProvider>
    </StrictMode>
);
