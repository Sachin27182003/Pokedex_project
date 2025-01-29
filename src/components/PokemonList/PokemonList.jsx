import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){

    const {pokemonListState, setPokemonListState} = usePokemonList(false);

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