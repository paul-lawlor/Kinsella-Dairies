import "./App.css";
import { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });


  const submitForm = () => {
    //get data - each element defined manually(DOM)
    //post request - post body (JSON)
    //log form state
    //cleanup
  }

  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>

      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>

      <label>
        Email:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p>
      <button type="submit" className="btn btn-primary" onClick={submitForm}>
                Sign Up
              </button>
    </>
  );
};

export default Signup;
