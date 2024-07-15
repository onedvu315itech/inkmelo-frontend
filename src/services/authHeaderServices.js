const authHeader = () => {
    let user = sessionStorage.getItem("username");
    let jwtToken = JSON.parse(sessionStorage.getItem("jwtToken"));

    if (user && jwtToken) {
        return { Authorization: `Bearer ${jwtToken}` };
    } else {
        return {};
    }
}

export default authHeader;