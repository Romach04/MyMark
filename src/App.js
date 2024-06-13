import { BrowserRouter } from "react-router-dom";
import { useEffect, useContext } from "react";
import NavBar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { Context } from "./index";
import './App.css';

const App = ()  => {

  // const { user } = useContext(Context);

  // useEffect(() => {
  //   user.setIsAuth(false);
  //   user.setUsername('');
  //   localStorage.removeItem('authorization');
  //   localStorage.removeItem('username');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
