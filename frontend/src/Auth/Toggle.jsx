import { useState } from "react";
import Login from "./Login";
import Signin from "./Signin";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-lg w-full max-w-md p-8 shadow-lg">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-6 rounded-lg font-semibold transition ${
              isLogin
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-6 rounded-lg font-semibold transition ${
              !isLogin
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Render the correct form right below toggle */}
        <div className="mt-2">{isLogin ? <Login /> : <Signin />}</div>
      </div>
    </div>
  );
};

export default Auth;
