import { ArrowForward } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import { I18n } from "../../i18n";
import { KcContext } from "../../KcContext";
import PasswordWrapper from "../PasswordWrapper";

export default function Login(
    props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        registrationDisabled,
        messagesPerField
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={
                realm.password && realm.registrationAllowed && !registrationDisabled
            }
            infoNode={
                <Stack id="kc-registration-container" spacing={5} mt={5}>
                    <Stack
                        id="kc-registration"
                        direction="row"
                        justifyContent={"flex-end"}
                        spacing={2}
                    >
                        <Typography component="span" variant="body2">
                            {msg("noAccount")}{" "}
                        </Typography>
                        <Link
                            tabIndex={8}
                            href={url.registrationUrl}
                            variant="body2"
                            sx={{
                                color: "primary.main",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" }
                            }}
                        >
                            {msg("doRegister")}
                        </Link>
                    </Stack>
                </Stack>
            }
            socialProvidersNode={
                <>
                    {realm.password &&
                        social?.providers !== undefined &&
                        social.providers.length !== 0 && (
                            <Stack
                                spacing={5}
                                id="kc-social-providers"
                                className={kcClsx("kcFormSocialAccountSectionClass")}
                            >
                                <Divider />
                                <Typography
                                    textAlign="center"
                                    component="h2"
                                    variant="h6"
                                >
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <Box
                                    className={kcClsx(
                                        "kcFormSocialAccountListClass",
                                        social.providers.length > 3 &&
                                            "kcFormSocialAccountListGridClass"
                                    )}
                                    sx={{
                                        listStyle: "none",
                                        p: 0,
                                        m: 0,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 2
                                    }}
                                >
                                    {social.providers.map((...[p, , providers]) => (
                                        <Box component="li" key={p.alias}>
                                            <Button
                                                id={`social-${p.alias}`}
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 &&
                                                        "kcFormSocialAccountGridItem"
                                                )}
                                                href={p.loginUrl}
                                                type="button"
                                                variant="outlined"
                                                startIcon={
                                                    p.iconClasses ? (
                                                        <i
                                                            className={clsx(
                                                                kcClsx("kcCommonLogoIdP"),
                                                                p.iconClasses
                                                            )}
                                                            aria-hidden="true"
                                                        ></i>
                                                    ) : undefined
                                                }
                                                sx={{
                                                    minWidth: 120,
                                                    borderRadius: 2,
                                                    textTransform: "none"
                                                }}
                                            >
                                                <span
                                                    className={clsx(
                                                        kcClsx(
                                                            "kcFormSocialAccountNameClass"
                                                        ),
                                                        p.iconClasses &&
                                                            "kc-social-icon-text"
                                                    )}
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(p.displayName)
                                                    }}
                                                ></span>
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            </Stack>
                        )}
                </>
            }
        >
            <Stack id="kc-form" spacing={5}>
                <Stack id="kc-form-wrapper" spacing={5}>
                    {realm.password && (
                        <Stack
                            component="form"
                            id="kc-form-login"
                            action={url.loginAction}
                            method="post"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            autoComplete="off"
                        >
                            <Stack spacing={5}>
                                {!usernameHidden && (
                                    <Box className={kcClsx("kcFormGroupClass")}>
                                        <TextField
                                            variant="outlined"
                                            label={
                                                !realm.loginWithEmailAllowed
                                                    ? msg("username")
                                                    : !realm.registrationEmailAsUsername
                                                      ? msg("usernameOrEmail")
                                                      : msg("email")
                                            }
                                            tabIndex={2}
                                            id="username"
                                            className={kcClsx("kcInputClass")}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            error={messagesPerField.existsError(
                                                "username",
                                                "password"
                                            )}
                                            helperText={
                                                messagesPerField.existsError(
                                                    "username",
                                                    "password"
                                                ) && (
                                                    <span
                                                        id="input-error"
                                                        className={kcClsx(
                                                            "kcInputErrorMessageClass"
                                                        )}
                                                        aria-live="polite"
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(
                                                                messagesPerField.getFirstError(
                                                                    "username",
                                                                    "password"
                                                                )
                                                            )
                                                        }}
                                                    />
                                                )
                                            }
                                            fullWidth
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Box>
                                )}

                                <Box className={kcClsx("kcFormGroupClass")}>
                                    <PasswordWrapper
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                        passwordInputId="password"
                                    >
                                        <TextField
                                            variant="outlined"
                                            label={msg("password")}
                                            tabIndex={3}
                                            id="password"
                                            className={kcClsx("kcInputClass")}
                                            name="password"
                                            autoComplete="current-password"
                                            error={messagesPerField.existsError(
                                                "username",
                                                "password"
                                            )}
                                            fullWidth
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </PasswordWrapper>
                                    {usernameHidden &&
                                        messagesPerField.existsError(
                                            "username",
                                            "password"
                                        ) && (
                                            <span
                                                id="input-error"
                                                className={kcClsx(
                                                    "kcInputErrorMessageClass"
                                                )}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(
                                                        messagesPerField.getFirstError(
                                                            "username",
                                                            "password"
                                                        )
                                                    )
                                                }}
                                            />
                                        )}
                                </Box>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems="center"
                                className={clsx(
                                    kcClsx("kcFormGroupClass"),
                                    kcClsx("kcFormSettingClass")
                                )}
                                my={2}
                            >
                                <Box id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    defaultChecked={!!login.rememberMe}
                                                    size="small"
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {msg("rememberMe")}
                                                </Typography>
                                            }
                                        />
                                    )}
                                </Box>
                                <Box className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <Typography component="span">
                                            <Link
                                                tabIndex={6}
                                                href={url.loginResetCredentialsUrl}
                                                variant="body2"
                                                sx={{
                                                    color: "primary.main",
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        textDecoration: "underline"
                                                    }
                                                }}
                                            >
                                                {msg("doForgotPassword")}
                                            </Link>
                                        </Typography>
                                    )}
                                </Box>
                            </Stack>

                            <Box
                                id="kc-form-buttons"
                                className={kcClsx("kcFormGroupClass")}
                            >
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={auth.selectedCredential}
                                />
                                <Button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={clsx(
                                        kcClsx("kcButtonClass"),
                                        kcClsx("kcButtonPrimaryClass"),
                                        kcClsx("kcButtonBlockClass"),
                                        kcClsx("kcButtonLargeClass")
                                    )}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </Box>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Template>
    );
}
