import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterTable from "./components/CharacterTable";
import SearchBar from "./components/SearchBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            characters: [],
            planets: [],
            species: [],
            characterName: "",
        }

        this.loadCharacters = this.loadCharacters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchCharacter = this.searchCharacter.bind(this);
    }

    async componentDidMount() {
        let planetsArray = [];
        let speciesArray = [];
        this.setState({ loading: true });

        let response = await fetch("https://swapi.dev/api/people/");
        let data = await response.json();

        for (let character of data.results) {
            let planetURL = character.homeworld.replace("http", "https");
            let planetResponse = await fetch(planetURL);
            let planetData = await planetResponse.json();
            planetsArray.push(planetData.name);

            let speciesURL = (character.species.length < 1) ? "https://swapi.dev/api/species/1/" : character.species[0].replace("http", "https");
            let speciesResponse = await fetch(speciesURL);
            let speciesData = await speciesResponse.json();
            speciesArray.push(speciesData.name);
        }

        this.setState({
            loading: false,
            characters: [...data.results],
            planets: planetsArray,
            species: speciesArray,
        })
    }

    async loadCharacters(pageNumber) {
        let response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}&search=${this.state.nameSearch}`);
        let data = await response.json();
        this.setState({
            characters: data,
        });
    }

    async searchCharacter(event) {
        event.preventDefault();
        let response = await fetch(`https://swapi.dev/api/people/?search=${this.state.nameSearch}`)
            .then(res => res.json());
        this.setState({
            characters: response.results,
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    render() {
        return (
            <div className="App">
                <div class="topnav">
                    <h1>Star Wars Character Database</h1>
                    <SearchBar
                        characterSearch={this.state.characterSearch}
                        searchCharacter={this.searchCharacter}
                        handleChange={this.handleChange} />
                </div>
                <div class="character-table">
                    {(this.state.loading) ? "... completing Kessel Run ..." :
                        <CharacterTable
                            key={this.state.characters}
                            characters={this.state.characters}
                            planets={this.state.planets}
                            species={this.state.species} />}
                </div>
            </div>
        );
    }
}

export default App