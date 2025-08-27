import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GetQuoteForm from "@/components/get-quote-form";
import { Button } from "@/components/ui/button";

export default function GetQuoteModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-gradient-to-r from-orange-600 to-red-600 text-white">Get Quote</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
        </DialogHeader>
        <GetQuoteForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
} 