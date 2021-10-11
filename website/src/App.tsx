import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Event2 from "~root/component/Event";
import GlobalStyle from "./component/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Event2 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;
