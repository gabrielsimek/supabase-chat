import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './views/Lobby';
import ChatRoom from './views/ChatRoom';
export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route path="/rooms/:id" component={ChatRoom} />
        </Switch>
      </Router>
    </>
  );
}
