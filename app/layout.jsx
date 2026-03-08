import "@/app/globals.css";
import React from 'react'
import AuthProvider from "@/components/AuthProvider";
import  {ToastContainer} from 'react-toastify';


import Navbar from "@/components/Navbar";

const RootLayout = ({children}) => {
  return (
<AuthProvider>
<html className="dark">
<body>
<ToastContainer/>    
<Navbar/>
{children}
</body>
</html>
</AuthProvider>
  )
}

export default RootLayout