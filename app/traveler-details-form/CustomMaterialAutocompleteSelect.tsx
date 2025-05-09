// "use client";

// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// //---------------------------------------------------------------------------

// const CustomMaterialAutocompleteSelect = ({
//   values,
//   selected,
//   label,
//   set,
//   error,
// }: {
//   values: Array<any>;
//   selected: string;
//   label: string;
//   set: any;
//   error: boolean;
// }) => {
//   const selectedValue = values.find((v) => v.value === selected) || "";
//   return (
//     <Autocomplete
//       sx={{
//         flex: 1,
//         "& .MuiFormControl-root": {
//           "&:hover": {
//             backgroundColor: "white",
//           },
//           backgroundColor: "white",
//           borderRadius: 0,
//         },
//         "& .MuiInputBase-root": {
//           backgroundColor: "white",
//         },
//       }}
//       autoComplete
//       options={values}
//       renderInput={(params) => {
//         //params.inputProps.style = { fontSize: 13 };
//         return (
//           <TextField
//             variant="filled"
//             {...params}
//             label={label}
//             error={error}
//             slotProps={{
//               inputLabel: {
//                 shrink: true,
//               },
//             }}
//           />
//         );
//       }}
//       onChange={(e, value) => {
//         set(value?.value || "");
//       }}
//       getOptionLabel={(option) => {
//         const label = values.find((v: any) => v.value === option.value);
//         return label?.label || "";
//       }}
//       value={selectedValue}
//     />
//   );
// };

// export default CustomMaterialAutocompleteSelect;

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
  values: Array<{ label: string; value: unknown }>;
  label: string;
  error?: boolean;
  name: string;
  required?: boolean;
}) => {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  } | null>(null);

  return (
    <Autocomplete
      sx={{
        flex: 1,
        "& .MuiFilledInput-root": {
          // Target the FilledInput root
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white", // Ensure white on hover
          },
          "&.Mui-focused": {
            // Style when focused (optional)
            backgroundColor: "white",
          },
        },
      }}
      autoComplete
      options={values}
      renderInput={(params) => {
        return (
          <TextField
            variant="filled"
            {...params}
            label={label}
            error={error}
            required={required}
            name={name}
            slotProps={{
              inputLabel: {
                //shrink: true,
              },
            }}
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
            {selectedValue?.value === option.value && (
              <input type="hidden" name={name} value={option.value} />
            )}
          </li>
        );
      }}
    />
  );
};

export default CustomMaterialAutocompleteSelect;
