import { useEffect, useState } from "react";

//hooks always start with use

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

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

    return (
        <section>
            <h4>Find People</h4>
            <h5>Check out who just joined! </h5>
            <input onChange={(e) => setSearchTerm(e.target.value)} />

            <ul>
                {users.map((user, id) => (
                    <li className="users-list" key={id}>
                        <p>
                            {user.first} {user.last}
                        </p>
                        <img className="users" src={user.profile_pic}></img>
                        <p></p>
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
