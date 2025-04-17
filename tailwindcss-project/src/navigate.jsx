import { Outlet } from "react-router";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Navigate=()=>{
  return(
   <>
   <Header></Header>
   <main className="pt-15 sm:pt-20  scroll-smooth text-black bg-gray-100"> 
        <Outlet />
   </main>
   <Footer></Footer>
   </>
  )
}
export default Navigate;