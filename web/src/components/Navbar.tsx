'use client';

import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">EcoPulse</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tasks" className="text-gray-700 hover:text-primary">
              Tasks
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-primary">
              Events
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-primary">
              Leaderboard
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-primary">
                    {user?.coinBalance} ECO
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link href="/tasks" className="block py-2 text-gray-700">
              Tasks
            </Link>
            <Link href="/events" className="block py-2 text-gray-700">
              Events
            </Link>
            <Link href="/leaderboard" className="block py-2 text-gray-700">
              Leaderboard
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-700">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-700">
                  Login
                </Link>
                <Link href="/register" className="block py-2 text-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
