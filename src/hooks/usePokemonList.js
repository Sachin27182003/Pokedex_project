import axios from "axios";
import { useState, useEffect } from "react";
function usePokemonList() {

      const [pokemonListState, setPokemonListState] = useState({
                pokemonList: [],
                pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
                isLoading: null,
                nextUrl: '',
                prevUrl: ''
       });
    
       async function dawnloadPokemons(){
       
        setPokemonListState((state)=> ({...state, isLoading: true}));
        
        const response = await axios.get(pokemonListState.pokedexUrl);  //this dawnloads list of 20 pokemons

    
 
        const pokemonResults = response.data.results; // we get the array of pokemon from results

        // Iterating over the array of pokemons, and using their url, to create an array of promises
        // that will dawnload those 20 pokemons
    
            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }))
        
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // passing that promises array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detailed data
    
            // now itearte on the data of each pokemon, and extract id, name, image, types
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon =  pokeData.data;
                return {
                    Id: pokemon.id,
                    name: pokemon.name,
                    Image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types
                }
            });
    
    
            setPokemonListState((state)=> ({
                ...state,
                pokemonList: pokeListResult,
                isLoading: false, 
            }));
        

    }

    useEffect(() => {
            dawnloadPokemons();
        }, [pokemonListState.pokedexUrl])
    
    return {pokemonListState, setPokemonListState};
}

export default usePokemonList;