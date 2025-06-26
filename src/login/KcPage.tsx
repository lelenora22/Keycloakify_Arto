import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton, Stack, useTheme } from "@mui/material";
import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { Suspense, lazy } from "react";
import { useAppTheme } from "../context/AppTheme";
import type { KcContext } from "./KcContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { useI18n } from "./i18n";

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
        // <Box
        //     sx={{
        //         minHeight: "100vh",
        //         width: "100vw",
        //         backgroundImage: `url(${bgLogin})`,
        //         backgroundRepeat: "no-repeat",
        //         backgroundSize: "cover",
        //         backgroundPosition: "center"
        //     }}
        // >
            <Suspense>
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
                                    Template={Template}
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
