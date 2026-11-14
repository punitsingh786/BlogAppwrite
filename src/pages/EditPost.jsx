import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '../components'
import { isAdmin } from '../utils/isAdmin'
import PostForm from '../components/post-form/PostForm'
import appwriteService from "../appwrite/config"

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res) => {
        // only the author or an admin may open the edit page
        if (res && (res.userId === userData?.$id || isAdmin(userData))) setPost(res)
        else navigate('/')
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate, userData])

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
