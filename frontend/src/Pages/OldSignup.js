import "./App.css";
import { useRef, useState, useEffect } from "react";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef(); //used for screen reader

  //password first attempt
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //password second attempt
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  //validates password
  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //sets error message
  useEffect(() => {
    setErrMsg('');
}, [pwd, matchPwd]);

const submitForm = () => {
  //get data - each element defined manually(DOM)
  //post request - post body (JSON)
  //log form state
  //cleanup
}

  return (
    <>
      <div className="signup-area">
        <div className="form-area">

        {/* //displays error message if there is one */}
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}</p>
                   

          <form className="p-2">
            <h3>Sign Up</h3>

            {/* Name */}

            <div className="mb-2 pt-2 d-flex">
              <div className="mx-1">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="mx-1">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}

            <div className="input-medium mb-4 mx-1">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            {/* Address */}

            <div className="mb-1 mx-1">
              <label> Address Line 1 </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address Line 1"
              />
            </div>

            <div className="mb-1 mx-1">
              <label> Address Line 2 </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address Line 2"
              />
            </div>

            {/* Postcode */}
            <div className="input-small mb-4 mx-1">
              <label> Postcode </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Postcode"
              />
            </div>

            {/* Password */}

            <div className="mb-1 mx-1 input-medium">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                id = "password"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              {/* paragraph to notify user of instructions */}
               <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            INFO
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span>@</span> <span>#</span> 
                                                        <span>$</span> <span>%</span>
                        </p>
            </div>
            <div className="mb-4 mx-1 input-medium">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              {/* paragraph to notify user of instructions */}
              <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={submitForm}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/Login">sign in?</a>
            </p>
          </form>
        </div>
        <div className="info-area p-2">
          <p>Info here</p>
        </div>
      </div>
    </>
  );
};

export default Signup;
