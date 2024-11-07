import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes.jsx";
import { apiUrl } from "./utils/config.js";

function App() {
  axios.defaults.baseURL = `${apiUrl}`;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
