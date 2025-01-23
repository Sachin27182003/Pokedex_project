function Pokemon({name, img, Key}){
 
    return(
        <div>
            <div>{Key} {name} </div>
            <div><img src={img} /></div>
        </div>
    )
}

export default Pokemon;