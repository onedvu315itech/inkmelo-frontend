const authHeader = () => {
    let user = localStorage.getItem("username");
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

    if (user && jwtToken) {
        return { Authorization: `Bearer ${jwtToken}` };
    } else {
        return {};
    }
}

export default authHeader;