import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/socketContext";
import Band from "../types/Band";

export const BandList: React.FC = () => {
  const { socket } = useSocketContext();
  const [bands, setBands] = useState<Band[]>();

  useEffect(() => {
    socket?.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => {
      socket?.off("current-bands");
    };
  }, [socket]);

  const cambioNombre = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = e.target.value;
    setBands((bands) =>
      bands?.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onLossFocus = (id: string, nombre: string) => {
    socket?.emit("cambiar-nombre-banda", { id, nombre });
  };

  const votar = (id: string) => {
    socket?.emit("votar-banda", id);
  };

  const borrar = (id: string) => {
    socket?.emit("borrar-banda", id);
  };

  const crearRows = () => {
    return bands?.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              cambioNombre(e, band.id)
            }
            onBlur={() => onLossFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
