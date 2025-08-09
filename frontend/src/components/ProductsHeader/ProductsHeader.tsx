import React from "react";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { Button, TextInput } from "../../shared/components";
import { useProductsHeader } from "./useProductsHeader";

interface Props {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const ProductsHeader: React.FC<Props> = ({ isMenuOpen, onMenuToggle }) => {
  const { search, setSearch, setOpenProductForm } = useProductsHeader();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-xl font-semibold text-blue-950">Welcome</div>
        </div>

        {/* Search + Add Button */}
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 w-full sm:w-auto sm:items-center">
          {/* Search box */}
          <div className="flex items-center border rounded-lg p-2 gap-2 border-gray-200 bg-white w-full sm:w-80">
            <TextInput
              name="search"
              value={search}
              onChange={(val: string) => setSearch(val)}
              placeholder="Search by product name"
              classes={{
                input: "border-none p-0 w-full",
              }}
            />
            <SearchIcon color="gray" />
          </div>

          {/* Add button */}
          <Button
            label="Add"
            onClick={() =>
              setOpenProductForm({
                show: true,
                initialData: null,
              })
            }
            className="w-full sm:w-28 h-10 rounded-[7px]"
          />
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;
