import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetails from "../../hooks/usePokemonDetails";



function PokemonDetails(){


    const {id} = useParams();
    const [pokemon] = usePokemonDetails(id);



       return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image}/> 
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-weight">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-height">Height: {pokemon.height}</div>
            <div className="pokemon-details-types-heading">Types:</div>
            <div className="pokemon-details-types">
            {pokemon.types &&pokemon.types.map((t) => <li key={t}> {t} </li>)}
            </div>

            {pokemon.types && pokemon.similarPokemons && 
            <div>
                More {pokemon.types[0]} type pokemons 

              <ul>
                {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}> {p.pokemon.name} </li>)}
                </ul>    
                </div>
            }
        </div>
    )

    
}

export default PokemonDetails;