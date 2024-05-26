"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";

/**
 * CSR React component that connects to the socket.io-client
 * @returns ClientSocket component
 */
export default function ClientSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState("?");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
      setMessage("?");
    }

    function onPayload(value: any) {
      setMessage(value);
    }

    socket.on("connect", onConnect);
    socket.on("payload", onPayload);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("payload", onPayload);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Socket.io server payload: {JSON.stringify(message)}</p>
    </div>
  );
}
