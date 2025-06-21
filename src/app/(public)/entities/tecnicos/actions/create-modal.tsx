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
import { z } from "zod";
import { tecnicoSchema } from "@/schemas/entities/tecnicoSchema";

type TecnicoData = z.infer<typeof tecnicoSchema>;

export function TecnicoModal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TecnicoData>({
    resolver: zodResolver(tecnicoSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      setor: "",
      email: "",
      telefone: "",
      status: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        nome: initialData.nome || "",
        cpf: initialData.cpf || "",
        setor: initialData.setor || "",
        email: initialData.email || "",
        telefone: initialData.telefone || "",
        status: initialData.status || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: TecnicoData) => {
    onSave({ ...data, id: initialData?.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Técnico" : "Cadastrar Técnico"}
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
              {initialData ? "Salvar Alterações" : "Cadastrar Técnico"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
