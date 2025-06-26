import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, styled, useTheme } from "@mui/material";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[800]}`,
}));
 

export default function Login(data: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
const {kcContext, i18n} = data;
    const { msgStr } = i18n;
    const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username obbligatorio"),
      password: Yup.string().required("Password obbligatoria"),
    }),
    onSubmit: () => {
      // Submit del form a Keycloak
      const form = document.getElementById("kc-form-login") as HTMLFormElement;
      if (form) form.submit();
    },
  });

  return (
    <StyledBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}

    >
      <Typography   variant="h5"
                fontWeight="bold"
                gutterBottom
                display={'flex'}
                justifyContent={'center'}
 >
        Login a {kcContext.realm.displayName ?? 'ARTO'}
      </Typography>

      <form
        id="kc-form-login"
        action={kcContext.url.loginAction}
        method="post"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <TextField
          fullWidth
          margin="normal"
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
          margin="normal"
          id="password"
          name="password"
          label={msgStr("password")}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          
        >
          {msgStr("doLogIn")}
        </Button>
      </form>
    </StyledBox>
  );
}
