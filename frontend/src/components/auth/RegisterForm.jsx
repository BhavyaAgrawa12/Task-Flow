import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { getApiErrorMessage } from '../../utils/apiErrors'
import PasswordInput from './PasswordInput'

const inputClass = (hasError) =>
  `h-11 w-full rounded-xl border bg-bg-secondary/80 px-4 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    hasError
      ? 'border-danger/50 focus:border-danger/50'
      : 'border-white/[0.1] focus:border-primary/50'
  }`

function RegisterForm() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await registerUser(values.name, values.email, values.password)
      toast.success('Account created!')
      navigate('/dashboard', { replace: true })
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Registration failed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          className={inputClass(errors.name)}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          className={inputClass(errors.email)}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email',
            },
          })}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>
        )}
      </div>

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Password"
        error={errors.password?.message}
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
        })}
      />

      <button
        type="submit"
        disabled={submitting}
        className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.08] text-sm font-semibold text-text transition-all hover:bg-white/[0.12] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Creating account…' : 'Register'}
      </button>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
