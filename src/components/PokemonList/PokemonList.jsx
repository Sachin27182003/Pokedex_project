import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function dawnloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');  //this dawnloads list of 20 pokemons
        //console.log(response.data.results);
        const pokemonResults = response.data.results; // we get the array of pokemon from results

        // Iterating over the array of pokemons, and using their url, to create an array of promises
        // that will dawnload those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detailed data
        console.log(pokemonData.map((pokemon) => pokemon.data));

        // now itearte on the data of each pokemon, and extract id, name, image, types
        const result = pokemonData.map((pokeData) => {
            const pokemon =  pokeData.data;
            return {
                Id: pokemon.id,
                name: pokemon.name,
                Image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });

        console.log(result);
        setPokemonList(result);

        setIsLoading(false);
    }
    useEffect(() => {
        dawnloadPokemons();
    }, [])


    return (
        <div className="pokemon-list-wrapper">List of pokemons <br/><br/> {(isLoading) ? 'Loading...' : 
        pokemonList.map((pokemon) => <Pokemon name={pokemon.name} img={pokemon.Image} Key={pokemon.Id} />)
        }</div>
    )
}

export default PokemonList; 