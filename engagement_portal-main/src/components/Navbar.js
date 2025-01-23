import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Simulating user login state (replace with real login status)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for JWT token in local storage (adjust as needed)
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get user info
      setUserEmail(decodedToken.email); // Extract email from decoded token (adjust based on token structure)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand Logo */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-yellow-300 transition">
            Engagement Portal
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/about"
                className="hover:text-yellow-300 transition duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-yellow-300 transition duration-200"
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Auth Links */}
        <div className="flex space-x-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-yellow-400 text-blue-900 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-900 py-2 px-4 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg -right-4 top-12">
                Logged in as <span className="font-bold">{userEmail}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
