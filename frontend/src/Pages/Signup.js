import './App.css';

const Signup = () => {
    return (
    <>
        <div className="signup-area">
            <div className="form-area">
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

                    {/* Phone */}

                    <div className="input-medium mb-4 mx-1">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                        />
                    </div>
                    
                    {/* Address */}

                    <div className="mb-1 mx-1">
                        <label> Address Line 1 </label>
                        <input
                        type = "text"
                        className="form-control"
                        placeholder="Enter Address Line 1"
                        />
                    </div>
                    
                    <div className="mb-1 mx-1">
                        <label> Address Line 2 </label>
                        <input
                        type = "text"
                        className="form-control"
                        placeholder="Enter Address Line 2"
                        />
                    </div>

                    

                    {/* Postcode */}
                    <div className="input-small mb-4 mx-1">
                        <label> Postcode </label>
                        <input
                        type = "text"
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
                        /> 
                    </div>
                    <div className="mb-4 mx-1 input-medium">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                        /> 
                    </div>

                    {/* Referral Code */}

                    <div className="mb-5 mx-1 input-medium">
                        <label>Referral Code (Optional)</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Referral Code"
                        /> 
                    </div>

                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
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