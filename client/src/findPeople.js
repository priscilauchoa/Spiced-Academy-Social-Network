import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//hooks always start with use

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then(({ rows }) => {
                setUsers(rows);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        let abort = false;
        fetch(`/users/${searchTerm}` || `/users/${""}`)
            .then((res) => res.json())
            .then(({ rows }) => {
                if (!abort) {
                    console.log("search rows", rows);
                    setUsers(rows);
                }
            });

        return () => (abort = true);
    }, [searchTerm]);

    const handleClick = (e) => {
        const id = e.target.id;
        history.push(`user/${id}`);
    };

    return (
        <section className="find-people">
            <h4>Find People</h4>
            <h5>Check out who just joined! </h5>
            <input
                placeholder="Search 🔍"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul>
                {users.map((user) => (
                    <li className="users-list" key={user.id}>
                        <img
                            id={user.id}
                            className="users"
                            src={user.profile_pic}
                            onClick={handleClick}
                        ></img>
                        <div>
                            <h1>
                                {user.first} {user.last}
                            </h1>

                            <p>{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

//
{
    /* <input onChange={(e) => setSearchTerm(e.target.value)} />
            <div>{searchTerm}</div> */
}
