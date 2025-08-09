import React from "react";

import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex gap-2 items-center cursor-pointer" onClick={onChange}>
      <div
        className={cn(
          "border w-4 h-4 flex items-center rounded-[3px]",
          checked && "bg-blue-950"
        )}
      >
        {checked && <Check color="white" />}
      </div>
      <label className="text-sm cursor-pointer">{label}</label>
    </div>
  );
};

export default Checkbox;
