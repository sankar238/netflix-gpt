
export const validateFormData = (email,password)=>{
 const isEmailValid =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ .test(email)
 const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
 if(!isEmailValid) return "email is not valid"
 if(!isPasswordValid) return "password is not valid"
 return null
}