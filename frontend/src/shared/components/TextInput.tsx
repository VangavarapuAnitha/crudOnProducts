import React from "react";
import { cn } from "../utils/cn";
import { Asterisk } from "lucide-react";

interface ClassNames {
  input?: string;
  label?: string;
  error?: string;
}

interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  error?: string;
  value: string;
  classes?: ClassNames;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  placeholder,
  error,
  classes,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className={cn("text-sm flex items-center", classes?.label)}>
          {label}
          {required && <Asterisk color="red" size={10} />}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border rounded-sm p-2 border-gray-200 text-sm outline-none",
          classes?.input
        )}
      />
      {error && (
        <p className={cn("text-red-500 text-sm", classes?.error)}>{error}</p>
      )}
    </div>
  );
};

export default TextInput;
