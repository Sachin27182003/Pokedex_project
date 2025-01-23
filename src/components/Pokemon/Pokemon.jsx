import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name, img, Id}){
 
    return(
        <div className='pokemon'>
            <div className='pokemon-name'>{Id}. {name} </div>
            <Link to = {`/pokemon/${Id}`}>
                <div className='pokemon-image-wrapper'>
                     <img  className='pokemon-image' src={img} />
                </div>
            </Link>
        </div>
        
    )
}

export default Pokemon;