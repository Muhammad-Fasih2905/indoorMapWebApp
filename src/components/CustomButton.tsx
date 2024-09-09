import React from "react";
import { ButtonProps } from "../types/interfaces";
import colors from "../styles/colors";

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-[#0A1435] text-[#fff] capitalize font-medium md:text-[14px] text-{${colors.white}} md:w-[130px] w-[120px] rounded-[6px] shadow-lg opacity-100 mb-3 md:mb-0 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {children}
        </button>
    );
};
export default Button;
