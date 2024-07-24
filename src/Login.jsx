import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{6,16}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    if (!validateUsername(username)) {
      setError("Username must be 6-16 characters long and alphanumeric only");
      return false;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be 8-32 characters long and include at least one letter and one number"
      );
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login();
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
