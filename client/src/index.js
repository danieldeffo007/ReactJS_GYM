import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ClientStore from "./store/DescriptionStore";
import DescriptionStore from "./store/DescriptionStore";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Context.Provider value={{
          user: new UserStore(),
          description: new DescriptionStore()
      }}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);


