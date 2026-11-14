import { Link } from 'react-router-dom'
import { Container } from '../components'

function NotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="text-center">
          <p className="text-6xl font-bold text-indigo-600">404</p>
          <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
          <p className="mt-2 text-slate-500">The page you are looking for doesn&apos;t exist.</p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 duration-200"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
