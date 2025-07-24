import prisma from "../db"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"

export const createNewUser = async (request, response, next) => {

    try {
        const { email, password, confirmPassword, name} = request.body;

        if (password !== confirmPassword) {
            return response.status(400).json({ error: "Passwords do not match" });
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: await hashPassword(password),
                name,
                //role: "ADMIN"
            }
        });

        const token = createJWT(user)
        response.json({ token })

    } catch (error) {
        console.error("Error with creating a user")
    }
}

export const signin = async (request, response, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: request.body.email
            }
        })

        if (!user) {
            response.status(401).json({ message: "Invalid email" })
            return;
        }

        const isValid = await comparePasswords(request.body.password, user.password);

        if (!isValid) {
            response.status(401).json({ message: "Invalid email or password" })
            return;
        }

        const token = createJWT(user);

        response.json({ token })

    } catch (error) {
        console.error("Signin error:", error);
    }
}