import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { server } from "../../redux/store.js";
import {toast}  from "react-hot-toast";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [photo, setPhoto] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(
        firstName,
        lastName,
        location,
        occupation,
        photo,
        email,
        password
      );

      const { data } = await axios.post(
        `${server}/auth/register`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          location: location,
          occupation: occupation,
          picturePath: photo.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setOccupation("");
      setLocation("");
      setPhoto({});
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
  };

  return (
    <section className='loginpage'>
      <div className='logindiv'>
        <div className='head'>
          <h1 id='logo'>JustPostIT</h1>
          <h1 id='login'>Register</h1>
        </div>
        <div id='l_des'>Welcome To the Family</div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='formName'>
            <div className='inp_name'>
              <div>
                <span className='name_placeholder'>FirstName</span>
              </div>
              <input
                type='text'
                name='firstName'
                value={firstName}
                required
                className='username text'
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className='inp_name'>
              <div>
                <span className='name_placeholder'>LastName</span>
              </div>
              <input
                type='text'
                name='lastName'
                value={lastName}
                required
                className='username text'
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='inp_name'>
            <div>
              <span className='name_placeholder'>Location</span>
            </div>
            <input
              type='text'
              name='location'
              value={location}
              required
              className='username text'
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <div className='inp_name'>
            <div>
              <span className='name_placeholder'>Occupation</span>
            </div>
            <input
              type='text'
              name='occupation'
              value={occupation}
              required
              className='username text'
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
            />
          </div>
          <div className='dropZone'>
            <Dropzone
              acceptedFiles='.jpg,.jpeg,.png'
              multiple={false}
              onDrop={(acceptedFiles) => setPhoto(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {photo.name ? (
                      <p>{photo.name}</p>
                    ) : (
                      <p> Drag Or Click To Upload Profile Picture</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

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
          <div className='inp_name'>
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
            <Link className='continue' to={"/"}>
              Login
            </Link>
            <button type='submit' className='continue'>
              Register now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Register;
