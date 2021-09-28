import React, { useEffect, useState } from "react";
import Band from "../types/Band";

interface Props {
  bands: Band[];
  votar: (id: string) => void;
  borrar: (id: string) => void;
  cambiarNombre: (id: string, nombre: string) => void;
}

export const BandList: React.FC<Props> = (props) => {
  const [bands, setBands] = useState(props.bands);

  useEffect(() => {
    setBands(props.bands);
  }, [props.bands]);

  const cambioNombre = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onLossFocus = (id: string, nombre: string) => {
    props.cambiarNombre(id, nombre);
  };

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => props.votar(band.id)}
          >
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
          <button
            className="btn btn-danger"
            onClick={() => props.borrar(band.id)}
          >
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
