import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaInfoCircle, FaDollarSign } from 'react-icons/fa';

interface Room {
  title: string;
  images: string[];
  price: number;
}

interface RoomCardProps {
  room: Room;
  onCarouselChange: (roomIndex: number, imageIndex: number) => void;
  roomIndex: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onCarouselChange, roomIndex }) => {
  const handleImageChange = (index: number) => {
    onCarouselChange(roomIndex, index);
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-full lg:w-5/5 mx-auto">
      <Carousel showThumbs={false} onChange={handleImageChange}>
        {room.images.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={room.title} className="w-full h-auto" />
          </div>
        ))}
      </Carousel>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{room.title}</h2>
        <div className="flex justify-between">
          <button className="flex items-center bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            <FaInfoCircle className="mr-1" />
            View details
          </button>
          <button className="flex items-center bg-[#886023] text-white px-3 py-1 rounded hover:bg-[#64491f]">
            <FaDollarSign className="mr-1" />
            {room.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
