import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard";
import { useService } from "../../hooks/useService.ts";
import useNotification from "../../hooks/useNotification.ts";
import BookingService from "../../services/BookingService.ts";
import { useAuth } from "../../contexts/AuthContext.tsx";

const rooms = [
  {
    id: "844b9b24-cdf9-4cad-b7fc-1126092bd50b",
    title: "Domo",
    images: [
      "https://static.wixstatic.com/media/b87f83_0db328063a8c4b4ea1bb3dff437e8e46~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_0db328063a8c4b4ea1bb3dff437e8e46~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_e89ecfdd2aa84fa0812f6c8789225f20~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_e89ecfdd2aa84fa0812f6c8789225f20~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_928e441d10b74b3ba45cf455e8c12b0e~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_928e441d10b74b3ba45cf455e8c12b0e~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_3984ca8f5d97472ebe0f78082100ec3a~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_3984ca8f5d97472ebe0f78082100ec3a~mv2.jpeg",
    ],
    price: 590,
    beds: 1,
    guests: 3,
    description: "Descrição do Domo",
    amenities: ["wifi", "tv", "ducha", "arCondicionado", "toalhas", "frigobar", "cozinha"],
  },
  {
    id: 2,
    title: "Charrua (Bus)",
    images: [
      "https://static.wixstatic.com/media/b87f83_5580c08771c841089ccc440a82c2f298~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_5580c08771c841089ccc440a82c2f298~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_c72880f87ec948868f23310a25b1a518~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_c72880f87ec948868f23310a25b1a518~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_5a54d8612da145a99bb18d7b3a22ff73~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_5a54d8612da145a99bb18d7b3a22ff73~mv2.jpeg",
      "https://static.wixstatic.com/media/b87f83_61cd9f30603c4c0782d0dd8d262c0fcb~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_61cd9f30603c4c0782d0dd8d262c0fcb~mv2.jpeg",
    ],
    price: 490,
    beds: 1,
    guests: 2,
    description: "Descrição do Charrua",
    amenities: ["wifi", "tv", "arCondicionado", "ducha", "banheira", "cozinha", "toalhas"],
  },
  {
    id: 3,
    title: "Suíte Com Cozinha",
    images: [
      "https://static.wixstatic.com/media/b87f83_bfc66e6435f34c23bfd60e2fccb3d499~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_bfc66e6435f34c23bfd60e2fccb3d499~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_3b4acd8d82e342469093e71fb29a3632~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_3b4acd8d82e342469093e71fb29a3632~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_de7918ffcf3947b6ba9b21ff2c56c40c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_de7918ffcf3947b6ba9b21ff2c56c40c~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_0ba13b9dfa2c42058f578180254fbed8~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_0ba13b9dfa2c42058f578180254fbed8~mv2.jpg",
    ],
    price: 390,
    beds: 2,
    guests: 3,
    description: "Descrição da Suíte",
    amenities: ["wifi", "tv", "cozinha", "arCondicionado", "toalhas"],
  },
  {
    id: 4,
    title: "Chalé Família",
    images: [
      "https://static.wixstatic.com/media/b87f83_d943676e56f24781b4aad20256b75eef~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_d943676e56f24781b4aad20256b75eef~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_f06e8eb7ad634e22bd69badcc538be73~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_f06e8eb7ad634e22bd69badcc538be73~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_d3ae7c6f22ea4579bad3396eea56224f~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_d3ae7c6f22ea4579bad3396eea56224f~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg",
    ],
    price: 590,
    beds: 3,
    guests: 5,
    description: "Descrição do Chalé",
    amenities: ["wifi", "tv", "arCondicionado", "cozinha", "toalhas"],
  },
  {
    id: 5,
    title: "Cabana",
    images: [
      "https://static.wixstatic.com/media/b87f83_23a56936773e4f7f812d0543c078138c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_23a56936773e4f7f812d0543c078138c~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_1f34bed210534eb2a8b788773ee8cbdf~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_1f34bed210534eb2a8b788773ee8cbdf~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_aa9428b24cc74f5ab33e6b9ab8792361~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_aa9428b24cc74f5ab33e6b9ab8792361~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_760d26da720349d383ddf9d888fc180c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_760d26da720349d383ddf9d888fc180c~mv2.jpg",
    ],
    price: 490,
    beds: 2,
    guests: 3,
    description: "Descrição da Cabana",
    amenities: ["wifi", "arCondicionado", "tv", "toalhas", "cozinha"],
  },
  {
    id: 5,
    title: "Estacionamento Para Overlanders",
    images: [
      "https://static.wixstatic.com/media/b87f83_f4b318355c704575a4a6917c1a2f7401~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_f4b318355c704575a4a6917c1a2f7401~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_1af509ade7ad46cc86b69b10fe2cd6c5~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_1af509ade7ad46cc86b69b10fe2cd6c5~mv2.jpg",
      "https://static.wixstatic.com/media/b87f83_89da331062774e919f434b54a7272a8f~mv2.png/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_89da331062774e919f434b54a7272a8f~mv2.png",
      "https://static.wixstatic.com/media/b87f83_a5851df51b1c4a338516426d8cb0c0fd~mv2.png/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_a5851df51b1c4a338516426d8cb0c0fd~mv2.png",
    ],
    price: 100,
    beds: 0,
    guests: 4,
    description: "Descrição do Estacionamento",
    amenities: ["wifi", "ducha"],
  },
];

const Rooms: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();
  const [searchParams] = useSearchParams();
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCarouselChange = useCallback((roomIndex: number, imageIndex: number) => {
    setCurrentRoomIndex(roomIndex);
    setCurrentImageIndex(imageIndex);
  }, []);

  const [, doBooking] = useService(BookingService.post, {
    onData: () => {
      notification("success", "Reserva realizada com sucesso!");
      navigate("/rooms", { replace: true });
    },
    onError: (error) => {
      notification("error", error.message);
    },
  });

  useEffect(() => {
    if (user && searchParams.get("roomId") && searchParams.get("checkInDate") && searchParams.get("checkOutDate")) {
      doBooking({
        accommodationId: searchParams.get("roomId") as string,
        checkInDate: dayjs(searchParams.get("checkInDate") as string).toDate(),
        checkOutDate: dayjs(searchParams.get("checkOutDate") as string).toDate(),
        clientId: user.id,
      });
    }
  }, [user]);

  console.log(currentRoomIndex, currentImageIndex);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mt-2 mb-4">Acomodações</h1>
      <p className="text-center mb-12">
        Cada um dos nossos quartos luminosos e repletos de luz vem com tudo o que você precisa para uma estadia
        confortável. E sim, o conforto não é o nosso único objetivo, também valorizamos o bom design, o mobiliário
        contemporâneo elegante complementado por os ricos tons da paleta da natureza visíveis nas janelas e terraços com
        vista para o mar dos nossos quartos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} roomIndex={index} onCarouselChange={handleCarouselChange} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
