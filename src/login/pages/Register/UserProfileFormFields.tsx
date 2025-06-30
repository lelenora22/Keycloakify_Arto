import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    MenuItem,
    Radio,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import type { Attribute, KcContext } from "keycloakify/login/KcContext";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    getButtonToDisplayForMultivaluedAttributeField,
    useUserProfileForm,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import { assert } from "keycloakify/tools/assert";
import { Fragment, useEffect } from "react";
import { I18n } from "../../i18n";
import PasswordWrapper from "../PasswordWrapper";


export type UserProfileFormFieldsProps<KcContext = any, I18n = any> = {
    kcContext: Extract<KcContext, {
        profile: unknown;
    }>;
    i18n: I18n;
    kcClsx: KcClsx;
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    doMakeUserConfirmPassword: boolean;
    BeforeField?: (props: BeforeAfterFieldProps<I18n>) => React.ReactElement<any, any> | null;
    AfterField?: (props: BeforeAfterFieldProps<I18n>) => React.ReactElement<any, any> | null;
};
type BeforeAfterFieldProps<I18n> = {
    attribute: Attribute;
    dispatchFormAction: React.Dispatch<FormAction>;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
    kcClsx: KcClsx;
    i18n: I18n;
};
export { };



export default function UserProfileFormFields(
    props: UserProfileFormFieldsProps<KcContext, I18n>
) {
    const {
        kcContext,
        i18n,
        kcClsx,
        onIsFormSubmittableValueChange,
        doMakeUserConfirmPassword,
        BeforeField,
        AfterField
    } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <Stack gap={5}>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel
                            attribute={attribute}
                            groupNameRef={groupNameRef}
                            i18n={i18n}
                            kcClsx={kcClsx}
                        />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <FormControl
                            className={kcClsx("kcFormGroupClass")}
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ||
                                    (attribute.name === "password-confirm" &&
                                        !doMakeUserConfirmPassword)
                                        ? "none"
                                        : undefined
                            }}
                            fullWidth            
                        >

                            <Stack className={kcClsx("kcInputWrapperClass")} >
                                {attribute.annotations.inputHelperTextBefore && (
                                    <FormHelperText
                                        className={kcClsx("kcInputHelperTextBeforeClass")}
                                        id={`form-help-text-before-${attribute.name}`}
                                    >
                                    {advancedMsg(
                                            attribute.annotations.inputHelperTextBefore
                                        )}
                                    </FormHelperText>
                                )}

                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                                <FieldErrors
                                    attribute={attribute}
                                    displayableErrors={displayableErrors}
                                    kcClsx={kcClsx}
                                    fieldIndex={undefined}
                                />
                                {attribute.annotations.inputHelperTextAfter !==
                                    undefined && (
                                    <FormHelperText
                                        className={kcClsx("kcInputHelperTextAfterClass")}
                                        id={`form-help-text-after-${attribute.name}`}
                                    >
                                        {advancedMsg(
                                            attribute.annotations.inputHelperTextAfter
                                        )}
                                    </FormHelperText>
                                )}
                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </Stack>
                        </FormControl>
                    </Fragment>
                );
            })}
        </Stack>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;
    if (attribute.group?.name === groupNameRef.current) {
        return null;
    }

    groupNameRef.current = attribute.group?.name ?? "";

    if (!groupNameRef.current || attribute.group === undefined) {
        return null;
    }

    return (
        <FormGroup
            className={kcClsx("kcFormGroupClass")}
            {...Object.fromEntries(
                Object.entries(attribute.group.html5DataAnnotations).map(
                    ([key, value]) => [`data-${key}`, value]
                )
            )}
        >
            <Box className={kcClsx("kcContentWrapperClass")}>
                <Typography
                    id={`header-${attribute.group.name}`}
                    className={kcClsx("kcFormGroupHeader")}
                    variant="h6" // puoi usare anche "subtitle1" se più leggero
                    component="h2"
                >
                    {attribute.group.displayHeader
                        ? advancedMsg(attribute.group.displayHeader)
                        : attribute.group.name}
                </Typography>
            </Box>

            {attribute.group.displayDescription && (
                <Box className={kcClsx("kcLabelWrapperClass")}>
                    <Typography
                        id={`description-${attribute.group.name}`}
                        className={kcClsx("kcLabelClass")}
                        variant="body2"
                        component="p"
                    >
                        {advancedMsg(attribute.group.displayDescription)}
                    </Typography>
                </Box>
            )}
        </FormGroup>
    );
}

