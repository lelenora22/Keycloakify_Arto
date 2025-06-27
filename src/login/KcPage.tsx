import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, IconButton, keyframes, Stack, useTheme } from "@mui/material";
import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { Suspense, lazy } from "react";
import { useAppTheme } from "../context/AppTheme";
import type { KcContext } from "./KcContext";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useI18n } from "./i18n";
import ArtoTemplate from "./ArtoTemplate";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });
    const theme = useTheme();

    const { toggleColorMode } = useAppTheme();


    return (

        <Suspense>
    
                {/* Background pattern */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.05,
                        backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main} 2px, transparent 2px)`,
                        backgroundSize: "50px 50px",
                        zIndex: 0
                    }}
                />
                <Stack alignItems="flex-end">
                    <IconButton onClick={toggleColorMode} color="inherit">
                        {theme.palette.mode === "dark" ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Stack>

                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <LoginPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                ></LoginPage>
                            );
                        case "register.ftl":
                            return (
                                <RegisterPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                ></RegisterPage>
                            );

                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={ArtoTemplate}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
        </Suspense>
        // </Box>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
