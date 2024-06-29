import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Booking } from "../../types/Booking";
import getBookings from "../../services/getBookings";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  async function handleSetAccommodations() {
    const bookings = await getBookings();
    setBookings(bookings);
  }

  useEffect(() => {
    handleSetAccommodations();
  }, []);

  return (
    <>
      <div className="h-[100px] py-20 bg-[#886023] w-full relative flex items-center justify-center font-bold text-white text-6xl">
        Lista de Reservas
      </div>
      <div className="flex flex-col items-center justify-center min-h-[40vh] py-[7.5vh]">
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
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.id}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.date}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{booking.clientId}</td>
                  <td className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
                    {booking.accommodationId}
                  </td>
                  <td className="border-collapse p-[10px] border-t border-[rgb(160 160 160)] flex items-center justify-center gap-1">
                    <FaRegEdit size={17} onClick={() => alert("editar")} className="cursor-pointer" />
                    <FaTrashAlt size={17} onClick={() => alert("deletar")} className="cursor-pointer" />
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

export default Bookings;
