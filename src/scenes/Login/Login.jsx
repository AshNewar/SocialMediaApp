import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-hot-toast";
import { server } from "../../redux/store.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/reducers/authReducers";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const { data } = await axios.post(
        `${server}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setLogin({
        user:data.user,
        token:data.token,
      }));

      toast.success(data.message);
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className='loginpage'>
      <div className='logindiv'>
        <div className='head'>
          <h1 id='logo'>CUPS!</h1>
          <h1 id='login'>Login</h1>
        </div>
        <div id='l_des'>Please enter your credentials here</div>
        <form onSubmit={handleSubmit}>
          <div className='inp_name'>
            <div>
              <span className='name_placeholder'>Email</span>
            </div>
            <input
              type='email'
              name='email'
              value={email}
              required
              className='username'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='inp_name' id='pass_inp_name'>
            <div>
              <span className='name_placeholder'>Password</span>
            </div>
            <input
              type='password'
              name='password'
              value={password}
              required
              className='username'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className='bottom'>
            <Link className='continue' to={"/register"}>
              Register
            </Link>
            <button type='submit' className='continue'>
              Login now
            </button>
          </div>
        </form>
        <div className='googlelogin'>OR</div>
        <div className='googlelogin continue'>
          <div className='googlespan'>
            <GoogleIcon size={23} />
            <p id='googletext'> Login with Google</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
