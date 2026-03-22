"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "../../lib/auth/auth-service";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // redirect to login/home
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="font-bold text-xl">
        <h3>Avant</h3>
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
