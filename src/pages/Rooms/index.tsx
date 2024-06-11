import React, { useState } from 'react';
import RoomCard from '../../components/RoomCard';


import domo1 from '../../assets/domo1.jpeg';
import domo2 from '../../assets/domo2.jpeg';
import domo3 from '../../assets/domo3.jpeg';
import charrua4 from '../../assets/charrua4.jpeg';
import charrua5 from '../../assets/charrua5.jpeg';
import charrua6 from '../../assets/charrua6.jpeg';
import suite7 from '../../assets/suite7.jpg';
import suite8 from '../../assets/suite8.jpg';
import suite9 from '../../assets/suite9.jpg';
import chale10 from '../../assets/chale10.jpg';
import chale11 from '../../assets/chale11.jpg';
import chale12 from '../../assets/chale12.jpg';
import cabana13 from '../../assets/cabana13.jpg';
import cabana14 from '../../assets/cabana14.jpg';
import cabana15 from '../../assets/cabana15.jpg';
import estacionamento16 from '../../assets/estacionamento16.jpg';
import estacionamento17 from '../../assets/estacionamento17.jpg';
import estacionamento18 from '../../assets/estacionamento18.jpg';

const rooms = [
  { title: 'Domo', images: [domo1, domo2, domo3], price: 590, beds: 1, guests: 3, description: 'Descrição do Domo', amenities: ['Wi-Fi', 'TV', 'Ducha', 'Ar-condicionado', 'Toalhas', 'Frigobar', 'Cozinha'] },
  { title: 'Charrua (Bus)', images: [charrua4, charrua5, charrua6], price: 490, beds: 1, guests: 2, description: 'Descrição do Charrua', amenities: ['Wi-Fi', 'TV', 'Ar-condicionado', 'Ducha', 'Banheira', 'Cozinha', 'Toalhas'] },
  { title: 'Suíte Com Cozinha', images: [suite7, suite8, suite9], price: 390, beds: 2, guests: 3, description: 'Descrição da Suíte', amenities: ['Wi-Fi', 'TV', 'Cozinha', 'Ar-condicionado', 'Toalhas'] },
  { title: 'Chalé Família', images: [chale10, chale11, chale12], price: 590, beds: 3, guests: 5, description: 'Descrição do Chalé', amenities: ['Wi-Fi', 'TV', 'Ar-condicionado', 'Cozinha', 'Toalhas'] },
  { title: 'Cabana', images: [cabana13, cabana14, cabana15], price: 490, beds: 2, guests: 3, description: 'Descrição da Cabana', amenities: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Toalhas', 'Cozinha'] },
  { title: 'Estacionamento Para Overlanders', images: [estacionamento16, estacionamento17, estacionamento18], price: 100, beds: 0, guests: 4, description: 'Descrição do Estacionamento', amenities: ['Wi-Fi', 'Ducha'] }
];

const Rooms: React.FC = () => {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCarouselChange = (roomIndex: number, imageIndex: number) => {
    setCurrentRoomIndex(roomIndex);
    setCurrentImageIndex(imageIndex);
  };

  const currentRoom = rooms[currentRoomIndex];
  const currentImage = currentRoom.images[currentImageIndex];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mt-2 mb-4">Rooms</h1>
      <p className="text-center mb-12">
        Each of our bright, light-flooded rooms come with everything you could possibly need for a comfortable stay. And yes,
        comfort isn’t our only objective, we also value good design, sleek contemporary furnishing complemented
        by the rich tones of nature’s palette as visible from our rooms’ sea-view windows and terraces.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} roomIndex={index} onCarouselChange={handleCarouselChange} />
        ))}
      </div>
      <p className="text-center mt-4">
        Vendo Atualmente: {currentRoom.title} - Imagem: {currentImage}
      </p>
    </div>
  );
};

export default Rooms;
