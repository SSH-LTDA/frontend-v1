import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Accommodation } from "../../types/Accommodation";
import getAccommodations from "../../services/getAccommodations";
import deleteAccommodation from "../../services/deleteAccomodation";
import DeleteModal from "../../components/DeleteModal";

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>();
  const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
  const [editAccommodationId, setEditAccommodationId] = useState<string>("");
  const [deleteAccommodationId, setDeleteAccommodationId] = useState<string>("");

  async function handleSetAccommodations() {
    const accommodations = await getAccommodations();
    setAccommodations(accommodations);
  }

  useEffect(() => {
    handleSetAccommodations();
  }, []);

  useEffect(() => {
    if (editAccommodationId) {
      setModalEditIsOpen(true);
    }

    if (deleteAccommodationId) {
      setModalDeleteIsOpen(true);
    }
  }, [editAccommodationId, deleteAccommodationId]);

  
  function handleDeleteAccommodation(id: string) {
    deleteAccommodation(id);
    setModalDeleteIsOpen(false);
    setDeleteAccommodationId("");
  }

  return (
    <>
      <div className="h-[100px] py-20 bg-[#886023] w-full relative flex items-center justify-center font-bold text-white text-6xl">
        Lista de Acomodações
      </div>
      <div className="flex flex-col items-center justify-center min-h-[40vh] py-[7.5vh]">
        <table className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
          <thead>
            <tr>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Tipo</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Tamanho</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Capacidade</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Facilidades</th>
              <th
                className="border-collapse p-[10px] border border-[rgb(160 160 160)] flex items-center gap-2 cursor-pointer"
                onClick={() => alert("adicionar")}
              >
                Adicionar <IoIosAddCircleOutline size={30} />
              </th>
            </tr>
          </thead>
          <tbody>
            {accommodations && accommodations.length > 0 ? (
              accommodations.map((accommodation) => (
                <tr>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{accommodation.id}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{accommodation.type}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{accommodation.size}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">
                    {accommodation.guestCapacity}
                  </td>
                  <td className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
                    {accommodation.facilities.map((facility) => (
                      <span>{facility}</span>
                    ))}
                  </td>
                  <td className="border-collapse p-[10px] border-t border-[rgb(160 160 160)] flex items-center justify-center">
                    <FaRegEdit
                      size={17}
                      onClick={() => setEditAccommodationId(accommodation.id)}
                      className="cursor-pointer"
                    />
                    <FaTrashAlt
                      size={17}
                      onClick={() => setDeleteAccommodationId(accommodation.id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <h4 className="p-3">Não foi possivel encontrar acomodações</h4>
            )}
          </tbody>
        </table>
      </div>
      {modalEditIsOpen && <h2>MODAL DE EDITAR</h2>}
      {modalDeleteIsOpen && (
        <DeleteModal
          id={deleteAccommodationId}
          deleteFunction={handleDeleteAccommodation}
          cancelButton={() => {
            setModalEditIsOpen(false);
            setEditAccommodationId("");
          }}
          text="Tem certeza que deseja deletar essa acomodação?"
        />
      )}
    </>
  );
};

export default Accommodations;
