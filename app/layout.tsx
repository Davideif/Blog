import "@/app/globals.css";
import AuthProvider from "@/components/AuthProvider";
import  {ToastContainer} from 'react-toastify';
import { Inter } from 'next/font/google'
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })


const RootLayout = ({children}: { children: ReactNode }) => {
  return (
    <html lang="en" className={`${inter.variable} font-sans bg-surface text-text-primary`}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ToastContainer />
          <Navbar/>
          <main className="flex-1 flex flex-col items-center w-full">
            {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout