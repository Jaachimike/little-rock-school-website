import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
} from "./CustomUIComponents";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleConfirm = () => {
    if (!showInput) {
      setShowInput(true);
    } else if (inputValue === "littlerockschools") {
      onConfirm();
      resetModal();
    }
  };

  const resetModal = () => {
    setInputValue("");
    setShowInput(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {!showInput ? (
            <p>
              Are you sure you want to delete this record? This action cannot be
              undone.
            </p>
          ) : (
            <>
              <p>Please type "littlerockschools" to confirm deletion:</p>
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="mt-2"
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetModal}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={showInput && inputValue !== "littlerockschools"}
          >
            {showInput ? "Delete" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
