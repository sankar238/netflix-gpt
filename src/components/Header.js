import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants"
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice"
const Header = () => {
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store=> store.gpt.showGptSearch);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut(auth).then(() => { })
      .catch((error) => {
        navigate("/error")
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe()
  }, [])

  const handelGptSearchClick = ()=>{
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className=" absolute w-screen px-10 py-3 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44 "
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex p-3 ">
          {showGptSearch && <select 
          className="p-2 m-2 bg-gray-800 text-white rounded-lg"
          onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=>
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button 
          className="px-4 py-2 mx-4 my-2 text-white bg-purple-800 rounded-lg"
          onClick={handelGptSearchClick}>
           {showGptSearch ? "WatchPage" :"GPT Search"}
          </button>
          <img
            className="w-12 h-12 rounded-3xl"
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