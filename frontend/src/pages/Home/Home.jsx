import { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:9009/api/v8/g-book/posts")
            .then((res) => res.json())
            .then((posts) => {
                setData(posts);
                console.log(posts); // Korrekte Ausgabe der empfangenen Daten
            })
            .catch((err) => console.log("Could not fetch data", err));
    }, []);

    const deletePost = (id) => {
        const password = prompt(`Enter password to delete post: ${id}`);
        if (password) {
            fetch(`http://localhost:9009/api/v8/g-book/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            })
                .then((res) => res.json())
                .then((updatedPosts) => {
                    if (Array.isArray(updatedPosts)) {
                        setData(updatedPosts);
                    } else {
                        console.log("Invalid server response after deleting post");
                    }
                    console.log(id);
                })
                .catch((err) => console.log(err, "Could not delete post"));
        } else {
            console.log("No or wrong password. Post not deleted.");
        }
    };
    const sendPost = (e) => {
        e.preventDefault();
        const sendData = { firstName, lastName, email, message };

        fetch("http://localhost:9009/api/v8/g-book/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(sendData),
        })
            .then((res) => res.json())
            .then((newPost) => {
                setData(newPost);

                console.log(sendData);
                setFirstName("");
                setLastName("");
                setEmail("");
                setMessage("");
            })
            .catch((err) => console.log(err, "Could not add post."));
    };

    const maskEmail = (email) => {
        const atIndex = email.indexOf("@");
        const username = email.substring(0, atIndex);
        const maskedUsername = username.substring(0, Math.min(4, username.length)) + "...";
        return maskedUsername + email.substring(atIndex);
    };

    return (
        <div className="overallContainer" key={233}>
            <h1>g-Book(90's style)</h1>
            <button className="toggleForm" onClick={() => setShowForm(!showForm)}>
                Toggle Form <FontAwesomeIcon icon={faArrowDown} />
            </button>
            {showForm && (
                <form className="inputPost" onSubmit={sendPost}>
                    <input type="text" placeholder="firstname*" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="lastname*" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="your email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <textarea rows="1" placeholder="your message*" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button type="submit">Submit</button>
                </form>
            )}

            {data?.map((post) => (
                <div key={post.id} className="container">
                    <button className="deletePostButton" onClick={() => deletePost(post.id)}>
                        ❌
                    </button>
                    <p>
                        {post.lastName}, {post.firstName} wrote at {new Date(post.timeStamp).toLocaleString()}
                    </p>
                    <div className="messageOutput">{post.message}</div>
                    <p className="email">
                        <a href={`mailto:${post.email}`}>{maskEmail(post.email)}</a>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Home;
