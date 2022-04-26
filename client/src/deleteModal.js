export default function DeleteUser() {
    const handleClickDelete = () => {
        console.log("Botao clikado");
        fetch("/delete-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                location.reload("/");
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const handleCloseModal = () => {
        console.log("click delete button");
        location.reload("/profile");
    };
    return (
        <>
            <section className="modal">
                <section className="modal-content center">
                    <h1>Are you sure you want delete your account? ⚠️ </h1>
                    <div>
                        <button onClick={handleClickDelete}>Yes</button>
                        <button onClick={handleCloseModal}>No</button>
                    </div>
                </section>
            </section>
        </>
    );
    // } else if (!modalOpened) {
    //
    // }
    // };
    // open modal here-- ceretza que quer deletar?
}
