import { useState } from "react";
import { useNavigate } from "react-router";



function UserLogin({ isLoggedIn, setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();




    const handleLogin = async () => {
        const response = await fetch(`http://localhost:8080/api/users/login`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json();

        if (response.ok) {
            setIsLoggedIn(true);
            setIsNewUser(false);
            setHasErrors(false);
            setErrorMessage("");
            navigate("/");
        } else {
            setHasErrors(true),
            setErrorMessage(data.message)
            setUsername("");
            setPassword("");
        }
    }

    const handleRegisterUser = async () => {
        const response = await fetch(`http://localhost:8080/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        const data = await response.json();

        if (response.ok) {
            setIsLoggedIn(true);
            setIsNewUser(false);
            setHasErrors(false);
            setErrorMessage("");
        } else {
            setHasErrors(true),
            setErrorMessage(data.message)

        }
    }

    



    return (
        <div className="user-login-form">
            {!isNewUser ? (
                <>
                    <h1>Log In</h1>
                    <input
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)} />


                    <input
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />

                    <button onClick={handleLogin}>Login</button>


                    <p>Don't have an account?</p>
                    <button onClick={() => {
                        setIsNewUser(true);
                        setErrorMessage("");
                        setHasErrors(false)
                    }}
                    >Create Account</button>
                    {hasErrors && <p className="error-message-login">{errorMessage}</p>}
                </>
            ) : (
                <>
                    <h1>Create an Account</h1>
                    <input
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)} />

                    <input
                        value={password}
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)} />
                    {hasErrors && <p className="error-message-register">{errorMessage}</p>}

                    <button onClick={handleRegisterUser}>Create Account</button>
                    <button onClick={ () => setIsNewUser(false)}>Back to Login</button>

                </>
            )
            }
        </div>
    )
}

export default UserLogin;