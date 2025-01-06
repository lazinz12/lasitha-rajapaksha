import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CaseConverter } from "./CaseConverter";

interface CaseConverterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CaseConverterDialog = ({
  open,
  onOpenChange,
}: CaseConverterDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Case Converter Tool</DialogTitle>
        </DialogHeader>
        <CaseConverter />
      </DialogContent>
    </Dialog>
  );
};