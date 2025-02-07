// import type { Route } from "./+types/login";
import React, { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted', { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <img
                className="mx-auto h-64 sm:h-80 w-auto"
                src="app/assests/images/elepath-logo.png"
                alt="Your Company Logo"
            />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                      shadow-sm placeholder-gray-400 
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                      sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                      shadow-sm placeholder-gray-400 
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                      sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Link to="/homepage">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent 
                      rounded-md shadow-sm text-sm font-medium text-white 
                      bg-blue-600 hover:bg-blue-700 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            
              <div>
                <div className="gap-2 text-sm text-gray-600 flex justify-center">
                    Don't have an account?{' '}
                    <a href="/register" className="font-small text-blue-600 hover:text-blue-500">
                        Sign Up
                    </a>
                </div>
              </div>
              
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 
                      border border-gray-300 rounded-md shadow-sm 
                      bg-white text-sm font-medium text-gray-500 
                      hover:bg-gray-50"
                  >
                    Google
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 
                      border border-gray-300 rounded-md shadow-sm 
                      bg-white text-sm font-medium text-gray-500 
                      hover:bg-gray-50"
                  >
                    GitHub
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 
                      border border-gray-300 rounded-md shadow-sm 
                      bg-white text-sm font-medium text-gray-500 
                      hover:bg-gray-50"
                  >
                    Twitter
                  </a>
                </div>
              </div> */}
            </div>

            <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent 
                    rounded-md shadow-sm text-sm font-medium text-white 
                    bg-gray-600 hover:bg-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    mt-8"
                >
                  Visitor Mode
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;