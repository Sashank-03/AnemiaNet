import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import "./Auth.css";
import backgroundImage from '../../images/bg3.jpg'; // Adjust the path to your image file



const SignIn = ({ updateState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const showErrmsg = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        showErrmsg.current.textContent = error.message; // Displaying error message
        showErrmsg.current.style.width = "auto";
        showErrmsg.current.style.height = "auto";
        showErrmsg.current.style.padding = "0.5rem 1.5rem";
        setTimeout(() => {
          // Setting a timeout to hide the error message after 4 seconds
          showErrmsg.current.style.width = "0px";
          showErrmsg.current.style.height = "0px";
          showErrmsg.current.style.padding = "0";
          showErrmsg.current.textContent = "";
        }, 4000);
      });
  };

  const forgotPass = async () => {
    try {
      showErrmsg.current.textContent =
        "Password reset email sent successfully!"; // Displaying message
      showErrmsg.current.style.width = "auto";
      showErrmsg.current.style.height = "auto";
      showErrmsg.current.style.padding = "0.5rem 1.5rem";
      setTimeout(() => {
        // Setting a timeout to hide the error message after 4 seconds
        showErrmsg.current.style.width = "0px";
        showErrmsg.current.style.height = "0px";
        showErrmsg.current.style.padding = "0";
        showErrmsg.current.textContent = "";
      }, 4000);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      showErrmsg.current.textContent = error.message; // Displaying error message
      showErrmsg.current.style.width = "auto";
      showErrmsg.current.style.height = "auto";
      showErrmsg.current.style.padding = "0.5rem 1.5rem";
      setTimeout(() => {
        // Setting a timeout to hide the error message after 4 seconds
        showErrmsg.current.style.width = "0px";
        showErrmsg.current.style.height = "0px";
        showErrmsg.current.style.padding = "0";
        showErrmsg.current.textContent = "";
      }, 4000);
    }
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${backgroundImage})` }}>

    <div className="login-box">
      <div className="login-header">
        <header>Log In to your Account</header>
      </div>
      <div className="input-box">
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-box">
        <input
          className="input-field"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="forgot">
        <section>
          <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </label>
        </section>
        <section>
        <p onClick={forgotPass}>Forgot password</p>
                </section>
      </div>
      <div className="input-submit">
        <button className="submit-btn" id="submit" onClick={signIn}></button>
        <label>Sign In</label>
      </div>
      <div className="sign-up-link">
        <p>Don't have account? </p>
        <p className="toggle" onClick={updateState}>
          Sign Up
        </p>
      </div>
    </div>
    <div className="errormsg" ref={showErrmsg}></div>
    </div>
  );
};

export default SignIn;
