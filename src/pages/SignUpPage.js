import React, { useState } from "react";
import Header from "../components/common/Header";
import InputComponent from "../components/common/Input";
import Button from "../components/common/Button";
import SignupForm from "../components/SignupComponents/SignupForm.js/index.js";
import LoginForm from "../components/SignupComponents/LoginForm";

function SignUpPage() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to Login.
          </p>
        ) : (
          <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Don't have an account? Click here to signup.
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
