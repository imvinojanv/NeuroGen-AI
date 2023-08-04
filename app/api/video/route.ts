import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
    // We can use both methods
    auth: process.env.REPLICATE_API_TOKEN!
    // auth: process.env.REPLICATE_API_TOKEN || ""
})

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Allow the user to use their free trail
        const freeTrail = await checkApiLimit();
        // Allow the user to use thier premium plan
        const isPremium = await checkSubscription();

        if (!freeTrail && !isPremium) {
            return new NextResponse("You have reached your Free-Trail limit!", { status: 403 });
        }

        // If the user have Free-Trail, Allows to run this
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt
              }
            }
        );

        if (!isPremium) {
            await increaseApiLimit();
        }

        return NextResponse.json(response);

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}