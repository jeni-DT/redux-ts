type GreetProps ={
    name:string
    age: number
    isLoggedIn: boolean
}
export const Greet =(props:GreetProps)=>{
    return (
        <div>
            <h1>
                {
                    props.isLoggedIn ?  `Hiii ${props.name} your age is ${props.age}`
                    :"Welcome"
                }
                </h1>
               
        </div>
    )
}