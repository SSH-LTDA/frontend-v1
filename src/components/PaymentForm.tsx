import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';

const paymentSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
  cvv: z.string().min(3).max(3),
  cardHolderName: z.string().min(1),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentForm: React.FC = () => {
  const location = useLocation();
  const { room, checkInDate, checkOutDate, checkInTime, checkOutTime, image } = location.state;

  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white flex">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-5">Pagamento</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
            <input
              type="text"
              {...register('cardNumber')}
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">Número do cartão inválido</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Data de Expiração</label>
            <input
              type="text"
              {...register('expiryDate')}
              placeholder="MM/YY"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">Data de expiração inválida</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              {...register('cvv')}
              placeholder="123"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cvv && <p className="text-red-500 text-xs mt-1">CVV inválido</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome no Cartão</label>
            <input
              type="text"
              {...register('cardHolderName')}
              placeholder="Nome completo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">Nome inválido</p>}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Confirmar Pagamento
          </button>
        </form>
      </div>
      <div className="w-1/2 pl-10">
        <h2 className="text-2xl font-bold mb-5">Detalhes da Reserva</h2>
        <img src={image} alt="Room" className="w-full h-64 object-cover mb-5 rounded" />
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{room.title}</h3>
          <p>{room.description}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Check-in:</h4>
          <p>{checkInDate?.toLocaleDateString()} às {checkInTime}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Check-out:</h4>
          <p>{checkOutDate?.toLocaleDateString()} às {checkOutTime}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Preço:</h4>
          <p>R$ {room.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
