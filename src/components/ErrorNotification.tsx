import React, { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

const ErrorNotification: FC<ErrorNotificationProps> = ({
  message,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-4 right-4 w-11/12 max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg flex items-center border-l-4 border-left-border-color p-4 space-x-4 z-50 transition-transform transform ${
        message ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-1">
        <p className="text-primary-font-color font-semibold">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="text-primary-font-color hover:text-red-700"
      >
        <XMarkIcon className="h-6 w-6" />
        <span className="sr-only">Close notification</span>
      </button>
    </div>
  );
};

export default ErrorNotification;
