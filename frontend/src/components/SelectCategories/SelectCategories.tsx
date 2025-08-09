import { ChevronDown, ChevronUp } from "lucide-react";
import { CheckboxGroup } from "../../shared/components/Checkbox";
import { useSelectCategories } from "./useSelectCategories";
import { cn } from "../../shared/utils/cn";

const SelectCategories = () => {
  const {
    options,
    selectedCategories,
    isOpen,
    setIsOpen,
    setSelectedCategories,
  } = useSelectCategories();

  return (
    <div>
      <label className="text-sm mb-1 font-medium"> Filter Categories</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border rounded-md py-1 pl-1 border-gray-200 justify-self-end w-full flex items-center justify-between cursor-pointer",
          isOpen && "rounded-b-[0px] border-b-0"
        )}
      >
        <span className=" text-sm pl-2">Select Categories</span>{" "}
        {/* optional text */}
        {!isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </div>

      {isOpen && (
        <div className="border rounded-b-md border-t-0 border-gray-200 pl-3 pt-1">
          <CheckboxGroup
            options={options}
            onChange={setSelectedCategories}
            defaultValues={selectedCategories}
          />
        </div>
      )}
    </div>
  );
};

export default SelectCategories;
