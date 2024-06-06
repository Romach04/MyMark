import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import './App.css';

const App = ()  => {
  return (
      <div className="wrapper">
        <BrowserRouter>
          <NavBar/>
          <AppRouter/>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
