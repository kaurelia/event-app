import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventPage from "~root/pages/Event";
import GlobalStyle from "./component/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <EventPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;
