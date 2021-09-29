import React from "react";
import App from "./Pages/HomePage";
import { SocketProvider } from "./context/socketContext";

const BandNamesApp: React.FC = () => {
  return (
    <SocketProvider>
      <App />
    </SocketProvider>
  );
};

export default BandNamesApp;
