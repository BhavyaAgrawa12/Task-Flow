import { useDocumentTitle } from '../hooks/useDocumentTitle'
import AuthLayout from '../layouts/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
  useDocumentTitle()

  return (
    <AuthLayout title="Register">
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
