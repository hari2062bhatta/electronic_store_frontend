import { Routes , Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast"

const App=()=>{


  return <div>
    <Toaster/>
    <Routes>
  
    <Route path="/" element={<h1>this is home page </h1>}/> 
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>
  </div>

}

export default App;