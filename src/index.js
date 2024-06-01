import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import OrganizationStore from './store/OrganizationStore';


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      organization: new OrganizationStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
