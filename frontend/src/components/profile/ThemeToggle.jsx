import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/formatters'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const options = [
    { id: 'dark', label: 'Dark' },
    { id: 'light', label: 'Light' },
  ]

  return (
    <div className="inline-flex rounded-xl border border-white/[0.1] bg-white/[0.05] p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setTheme(option.id)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            theme === option.id
              ? 'bg-white/10 text-text'
              : 'text-text-secondary hover:text-text',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
