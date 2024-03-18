import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import "./Auth.css";
import backgroundImage from '../../images/bg3.jpg'; // Adjust the path to your image file



const SignUp = ({ updateState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div className="login" style={{ backgroundImage: `url(${backgroundImage})` }}>

    <div className="login-box">
      <div className="login-header">
        <header>Create Account</header>
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
          <p>Forgot password</p>
        </section>
      </div>
      <div className="input-submit">
        <button className="submit-btn" id="submit" onClick={signUp}></button>
        <label>Sign Up</label>
      </div>
      <div className="sign-up-link">
        <p>Already have account? </p>
        <p className="toggle" onClick={updateState}>
          Sign In
        </p>
      </div>
    </div>
    </div>

  );
};

export default SignUp;
