export const broadcast = (
  channelName: string,
  message: unknown
) => {
  const channel = new BroadcastChannel(channelName);

  channel.postMessage(message);

  channel.close();
};

export const listenToBroadcast = (
  channelName: string,
  callback: (message: MessageEvent) => void
) => {
  const channel = new BroadcastChannel(channelName);

  channel.onmessage = callback;

  return () => {
    channel.close();
  };
};