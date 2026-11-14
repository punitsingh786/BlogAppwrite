import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md duration-200">
        <img
          src={appwriteService.getFileView(featuredImage)}
          alt={title}
          className="w-full h-44 object-cover bg-slate-100"
        />
        <h2 className="text-lg font-semibold p-4">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
