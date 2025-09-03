export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-between">
          <div className="font-semibold text-xl">Settings</div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Workspace Settings</h2>
          <p className="mt-2 text-slate-600">This is a placeholder. Extend with forms validated by Zod as needed.</p>
        </div>
      </section>
    </main>
  )
}