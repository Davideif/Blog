'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const DeletePostButton = ({ postId }) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!postId) {
      console.error("Error: postId is missing")
      return
    }

    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    })

    if (res.ok) {
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
