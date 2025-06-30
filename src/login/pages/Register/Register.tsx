import { Box, Button, Link, Stack } from "@mui/material";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { clsx } from "keycloakify/tools/clsx";
import { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { useState } from "react";
import { I18n } from "../../i18n";
import { KcContext } from "../../KcContext";
import TermsAcceptance from "./TermsAcceptance";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <Stack component="form"  id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <Stack className="form-group" alignItems={"center"} sx={{ backgroundColor: "theme.palette.background.paper" }}>
                        <Box className={kcClsx("kcInputWrapperClass")}>
                            <Box className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction} />
                        </Box>
                    </Stack>
                )}
                <Box className={kcClsx("kcFormGroupClass")}>
                    <Box id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <Box className={kcClsx("kcFormOptionsWrapperClass")}>
                            <Link href={url.loginUrl}>{msg("backToLogin")}</Link>
                        </Box>
                    </Box>

                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <Box id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button
                                className={clsx(
                                    kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                    "g-recaptcha"
                                )}
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                {msg("doRegister")}
                            </Button>
                        </Box>
                    ) : (
                        <Box id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                {msgStr("doRegister")}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Stack>
        </Template>
    );
}
