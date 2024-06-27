import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(500, "Mensagem deve ter no máximo 500 caracteres"),
});

type ContactFormData = z.infer<typeof schema>;

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto mt-10 px-4 py-10">
      <div className="flex flex-wrap -mx-4 pt-10">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <h2 className="text-4xl font-bold mb-4">ESTAMOS AQUI POR VOCÊ</h2>
          <p className="text-lg mb-4">
            Na Pousada Quinta do Ypuã levamos nossos clientes a sério. Se você tem alguma dúvida, reclamação ou solicitação,
            encaminhe-o para nossa equipe e entraremos em contato com você o mais breve possível.
          </p>
          <h3 className="text-base mb-2">Estrada Ipua, nº 6<br />Laguna - SC</h3>
          <h3 className="text-base mb-4 font-bold">
            <a
              href="https://www.google.com/maps/search/?api=1&query=-28.53984659988217,-48.77805251067143"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ver Localização {"-->"}
            </a>
          </h3>
          <h3 className="text-base mb-2 text-blue-600">Telefone: (48) 99940-9732</h3>
          <h3 className="text-base mb-4 text-blue-600">Email: pousadaquintadoypua@gmail.com</h3>
          <p className="text-lg mb-4 font-bold text-[#886023]">
            Ou se preferir, envie-nos uma mensagem via WhatsApp
          </p>
          <a
            href="https://wa.me/5548999409732"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded-lg inline-flex items-center"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
            WhatsApp
          </a>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6">
            <input
              type="text"
              placeholder="Insira Seu Nome"
              {...register("name")}
              className={`w-full bg-gray-200 rounded-lg mb-2 py-2 px-4 outline-none ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 mb-4">{errors.name.message}</p>}
            <input
              type="email"
              placeholder="Insira Seu Endereço de Email"
              {...register("email")}
              className={`w-full bg-gray-200 rounded-lg mb-2 py-2 px-4 outline-none ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}
            <textarea
              placeholder="Mensagem"
              {...register("message")}
              className={`w-full bg-gray-200 rounded-lg mb-2 py-2 px-4 outline-none resize-none h-40 ${errors.message ? "border-red-500" : ""}`}
            ></textarea>
            {errors.message && <p className="text-red-500 mb-4">{errors.message.message}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
