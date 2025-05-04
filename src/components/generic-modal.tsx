import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  items?: string[];
}

export const GenericModal = ({
  open,
  onOpenChange,
  title,
  description,
  items,
}: GenericModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description && <DialogDescription>{description}</DialogDescription>}
        <ul className="space-y-2.5">
          {items?.map((item, index) => (
            <li
              key={index}
              className="border border-muted py-3 px-4 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
            >
              <span className="font-semibold">{item}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
