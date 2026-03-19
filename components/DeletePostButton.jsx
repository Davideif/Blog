'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const DeletePostButton = ({ postId }) => {
  const router = useRouter()

  const handleDelete = async () => {
    // 1. Ask for confirmation
    const wantsToDelete = confirm("Are you sure you want to delete this post?")

    if (!wantsToDelete) {
      return   // Stop if they clicked "Cancel"
    }

    // 2. Safety check
    if (!postId) {
      console.error("Error: postId is missing")
      return
    }

    // 3. Delete the post
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
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeletePostButton
