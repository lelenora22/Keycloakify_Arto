import { Typography, Grid, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { useFormik } from "formik";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";
import * as Yup from "yup";


export default function Register(data: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
const {kcContext, i18n} = data;
    const { msgStr } = i18n;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Nome obbligatorio"),
      lastName: Yup.string().required("Cognome obbligatorio"),
      email: Yup.string().email("Email non valida").required("Email obbligatoria"),
      username: Yup.string().required("Username obbligatorio"),
      password: Yup.string().required("Password obbligatoria"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Le password non corrispondono")
        .required("Conferma password obbligatoria"),
    }),
    onSubmit: () => {
      const form = document.getElementById("kc-register-form") as HTMLFormElement;
      if (form) form.submit();
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        {msgStr("registerTitle")} {kcContext.realm.displayName ?? "ARTO"}
      </Typography>

      <form
        id="kc-register-form"
        action={kcContext.url.registrationAction}
        method="post"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", maxWidth: 500 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label={msgStr("firstName")}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label={msgStr("password")}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label={msgStr("passwordConfirm") || "Conferma Password"}
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {msgStr("doRegister")}
        </Button>
      </form>
    </Box>
  );
}
