import React, { useRef, useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

interface ClassNames {
  modalHeader?: string;
  modalBody?: string;
  modalFooter?: string;
}

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footerElement?: ReactNode;
  classes?: ClassNames;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  children,
  footerElement,
  classes,
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
        <div
          className={cn(
            "flex justify-between border-b px-4 pt-3 pb-2 border-gray-200 mb-2",
            classes?.modalHeader
          )}
        >
          <p>{title}</p>
          <X onClick={onClose} className="cursor-pointer" size={20} />
        </div>
        {/* Modal body*/}
        <div className={cn("overflow-y-auto px-4", classes?.modalBody)}>
          {children}
        </div>
        {/*Modal Footer*/}
        {footerElement && (
          <div
            className={cn(
              "text-end border-t pt-3 px-4 pb-2.5 border-gray-200",
              classes?.modalFooter
            )}
          >
            {footerElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
