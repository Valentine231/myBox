import { useState } from "react";
import Login from "./Login";
import Signin from "./Signin";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`py-2 px-6 rounded-lg font-semibold ${
            isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`py-2 px-6 rounded-lg font-semibold ${
            !isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Render the correct form */}
      {isLogin ? <Login /> : <Signin />}
    </div>
  );
};

export default Auth;
