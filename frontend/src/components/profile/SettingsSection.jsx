import { LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

function SettingsSection({ onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-6 text-sm font-semibold text-text">Settings</h2>

      <div className="flex-1">
        <p className="mb-3 text-sm text-text-secondary">Appearance</p>
        <ThemeToggle />
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] text-sm font-semibold text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  )
}

export default SettingsSection
