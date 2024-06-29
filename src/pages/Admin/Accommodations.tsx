import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Booking } from "../../types/Booking";

const Accomodations: React.FC = () => {
  const [accomodations, setAccomodations] = useState<Booking[]>([]);

  useEffect(() => {
    setAccomodations([
      { id: "oveborer32", accommodationId: "3f03jvr903rv", clientId: "rionsgoirj853", date: "28/02/2024" },
      { id: "f38459rvj3iocwel", accommodationId: "42894rjeitmrcd", clientId: "orijeiotjegr4", date: "14/06/2023" },
      { id: "3589gejtifddcs", accommodationId: "3905vrjofied", clientId: "rio3j5g89u38vr", date: "05/12/2022" },
    ]);
  }, []);
  
  return (
    <>
      <div className="h-[100px] py-20 bg-[#886023] w-full relative flex items-center justify-center font-bold text-white text-6xl">
        Lista de Acomodações
      </div>
      <div className="flex flex-col items-center justify-center min-h-[40vh] min-h-[40vh] py-[7.5vh]">
        <table className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
          <thead>
            <tr>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Data</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id do Cliente</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Id da Acomodação</th>
              <th
                className="border-collapse p-[10px] border border-[rgb(160 160 160)] flex items-center gap-2 cursor-pointer"
                onClick={() => alert("adicionar")}
              >
                Adicionar <IoIosAddCircleOutline size={30} />
              </th>
            </tr>
          </thead>
          <tbody>
            {accomodations.map((booking) => (
              <tr>
                <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.id}</td>
                <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.date}</td>
                <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.clientId}</td>
                <td className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
                  {booking.accommodationId}
                </td>
                <td className="border-collapse p-[10px] border-t border-[rgb(160 160 160)] flex items-center justify-center">
                  <FaRegEdit size={15} onClick={() => alert("editar")} className="cursor-pointer" />
                  <FaTrashAlt size={15} onClick={() => alert("deletar")} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Accomodations;
