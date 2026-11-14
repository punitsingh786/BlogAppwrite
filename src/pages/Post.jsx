import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import parse from "html-react-parser"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res) => {
        if (res) setPost(res)
        else navigate("/")
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  const deletePost = () => {
    if (!window.confirm("Delete this post?")) return
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-6 relative border border-slate-200 bg-white rounded-xl p-2">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[480px] object-contain"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600 hover:bg-green-700">Edit</Button>
              </Link>
              <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css bg-white border border-slate-200 rounded-xl p-6">
          {parse(post.content || "")}
        </div>
      </Container>
    </div>
  ) : null
}


