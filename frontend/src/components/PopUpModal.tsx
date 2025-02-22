import React, { useRef } from "react";
import { X } from "lucide-react";

interface PopupModalProps {
  message: string | null;
  onClose: () => void;
}

export default function PopupModal({ message, onClose }: PopupModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close only if clicked outside the modal content
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 backdrop-blur-lg bg-white/30 flex items-center justify-center transition-all duration-300 ease-in-out"

    >
      <div className="bg-gray-800 rounded-xl px-10 py-8 flex flex-col gap-4 items-center mx-4 w-11/12 md:w-2/3 lg:w-1/3">
        <button onClick={onClose} className="self-end text-white">
          <X size={30} />
        </button>
        <h1 className="text-2xl font-extrabold text-white">Can't Signup!</h1>
        <p className="text-lg font-medium text-center text-white">{message}</p>
      </div>
    </div>
  );
}
