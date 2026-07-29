import { io, Socket } from "socket.io-client";

const sockets: Record<string, Socket> = {};

export function getSocket(namespace = "") {
  if (!sockets[namespace]) {
    const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL!.replace(/\/$/, "");

    sockets[namespace] = io(`${baseUrl}${namespace}`, {
      transports: ["websocket"],
      autoConnect: false,
      withCredentials: true,
    });
  }

  return sockets[namespace];
}
