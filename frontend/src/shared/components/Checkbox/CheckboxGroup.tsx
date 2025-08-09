import { useState } from "react";

import Checkbox from "./Checkbox";

export interface Option {
  key: string;
  label: string;
}

interface Props {
  label?: string;
  options: Option[];
  onChange: (val: string[]) => void;
  defaultValues?: string[];
}

const CheckboxGroup = ({ label, options, onChange, defaultValues }: Props) => {
  const [checkedValues, setCheckedValues] = useState<Array<string>>(
    defaultValues || []
  );
  const handleChange = (key: string) => {
    let newValues: Array<string>;
    if (checkedValues.includes(key)) {
      newValues = checkedValues.filter((val: string) => {
        return val !== key;
      });
    } else {
      newValues = [...checkedValues, key];
    }
    setCheckedValues(newValues);
    onChange(newValues);
  };
  return (
    <div className="">
      {/* Label */}
      {label && <label>{label}</label>}

      {options.map((option: Option, index: number) => {
        return (
          <div key={index} className="mb-1">
            <Checkbox
              checked={checkedValues.includes(option.key)}
              onChange={() => handleChange(option.key)}
              label={option.label}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
