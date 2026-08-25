"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

export function Header({ user }: { user?: Session["user"] }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left: Workspace selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Workspace:</span>
          <button className="px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            VisionProces
          </button>
        </div>
      </div>

      {/* Right: User menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <span className="text-sm text-gray-700">{user?.name}</span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              showUserMenu ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* User menu dropdown */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <a
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Settings
            </a>
            <a
              href="/dashboard/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Account
            </a>

            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
