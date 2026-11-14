import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
      <Container>
        <nav className="flex items-center">
          <Link to="/" className="mr-4">
            <Logo width="auto" />
          </Link>
          <ul className="flex ml-auto items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    end={item.slug === "/"}
                    className={({ isActive }) =>
                      `inline-block px-5 py-2 duration-200 rounded-full hover:bg-indigo-50 hover:text-indigo-700 ${
                        isActive ? "bg-indigo-100 text-indigo-700 font-medium" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
