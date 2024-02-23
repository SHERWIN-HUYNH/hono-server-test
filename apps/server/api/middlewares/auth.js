import { JWT_SECRET } from "@/lib/constants";
import { db } from "@/lib/db";
import { UnauthorizedException } from "@/lib/exceptions";
import jwt from "jsonwebtoken";
export const verifyToken = async (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET);
        const user = await db.user.findUnique({
            where: {
                id: data.userId,
            },
        });
        return user;
    }
    catch (err) {
        throw new UnauthorizedException("Unauthorized");
    }
};
export const auth = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        throw new UnauthorizedException("Unauthorized");
    }
    const user = await verifyToken(token);
    c.set("user", user);
    await next();
};
