export const userStore = (data) => {
    localStorage.setItem("user", JSON.stringify({
        token: data.token,
        role: data.role
    }))
};

export const userData = () => {
    const userStringfied = localStorage.getItem("user") || '""';
    return JSON.parse(userStringfied || {});
};