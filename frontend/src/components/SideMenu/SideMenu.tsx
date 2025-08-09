import { RCSlider, DropDown } from "../../shared/components";
import { IndianRupee } from "lucide-react";
import { useSideMenu } from "./useSideMenu";
import { SelectCategories } from "../SelectCategories";

const sortOptions = [
  { label: "None", value: "" },
  { label: "Low to High", value: "asc" },
  { label: "High to Low", value: "desc" },
];

const SideMenu = () => {
  const { price, sortOrder, setSortOrder, setPrice } = useSideMenu();
  return (
    <div className="">
      {/*Price Range and Sort by price*/}
      <div className="flex flex-col w-full gap-4">
        {/*Price Range*/}
        <div className="flex-[65%] w-full">
          <div className="flex justify-between items-center">
            <label className="block mb-1 font-medium  text-sm">
              Price Range
            </label>
            <div className="flex items-center font-medium text-[12px]">
              <IndianRupee size={12} />
              {price[0]}
              -<IndianRupee size={12} />
              {price[1]}
            </div>
          </div>
          <div className="flex items-center sm:flex-row border w-full gap-4 px-4 py-1 rounded-lg border-gray-200 bg-white">
            <div className="flex-1">
              <RCSlider
                min={500}
                max={50000}
                onAfterChange={(values) => setPrice([values[0], values[1]])}
              />
            </div>
          </div>
        </div>
        {/*Sory by price*/}
        <div className="flex-[35%] w-full">
          <DropDown
            options={sortOptions}
            label="Sort by price"
            onChange={(val) =>
              setSortOrder(val === "" ? null : (val as "asc" | "desc"))
            }
            value={sortOrder ?? ""}
          />
        </div>
        {/*Choose category*/}
        <SelectCategories />
      </div>
    </div>
  );
};

export default SideMenu;
