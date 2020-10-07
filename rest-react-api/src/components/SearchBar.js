import React from "react";

function SearchForm(props){

    return(
        <form onSubmit={props.searchCharacter} className="mb-3" id="search-bar">
            <input 
                type="text" 
                name="nameSearch" 
                value={props.nameSearch} 
                onChange={props.handleChange}
                placeholder="Enter Character Data..."
                required></input>
            <button id="submit-btn" type="submit" class="btn btn-dark">Submit</button>
        </form>
    )
}

export default SearchForm;