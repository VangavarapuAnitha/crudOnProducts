import React, { useRef, useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footerElement?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  children,
  footerElement,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Lock background scroll on mount, unlock on unmount
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  //Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000aa] z-50">
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white rounded-lg border shadow-md max-h-[90vh] flex flex-col"
        ref={ref}
      >
        {/*Modal Header*/}
        <div className="flex justify-between border-b px-4 pt-3 pb-2 border-gray-200 mb-2">
          <p>{title}</p>
          <X onClick={onClose} className="cursor-pointer" size={20} />
        </div>
        {/* Modal body*/}
        <div className="overflow-y-auto px-4">{children}</div>
        {/*Modal Footer*/}
        {footerElement && (
          <div className="text-end border-t pt-3 px-4 pb-2.5 border-gray-200">
            {footerElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
