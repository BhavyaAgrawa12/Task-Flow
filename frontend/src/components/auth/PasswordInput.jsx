import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function PasswordInput({
  id,
  label,
  placeholder = 'Password',
  error,
  registration,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border bg-bg-secondary/80 px-4 pr-11 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            error
              ? 'border-danger/50 focus:border-danger/50'
              : 'border-white/[0.1] focus:border-primary/50'
          }`}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
}

export default PasswordInput
