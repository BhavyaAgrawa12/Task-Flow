export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  const data = error?.response?.data
  if (!data) return error?.message || fallback

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0]
    const detail = typeof first === 'string' ? first : first.msg || first.message
    if (detail) return detail
  }

  if (data.message && data.message !== 'Validation Failed') return data.message

  return fallback
}
