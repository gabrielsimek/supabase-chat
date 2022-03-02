import { Link } from 'react-router-dom';
const rooms = [...Array(5)].map((_, i) => ({
  name: `Room-${i + 1}`,
  id: i + 1,
}));
export default function Lobby() {
  return (
    <>
      {rooms.map(({ name, id }) => (
        <Link key={id} to={`/rooms/${id}`}>
          {name}
        </Link>
      ))}
    </>
  );
}
