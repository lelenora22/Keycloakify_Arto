import {
    ArrowForward,
    Mail,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
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
    Paper,
    Stack,
    TextField,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import { useFormik } from "formik";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import * as Yup from "yup";
import ArtoIcon from "../../assets/ArtoIcon";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";
import PulsingBlob from "../components/PulsingBlob";

export const StyledBox = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    p: 2,
    backgroundColor: "background.default",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}20 2px, transparent 2px)`,
        backgroundSize: "50px 50px",
        opacity: 0.3
    }
}));

export const StyledBox2 = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[8],
    padding: theme.spacing(5, 4),
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    // position:'absolute',
    // left:'50%',
    // top:'50%',
    // transform:'translate(-50%,-50%)',
}));

export default function Login(
    data: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n } = data;
    const { msgStr } = i18n;
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email obbligatoria"),
            password: Yup.string().required("Password obbligatoria")
        }),
        onSubmit: () => {
            // Submit del form a Keycloak
            const form = document.getElementById("kc-form-login") as HTMLFormElement;
            if (form) form.submit();
        }
    });

    return (
        <Stack alignItems={'center'} spacing={5}>
            <StyledBox>
                <Container maxWidth="sm">
                        <Box position="relative">
                      <PulsingBlob />
                      
                    <Paper
                        elevation={12}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            backgroundColor: "background.paper",
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
                        }}
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
                                Inserisci le tue credenziali per accedere alla
                                piattaforma.
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
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email && formik.errors.email
                                    }
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
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password && formik.errors.password
                                    }
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                        edge="end"
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
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
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

                        <Stack direction="row" justifyContent="center" alignItems={'center'} spacing={3} margin={3}>
                            <Typography variant="body1" color="text.primary">
                                {msgStr("noAccount")}
                            </Typography>
                            <Link
                                href="kcContext.url.registrationUrl"
                                variant="body2"
                                sx={{
                                    textAlign:'center',
                                    alignItems:'center',
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
                                        <Box
                                            component="svg"
                                            sx={{ width: 20, height: 20 }}
                                            viewBox="0 0 24 24"
                                        >
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
                                        <Box
                                            component="svg"
                                            sx={{ width: 20, height: 20 }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
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
                    </Paper>
                    </Box>
                </Container>
            </StyledBox>
        </Stack>
    );
}
