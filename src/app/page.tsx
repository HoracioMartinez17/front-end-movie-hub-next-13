import Login from '@/components/login/Login'
;
import { USER_URL } from '@/global/serverUrl';


const LoginPage= () => {
  console.log(USER_URL)
  return (
   <Login/>
  )
}

export default LoginPage