import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";
import { cursoSchema } from "@/schemas/academic/cursoSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";

type CursoData = z.infer<typeof cursoSchema>;
export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CursoData>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      nome_curso: "",
      sigla: "",
      area_tecnologica: "",
      duracao_em_semestres: "0",
      periodo: undefined,
      modalidade: undefined,
      email_coordenador: "",
      forma_oferecimento: undefined,
    },
  });

  useEffect(() => {
    if (!open) return;

    reset(
      initialData
        ? {
            ...initialData,
            duracao_em_semestres: initialData.duracao_em_semestres.toString(),
          }
        : {
            nome_curso: "",
            sigla: "",
            area_tecnologica: "",
            duracao_em_semestres: "0",
            periodo: undefined,
            modalidade: undefined,
            email_coordenador: "",
            forma_oferecimento: undefined,
          }
    );
  }, [open, reset, initialData?.id]);

  const onSubmit = (data: CursoData) => {
    const finalData = {
      ...data,
      id: initialData?.id || 0,
    };
    onSave(finalData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Curso" : "Cadastrar Curso"}
          </DialogTitle>
        </DialogHeader>

        <FormFields
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <div className="flex justify-end gap-2">
          {!initialData && (
            <Button variant="secondary" onClick={() => reset()}>
              Limpar Campos
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            {initialData ? "Salvar Alterações" : "Cadastrar Curso"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
