"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogAdicionarAluno() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar Aluno</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Aluno</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
