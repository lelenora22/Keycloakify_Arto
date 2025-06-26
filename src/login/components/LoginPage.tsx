import { Login as LoginIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { useFormik } from "formik";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import * as Yup from "yup";
import ArtoIcon from "../../assets/ArtoIcon";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";

export const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[8],
    padding: theme.spacing(5, 4),
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));

export default function Login(
    data: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n } = data;
    const { msgStr } = i18n;
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username obbligatorio"),
            password: Yup.string().required("Password obbligatoria")
        }),
        onSubmit: () => {
            // Submit del form a Keycloak
            const form = document.getElementById("kc-form-login") as HTMLFormElement;
            if (form) form.submit();
        }
    });

    return (
        <StyledBox>
            <Avatar sx={{ bgcolor: "primary.main", width: 70, height: 70, mb: 2 }}>
                <ArtoIcon sx={{ width: 60, height: 60 }} />
            </Avatar>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2} align="center">
                Inserisci le tue credenziali per accedere alla piattaforma.
            </Typography>
            <form
                id="kc-form-login"
                action={kcContext.url.loginAction}
                method="post"
                onSubmit={formik.handleSubmit}
                style={{ width: "100%" }}
                autoComplete="off"
            >
                <Stack width={"100%"} spacing={2}>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label={msgStr("username")}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        autoFocus
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
                                        <IconButton
                                            aria-label="Mostra/nascondi password"
                                            onClick={() => setShowPassword(show => !show)}
                                            edge="end"
                                            size="large"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                //defaultChecked={kcContext.rememberMe?.checked}
                                style={{ marginRight: 8 }}
                            />
                            {msgStr("rememberMe")}
                        </label>

                        <Button
                            component="a"
                            href={kcContext.url.loginResetCredentialsUrl}
                            sx={{ textTransform: "none" }}
                            size="small"
                        >
                            {msgStr("doForgotPassword")}
                        </Button>
                    </Stack>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        endIcon={<LoginIcon />}
                    >
                        {msgStr("doLogIn")}
                    </Button>

                    <Stack direction="row" justifyContent="center">
                        <Typography variant="body2" color="text.primary">
                            {msgStr("noAccount")}
                            <Button
                                component="a"
                                href={kcContext.url.registrationUrl}
                                sx={{ textTransform: "none" }}
                                size="small"
                            >
                                {msgStr("doRegister")}
                            </Button>
                        </Typography>
                    </Stack>
                </Stack>
            </form>
        </StyledBox>
    );
}
