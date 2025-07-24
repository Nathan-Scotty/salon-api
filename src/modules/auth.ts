import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt"

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
};

export const createJWT = (user) => {
    const token = jwt.sign(
        { id: user.id, emai: user.email, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token
}

export const protect = (request, response, next) => {
    const bearer = request.headers.authorization;

    if (!bearer) {
        response.status(401);
        response.send("Not authorized")
        return;
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        console.log("here")
        response.status(401);
        response.send("Not authorized")
        return;
    }

    try {
        const playload = jwt.verify(token, process.env.JWT_SECRET);
        request.user = playload;
        console.log(playload)
        next();
        return;
    } catch (error) {
        console.error(error);
        response.status(401);
        response.send("Not authorized")
        return;
    }
}