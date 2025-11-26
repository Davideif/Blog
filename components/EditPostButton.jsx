'use client'

import React from 'react'

const EditPostButton = () => {
  
  // handle edit logic here
  const handleEdit = () => {
    console.log("Edit button clicked")
    // navigate, open modal, etc.
  }

  return (
    <button onClick={handleEdit}>Edit</button>
  )
}

export default EditPostButton
