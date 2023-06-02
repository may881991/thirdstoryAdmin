import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import Register from "./components/Register/Register";
// import Reset from "./Reset";
import SignUP from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Activities from "./components/Activities/Activities";
import Stories from "./components/Stories/Stories";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/signUp" element={<SignUP />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/activities" element={<Activities />} />
          <Route exact path="/stories" element={<Stories />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;