import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId,
            }
        });

        // If there is userSubscription already, Once user points to this API routes we don't want to create a checkout page 
        //      instead we want to redirect to the billing page, So they can cancel their active subscription in order.
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // I fwe don't have a stripe subsription (New User)
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "NeuroGen AI Premium",
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: 2000,      // $20
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                }
            ],

            // Only after user successfully purchases our monthly subscription are we gonna create a web hook which is going to catch that and then it's going to read the metadata find the userId abd then say "Oh okay this checkout which was just completed successfully belongs to this userId" 
            // Otherwise, Users will be able to checkout and subscribe to the application, but you won't know who actually subscribed and who to give subscription to
            metadata: {         // Very Important
                userId,
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}