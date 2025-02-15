import ButtonCheckOutPayment from "@/components/ClientOnly/ButtonCheckOutPayment";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Stripe } from "stripe";

// Definir la estructura de los planes
interface Plan {
	id: string;
	title: string;
	price: number;
	benefits: string[];
}

// Mapeo de beneficios según el `priceId`
const benefitsMap: Record<string, string[]> = {
	"price_1Qn7EBPuPilFctgcCe1I5vFr": ["Acceso al Gimnasio", "Asistencia Pasiva", "Registro de avances"],
	"price_1QnBSOPuPilFctgcypCrRaNU": ["Acceso al Gimnasio", "Asistencia Pasiva", "Registro de avances", "Plan de entrenamiento"],
	"price_1QnBSbPuPilFctgccgMC5dhT": ["Acceso al Gimnasio", "Asistencia Activa", "Registro de avances", "Plan de entrenamiento", "Plan dietético"],
};

async function loadPricesByStripe(): Promise<Plan[]> {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
		const prices = await stripe.prices.list();

		if (!prices.data || prices.data.length === 0) {
			throw new Error("No prices found");
		}

		// Mapear los datos de Stripe al formato `Plan[]`
		const plans: Plan[] = prices.data.map((price) => ({
			id: price.id,
			title: price.nickname || "Plan Desconocido",
			price: price.unit_amount ? price.unit_amount / 100 : 0,
			benefits: benefitsMap[price.id] || ["Beneficios no especificados"],
		}));

		// Ordenar de menor a mayor según el precio
		const sortedPlans = plans.sort((a, b) => a.price - b.price);

		return sortedPlans;
	} catch (error) {
		console.error("Error loading prices:", error);
		return [];
	}
}

export default async function StripePayment() {
	const plans = await loadPricesByStripe();

	return (
		<div className="container mx-auto px-4 py-12">
			<h1 className="text-2xl font-bold p-4 text-center">Nuestras Membresías</h1>
			<div className="grid md:grid-cols-3 gap-8 mb-16">
				{plans.map((plan) => (
					<Card className="flex flex-col" key={plan.id}>
						<CardHeader>
							<h3 className="text-xl font-semibold text-center">{plan.title}</h3>
							<div className="text-center">
								<span className="text-4xl  font-bold">${plan.price}</span>
								<span className="text-sm text-gray-500">/mes</span>
							</div>
						</CardHeader>
						<CardContent className="flex-grow">
							<ul className="space-y-2">
								{plan.benefits.map((benefit, i) => (
									<li key={i} className="flex items-center gap-2">
										<span>• {benefit}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<ButtonCheckOutPayment priceId={plan.id} />
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="justify-center items-center text-center p-4">
				<p className="text-center font-semibold">Pago con Stripe en Dólares</p>
			</div>
		</div>
	);
}
