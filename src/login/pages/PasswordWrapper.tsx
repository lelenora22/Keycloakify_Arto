import { Stack, Button } from "@mui/material";
import { KcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <Stack direction="row" className={kcClsx("kcInputGroup")} >
            {children}
            <Button
                variant="outlined"
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2
                    }
                }}
            >
                {isPasswordRevealed ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>
        </Stack>
    );
}
export default PasswordWrapper