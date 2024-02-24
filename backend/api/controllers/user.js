import User from '../models/user.js';

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide an email and password" });
    }

    try {
        const user = await User
            .findOne({ email })
            .select("+password")
            .exec();
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.getJWTToken();
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).send({ code: "SUCCESS", message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (!name || !email || !password || !confPassword) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const user = await User.create({
            name,
            email,
            password,
        });

        const token = user.getJWTToken();
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).send({ code: "SUCCESS", message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((value) => value.message);
            return res.status(400).json({ message: messages.join(", ") });
        }
        res.status(500).json({ message: error.message });
    }
}

export default { 
    getUser,
    login,
    register
};