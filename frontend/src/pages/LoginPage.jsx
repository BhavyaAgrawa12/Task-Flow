import { useDocumentTitle } from '../hooks/useDocumentTitle'
import AuthLayout from '../layouts/AuthLayout'
import LoginForm from '../components/auth/LoginForm'

function LoginPage() {
  useDocumentTitle()

  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
