import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = () => {
  const socket = io("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const votar = (id: string) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id: string) => {
    socket.emit("borrar-banda", id);
  };

  const cambiarNombre = (id: string, nombre: string) => {
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };

  const crearBanda = (nombre: string) => {
    socket.emit("crear-banda", { nombre });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            bands={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
        </div>
        <div className="col-4">
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>
    </div>
  );
}

export default App;
