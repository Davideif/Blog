'use client'

import React from 'react'

const EditPostButton = () => {
  
  const handleEdit = () => {
    console.log("Edit button clicked")
    
  }

  return (
    <button
    onClick={handleEdit}
    className="px-4 py-1.5 rounded-lg border border-border text-text-primary text-sm font-medium hover:bg-surface-muted transition-colors cursor-pointer"
  >
    Edit
  </button>
  )
}

export default EditPostButton
