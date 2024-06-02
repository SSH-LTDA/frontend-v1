import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FaTimes, FaBed, FaUser, FaWifi, FaTv, FaShower, FaSnowflake, FaCheck } from "react-icons/fa";
import { MdBathtub, MdLocalLaundryService } from "react-icons/md";
import { LuRefrigerator } from "react-icons/lu";
import { PiForkKnifeFill } from "react-icons/pi";

interface RoomDetailsModalProps {
  room: {
    title: string;
    images: string[];
    price: number;
    beds: number;
    guests: number;
    description: string;
    amenities: string[];
  };
  onClose: () => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-active">
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{room.title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FaTimes size={24} />
          </button>
        </div>
        <Carousel showThumbs={false}>
          {room.images.map((src, idx) => (
            <div key={idx}>
              <img src={src} alt={room.title} className="w-full h-auto" />
            </div>
          ))}
        </Carousel>
        <div className="mt-4">
          <p className="mb-4">{room.description}</p>
          <div className="flex items-center mb-4">
            <FaBed className="mr-2" /> {room.beds} camas
          </div>
          <div className="flex items-center mb-4">
            <FaUser className="mr-2" /> Acomoda {room.guests} pessoas
          </div>
          <h3 className="text-lg font-semibold mb-2">Esta acomodação contém:</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                {getAmenityIcon(amenity)} <span className="ml-2">{amenity}</span>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">Check-in e Check-out:</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2">Data de Check-in</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date: Date) => setCheckInDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Data de Check-out</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date: Date) => setCheckOutDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2">Hora de Check-in</label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Hora de Check-out</label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-[#886023] text-white px-4 py-2 rounded hover:bg-[#64491f] flex items-center"
          >
            <FaCheck className="mr-2" /> Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Wi-Fi":
      return <FaWifi />;
    case "TV":
      return <FaTv />;
    case "Ducha":
      return <FaShower />;
    case "Ar-condicionado":
      return <FaSnowflake />;
    case "Frigobar":
      return <LuRefrigerator />;
    case "Toalha":
      return <MdLocalLaundryService />;
    case "Cozinha":
      return <PiForkKnifeFill />;
      case "Banheira":
        return <MdBathtub />;
    default:
      return null;
  }
};

export default RoomDetailsModal;