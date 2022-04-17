import React from 'react'

export default function DeleteAccount(props) {

    //Form submit button pressed : fire app.js onSubmitBtnClicked
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitBtnClicked(e.target["selectedValue"].value.toString() === "1");
    }

    return (
     <div className="containerTwo">
        <form className="form-inline" onSubmit = {handleSubmit}>
            <label className="my-1 mr-2" htmlFor="selectedValue">Delete Account</label>
            <select defaultValue="2" className="custom-select my-1 mr-sm-2" id="selectedValue">
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <button type="submit" className="btn btn-primary my-1">Submit</button>
        </form>
     </div>
  )
}