import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "./form";
import { laboratorioSchema } from "@/schemas/form-schema";

type LaboratorioData = z.infer<typeof laboratorioSchema>;

export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<LaboratorioData>({
    resolver: zodResolver(laboratorioSchema),
    defaultValues: {
      nome: "",
      curso_id: [],
      equipamentos: {},
      capacidade: 0,
      bloco: "",
      predio: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset(
      initialData
        ? {
            ...initialData,
            equipamentos: initialData.equipamentos || {},
          }
        : {
            nome: "",
            curso_id: [],
            equipamentos: {},
            capacidade: 0,
            bloco: "",
            predio: "",
          }
    );
  }, [open, reset, initialData?.id]);

  const onSubmit = (data: LaboratorioData) => {
    onSave({ ...data, id: initialData?.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Laboratório" : "Cadastrar Laboratório"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormFields
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <div className="flex justify-end flex-wrap gap-2">
            {!initialData && (
              <Button variant="secondary" type="button" onClick={() => reset()}>
                Limpar campos
              </Button>
            )}

            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Cadastrar Laboratório"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
