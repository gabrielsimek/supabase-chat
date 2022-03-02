import { useEffect, useState } from 'react';
//./ngrok  http --host-header=rewrite 80
import {
  deleteAllMessages,
  getRoomMessages,
  getMessages,
  sendMessageToRoom,
  sendMessage,
} from '../services/messages';
import { client } from '../services/client';
import { useParams } from 'react-router-dom';

export default function ChatRoom() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getRoomMessages(id)
      .then((res) => setMessages(res))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateMessages = (newMessages) =>
    setMessages((prevState) => [...prevState, newMessages]);

  useEffect(() => {
    const messageSubscription = client
      .from(`messages:room=eq.${id}`)
      .on('INSERT', (payload) => {
        handleUpdateMessages(payload.new);
      })
      .subscribe();

    return () => {
      client.removeSubscription(messageSubscription);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessageToRoom(`${name}: ${newMessage}`, id);
    setNewMessage('');
  };

  return (
    <div>
      <input
        placeholder="Your name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your message"
          value={newMessage}
          onChange={({ target }) => setNewMessage(target.value)}
        />
        <button type="submit">Send!</button>
      </form>
      <ul>
        {messages.map(({ message, id }) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
      <button onClick={() => deleteAllMessages().then(() => setMessages([]))}>
        Clear Messages
      </button>
    </div>
  );
}
