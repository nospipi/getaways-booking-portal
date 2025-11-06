"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomMaterialAutocompleteSelect = ({
  values,
  label,
  error = false,
  name, // Add name prop for form submission
  required = false,
}: {
  values: Array<{
    label: string;
    value: {
      name: string;
      iso: string;
      numeric: string;
      continent: string;
    };
  }>;
  label: string;
  error?: boolean;
  name: string;
  required?: boolean;
}) => {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: {
      name: string;
      iso: string;
      numeric: string;
      continent: string;
    };
  } | null>(null);

  return (
    <Autocomplete
      sx={{
        flex: 1,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#ffffff",
          fontSize: "clamp(14px, 3.5vw, 15px)",
          "& fieldset": {
            borderColor: "#e0e0e0",
            borderWidth: "1.5px",
          },
          "&:hover fieldset": {
            borderColor: "#1E90FF",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1E90FF",
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "clamp(13px, 3.5vw, 14px)",
          color: "#666666",
          "&.Mui-focused": {
            color: "#1E90FF",
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: "clamp(14px, 4vw, 16px) clamp(12px, 3.5vw, 14px)",
          color: "#1a1a1a",
        },
      }}
      autoComplete
      options={values}
      renderInput={(params) => {
        return (
          <TextField
            variant="outlined"
            {...params}
            label={label}
            error={error}
            required={required}
            name={name}
          />
        );
      }}
      onChange={(e, value) => {
        setSelectedValue(value);
      }}
      getOptionLabel={(option) => option.label || ""}
      value={selectedValue}
      // This ensures the selected value is submitted with the form
      renderOption={(props, option) => {
        // Extract the key from props to pass it directly
        const { key, ...otherProps } = props;
        return (
          <li key={key} {...otherProps}>
            {option.label}
            {selectedValue?.value?.iso === option?.value?.iso && (
              <input type="hidden" name={name} value={option.value.iso} />
            )}
          </li>
        );
      }}
    />
  );
};

export default CustomMaterialAutocompleteSelect;
