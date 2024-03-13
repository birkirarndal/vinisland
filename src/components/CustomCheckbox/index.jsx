import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

const Status = {
    INCLUDE: "include",
    EXCLUDE: "exclude",
    NEUTRAL: "neutral",
};

export const CustomCheckbox = ({ label, name, handleFilterChange }) => {
    const [status, setStatus] = useState(Status.NEUTRAL);

    const handleChange = () => {
        const nextState =
            status === Status.NEUTRAL
                ? Status.INCLUDE
                : status === Status.INCLUDE
                ? Status.EXCLUDE
                : Status.NEUTRAL;
        setStatus(nextState);
        console.log({ name, label, status: nextState });
        handleFilterChange(name, label, nextState);
    };

    const getCheckboxContent = () => {
        switch (status) {
            case Status.INCLUDE:
                return "✓";
            case Status.EXCLUDE:
                return "✕";
            default:
                return "";
        }
    };

    return (
        <div className="checkbox-container" onClick={handleChange}>
            <div onClick={handleChange} className="checkbox">
                <span>{getCheckboxContent()}</span>
            </div>
            <div>
                <label className="checkbox-label">{label}</label>
            </div>
        </div>
    );
};
