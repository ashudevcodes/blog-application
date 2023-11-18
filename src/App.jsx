import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"

function App() {
  const [loading, setloding] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.grtCurrentuser().then((userdata) => {
      if (userdata) {
        dispatch(login({ userdata }))
      } else {
        dispatch(logout())
      }
    }).finally(setloding(false))
  },[])


  return !loading ? <div className="min-h-screen flex flex-wrap content-between bg-gray-400"><div className="w-full block"><Header />
  <main>YOU LOG IN</main>
    <Footer />

  </div></div> : <div>Loading... </div>
}

export default App
