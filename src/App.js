import OnlyIfNotLoggedIn from "./OnlyIfNotLoggedIn";
import RequireUser from "./RequireUser";
import Role from "./components/Role";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login/:role" element={<Login />} />
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/:role" element={<Role />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
