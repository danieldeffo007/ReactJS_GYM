import AppRouter from "./components/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";


const App = observer(() => {
  return (
      <BrowserRouter>
          <NavBar/>
          <AppRouter/>
      </BrowserRouter>
  );
});

export default App;
