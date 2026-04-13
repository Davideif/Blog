'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const DeletePostButton = ({ postId }: { postId?: string }) => {
  const router = useRouter()

  const handleDelete = async () => {
  
    const wantsToDelete = confirm("Are you sure you want to delete this post?")

    if (!wantsToDelete) {
      return   
    }

    if (!postId) {
      console.error("Error: postId is missing")
      return
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${postId}`, {
      method: "DELETE",
    })

    if (res.ok) {
      toast.success('Post deleted')
      router.refresh()
    } else {
      console.error("Delete failed")
    }
  }

  return (
   <button
    onClick={handleDelete}
    className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
  >
    Delete
  </button>
  )
}

export default DeletePostButton
