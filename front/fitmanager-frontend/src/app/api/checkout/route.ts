import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
	try {
		const { priceId, 
			userId 
		} = await request.json();

		if (!process.env.STRIPE_SECRET_KEY) {
			return NextResponse.json(
				{ error: "Stripe API Key is missing" },
				{ status: 500 }
			);
		}

		if (!priceId) {
			return NextResponse.json(
				{ error: "priceId is required" },
				{ status: 400 }
			);
		}

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${process.env.NEXT_PUBLIC_API_URL_FRONT}/dashboard/user/payments/success?userId=${userId}`,
			cancel_url: `${process.env.NEXT_PUBLIC_API_URL_FRONT}/dashboard/user/payments/`,
			metadata: { userId }, // Añadir el ID del usuario al metadata
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error("Error en checkout:", error);
		return NextResponse.json(
			{ error: "Error al crear la sesión" },
			{ status: 500 }
		);
	}
}
