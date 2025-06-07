import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "./form";
import { professorSchema } from "@/schemas/form-schema";
import { z } from "zod";

type ProfessorData = z.infer<typeof professorSchema>;

export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfessorData>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      nome: "",
      disciplinas_id: [],
      cpf: "",
      curso_id: [],
      data_admissao: "",
      status: "",
      email: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        curso_id: Array.isArray(initialData.curso_id) ? initialData.curso_id : [],
        disciplinas_id: Array.isArray(initialData.disciplinas_id)
          ? initialData.disciplinas_id
          : [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: ProfessorData) => {
    onSave({ ...data, id: initialData?.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Professor" : "Cadastrar Professor"}
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
              {initialData ? "Salvar Alterações" : "Cadastrar Professor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
