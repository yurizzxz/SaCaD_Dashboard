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
import type { z } from "zod";
import { horarioAulaSchema } from "@/schemas/form-schema";

type HorarioAulaData = z.infer<typeof horarioAulaSchema>;

export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HorarioAulaData>({
    resolver: zodResolver(horarioAulaSchema),
    defaultValues: {
      sala: "",
      dia_semana: "Segunda-Feira",
      dia_numero: 0,
      mes: "01",
      hora_inicio: "",
      hora_fim: "",
      turma: "",
      disciplina: "",
      professor: [],
    },
  });

  useEffect(() => {
    if (!open) return;

    reset(
      initialData
        ? {
            ...initialData,
            dia_numero:
              typeof initialData.dia_numero === "number"
                ? initialData.dia_numero.toString()
                : initialData.dia_numero || "",
          }
        : {
            sala: "",
            dia_semana: "Segunda-Feira",
            dia_numero: "",
            mes: "01",
            hora_inicio: "",
            hora_fim: "",
            turma: "",
            disciplina: "",
            professor: [],
          }
    );
  }, [open, reset, initialData]);

  const onSubmit = (data: HorarioAulaData) => {
    const horario = {
      ...data,
      id: initialData?.id || 0,
    };
    onSave(horario);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Horário" : "Cadastrar Horário"}
          </DialogTitle>
        </DialogHeader>

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
          <Button onClick={handleSubmit(onSubmit)}>
            {initialData ? "Salvar Alterações" : "Cadastrar Horário"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
