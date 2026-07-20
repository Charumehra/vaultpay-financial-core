export const register = async (req, res) => {
    res.json({
        message: "Register API"
    });
};

export const login = async (req, res) => {
    res.json({
        message: "Login API"
    });
};

export const logout = async (req, res) => {
    res.json({
        message: "Logout API"
    });
};

export const getMe = async (req, res) => {
    res.json({
        message: "Current User"
    });
};