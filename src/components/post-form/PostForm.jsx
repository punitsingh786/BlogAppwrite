import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import appwriteService from "../../appwrite/config"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"

// Appwrite row IDs: a-z A-Z 0-9 . - _ , max 36 chars, can't start with a symbol
const slugTransform = (value) => {
  if (value && typeof value === "string") {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .slice(0, 36)
  }
  return ""
}

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const submit = async (data) => {
    setError("")
    setSubmitting(true)
    let uploaded = null
    try {
      if (post) {
        uploaded = data.image?.[0] ? await appwriteService.uploadFile(data.image[0], post.userId) : null
        if (data.image?.[0] && !uploaded) throw new Error("Image upload failed. Check your Appwrite bucket permissions.")

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: uploaded ? uploaded.$id : undefined,
        })

        if (uploaded) appwriteService.deleteFile(post.featuredImage)
        navigate(`/post/${dbPost.$id}`)
      } else {
        uploaded = await appwriteService.uploadFile(data.image[0], userData.$id)
        if (!uploaded) throw new Error("Image upload failed. Check your Appwrite bucket permissions.")

        const dbPost = await appwriteService.createPost({
          ...data,
          slug: data.slug.replace(/-+$/, ""),
          featuredImage: uploaded.$id,
          userId: userData.$id,
        })

        navigate(`/post/${dbPost.$id}`)
      }
    } catch (err) {
      // remove the uploaded image if the post could not be saved
      if (uploaded) appwriteService.deleteFile(uploaded.$id)
      setError(err.message || "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  const transform = useCallback(slugTransform, [])

  useEffect(() => {
    if (post) return // slug (row ID) can't change on edit
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transform(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, transform, setValue, post])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          readOnly={!!post}
          {...register("slug", { required: true })}
          onInput={(e) => {
            if (!post) setValue("slug", transform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={submitting}
          bgColor={post ? "bg-green-600 hover:bg-green-700" : undefined}
          className="w-full disabled:opacity-60"
        >
          {submitting ? "Saving..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}