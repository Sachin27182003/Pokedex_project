import './Pokemon.css'
function Pokemon({name, img, Id}){
 
    return(
        <div className='pokemon'>
            <div className='pokemon-name'>{Id}. {name} </div>
            <div className='pokemon-image-wrapper'>
                <img className='pokemon-image' src={img} />
            </div>
        </div>
    )
}

export default Pokemon;