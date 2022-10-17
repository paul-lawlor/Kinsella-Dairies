const Login = () => {
    return (
        <>
        <div className="signup-area">
            <div className="form-area">
                <form className="p-2">
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
                    <div className="mb-4 mx-1 input-medium">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                        /> 
                    </div>

        
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    </div>
                    <p className="forgot-password text-right">
                    Don't have an account yet? <a href="/Signup">Sign-up</a>
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

export default Login;