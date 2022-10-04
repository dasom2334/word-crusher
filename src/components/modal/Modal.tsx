import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  title?:string;
  onClose: () => any;
}

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

export const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  const element = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  });

  return ReactDOM.createPortal(
    <div className="modal-shadow" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>
          <button id="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    element
  );
};
