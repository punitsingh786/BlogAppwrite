import { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((res) => {
        if (res) setPosts(res.rows)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-2xl font-bold mb-6">All Posts</h1>
        {loading ? (
          <p className="text-slate-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-500">No posts yet.</p>
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

export default AllPosts
