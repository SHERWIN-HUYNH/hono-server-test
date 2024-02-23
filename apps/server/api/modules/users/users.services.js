import { db } from "../../lib/db";
import { BadRequestException } from "../../lib/exceptions";
export class UsersService {
    static async getByWithError(email) {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new BadRequestException("No user found");
        }
        return user;
    }
    static async updateBy(userId, data) {
        const user = await db.user.update({
            where: {
                id: userId,
            },
            data,
        });
        return user;
    }
}
