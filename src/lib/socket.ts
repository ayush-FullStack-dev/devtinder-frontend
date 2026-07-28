import { io, Socket } from "socket.io-client";

const sockets: Record<string, Socket> = {};

export function getSocket(
  namespace = "/",
  config: {} = {
    transports: ["websocket"],
    autoConnect: false,
    withCredentials: true,
  },
) {
  if (!sockets[namespace]) {
    sockets[namespace] = io(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}${namespace}`,
      config,
    );
  }

  return sockets[namespace];
}
