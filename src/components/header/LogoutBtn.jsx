import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate("/")
    } catch (err) {
      console.log("Logout failed", err)
      alert(err.message || "Logout failed")
    }
  }
  return (
    <button
      className="inline-block px-5 py-2 duration-200 hover:bg-indigo-50 hover:text-indigo-700 rounded-full cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
