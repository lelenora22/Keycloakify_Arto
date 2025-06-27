import { ArrowForward, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { PageProps } from "keycloakify/login/pages/PageProps";
import ArtoIcon from "../../assets/ArtoIcon";
import { StyledBox, StyledPaper } from "../ArtoTemplate";
import PulsingBlob from "../components/PulsingBlob";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { useState } from "react";



export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const theme = useTheme();
    

    return (
        <>

<>
 <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box id="kc-registration-container">
        <Box id="kc-registration">
            <Typography component="span" variant="body2">
                {msg("noAccount")}{" "}
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
            </Typography>
        </Box>
    </Box>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label>
                                    <input
                                        tabIndex={2}
                                        id="username"
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button>
        </div>
    );
}
</>
        <Stack alignItems={"center"} spacing={5}>
            <StyledBox>
                <Container maxWidth="sm">
                    <Box position="relative">
                        <PulsingBlob />

                        <StyledPaper
                            elevation={12}
                            
                        >
                            {/* Logo Section */}
                            <Box
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    zIndex: 1
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 65,
                                        height: 65,
                                        backgroundColor: `${theme.palette.primary.main}20`,
                                        color: "primary.main",
                                        mx: "auto",
                                        mb: 2
                                    }}
                                >
                                    <ArtoIcon sx={{ width: 55, height: 55 }} />
                                </Avatar>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "primary.main",
                                        mb: 1
                                    }}
                                >
                                    ARTO
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    Inserisci le tue credenziali per accedere alla piattaforma.
                                </Typography>
                            </Box>

                            {/* Tab Navigation */}

                            {/* Login Form */}
                            <Stack spacing={3}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label={msgStr("email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Mail color="action" />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "primary.main"
                                                }
                                            }
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label={msgStr("password")}
                                        type={showPassword ? "text" : "password"}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "primary.main"
                                                }
                                            }
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <FormControlLabel
                                            control={<Checkbox size="small" />}
                                            label={
                                                <Typography variant="body2" color="text.secondary">
                                                    Ricordami
                                                </Typography>
                                            }
                                        />
                                        <Link
                                            href="#"
                                            variant="body2"
                                            sx={{
                                                color: "primary.main",
                                                textDecoration: "none",
                                                "&:hover": { textDecoration: "underline" }
                                            }}
                                        >
                                            Password dimenticata?
                                        </Link>
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            py: 2,
                                            borderRadius: 2,
                                            backgroundColor: "primary.main",
                                            fontWeight: 600,
                                            fontSize: "1.1rem",
                                            "&:hover": {
                                                backgroundColor: "primary.dark",
                                                transform: "translateY(-2px)",
                                                boxShadow: 6
                                            },
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        Accedi
                                    </Button>
                                </Stack>
                            </Stack>

                            <Stack direction="row" justifyContent="center" alignItems={"center"} spacing={3} margin={3}>
                                <Typography variant="body1" color="text.primary">
                                    {msgStr("noAccount")}
                                </Typography>
                                <Link
                                    href="kcContext.url.registrationUrl"
                                    variant="body2"
                                    sx={{
                                        textAlign: "center",
                                        alignItems: "center",
                                        color: "primary.main",
                                        textDecoration: "none",
                                        "&:hover": { textDecoration: "underline" }
                                    }}
                                >
                                    Registrati
                                </Link>
                            </Stack>

                            {/* Social Login */}
                            <Stack spacing={5}>
                                <Divider>
                                    <Typography variant="body2" color="text.secondary">
                                        Oppure continua con
                                    </Typography>
                                </Divider>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={
                                            <Box component="svg" sx={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </Box>
                                        }
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            borderColor: "divider",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                backgroundColor: "primary.main",
                                                color: "primary.contrastText",
                                                transform: "translateY(-1px)"
                                            },
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        Google
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={
                                            <Box component="svg" sx={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </Box>
                                        }
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            borderColor: "divider",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                backgroundColor: "primary.main",
                                                color: "primary.contrastText",
                                                transform: "translateY(-1px)"
                                            },
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        Twitter
                                    </Button>
                                </Stack>
                            </Stack>
                        </StyledPaper>
                    </Box>
                </Container>
            </StyledBox>
        </Stack>
                </>
    );
}
