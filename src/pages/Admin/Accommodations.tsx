import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Accommodation } from "../../types/Accommodation";
import getAccommodations from "../../services/getAccommodations";
import deleteAccommodation from "../../services/deleteAccomodation";
import DeleteModal from "../../components/DeleteModal";
import CreateAccommodationModal from "../../components/CreateAccommodationModal";

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>();
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState<boolean>(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
  const [editAccommodationId, setEditAccommodationId] = useState<string>("");
  const [deleteAccommodationId, setDeleteAccommodationId] = useState<string>("");

  async function handleSetAccommodations() {
    const accommodations = await getAccommodations();
    setAccommodations(accommodations);
  }

  useEffect(() => {
    // handleSetAccommodations();

    setAccommodations([
      {
        id: "owrhbugheuwdmlçqw",
        type: "Domo",
        photos: [
          "https://static.wixstatic.com/media/b87f83_0db328063a8c4b4ea1bb3dff437e8e46~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_0db328063a8c4b4ea1bb3dff437e8e46~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_e89ecfdd2aa84fa0812f6c8789225f20~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_e89ecfdd2aa84fa0812f6c8789225f20~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_928e441d10b74b3ba45cf455e8c12b0e~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_928e441d10b74b3ba45cf455e8c12b0e~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_3984ca8f5d97472ebe0f78082100ec3a~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_3984ca8f5d97472ebe0f78082100ec3a~mv2.jpeg",
        ],
        price: 590,
        beds: 1,
        guestCapacity: 3,
        description: "Descrição do Domo",
        facilities: ["wifi", "tv", "ducha", "arCondicionado", "toalhas", "frigobar", "cozinha"],
      },
      {
        id: "2oe24r93h589grea",
        type: "Charrua (Bus)",
        photos: [
          "https://static.wixstatic.com/media/b87f83_5580c08771c841089ccc440a82c2f298~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_5580c08771c841089ccc440a82c2f298~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_c72880f87ec948868f23310a25b1a518~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_c72880f87ec948868f23310a25b1a518~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_5a54d8612da145a99bb18d7b3a22ff73~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_5a54d8612da145a99bb18d7b3a22ff73~mv2.jpeg",
          "https://static.wixstatic.com/media/b87f83_61cd9f30603c4c0782d0dd8d262c0fcb~mv2.jpeg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_61cd9f30603c4c0782d0dd8d262c0fcb~mv2.jpeg",
        ],
        price: 490,
        beds: 1,
        guestCapacity: 2,
        description: "Descrição do Charrua",
        facilities: ["wifi", "tv", "arCondicionado", "ducha", "banheira", "cozinha", "toalhas"],
      },
      {
        id: "owrhbugheuwdmlçqw",
        type: "Suíte Com Cozinha",
        photos: [
          "https://static.wixstatic.com/media/b87f83_bfc66e6435f34c23bfd60e2fccb3d499~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_bfc66e6435f34c23bfd60e2fccb3d499~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_3b4acd8d82e342469093e71fb29a3632~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_3b4acd8d82e342469093e71fb29a3632~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_de7918ffcf3947b6ba9b21ff2c56c40c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_de7918ffcf3947b6ba9b21ff2c56c40c~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_0ba13b9dfa2c42058f578180254fbed8~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_0ba13b9dfa2c42058f578180254fbed8~mv2.jpg",
        ],
        price: 390,
        beds: 2,
        guestCapacity: 3,
        description: "Descrição da Suíte",
        facilities: ["wifi", "tv", "cozinha", "arCondicionado", "toalhas"],
      },
      {
        id: "owrhbugheuwdmlçqw",
        type: "Chalé Família",
        photos: [
          "https://static.wixstatic.com/media/b87f83_d943676e56f24781b4aad20256b75eef~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_d943676e56f24781b4aad20256b75eef~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_f06e8eb7ad634e22bd69badcc538be73~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_f06e8eb7ad634e22bd69badcc538be73~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_d3ae7c6f22ea4579bad3396eea56224f~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_d3ae7c6f22ea4579bad3396eea56224f~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg",
        ],
        price: 590,
        beds: 3,
        guestCapacity: 5,
        description: "Descrição do Chalé",
        facilities: ["wifi", "tv", "arCondicionado", "cozinha", "toalhas"],
      },
      {
        id: "owrhbugheuwdmlçqw",
        type: "Cabana",
        photos: [
          "https://static.wixstatic.com/media/b87f83_23a56936773e4f7f812d0543c078138c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_23a56936773e4f7f812d0543c078138c~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_1f34bed210534eb2a8b788773ee8cbdf~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_1f34bed210534eb2a8b788773ee8cbdf~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_aa9428b24cc74f5ab33e6b9ab8792361~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_aa9428b24cc74f5ab33e6b9ab8792361~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_760d26da720349d383ddf9d888fc180c~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_760d26da720349d383ddf9d888fc180c~mv2.jpg",
        ],
        price: 490,
        beds: 2,
        guestCapacity: 3,
        description: "Descrição da Cabana",
        facilities: ["wifi", "arCondicionado", "tv", "toalhas", "cozinha"],
      },
      {
        id: "owrhbugheuwdmlçqw",
        type: "Estacionamento Para Overlanders",
        photos: [
          "https://static.wixstatic.com/media/b87f83_f4b318355c704575a4a6917c1a2f7401~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_f4b318355c704575a4a6917c1a2f7401~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_1af509ade7ad46cc86b69b10fe2cd6c5~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_1af509ade7ad46cc86b69b10fe2cd6c5~mv2.jpg",
          "https://static.wixstatic.com/media/b87f83_89da331062774e919f434b54a7272a8f~mv2.png/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_89da331062774e919f434b54a7272a8f~mv2.png",
          "https://static.wixstatic.com/media/b87f83_a5851df51b1c4a338516426d8cb0c0fd~mv2.png/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_a5851df51b1c4a338516426d8cb0c0fd~mv2.png",
        ],
        price: 100,
        beds: 0,
        guestCapacity: 4,
        description: "Descrição do Estacionamento",
        facilities: ["wifi", "ducha"],
      },
    ]);
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
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Descrição</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Camas</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Preço</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Capacidade</th>
              <th className="border-collapse p-[10px] border border-[rgb(160 160 160)]">Facilidades</th>
              <th
                className="border-collapse p-[10px] border border-[rgb(160 160 160)] flex items-center gap-2 cursor-pointer"
                onClick={() => setModalCreateIsOpen(true)}
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
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">
                    {accommodation.description}
                  </td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{accommodation.beds}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">{accommodation.price}</td>
                  <td className="border-collapse p-[10px] border border-[rgb(160 160 160)]">
                    {accommodation.guestCapacity}
                  </td>
                  <td className="border-collapse p-[10px] text-left border border-[rgb(160 160 160)]">
                    {accommodation.facilities.join(", ")}
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
      {modalCreateIsOpen && <CreateAccommodationModal closeModal={() => setModalCreateIsOpen(false)} />}
      {modalEditIsOpen && <h2>MODAL DE EDITAR</h2>}
      {modalDeleteIsOpen && (
        <DeleteModal
          id={deleteAccommodationId}
          deleteFunction={handleDeleteAccommodation}
          cancelButton={() => {
            setModalDeleteIsOpen(false);
            setDeleteAccommodationId("");
          }}
          text="Tem certeza que deseja deletar essa acomodação?"
        />
      )}
    </>
  );
};

export default Accommodations;
