export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">vp-auditoria</div>
          <div className="flex gap-4">
            <a href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Login
            </a>
            <a href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Auditor's Command Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seguimiento. Centralización. Inteligencia.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage audits of any standard (SMETA, ISO 9001, ISO 14001, ISO 45001) in one place.
          </p>

          <div className="pt-8">
            <a
              href="/auth/register"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </a>
          </div>

          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-3xl">📋</div>
                <h3 className="font-semibold text-gray-900">Pre-loaded Standards</h3>
                <p className="text-gray-600">SMETA, ISO 9001, 14001, 45001 + custom</p>
              </div>
              <div className="space-y-4">
                <div className="text-3xl">🔐</div>
                <h3 className="font-semibold text-gray-900">Secure Access</h3>
                <p className="text-gray-600">QR codes & ephemeral links for auditors</p>
              </div>
              <div className="space-y-4">
                <div className="text-3xl">🤖</div>
                <h3 className="font-semibold text-gray-900">AuditorIA ChatBot</h3>
                <p className="text-gray-600">4-level specialized AI assistant</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
