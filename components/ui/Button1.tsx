import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // Add the disabled property
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // Pass the disabled property to the native button
      style={{
        padding: "10px 15px",
        margin: "5px",
        border: "1px solid #ccc",
        backgroundColor: disabled ? "#f0f0f0" : "#f9f9f9",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.3s",
      }}
    >
      {label}
    </button>
  );
};

export default Button;