import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { coordenadorSchema } from "@/schemas/form-schema";

type CoordenadorData = z.infer<typeof coordenadorSchema>;

export function CoordenadorModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CoordenadorData>({
    resolver: zodResolver(coordenadorSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      curso_id: [],
      email: "",
      telefone: "",
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

  const onSubmit = (data: CoordenadorData) => {
    onSave({ ...data, id: initialData?.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Coordenador" : "Cadastrar Coordenador"}
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
              {initialData ? "Salvar Alterações" : "Cadastrar Coordenador"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
