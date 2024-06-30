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
      <div className="bg-white h-1/4 flex flex-col justify-between rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
        <h4 className="text-xl">{text}</h4>
        <div className="flex justify-end gap-5">
          <button className="bg-slate-400 px-3 py-1 text-white rounded-lg" onClick={cancelButton}>
            Cancelar
          </button>
          <button className="bg-red-600 px-3 py-1 text-white rounded-lg" onClick={() => deleteFunction(id)}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
