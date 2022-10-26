import React from 'react'

const OldLoginForm = () => {

  const ACCOUNT_REST_API_URL = "http://localhost:5000/login";

  const [form, setForm] = useState({

    phoneNumber: '',
    password: ''
});

const submitForm = async(e) => {

  e.preventDefault()

  const json = JSON.stringify(form);

  axios.post(ACCOUNT_REST_API_URL, json, {
      headers: {'Content-Type': 'application/json'}
  })
  .then(function (response) {
      console.log(response);
      //window.location.href = "http://localhost:3000/login"
  })
  .catch(function (error) {
      console.log(error);
  });

  return (
    <>
      <div className="signup-area">
        <div className="form-area">
          
          <form className="p-2" onSubmit={submitForm}>
            <h3>Login</h3>

            {/* Phone */}

            <div className="input-medium mb-4 mx-1">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
              />
            </div>

            {/* Password */}

            <div className="mb-1 mx-1 input-medium">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="d-grid">
            <button type="submit" className="btn btn-primary" >Sign Up</button>
            </div>
            </form>
            <p className="forgot-password text-right">
              Don't have an account yet? <a href="/Signup">Sign-up</a>
            </p>
        </div>
        <div className="info-area p-2">
          <p>Info here</p>
        </div>
      </div>
    </>
  );
}}

export default OldLoginForm