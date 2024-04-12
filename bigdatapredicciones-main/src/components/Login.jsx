import axios from "axios";

function login(username, password) {
    return axios.post("http://localhost:3300/user/login", {
        username: username,
        password: password
    })
    .then(function(res) {
        console.log(res.data);
        return res.data;
    })
    .catch(function(err) {
        // console.log("pperro");
        console.error("Error:", err);
        throw err;
    });
}

export default login;
