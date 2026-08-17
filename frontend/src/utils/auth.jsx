// Save logged-in user + JWT
export const loginUser = (data) => {
    localStorage.setItem("petverseToken", data.token);
    localStorage.setItem("petverseUser", JSON.stringify(data.user));
};


// Get JWT
export const getToken = () => {
    return localStorage.getItem("petverseToken");
};


// Get logged-in user
export const getCurrentUser = () => {
    const user = localStorage.getItem("petverseUser");

    return user ? JSON.parse(user) : null;
};


// Check whether user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem("petverseToken");
};


// Logout
export const logoutUser = () => {
    localStorage.removeItem("petverseToken");
    localStorage.removeItem("petverseUser");
};