import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./components/style.css";
import Footer from "./components/Footer";
import OpenMovie from "./components/OpenMovie";
import Register from "./components/Register";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";
import ResetPassword from "./components/ResetPassword";
import AddWorkout from "./components/AddWorkout";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import MovieDescription from "./components/MovieDescription";
import { isExpired, decodeToken } from "react-jwt";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/panel" element={<OpenMovie />} />
          <Route exact path="/signup" element={<Register />} />
          <Route path="/description/:id" element={<MovieDescription />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route exact path="/add" element={<AddMovie />} />
          <Route exact path="/addWorkout" element={<AddWorkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
