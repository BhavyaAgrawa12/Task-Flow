import UserAvatar from '../common/UserAvatar'

function AvatarGroup({ members = [], max = 4 }) {
  const visible = members.slice(0, max)
  const overflow = members.length - max

  if (visible.length === 0) return null

  return (
    <div className="flex items-center">
      {visible.map((member, index) => (
        <UserAvatar
          key={member.id || member.name || index}
          name={member.name}
          size="sm"
          className={index > 0 ? '-ml-2 ring-2 ring-bg-secondary' : ''}
        />
      ))}
      {overflow > 0 && (
        <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] text-[10px] font-semibold text-text-secondary ring-2 ring-bg-secondary">
          +{overflow}
        </span>
      )}
    </div>
  )
}

export default AvatarGroup
