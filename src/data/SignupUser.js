const handleSignup = async (username,password) =>{

    const userData ={
        name: username,
        password: password
    }

    const options = {
        method: 'POST',
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(userData)
    }

    const response = await fetch('/api/users', options)
    const data = await response.json()
    if(data){
        return true
    }
    
    return false

    

}

export {handleSignup}