import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FormFields } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { disciplinaSchema } from "@/schemas/form-schema";
import type { z } from "zod";

type DisciplinaData = z.infer<typeof disciplinaSchema>;

export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DisciplinaData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      semestre: 0,
      area_tecnologica: "",
      qtd_aulas: 0,
      aulas_teoricas: 0,
      aulas_praticas: 0,
      modalidade: "Presencial",
      curso_id: [],
      professor: [],
    },
  });

  useEffect(() => {
    if (!open) return;

    reset(
      initialData
        ? {
            ...initialData,
            semestre: initialData.semestre.toString(),
            qtd_aulas: initialData.qtd_aulas.toString(),
            aulas_teoricas: initialData.aulas_teoricas.toString(),
            aulas_praticas: initialData.aulas_praticas.toString(),
          }
        : {
            nome: "",
            sigla: "",
            semestre: 0,
            area_tecnologica: "",
            qtd_aulas: 0,
            aulas_teoricas: 0,
            aulas_praticas: 0,
            modalidade: "Presencial",
            curso_id: [],
            professor: [],
          }
    );
  }, [open, reset, initialData]);

  const onSubmit = (data: DisciplinaData) => {
    const disciplina = {
      ...data,
      id: initialData?.id || 0,
    };
    onSave(disciplina);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Disciplina" : "Cadastrar Disciplina"}
          </DialogTitle>
        </DialogHeader>

        <FormFields
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => reset()}>
            Limpar Campos
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            {initialData ? "Salvar Alterações" : "Cadastrar Disciplina"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
