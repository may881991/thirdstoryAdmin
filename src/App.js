import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import Register from "./Register";
// import Reset from "./Reset";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/reset" element={<Reset />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;