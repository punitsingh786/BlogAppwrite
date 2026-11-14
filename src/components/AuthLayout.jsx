import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Wraps a page: authentication=true -> only logged-in users,
// authentication=false -> only logged-out users (login / signup pages)
export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const allowed = authStatus === authentication

  useEffect(() => {
    if (!allowed) navigate(authentication ? "/login" : "/")
  }, [allowed, authentication, navigate])

  return allowed ? <>{children}</> : null
}
