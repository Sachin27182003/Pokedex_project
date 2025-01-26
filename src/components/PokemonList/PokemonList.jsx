import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    // const [pokedexUrl, setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

   const [pokemonListState, setPokemonListState] = useState({
            pokemonList: [],
            pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
            isLoading: null,
            nextUrl: '',
            prevUrl: ''
   });

    async function dawnloadPokemons(){
        //setIsLoading(true);
        setPokemonListState((state)=> ({...state, isLoading: true}));
        
        const response = await axios.get(pokemonListState.pokedexUrl);  //this dawnloads list of 20 pokemons

        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
    
        //setPokemonListState((state)=> ({...state, nextUrl: response.data.next, prevUrl: response.data.previous}));
 
        //console.log(pokemonListState.nextUrl);
        //console.log(pokemonListState.prevUrl);
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

        // setPokemonList(result);
        // setIsLoading(false);

        setPokemonListState((state)=> ({...state, pokemonList: result, isLoading: false, nextUrl: response.data.next, prevUrl: response.data.previous }));
    }
    useEffect(() => {
        dawnloadPokemons();
    }, [pokemonListState.pokedexUrl])

    console.log(pokemonListState);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-list">List of pokemons </div> 
            
            <div className="pokemon-wrapper" >
                {(pokemonListState.isLoading) ? 'Loading...' : pokemonListState.pokemonList.map((pokemon) => <Pokemon name={pokemon.name} img={pokemon.Image} Id={pokemon.Id} key={pokemon.Id}/>)}
            </div>
        <div className="pagination">
            {/* <button style={{display: pokemonListState.isLoading ? 'none' : '' }} disabled={!pokemonListState.prevUrl} onClick={()=> setpokedexUrl(prevUrl)}>prev</button> */}
            <button style={{display: pokemonListState.isLoading ? 'none' : '' }} disabled={!pokemonListState.prevUrl} onClick={()=> setPokemonListState((state)=>({...state, pokedexUrl: state.prevUrl}))}>prev</button>
            
            
            {/* <button style={{display: pokemonListState.isLoading ? 'none' : '' }} disabled={!pokemonListState.nextUrl} onClick={()=>setpokedexUrl(nextUrl)}>next</button> */}
            <button style={{display: pokemonListState.isLoading ? 'none' : '' }} disabled={!pokemonListState.nextUrl} onClick={()=> setPokemonListState((state)=> ({...state, pokedexUrl: state.nextUrl}))}>next</button>
        </div>    
        </div>
    )
}

export default PokemonList; 