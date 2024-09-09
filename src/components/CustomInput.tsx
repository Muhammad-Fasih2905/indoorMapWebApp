import React from "react";
import { TextInputProps } from "../types/interfaces";
import colors from "../styles/colors";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InputField: React.FC<TextInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    required = false,
    conditionlabel = false,
    endText,
    className = "",
    name,
    type
}) => {
    const navigate = useNavigate()
    const handlenavigate = () => {
        navigate('/forget_password')
    }
    return (
        <div>
            <div className={`${className}`}>
                <div className="flex flex-row justify-between">
                    <Typography
                        variant="subtitle2"
                        className={`-mb-3 text-[14px] font-medium text-[${colors.textPrimary}]`}
                    >
                        {label}
                    </Typography>
                    {conditionlabel &&
                        <button
                            className={`text-[14px] text-end capitalize text-[#4BADDE] `}
                            onClick={handlenavigate}
                        >
                            {endText}
                        </button>
                    }
                </div>
                <input
                    required={required}
                    placeholder={placeholder}
                    className={`outline-none w-full rounded-[6px] p-3 border border-[${colors.borderGray}]/60 h-[50px] bg-[${colors.backgroundGray}]`}
                    value={value}
                    onChange={onChange}
                    name={name}
                    type={type}
                />
            </div>
        </div>
    );
};

export default InputField;
