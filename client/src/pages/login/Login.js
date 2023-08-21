import axios from "axios";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";


const Login = () => {
    const [credentials , setCredentials] = useState({
        username : undefined,
        password : undefined,
    });

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        try{
            const res  = await axios.post("/auth/login" , credentials);
            dispatch({ type: "LOGIN_SUCCESS" , payload: res.data.details});
            navigate("/")
        } catch(err){
            dispatch({ type: "LOGIN_FAILURE" , payload: err.response.data});
        }
    };
 
    

  return (
    <div className="login">
        <div className="lContainer">
            <input 
            type="text"
            placeholder="userNAME" 
            id= "username"
            onChange = {handleChange}
            className="lInput"
            />
             <input 
             type="password"
            placeholder="PASSword" 
            id= "password"
            onChange = {handleChange}
            className="lInput"
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
                Login
            </button>
            {error && <span>{error.message}</span> }
        </div>
    </div>
  );
};

// 584206023366-m9ses9ud1dm4k10afk4dkivvff1ksbvg.apps.googleusercontent.com
// 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


export default Login;
