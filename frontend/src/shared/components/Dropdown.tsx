import React from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  label?: string;
  className?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  label,
  className,
  onChange,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 font-medium  text-sm">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-2 py-1 w-full text-sm border-gray-200 outline-none bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
