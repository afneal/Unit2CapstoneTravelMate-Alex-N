import { useState } from "react";



function UserLogin({ isLoggedIn, setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);


    const handleLogin = async () => {
        await fetch(`http://localhost:8080/api/users/login`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        const response = await response.json();

        if (response.ok) {
            setIsLoggedIn(true);
        } else {
            throw new Error(
                response.message || `ERROR - Status ${response.status}`,
            );
        }

        setPassword("");
    }

    const handleRegisterUser = async () => {
        await fetch(`http://localhost:8080/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        })

        const response = await response.json();

        if (response.CREATED) {
            setIsLoggedIn(true);
        } else {
            throw new Error(
                response.message || `ERROR - Status ${response.status}`,
            );
            setUsername("");
            setPassword("");
        }
    }



    return (
        <div className="user-login-form">
            {!isNewUser ? (
                <>
                    <h1>Log In</h1>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)} />


                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button onClick={handleLogin}>Login</button>

                    <p>Don't have an account?</p>
                    <button onClick={setIsNewUser(true)}>Create Account</button>
                </>
            ) : (
                <>
                    <h1>Create an Account</h1>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)} />

                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleRegisterUser}>Create Account</button>
                </>
            )
            }
        </div>
    )
}

export default UserLogin;