import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import "./css/App.css";

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Logout from "./pages/Logout";
import Payments from "./pages/Payments";
import ProfilePage from "./pages/ProfilePage";

function App() {
  console.log("from app.js");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/profile" component={ProfilePage} />

        {/* <Route exact path="/profilepage" render={(props) => <ProfilePage{...props} />} /> */}
      </Switch>
      <body>
        <div id="page-container">
          <div id="content-wrap">
          </div>
          <footer id="footer">
            <span id="footer-name">Jadelight © 2022</span>
            <a id="email-link" href="randomemail@aol.co"> Contact Owner</a>
          </footer>
        </div>
      </body>
    </BrowserRouter>
  );
}

export default App;
