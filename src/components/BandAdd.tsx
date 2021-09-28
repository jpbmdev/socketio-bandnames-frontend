import React, { useState } from "react";

interface Props {
  crearBanda: (nombre: string) => void;
}

export const BandAdd: React.FC<Props> = (props) => {
  const [valor, setValor] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
      props.crearBanda(valor);
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
