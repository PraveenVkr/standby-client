import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "/register" : "/login";

    try {
      const { data } = await axios.post(url, { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("User not found. Please check your username.");
        } else if (error.response.status === 401) {
          alert("Incorrect password. Please try again.");
        } else if (
          error.response.status === 422 &&
          isLoginOrRegister === "login"
        ) {
          alert("Username and Password can not be empty ");
        } else if (
          (error.response.status === 400 || error.response.status === 422) &&
          isLoginOrRegister === "register"
        ) {
          if (error.response.status === 400) alert("Username already taken");
          else if (error.response.status === 422)
            alert("Username and Password can not be empty ");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }

  return (
    <div>
      <div className="bg-blue-50 h-screen flex items-center">
        <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            type="text"
            placeholder="username"
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="password"
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <button className="bg-blue-500 text-white block w-full rounded-sm p-2  hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out">
            {isLoginOrRegister === "register" ? "Register" : "Login"}
          </button>
          <div className="text-center mt-2">
            {isLoginOrRegister === "register" && (
              <div>
                Already a member?
                <button
                  className="ml-1"
                  onClick={() => setIsLoginOrRegister("login")}
                >
                  Login here
                </button>
              </div>
            )}
            {isLoginOrRegister === "login" && (
              <div>
                Don't have an account?
                <button
                  className="ml-1"
                  onClick={() => setIsLoginOrRegister("register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <footer className="fixed bottom-0 w-full flex justify-center bg-gray-800 text-white">
        Made with 💙
      </footer>
    </div>
  );
}
