import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { KcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../../i18n";
import { KcContext } from "../../KcContext";
import { Box, Checkbox } from "@mui/material";

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <Box className="form-group">
                <Box className={kcClsx("kcInputWrapperClass")}>
                    {msg("termsTitle")}
                    <Box id="kc-registration-terms-text">{msg("termsText")}</Box>
                </Box>
            </Box>
            <Box className="form-group">
                <Box className={kcClsx("kcLabelWrapperClass")}>
                    <Checkbox
                        id="termsAccepted"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        inputProps={{
                            "aria-invalid": messagesPerField.existsError("termsAccepted")
                        }}
                    />
                    <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </Box>
                {messagesPerField.existsError("termsAccepted") && (
                    <Box className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
}

export default TermsAcceptance;
