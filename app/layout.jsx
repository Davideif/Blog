import "@/app/globals.css";
import React from 'react'
import Navbar from "@/components/Navbar";

const RootLayout = ({children}) => {
  return (
<html>
<body>
<Navbar/>
{children}
</body>
</html>
  )
}

export default RootLayout