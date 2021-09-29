import React, { useState } from "react";
import { useSocketContext } from "../context/socketContext";

export const BandAdd: React.FC = () => {
  const { socket } = useSocketContext();
  const [valor, setValor] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
      socket?.emit("crear-banda", { nombre: valor });
      setValor("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
