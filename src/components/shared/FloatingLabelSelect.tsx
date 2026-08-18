import type {
    UseFormRegister,
    FieldValues,
    Path,
    UseFormWatch,
} from "react-hook-form";
import { googleSans } from "@/assets/fonts/font.google";
import {
    FormControl,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

type SelectOption = {
    value: string;
    label: string;
};

type FloatingLabelSelectProps<T extends FieldValues> = {
    name: Path<T>;
    text: string;
    watch: UseFormWatch<T>;
    register: UseFormRegister<T>;
    options: SelectOption[];
    className?: string;
    error?: boolean;
    success?: boolean;
};

const FloatingLabelSelect = <T extends FieldValues>({
    name,
    text,
    register,
    watch,
    options,
    className,
    error = false,
    success = false,
}: FloatingLabelSelectProps<T>) => {
    const value = watch(name);
    const isFloating = !!value;

    const borderVal = error
        ? "2px solid var(--danger)"
        : success
            ? "2px solid var(--success)"
            : "2px solid var(--input)";

    const field = register(name);

    const handleChange = (event: SelectChangeEvent) => {
        field.onChange(event);
    };

    const [open, setOpen] = useState(false);

    const openSelect = () => {
        setOpen(true);
    };

    return (
        <div
            onMouseDown={openSelect}
            className={`relative inline-flex h-15 w-full items-center rounded-lg ${className ?? ""
                }`}
            style={{
                border: borderVal,
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.06)",
                transition: "all 0.2s linear",
            }}
        >
            <label
                htmlFor={name}
                className={`
                pointer-events-none
                absolute
                left-4
                z-5
                bg-background
                px-1
                text-input-placeholder
                transition-all
                duration-200
                ${isFloating
                        ? "-top-3 text-[14px]"
                        : "top-1/2 -translate-y-1/2 text-[16px]"
                    }
            `}
            >
                {text}
            </label>

            <FormControl fullWidth>
                <Select
                    {...field}
                    id={name}
                    value={value ?? ""}
                    onChange={(event) => {
                        handleChange(event);
                        setOpen(false);
                    }}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    displayEmpty
                    variant="standard"
                    disableUnderline
                    MenuProps={{
                        slotProps: {
                            paper: {
                                sx: {
                                    maxHeight: 250,
                                },
                            },
                        },
                    }}
                    sx={{
                        height: "100%",
                        px: 2,
                        fontFamily: googleSans.style.fontFamily,
                        fontSize: "14.8px",
                        letterSpacing: "0.025em",

                        "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            padding: 0,
                            color: "var(--input-foreground)",
                        },

                        "& .MuiSelect-icon": {
                            color: "var(--input-placeholder)",
                            right: "12px",
                        },

                        "&:focus": {
                            background: "transparent",
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return "";
                        }

                        return (
                            options.find(
                                (option) => option.value === selected
                            )?.label ?? selected
                        );
                    }}
                >
                    <MenuItem value="" disabled>
                        Select {text.toLowerCase()}
                    </MenuItem>

                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default FloatingLabelSelect;