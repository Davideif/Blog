import "@/app/globals.css";
import React from 'react'
import  {ToastContainer} from 'react-toastify';


import Navbar from "@/components/Navbar";

const RootLayout = ({children}) => {
  return (
<html>
<body>
<ToastContainer/>    
<Navbar/>
{children}
</body>
</html>
  )
}

export default RootLayout