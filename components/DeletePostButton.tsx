'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const DeletePostButton = ({ postId }: { postId?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const wantsToDelete = confirm("Are you sure you want to delete this post?")

    if (!wantsToDelete) {
      return   
    }

    if (!postId) {
      console.error("Error: postId is missing")
      return
    }

    setLoading(true) 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${postId}`, {
      method: "DELETE",
    })

    if (res.ok) {
      toast.success('Post deleted')
      router.refresh()
    } else {
      console.error("Delete failed")
      setLoading(false)
    }
  }

  return (
   <button
    onClick={handleDelete}
    disabled={loading}
    className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Deleting..." : "Delete"}
  </button>
  )
}

export default DeletePostButton
