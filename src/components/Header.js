import { signOut,onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants"
const Header = () => {
  const user = useSelector(store => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSignOut =()=>{
    signOut(auth).then(() => {})
    .catch((error) => {
      navigate("/error")
    })
  }

  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL
            }));
            navigate("/browse")
        } else {
            dispatch(removeUser());
            navigate("/")
        }
    });
    // unsubscribe when component will unmount
    return ()=> unsubscribe()
}, [])
  return (
    <div className=" absolute w-screen px-10 py-3 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
        className="w-44 "
        src={LOGO}
        alt="logo"
        />
        {user && (<div className="flex m-3 ">
        <img
        className="w-12 h-12"
        alt="user-logo"
        src={user.photoURL}
        />
        <button
        className="text-white font-bold"
        onClick={handleSignOut}
        >(sign out)
        </button>
        </div>)}
    </div>
  )
}

export default Header