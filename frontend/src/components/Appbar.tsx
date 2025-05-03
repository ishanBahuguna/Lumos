import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AvatarButton } from "./AvatarButton";

export const Appbar: React.FC<{ username: string }> = ({ username }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // 1. Remove auth data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
    // 2. (Optional) call your backend to invalidate the token:
    // axios.post(`${BACKEND_URL}/auth/logout`, {}, {
    //   headers: { Authorization: localStorage.getItem("token") }
    // });

    // 3. Redirect to login
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-slate-800 shadow-lg border-b border-slate-600 sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/blogs"
        className="text-3xl font-extrabold text-white tracking-wide cursor-pointer transition-transform transform hover:scale-110 active:scale-90"
      >
        Lumos
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-500 transition-transform transform hover:scale-110 active:scale-90 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2.5"
          >
            + New Post
          </button>
        </Link>

        <button
          onClick={handleSignOut}
          className="text-white bg-red-600 hover:bg-red-500 transition-transform transform hover:scale-110 active:scale-90 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5"
        >
          Sign Out
        </button>

        <AvatarButton size="big" name={username.charAt(0).toUpperCase()} />
      </div>
    </div>
  );
};


