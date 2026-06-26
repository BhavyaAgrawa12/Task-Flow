import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useProfileData } from '../hooks/useProfileData'
import { getApiErrorMessage } from '../utils/apiErrors'
import PageHeader from '../components/common/PageHeader'
import { ProfileSkeleton } from '../components/common/skeletons'
import ProfileSection from '../components/profile/ProfileSection'
import SettingsSection from '../components/profile/SettingsSection'

function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { registerRefresh } = useOutletContext() ?? {}
  const { recentActivity, loading, error, refresh } = useProfileData()

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load profile data'))
    }
  }, [error])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Profile" description="Your account and preferences" />
        <ProfileSkeleton />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Profile" description="Your account and preferences" />

      <div className="glass-card overflow-hidden">
        <div className="grid divide-y divide-white/[0.08] md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="p-6 sm:p-8">
            <ProfileSection user={user} recentActivity={recentActivity} />
          </div>
          <div className="p-6 sm:p-8">
            <SettingsSection onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
