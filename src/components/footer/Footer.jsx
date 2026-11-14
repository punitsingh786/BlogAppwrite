import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="py-10 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo width="auto" />
          <p className="mt-2 text-sm text-slate-500">
            &copy; 2026 MegaBlog. Built by Punit singh.
          </p>
        </div>
        <ul className="flex gap-6 text-sm font-medium text-slate-700">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/all-posts" className="hover:text-indigo-600">All Posts</Link></li>
          <li><Link to="/add-post" className="hover:text-indigo-600">Add Post</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
