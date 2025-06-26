import { Login as LoginIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import * as Yup from "yup";
import ArtoIcon from "../../assets/ArtoIcon";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";
import { StyledBox } from "./LoginPage";


export default function Register(
    data: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
    const { kcContext, i18n } = data;
    const { msgStr } = i18n;
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Nome obbligatorio"),
            lastName: Yup.string().required("Cognome obbligatorio"),
            email: Yup.string().email("Email non valida").required("Email obbligatoria"),
            username: Yup.string().required("Username obbligatorio"),
            password: Yup.string().required("Password obbligatoria"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref("password")], "Le password non corrispondono")
                .required("Conferma password obbligatoria")
        }),
        onSubmit: () => {
            const form = document.getElementById("kc-register-form") as HTMLFormElement;
            if (form) form.submit();
        }
    });

    return (
        <StyledBox>
            <Avatar sx={{ bgcolor: "primary.main", width: 70, height: 70, mb: 2 }}>
                <ArtoIcon sx={{ width: 60, height: 60 }} />
            </Avatar>
            <Typography variant="h4" gutterBottom>
                {msgStr("registerTitle")}
            </Typography>

            <form
                id="kc-register-form"
                action={kcContext.url.registrationAction}
                method="post"
                onSubmit={formik.handleSubmit}
                style={{ width: "100%" }}
            >
                <Stack width={"100%"} spacing={2}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label={msgStr("firstName")}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.firstName && Boolean(formik.errors.firstName)
                        }
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label={msgStr("lastName")}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={msgStr("email")}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label={msgStr("username")}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
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

                    <TextField
                        fullWidth
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type={showPassword ? "text" : "password"}
                        label={msgStr("passwordConfirm") || "Conferma Password"}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.passwordConfirm &&
                            Boolean(formik.errors.passwordConfirm)
                        }
                        helperText={
                            formik.touched.passwordConfirm &&
                            formik.errors.passwordConfirm
                        }
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
                </Stack>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    endIcon={<LoginIcon />}
                >
                    {msgStr("doRegister")}
                </Button>
            </form>
        </StyledBox>
    );
}
