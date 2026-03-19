'use client'

import React from 'react'

const EditPostButton = () => {
  
  const handleEdit = () => {
    console.log("Edit button clicked")
    
  }

  return (
    <button onClick={handleEdit}>Edit</button>
  )
}

export default EditPostButton
