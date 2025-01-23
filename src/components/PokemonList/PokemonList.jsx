import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    const [pokedexUrl, setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');


    async function dawnloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);  //this dawnloads list of 20 pokemons
        //console.log(response);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonResults = response.data.results; // we get the array of pokemon from results

        // Iterating over the array of pokemons, and using their url, to create an array of promises
        // that will dawnload those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detailed data
        //console.log(pokemonData.map((pokemon) => pokemon.data));

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

        //console.log(result);
        setPokemonList(result);

        setIsLoading(false);
    }
    useEffect(() => {
        dawnloadPokemons();
    }, [pokedexUrl])


    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-list">List of pokemons </div> 
            
            <div className="pokemon-wrapper" >
                {(isLoading) ? 'Loading...' : pokemonList.map((pokemon, idx) => <Pokemon name={pokemon.name} img={pokemon.Image} Id={pokemon.Id} key={idx}/>)}
            </div>
        <div className="pagination">
            <button style={{display: isLoading ? 'none' : '' }} disabled={!prevUrl} onClick={()=> setpokedexUrl(prevUrl)}>prev</button>
            <button style={{display: isLoading ? 'none' : '' }} disabled={!nextUrl} onClick={()=>setpokedexUrl(nextUrl)}>next</button>
        </div>    
        </div>
    )
}

export default PokemonList; 