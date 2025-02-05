const authService = {
    login: async (email, mobile) => {
        if (email === "edu@chathumal.com" && mobile === "0760480480") {
            localStorage.setItem("user", JSON.stringify({ email, mobile }));
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem("user");
    },

    isAuthenticated: () => {
        return localStorage.getItem("user") !== null;
    }
};

export default authService;
