import { loginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-lg font-bold mb-1">Painel Administrativo</h1>
        <p className="text-sm text-gray-400 mb-6">
          Entre com suas credenciais para continuar.
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
            Usuário ou senha inválidos.
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs text-gray-400 mb-1.5">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-950 border border-gray-800 outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-gray-400 mb-1.5">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-950 border border-gray-800 outline-none focus:border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-bold bg-white text-gray-900 hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
