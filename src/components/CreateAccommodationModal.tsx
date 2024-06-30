import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useNotification from "../hooks/useNotification";
import { z } from "zod";
import { useService } from "../hooks/useService";
import postAccommodation from "../services/postAccomodation";
import { facilities } from "../pages/Facilities";

interface CreateAccommodationModalProps {
  closeModal: () => void;
}

const registerSchema = z.object({
  type: z.string().min(1, "Nome inválido"),
  beds: z.coerce.number().min(1, "Quantidade de camas inválida"),
  price: z.coerce.number().min(1, "Preço inválido"),
  photos: z
    .array(
      z.object({
        image: z.string().min(1, "Imagem inválida"),
      })
    )
    .min(1, "Insira pelo menos uma imagem"),
  description: z.string().min(1, "Descrição inválida"),
  facilities: z.array(z.string().min(1, "Facilidade inválida")).min(1, "Insira pelo menos uma facilidade"),
  guestCapacity: z.coerce.number().min(1, "Capacidade Inválida"),
});

type CreateAccommodationFormData = z.infer<typeof registerSchema>;

const CreateAccommodationModal: React.FC<CreateAccommodationModalProps> = ({ closeModal }) => {
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateAccommodationFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "photos",
  });

  function addNewPhoto() {
    append({
      image: "",
    });
  }

  const [isCreatingAccommodation, doCreateAccommodation] = useService(postAccommodation, {
    onData: () => {
      notification("success", "A acomodação foi cadastrada com sucesso");
      setTimeout(() => closeModal(), 2500);
    },
    onError: (error) => {
      notification("error", error.message);
    },
  });

  const onSubmit = useCallback((data: CreateAccommodationFormData) => {
    if (data) {
      const photos = data.photos.map((photo) => photo.image);
      console.log(data)
      doCreateAccommodation({ ...data, photos });
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-3/4 flex flex-col justify-between rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome da Acomodação</label>
            <input
              type="text"
              {...register("type")}
              className="w-full p-2 border rounded"
              placeholder="Digite o nome"
              disabled={isCreatingAccommodation}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <input
              type="text"
              {...register("description")}
              className="w-full p-2 border rounded"
              placeholder="Digite a descrição"
              disabled={isCreatingAccommodation}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade de camas</label>
            <input
              type="number"
              {...register("beds")}
              className="w-full p-2 border rounded"
              placeholder="Digite a quantidade de camas"
              disabled={isCreatingAccommodation}
            />
            {errors.beds && <p className="text-red-500 text-sm">{errors.beds.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacidade de Pessoas</label>
            <input
              type="number"
              {...register("guestCapacity")}
              className="w-full p-2 border rounded"
              placeholder="Adicione a capacidade"
              disabled={isCreatingAccommodation}
            />
            {errors.guestCapacity && <p className="text-red-500 text-sm">{errors.guestCapacity.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preço</label>
            <input
              type="number"
              {...register("price")}
              className="w-full p-2 border rounded"
              placeholder="Digite o preço"
              disabled={isCreatingAccommodation}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Facilidades</label>
            <select
              multiple
              {...register("facilities")}
              className="w-full p-2 border rounded"
              disabled={isCreatingAccommodation}
            >
              {facilities.map((facility) => (
                <option value={facility.name}>{facility.name}</option>
              ))}
            </select>
            {errors.facilities && <p className="text-red-500 text-sm">{errors.facilities.message}</p>}
          </div>
          <div className="mb-4">
            <label className="text-gray-700 flex justify-between">
              Fotos
              <button type="button" className="bg-green-500 text-white px-3 py-1 rounded-lg" onClick={addNewPhoto}>
                Adicionar Foto
              </button>
            </label>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`photos.${index}.image`)}
                    className="w-full p-2 border rounded my-1"
                    placeholder="Link da Imagem"
                    disabled={isCreatingAccommodation}
                  />
                  {errors.photos?.[index]?.image && (
                    <p className="text-red-500 text-sm">{errors.photos?.[index]?.image?.message}</p>
                  )}
                </div>
              );
            })}
            {errors.photos && <p className="text-red-500 text-sm">{errors.photos.message}</p>}
          </div>

          <div className="flex justify-end gap-5">
            <button type="button" className="bg-slate-400 px-3 py-1 text-white rounded-lg" onClick={closeModal}>
              Cancelar
            </button>
            <button
              className="bg-green-500 px-3 py-1 text-white rounded-lg"
              disabled={isCreatingAccommodation}
              type="submit"
            >
              Criar Acomodação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccommodationModal;
