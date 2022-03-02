import { client, parseData } from './client';
export const getMessages = async () => {
  const res = await client.from('messages').select('*');
  return parseData(res);
};
export const getRoomMessages = async (roomId) => {
  const res = await client.from('messages').select('*').match({ room: roomId });
  return parseData(res);
};

export const sendMessage = async (message) => {
  const res = await client.from('messages').insert({ message });
  return parseData(res);
};
export const sendMessageToRoom = async (message, roomId) => {
  const res = await client.from('messages').insert({ message, room: roomId });
  return parseData(res);
};

export const deleteAllMessages = async () => {
  const res = await client.from('messages').delete().not('message', 'is', null);
  return parseData(res);
};
