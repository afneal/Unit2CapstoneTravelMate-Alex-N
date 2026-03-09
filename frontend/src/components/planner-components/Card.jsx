
function Card({ children, className="" }) { //can style all "Cards" same way easily now

    return (
        <div className={className}>
            {children} 
        </div> //children are all the passed in items like button, input etc
    )
}

export default Card;