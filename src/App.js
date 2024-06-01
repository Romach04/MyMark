import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import AppRouter from "./components/AppRouter";
import './App.css';

const App = ()  => {
  return (
      <div className="wrapper">
        <BrowserRouter>
          <NavBar/>
          <AppRouter/>
          {/* <MainPage/> */}
        </BrowserRouter>
      </div>
    
  );
}

export default App;
