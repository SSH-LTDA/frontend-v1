import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Accommodation } from "../../types/Accommodation";
import getAccommodations from "../../services/getAccommodations";

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>();

  async function handleSetAccommodations() {
    const accommodations = await getAccommodations();
    setAccommodations(accommodations);
  }

  useEffect(() => {
    handleSetAccommodations();
  }, [accommodations]);

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
            {accommodations ? (
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
                    <FaRegEdit size={15} onClick={() => alert("editar")} className="cursor-pointer" />
                    <FaTrashAlt size={15} onClick={() => alert("deletar")} className="cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <h4 className="p-3">Não foi possivel encontrar acomodações</h4>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Accommodations;
