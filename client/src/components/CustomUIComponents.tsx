import React, {ReactNode} from "react";

// Custom Dialog Components
export const Dialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}> = ({open, onOpenChange, children}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{children: ReactNode}> = ({children}) => (
  <div className="p-6">{children}</div>
);

export const DialogHeader: React.FC<{children: ReactNode}> = ({children}) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle: React.FC<{children: ReactNode}> = ({children}) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const DialogFooter: React.FC<{children: ReactNode}> = ({children}) => (
  <div className="mt-6 flex justify-end space-x-2">{children}</div>
);

// Custom Button Component
export const Button: React.FC<{
  variant?: "default" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}> = ({variant = "default", onClick, disabled, children}) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === "outline"
        ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
        : "bg-blue-500 text-white hover:bg-blue-600"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Custom Input Component
export const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({value, onChange, className}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
  />
);
