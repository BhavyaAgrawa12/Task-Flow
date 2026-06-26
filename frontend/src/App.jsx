import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import GuestRoute from './components/routing/GuestRoute'
import ProtectedRoute from './components/routing/ProtectedRoute'
import ScrollToTop from './components/routing/ScrollToTop'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import BoardsPage from './pages/BoardsPage'
import BoardDetailPage from './pages/BoardDetailPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ProfilePage from './pages/ProfilePage'
import TasksPage from './pages/TasksPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:boardId" element={<BoardDetailPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster
            position="bottom-center"
            containerClassName="!bottom-20 lg:!bottom-6"
            toastOptions={{
              className: 'glass !text-text text-sm !shadow-elevated',
              duration: 4000,
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
