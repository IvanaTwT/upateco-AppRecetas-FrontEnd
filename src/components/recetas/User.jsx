import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

export default function User({ id }) {

    const { isAuthenticated, token } = useAuth("state");
    const [user, setUser] = useState(null);

    const [
        {
            data: dataUser,
            isError: isErrorUser,
            isLoading: isLoadingUser,
        },
        doFetchUser,
    ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/profiles/${id}/`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }  
        }
    );

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Fetching user data...");
            doFetchUser();
        }
    }, [id, isAuthenticated]);

    useEffect(() => {
        console.log("Data fetched:", dataUser);
        if (dataUser) {
            setUser(dataUser);
        }
    }, [dataUser]);

    if (isLoadingUser) return <p>Loading...</p>;
    if (isErrorUser) return <p>Usuario eliminado</p>;

    return (
        <div>
            {user ? (
                <p>{user.first_name} {user.last_name}</p>
            ) : (
                <p>Usuario eliminado</p>
            )}
        </div>
    );
}