import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">You are logged in</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {isLogin ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <p className="mt-4">
            Don't have an account?{' '}
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onRegister={() => setIsLogin(true)} />
          <p className="mt-4">
            Already have an account?{' '}
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}
