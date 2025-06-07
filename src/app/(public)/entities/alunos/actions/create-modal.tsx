import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "./form";
import { alunoSchema } from "@/schemas/form-schema";
import { z } from "zod";

type AlunoData = z.infer<typeof alunoSchema>;

export function AlunoModal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AlunoData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      curso_id: [],
      status: "",
      semestre: "",
      email: "",
      telefone: "",
      endereco: "",
      data_nascimento: "",
      data_matricula: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        curso_id: Array.isArray(initialData.curso_id)
          ? initialData.curso_id
          : [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: AlunoData) => {
    onSave({ ...data, id: initialData?.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Aluno" : "Cadastrar Aluno"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormFields
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Cadastrar Aluno"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
