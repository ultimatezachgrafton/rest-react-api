import React from "react";


function Table (props){
    let tableRows = [];

    for(let i = 0; i < props.characters.length; i++){
        let character = props.characters[i];
        let planet = props.planets[i];
        let race = props.species[i];
        tableRows.push(<tr key={character.name}>
                            <td>{character.name}</td>
                            <td>{character.birth_year}</td>
                            <td>{character.height}</td>
                            <td>{character.mass}</td>
                            <td>{planet}</td>
                            <td>{race}</td>
                        </tr>);
    }

    return(
        <table className="table table-dark">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Homeworld</th>
                    <th>Species</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
    
}

export default Table;