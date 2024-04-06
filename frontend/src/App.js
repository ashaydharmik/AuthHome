import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Auth from "./components/Authentication/Auth"
import Dashboard from './components/Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;
