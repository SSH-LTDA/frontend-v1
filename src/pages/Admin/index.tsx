import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";

const Admin: React.FC = () => {
  return (
    <>
      <div className="h-[100px] py-20 bg-[#886023] w-full relative flex items-center justify-center font-bold text-white text-6xl">
          Página de Administrador
        </div>
      <div className="flex items-center justify-center py-[10vh] gap-10 text-2xl">
        <div
          className="cursor-pointer bg-white border-gray-400 border p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center"
          onClick={() => window.location.assign("/admin/bookings")}
        >
          <CiCalendarDate size={200} />
          Ver Reservas
        </div>
        <div
          className="cursor-pointer bg-white border-gray-400 border p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center"
          onClick={() => window.location.assign("/admin/rooms")}
        >
          <IoBedOutline size={200} />
          Ver Acomodações
        </div>
      </div>
    </>
  );
};

export default Admin;
