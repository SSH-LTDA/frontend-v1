import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useNotification from "../hooks/useNotification";
import { useService } from "../hooks/useService";
import { facilities } from "../pages/Facilities";
import getAccommodationById from "../services/getAccommodationById";
import putAccommodation from "../services/putAccommodation";
import { Accommodation } from "../types/Accommodation";

interface EditAccommodationModalProps {
	accommodationId: string;
	closeModal: () => void;
}

const registerSchema = z.object({
	id: z.string().min(1, "ID inválido"),
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

type EditAccommodationFormData = z.infer<typeof registerSchema>;

const EditAccommodationModal: React.FC<EditAccommodationModalProps> = ({ accommodationId, closeModal }) => {
	const notification = useNotification();
	const [defaultAccommodation, setDefaultAccommodation] = useState<Accommodation>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<EditAccommodationFormData>({
		resolver: zodResolver(registerSchema),
	});

	const { append } = useFieldArray({
		control,
		name: "photos",
	});

	function addNewPhoto() {
		append({
			image: "",
		});
	}

	const [isEdittingAccommodation, doEditAccommodation] = useService(putAccommodation, {
		onData: () => {
			notification("success", "A acomodação foi editada com sucesso");
			setTimeout(() => closeModal(), 2500);
		},
		onError: (error) => {
			notification("error", error.message);
		},
	});

	const [isGettingAccommodation, doGetAccommodation] = useService(getAccommodationById, {
		onData: (data: Accommodation) => {
			setDefaultAccommodation(data);
		},
		onError: (error) => {
			notification("error", error.message);
		},
	});

	useEffect(() => {
		doGetAccommodation(accommodationId);
	}, []);

	const onSubmit = useCallback((data: EditAccommodationFormData) => {
		if (data) {
			const photos = data.photos.map((photo) => photo.image);
			doEditAccommodation({ id: accommodationId, data: { ...data, photos } });
		}
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white h-3/4 flex flex-col justify-between rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
				{isGettingAccommodation ? (
					<span>Carregando...</span>
				) : defaultAccommodation ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label className="block text-gray-700">Id</label>
							<input
								type="text"
								{...register("id")}
								defaultValue={defaultAccommodation.id}
								className="w-full p-2 border rounded"
								disabled
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Nome da Acomodação</label>
							<input
								type="text"
								{...register("type")}
								defaultValue={defaultAccommodation.type}
								className="w-full p-2 border rounded"
								placeholder="Digite o nome"
								disabled={isEdittingAccommodation}
							/>
							{errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Descrição</label>
							<input
								type="text"
								{...register("description")}
								defaultValue={defaultAccommodation.description}
								className="w-full p-2 border rounded"
								placeholder="Digite a descrição"
								disabled={isEdittingAccommodation}
							/>
							{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Quantidade de camas</label>
							<input
								type="number"
								{...register("beds")}
								className="w-full p-2 border rounded"
								defaultValue={defaultAccommodation.beds}
								placeholder="Digite a quantidade de camas"
								disabled={isEdittingAccommodation}
							/>
							{errors.beds && <p className="text-red-500 text-sm">{errors.beds.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Capacidade de Pessoas</label>
							<input
								type="number"
								{...register("guestCapacity")}
								defaultValue={defaultAccommodation.guestCapacity}
								className="w-full p-2 border rounded"
								placeholder="Adicione a capacidade"
								disabled={isEdittingAccommodation}
							/>
							{errors.guestCapacity && <p className="text-red-500 text-sm">{errors.guestCapacity.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Preço</label>
							<input
								type="number"
								{...register("price")}
								className="w-full p-2 border rounded"
								defaultValue={defaultAccommodation.price}
								placeholder="Digite o preço"
								disabled={isEdittingAccommodation}
							/>
							{errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Facilidades</label>
							<select
								multiple
								{...register("facilities")}
								defaultValue={defaultAccommodation.facilities}
								className="w-full p-2 border rounded"
								disabled={isEdittingAccommodation}
							>
								{Object.entries(facilities).map(([key, value]) => (
									<option key={key} value={key}>
										{value.name}
									</option>
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
							{defaultAccommodation.photos.map((field, index) => {
								return (
									<div key={field}>
										<input
											type="text"
											{...register(`photos.${index}.image`)}
											className="w-full p-2 border rounded my-1"
											placeholder="Link da Imagem"
											disabled={isEdittingAccommodation}
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
								disabled={isEdittingAccommodation}
								type="submit"
							>
								Editar Acomodação
							</button>
						</div>
					</form>
				) : (
					<span>Desculpe, não foi possível encontrar essa acomodação</span>
				)}
			</div>
		</div>
	);
};

export default EditAccommodationModal;
