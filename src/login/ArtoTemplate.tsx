import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import {
    Alert,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Stack,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { clsx } from "keycloakify/tools/clsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useEffect, useState } from "react";
import { useAppTheme } from "../context/AppTheme";
import PulsingBlob from "./components/PulsingBlob";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import ArtoIcon from "../assets/ArtoIcon";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
        backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}20 2px, transparent 2px)`,
        backgroundSize: "50px 50px",
        opacity: 0.3
    }
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: 20,
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: -50,
        left: -50,
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: `linear-gradient(45deg, ${theme.palette.primary.main}30, transparent)`,
        animation: "pulse 3s ease-in-out infinite"
    }
}));

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
    const theme = useTheme();

    const { toggleColorMode } = useAppTheme();

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    // Language menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    if (!isReadyToRender) {
        return null;
    }

    return (
        <>
            {/* Background pattern */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.2,
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
            <StyledBox>
                <PulsingBlob />

                <StyledPaper className={kcClsx("kcLoginClass")}>
                    {/* Header */}
                    <Box id="kc-header" className={kcClsx("kcHeaderClass")}>
                        <Box
                            id="kc-header-wrapper"
                            className={kcClsx("kcHeaderWrapperClass")}
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
                                component="span"
                                dangerouslySetInnerHTML={{
                                    __html: msg("loginTitleHtml", realm.displayNameHtml)
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Card */}
                    <Box className={kcClsx("kcFormCardClass")}>
                        <Box component="header" className={kcClsx("kcFormHeaderClass")}>
                            {enabledLanguages.length > 1 && (
                                <Box
                                    className={kcClsx("kcLocaleMainClass")}
                                    id="kc-locale"
                                >
                                    <Box
                                        id="kc-locale-wrapper"
                                        className={kcClsx("kcLocaleWrapperClass")}
                                    >
                                        <Box
                                            id="kc-locale-dropdown"
                                            className={clsx(
                                                "menu-button-links",
                                                kcClsx("kcLocaleDropDownClass")
                                            )}
                                        >
                                            <IconButton
                                                tabIndex={1}
                                                id="kc-current-locale-link"
                                                aria-label={msgStr("languages")}
                                                aria-haspopup="true"
                                                aria-expanded={open ? "true" : "false"}
                                                aria-controls="language-switch1"
                                                onClick={e =>
                                                    setAnchorEl(e.currentTarget)
                                                }
                                                size="small"
                                            >
                                                <LanguageIcon />
                                                <Typography sx={{ ml: 1 }}>
                                                    {currentLanguage.label}
                                                </Typography>
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={() => setAnchorEl(null)}
                                                id="language-switch1"
                                                MenuListProps={{
                                                    "aria-labelledby":
                                                        "kc-current-locale-link",
                                                    tabIndex: -1
                                                }}
                                            >
                                                {enabledLanguages.map(
                                                    ({ languageTag, label, href }, i) => (
                                                        <MenuItem
                                                            key={languageTag}
                                                            component="a"
                                                            href={href}
                                                            selected={
                                                                currentLanguage.languageTag ===
                                                                languageTag
                                                            }
                                                            onClick={() =>
                                                                setAnchorEl(null)
                                                            }
                                                            id={`language-${i + 1}`}
                                                            className={kcClsx(
                                                                "kcLocaleItemClass"
                                                            )}
                                                        >
                                                            {label}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Menu>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            {(() => {
                                const node = !(
                                    auth !== undefined &&
                                    auth.showUsername &&
                                    !auth.showResetCredentials
                                ) ? (
                                    <Typography component="h1" id="kc-page-title">
                                        {headerNode}
                                    </Typography>
                                ) : (
                                    <Box
                                        id="kc-username"
                                        className={kcClsx("kcFormGroupClass")}
                                    >
                                        <Typography
                                            id="kc-attempted-username"
                                            component="label"
                                        >
                                            {auth.attemptedUsername}
                                        </Typography>
                                        <Button
                                            id="reset-login"
                                            href={url.loginRestartFlowUrl}
                                            aria-label={msgStr("restartLoginTooltip")}
                                            size="small"
                                            sx={{ ml: 1 }}
                                        >
                                            <span className="kc-login-tooltip">
                                                {/* Icona custom, puoi aggiungere qui una icona MUI se vuoi */}
                                                <span
                                                    className={kcClsx("kcResetFlowIcon")}
                                                ></span>
                                                <span className="kc-tooltip-text">
                                                    {msg("restartLoginTooltip")}
                                                </span>
                                            </span>
                                        </Button>
                                    </Box>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <Box className={kcClsx("kcContentWrapperClass")}>
                                            <Box
                                                className={clsx(
                                                    kcClsx("kcLabelWrapperClass"),
                                                    "subtitle"
                                                )}
                                            >
                                                <Typography
                                                    component="span"
                                                    className="subtitle"
                                                >
                                                    <span className="required">*</span>
                                                    {msg("requiredFields")}
                                                </Typography>
                                            </Box>
                                            <Box className="col-md-10">{node}</Box>
                                        </Box>
                                    );
                                }

                                return node;
                            })()}
                        </Box>
                        <Box id="kc-content">
                            <Box id="kc-content-wrapper">
                                {/* Alert messages */}
                                {displayMessage &&
                                    message !== undefined &&
                                    (message.type !== "warning" ||
                                        !isAppInitiatedAction) && (
                                        <Alert
                                            className={clsx(
                                                `alert-${message.type}`,
                                                kcClsx("kcAlertClass"),
                                                `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                            )}
                                            severity={
                                                message.type === "error"
                                                    ? "error"
                                                    : message.type === "warning"
                                                      ? "warning"
                                                      : message.type === "success"
                                                        ? "success"
                                                        : "info"
                                            }
                                            icon={false}
                                            sx={{ mb: 2 }}
                                        >
                                            <span
                                                className={kcClsx("kcAlertTitleClass")}
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(message.summary)
                                                }}
                                            />
                                        </Alert>
                                    )}
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form
                                        id="kc-select-try-another-way-form"
                                        action={url.loginAction}
                                        method="post"
                                    >
                                        <Box className={kcClsx("kcFormGroupClass")}>
                                            <input
                                                type="hidden"
                                                name="tryAnotherWay"
                                                value="on"
                                            />
                                            <Button
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms[
                                                        "kc-select-try-another-way-form" as never
                                                    ].submit();
                                                    return false;
                                                }}
                                                size="small"
                                            >
                                                {msg("doTryAnotherWay")}
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                                {socialProvidersNode}
                                {displayInfo && (
                                    <Box id="kc-info" className={kcClsx("kcSignUpClass")}>
                                        <Box
                                            id="kc-info-wrapper"
                                            className={kcClsx("kcInfoAreaWrapperClass")}
                                        >
                                            {infoNode}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </StyledPaper>
            </StyledBox>
        </>
    );
}
