import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./page/main.js";
import Home from "./page/home.js";
import Login from "./page/login.js";
import Register from "./page/register.js";
import Mypage from "./page/mypage.js";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/main"} element={<Main />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/mypage"} element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
