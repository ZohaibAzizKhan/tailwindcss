import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router";


const Container=()=>{
  return(
   <>
   <Header/>
   <main className="pt-15 sm:pt-20  scroll-smooth text-black bg-gray-100"> 
        <Outlet />
   </main>
   <Footer/>
   </>
  )
}
export default Container;