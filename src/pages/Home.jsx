import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((res) => {
        if (res) setPosts(res.rows)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full py-10">
      <Container>
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to MegaBlog</h1>
          <p className="mt-3 text-slate-500">Read, write and share your ideas.</p>
          {!authStatus && (
            <Link
              to="/signup"
              className="inline-block mt-5 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 duration-200"
            >
              Get started
            </Link>
          )}
        </section>

        {loading ? (
          <p className="text-center text-slate-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-xl font-semibold text-slate-600">
            No posts yet. {authStatus ? "Add your first post!" : "Log in to create one."}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home