function FieldErrors(props: {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
    kcClsx: KcClsx;
}) {
    const { attribute, fieldIndex, kcClsx } = props;

    const displayableErrors = props.displayableErrors.filter(
        error => error.fieldIndex === fieldIndex
    );

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <Typography
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            className={kcClsx("kcInputErrorMessageClass")}
            aria-live="polite"
            color="error"
            variant="body2"
            component="div"
            sx={{ mt: 0.5 }}
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}
>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
        </Typography>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
        // sometimes in the future it might.
        case "hidden":
            return <input type="hidden" name={attribute.name} value={valueOrValues} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    
                    <PasswordWrapper
                        kcClsx={props.kcClsx}
                        i18n={props.i18n}
                        passwordInputId={attribute.name}
                    >
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const {
        attribute,
        fieldIndex,
        kcClsx,
        dispatchFormAction,
        valueOrValues,
        i18n,
        displayableErrors
    } = props;

    const { advancedMsgStr } = i18n;

    return (
        <>
            <TextField
                fullWidth
                variant="outlined"
                type={(() => {
                    const { inputType } = attribute.annotations;
                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }
                    return inputType ?? "text";
                })()}
                label= {`${advancedMsgStr(attribute.displayName ?? "")}${attribute.required && " *"}`}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }
                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })()}
                className={kcClsx("kcInputClass")}
                error={
                    displayableErrors.find(error => error.fieldIndex === fieldIndex) !==
                    undefined
                }
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined
                        ? undefined
                        : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                inputProps={{
                    pattern: attribute.annotations.inputTypePattern,
                    size:
                        attribute.annotations.inputTypeSize === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeSize}`),
                    maxLength:
                        attribute.annotations.inputTypeMaxlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                    minLength:
                        attribute.annotations.inputTypeMinlength === undefined
                            ? undefined
                            : parseInt(`${attribute.annotations.inputTypeMinlength}`),
                    max: attribute.annotations.inputTypeMax,
                    min: attribute.annotations.inputTypeMin,
                    step: attribute.annotations.inputTypeStep,
                    ...Object.fromEntries(
                        Object.entries(attribute.html5DataAnnotations ?? {}).map(
                            ([key, value]) => [`data-${key}`, value]
                        )
                    ),
                    "aria-invalid":
                        displayableErrors.find(
                            error => error.fieldIndex === fieldIndex
                        ) !== undefined
                }}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);
                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }
                                    return value;
                                });
                            }
                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
                
                
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                return (
                    <>
                        <FieldErrors
                            attribute={attribute}
                            kcClsx={kcClsx}
                            displayableErrors={displayableErrors}
                            fieldIndex={fieldIndex}
                        />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
        attribute,
        values,
        fieldIndex
    });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <>
            {hasRemove && (
                <>
                    <Button
                        id={`kc-remove${idPostfix}`}
                        type="button"
                        className="pf-c-button pf-m-inline pf-m-link"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
                        variant="text"
                        size="small"
                    >
                        {msg("remove")}
                    </Button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    className="pf-c-button pf-m-inline pf-m-link"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                    variant="text"
                    size="small"
                >
                    {msg("addValue")}
                </Button>
            )}
        </>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, i18n, valueOrValues } = props;

    const { classBox, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;

        assert(
            inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes"
        );

        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classBox: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classBox: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (
                attribute.validators as Record<string, { options?: string[] }>
            )[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        <FormGroup>
            {options.map(option => {
                const checked =
                    valueOrValues instanceof Array
                        ? valueOrValues.includes(option)
                        : valueOrValues === option;

                const commonProps = {
                    id: `${attribute.name}-${option}`,
                    name: attribute.name,
                    value: option,
                    className: classInput,
                    "aria-invalid": props.displayableErrors.length !== 0,
                    disabled: attribute.readOnly,
                    checked,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: (() => {
                                const isChecked = event.target.checked;
                                if (
                                    inputType === "checkbox" &&
                                    valueOrValues instanceof Array
                                ) {
                                    const newValues = [...valueOrValues];
                                    if (isChecked) {
                                        newValues.push(option);
                                    } else {
                                        newValues.splice(newValues.indexOf(option), 1);
                                    }
                                    return newValues;
                                }
                                return isChecked ? option : "";
                            })()
                        }),
                    onBlur: () =>
                        dispatchFormAction({
                            action: "focus lost",
                            name: attribute.name,
                            fieldIndex: undefined
                        })
                };

                return (
                    <Box key={option} className={classBox}>
                        <FormControlLabel
                            control={
                                inputType === "radio" ? (
                                    <Radio {...commonProps} />
                                ) : (
                                    <Checkbox {...commonProps} />
                                )
                            }
                            label={inputLabel(i18n, attribute, option)}
                            className={`${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}`}
                            htmlFor={`${attribute.name}-${option}`}
                        />
                    </Box>
                );
            })}
        </FormGroup>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } =
        props;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;

    return (
        <TextField
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            label={attribute.name}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiline
            fullWidth
            variant="outlined"
            minRows={
                attribute.annotations.inputTypeRows === undefined
                    ? undefined
                    : parseInt(`${attribute.annotations.inputTypeRows}`)
            }
            maxRows={
                attribute.annotations.inputTypeRows === undefined
                    ? undefined
                    : parseInt(`${attribute.annotations.inputTypeRows}`)
            }
            inputProps={{
                maxLength:
                    attribute.annotations.inputTypeMaxlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                cols:
                    attribute.annotations.inputTypeCols === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeCols}`)
            }}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const {
        attribute,
        dispatchFormAction,
        kcClsx,
        displayableErrors,
        i18n,
        valueOrValues
    } = props;

    const isMultiple = attribute.annotations.inputType === "multiselect";

    const inputTypeSize = attribute.annotations.inputTypeSize
        ? parseInt(`${attribute.annotations.inputTypeSize}`)
        : undefined;

    // Mappa inputTypeSize in "small" o "medium"
    const muiSize =
        inputTypeSize !== undefined && inputTypeSize <= 2 ? "small" : "medium";

    // Usa inputTypeSize per calcolare l'altezza massima menu (esempio altezza riga * n)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const maxMenuHeight = inputTypeSize
        ? ITEM_HEIGHT * inputTypeSize + ITEM_PADDING_TOP
        : ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: maxMenuHeight,
                width: "100%" // o qualsiasi larghezza vuoi
            }
        }
    };

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            assert(typeof inputOptionsFromValidation === "string");

            const validator = (
                attribute.validators as Record<string, { options?: string[] }>
            )[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        //tectfied type select
        <Select
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            value={valueOrValues}
            size={muiSize}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (isMultiple) {
                            return Array.from(event.target.value as string[]);
                        }
                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
            fullWidth
            displayEmpty={!isMultiple}
            renderValue={selected =>
                !isMultiple && (!selected || selected === "") ? (
                    <span>&nbsp;</span>
                ) : Array.isArray(selected) ? (
                    selected.join(", ")
                ) : (
                    selected
                )
            }
            MenuProps={MenuProps} // <-- qui l'altezza massima dropdown è basata su inputTypeSize
        >
            {!isMultiple && (
                <MenuItem value="">
                    <em></em>
                </MenuItem>
            )}
            {options.map(option => (
                <MenuItem key={option} value={option}>
                    {inputLabel(i18n, attribute, option)}
                </MenuItem>
            ))}
        </Select>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(
            `${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`
        );
    }

    return option;
}
