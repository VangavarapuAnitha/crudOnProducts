import { cn } from "../utils/cn";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  className,

  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border bg-blue-950 text-white text-sm rounded-md p-1 w-20 hover:bg-blue-900 cursor-pointer",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
