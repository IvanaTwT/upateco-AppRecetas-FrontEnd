import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileImageModal from "./ProfileImageModal";
import defaultUserImage from "./logo-user.png";
import { formatDateTime } from "../hooks/utils";
import Swal from "sweetalert2";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdating, setErrorUpdating] = useState(false);

    const { token } = useAuth("state");

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const dobRef = useRef(null);
    const bioRef = useRef(null);
    const userStateRef = useRef(null);

    const doFetch = async () => {
        setLoadingUpdate(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/profiles/${
                userData.user__id
            }/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: "Pau",
                    last_name: "Nicole",
                    email: emailRef.current.value,
                    dob: dobRef.current.value,
                    bio: bioRef.current.value,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo actualizar el usuario");
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setUserData(data);
                    setEditMode(!editMode);
                }
            })
            .catch(() => {
                setErrorUpdating(true);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al actualizar el perfil.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
            .finally(() => {
                setLoadingUpdate(false);
            });
    };

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        doFetch();
    }

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-8">
                    <div className="card">
                        {userData ? (
                            <>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-left">
                                            <figure className="image is-128x128">
                                                <img
                                                    src={
                                                        userData.image
                                                            ? `${import.meta.env.VITE_API_BASE_URL}${userData.image}`
                                                            : defaultUserImage
                                                    }
                                                    alt="Profile image"
                                                    style={{
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <p className="title is-3 pb-2">
                                                {firstNameRef.current?.value ||
                                                    userData.first_name}{" "}
                                                {lastNameRef.current?.value ||
                                                    userData.last_name}
                                            </p>
                                            <p className="subtitle is-5">
                                                @{userData.username}
                                            </p>
                                            <div
                                                className="subtitle is-6"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {userData.state ? (
                                                    <>
                                                        <img
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_API_BASE_URL
                                                            }/${
                                                                userData.state
                                                                    .icon
                                                            }`}
                                                            alt="State icon"
                                                            style={{
                                                                height: "20px",
                                                                marginRight:
                                                                    "5px",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                        />
                                                        {userData.state.name}
                                                    </>
                                                ) : (
                                                    <span>
                                                        Estado: No especificado
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="button is-primary"
                                            onClick={handleEditMode}
                                        >
                                            {!editMode ? "Editar" : "Salir"}
                                        </button>
                                    </div>

                                    <form
                                        className="content"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="field">
                                            <label className="label">
                                                Email:
                                            </label>
                                            <div className="control">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    id="email"
                                                    name="email"
                                                    ref={emailRef}
                                                    defaultValue={
                                                        userData.email
                                                    }
                                                    disabled={!editMode}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">
                                                Fecha de Nacimiento:
                                            </label>
                                            <div className="control">
                                                    <input
                                                        type="date"
                                                        className="input"
                                                        id="dob"
                                                        name="dob"
                                                        ref={dobRef}
                                                        defaultValue={
                                                            userData.dob || ""
                                                        }
                                                        disabled={!editMode}
                                                    />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">
                                                Biografía:
                                            </label>
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    id="bio"
                                                    name="bio"
                                                    ref={bioRef}
                                                    defaultValue={
                                                        userData.bio ||
                                                        "No especificado"
                                                    }
                                                    disabled={!editMode}
                                                />
                                            </div>
                                        </div>

                                        {editMode ? (
                                            <div className="field">
                                                <button
                                                    className="button is-primary is-fullwidth"
                                                    type="submit"
                                                >
                                                    Enviar
                                                </button>
                                            </div>
                                        ) : null}

                                        <hr />
                                        <span className="is-italic is-size-7">
                                            Creado:{" "}
                                            {formatDateTime(
                                                userData.created_at
                                            )}
                                        </span>
                                        <br />
                                        <span className="is-italic is-size-7">
                                            Actualizado:{" "}
                                            {formatDateTime(
                                                userData.updated_at
                                            )}
                                        </span>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <p className="subtitle">
                                No se encontraron datos del usuario.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
