import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Increase our API limit count everytime we being using one of the API
export const increaseApiLimit = async () => {
    const { userId } = auth();

    // If there is not userId, then break the function and exit
    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {     // If it's exist
        await prismadb.userApiLimit.update({
            where: { userId: userId},
            data: { count: userApiLimit.count + 1 },
        });
    } else {                // If it's not exist
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 }
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    // The user has not use that all of their accounts, even if they never created their first generation that means they don't have a API limit
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {        // if they are crossed the API limits
        return false;
    }
};