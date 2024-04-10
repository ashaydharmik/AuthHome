
import './App.css';
import {Routes,Route} from "react-router-dom"
import Auth from "./components/Authentication/Auth"
import Dashboard from './components/Dashboard/Dashboard';
import NextPage from './components/Dashboard/NextPage/NextPage';
import HomePage from './components/Dashboard/Homepage/HomePage';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/next" element={<NextPage />} />
      <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
