import React from "react";

interface DeleteModalProps {
  id: string;
  text: string;
  deleteFunction: (id: string) => void;
  cancelButton: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, text, deleteFunction, cancelButton }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-3/4 rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
        <h4>{text}</h4>
        <button className="bg-slate-400" onClick={cancelButton}>
          Cancelar
        </button>
        <button className="bg-red-600" onClick={() => deleteFunction(id)}>
          Deletar
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
