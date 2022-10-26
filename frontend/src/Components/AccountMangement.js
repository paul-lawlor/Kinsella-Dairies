import React from 'react'

const AccountMangement = () => {
  return (
    <>
        <h1>Accounts Management</h1>

        <form>
            <label>
            First name:
            <input
            type = "string"
            />
        </label>

        <label>
            Last name:
            <input
            type = "string"
            />
        </label>

        <label>
            Address Line 1:
            <input
            type = "string"
            />
        </label>

        <label>
            Address Line 2:
            <input
            type = "string"
            />
        </label>


        <label>
            Postcode:
            <input
            type = "string"
            />
        </label>

        <label>
            Phone Number:
            <input
            type = "string"
            />
        </label>

        <label>
            Password:
            <input
            type = "password"
            />
        </label>
        </form>
    </>
  )
}

export default AccountMangement