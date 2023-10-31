import { useState, useRef } from "react"
import Header from "./Header"
import { validateFormData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const handleButtonClick = () => {
        // validateFormData
        const message = validateFormData(email.current.value, password.current.value)
        setErrorMessage(message)
        // console.log(message)
        if (message) return;
        if (!isSignInForm) {
            // signup  logic 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));
                        // Profile updated!
                        navigate("/browse")
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });
                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMesg = error.message;
                    setErrorMessage(errorCode + "-" + errorMesg)
                    // ..
                });
        }
        else {
            //  signin logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMesg = error.message;
                    setErrorMessage(errorCode + "-" + errorMesg)
                });
        }

    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="bg-logo"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-4/12 p-12 my-36 mx-auto right-0 left-0
             bg-black absolute text-white rounded-lg bg-opacity-80">

                <h1 className="text-3xl font-bold m-4 py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm ? <input
                    className="m-4 p-3 w-full rounded-lg bg-gray-700"
                    type="text"
                    placeholder="Full Name"
                    ref={name}
                /> : null}
                <input
                    className="m-4 p-3 w-full rounded-lg bg-gray-700"
                    type="text"
                    placeholder="Email Address"
                    ref={email}
                />
                <input
                    className="m-4 p-3 w-full rounded-lg  bg-gray-700"
                    type="password"
                    placeholder="Password "
                    ref={password}
                />
                <p className="text-red-500 font-bold text-lg py-2 mx-4">{errorMessage}</p>
                <button
                    className="mx-4 my-8  py-4 w-full bg-red-500 rounded-lg"
                    onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className="mx-4 p-4 cursor-pointer"
                    onClick={toggleSignInForm}
                >{
                        isSignInForm
                            ? "New to Netflix? Sign Up now..."
                            : "Already Registered ? Sign In Now "
                    } </p>
            </form>
        </div>

    )
}

export default Login