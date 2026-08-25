import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              vp-auditoria
            </h1>
            <p className="text-gray-600">Auditor's Command Center</p>
          </div>

          {/* Error handling */}
          {/* TODO: Add error handling from searchParams */}

          {/* Google OAuth */}
          <GoogleSignInButton />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:text-gray-700 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-gray-700 underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
