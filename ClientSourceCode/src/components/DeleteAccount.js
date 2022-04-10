import React from 'react'

export default function DeleteAccount(props) {
    return (
     <div className="containerTwo">
        <form className="form-inline">
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Delete Account</label>
            <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                <option selected>Choose...</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <button type="submit" className="btn btn-primary my-1">Submit</button>
        </form>
     </div>
  )
}