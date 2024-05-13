// components/ReservationForm.tsx
import React, { useState } from 'react';
import './ReservationForm.css';

interface ReservationFormData {
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  accommodationType: string;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    accommodationType: '',
  });

  const [cancelRequested, setCancelRequested] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelRequest = () => {
    setCancelRequested(true);
  };

  const handleCancelConfirmation = () => {
    // Podemos adicionar aqui uma lógica para calcular a taxa de cancelamento da reserva
    console.log('Reserva cancelada.');
    // Reseta o estado após o cancelamento
    setCancelRequested(false);
    setFormData({
      guestName: '',
      checkInDate: '',
      checkOutDate: '',
      accommodationType: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cancelRequested) {
      handleCancelConfirmation();
    } else {
      // Aqui eu imagino que vamos poder aproveitar para enviar os dados para o backend
      console.log(formData);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Gerenciamento de Reservas</h2>
      <div className="form-group">
        <label>Nome do Hóspede:</label>
        <input
          type="text"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Data de Check-in:</label>
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Data de Check-out:</label>
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Tipo de Acomodação:</label>
        <select
          name="accommodationType"
          value={formData.accommodationType}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="single">Solteiro(a)</option>
          <option value="double">Casal</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      {cancelRequested ? (
        <div className="form-group">
          <p>Deseja confirmar o cancelamento da reserva?</p>
          <button type="button" onClick={handleCancelConfirmation}>Confirmar Cancelamento</button>
        </div>
      ) : (
        <div className="form-group">
          <button type="button" onClick={handleCancelRequest}>Cancelar Reserva</button>
        </div>
      )}
      <button type="submit" className="submit-button">Enviar</button>
    </form>
  );
};

export default ReservationForm;
