import {  useState } from "react";
import { handleLogin } from "../data/LoginUser";
import { logdin } from "../data/Atom";
import { useRecoilState } from "recoil";
import "../../style/login.css";


const LoginForm = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLogdin, setLogdin] = useRecoilState(logdin);

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userName, userPassword);

        try{
            const response = await handleLogin(userName, userPassword)
            if(response){
                sessionStorage.getItem('jwt');
                setLogdin(true)
            }
           
        }catch (error){
            console.log(error.message);
            setLogdin(false)
        }


    }
    
    


    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value)
    }


    return (
        <>
        {isLogdin ? null :
        
        
            <form onSubmit={handleSubmit} className="main-form" >
                <div className="form-div">
                

                        <h2>Logga In</h2>
                  
               

                    <div className="input-div">
                        <label htmlFor="name">Användarnamn</label>
                        <input id="name" type="text" value={userName} placeholder="Användarnamn" onChange={handleUserNameChange} />
                    </div>

                    <div className="input-div">
                        <label htmlFor="password">Lösenord</label>
                        <input id="password" type="password" placeholder="Lösenord" value={userPassword} onChange={handleUserPasswordChange} />
                    </div>

                    <div className="login-div">
                   <button type="submit" className="login-btn">Logga in</button>
                    </div>
                </div>
            </form>
            }
        </>
    );
};

export default LoginForm;