import React from 'react'

export default function DeleteAccount(props) {
    return (
     <div class="containerTwo">
        <form class="form-inline">
            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Delete Account</label>
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                <option selected>Choose...</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <button type="submit" class="btn btn-primary my-1">Submit</button>
        </form>
     </div>
  )
}