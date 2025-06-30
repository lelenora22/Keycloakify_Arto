import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import { lazy, Suspense } from "react";
import ArtoTemplate from "./ArtoTemplate";
import { useI18n } from "./i18n";
import type { KcContext } from "./KcContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Register from "./pages/Register";

const UserProfileFormFields = lazy(
    () => import("./pages/Register/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense fallback={null}>
            {/* <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={ArtoTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
            /> */}
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={ArtoTemplate}
                                doUseDefaultCss={false}
                                // UserProfileFormFields={UserProfileFormFields}
                                // doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            ></Login>
                        );
                    case "register.ftl":
                        return (
                            <Register
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={ArtoTemplate}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            ></Register>
                        );

                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={ArtoTemplate}
                                doUseDefaultCss={false}
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
