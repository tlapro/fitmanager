import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


export default function PlanesPage() {
	return (
		<div className="container mx-auto px-4 py-12">

			<h1 className="text-4xl font-bold text-center mb-12">Nuestras Membresías</h1>

			<div className="grid md:grid-cols-3 gap-8 mb-16">

				<Card className="flex flex-col">
					<CardHeader>
						<h3 className="text-xl font-semibold text-center">Basico</h3>
						<div className="text-center">
							<span className="text-4xl font-bold">$25000</span>
							<span className="text-sm text-gray-500">/mes</span>
						</div>
					</CardHeader>
					<CardContent className="flex-grow">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<span>• Acceso al Gimnasio</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Asistencia Pasiva</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Registro de avances</span>
							</li>
						</ul>
					</CardContent>
					<CardFooter>
					</CardFooter>
				</Card>

				<Card className="flex flex-col">
					<CardHeader>
						<h3 className="text-xl font-semibold text-center">Pro</h3>
						<div className="text-center">
							<span className="text-4xl font-bold">$50000</span>
							<span className="text-sm text-gray-500">/mes</span>
						</div>
					</CardHeader>
					<CardContent className="flex-grow">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<span>• Acceso al Gimnasio</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Asistencia Pasiva</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Registro de avances</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Plan de entrenamiento</span>
							</li>
						</ul>
					</CardContent>
					<CardFooter>
					</CardFooter>
				</Card>

				{/* Advanced Plan */}
				<Card className="flex flex-col">
					<CardHeader>
						<h3 className="text-xl font-semibold text-center">Avanzado</h3>
						<div className="text-center">
							<span className="text-4xl font-bold">$75000</span>
							<span className="text-sm text-gray-500">/mes</span>
						</div>
					</CardHeader>
					<CardContent className="flex-grow">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<span>• Acceso al Gimnasio</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Asistencia Activa</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Registro de avances</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Plan de entrenamiento</span>
							</li>
							<li className="flex items-center gap-2">
								<span>• Plan dietético</span>
							</li>
						</ul>
					</CardContent>
					<CardFooter>
					</CardFooter>
				</Card>
			</div>

			{/* Services Section */}
			<section className="mb-16">
				<h2 className="text-2xl font-bold mb-8">Nuestros Servicios</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Acceso al Gimnasio</h3>
							<p className="text-gray-600">Tendrás acceso a todo el espacio de instalaciones del gimnasio.</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Plan de Entrenamiento</h3>
							<p className="text-gray-600">
								A partir de tus datos, condición física y necesidad, crearemos un plan de entrenamiento según tus
								objetivos.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Plan Dietético</h3>
							<p className="text-gray-600">
								Crearemos un plan de alimentación a partir de tu salud y física según tus objetivos.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Asistencia Activa</h3>
							<p className="text-gray-600">
								Tendrás asistencia personal por parte de un entrenador que se encargará de acompañarte durante todo tu
								entrenamiento (Recuerda organizar tu horario)
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Asistencia Pasiva</h3>
							<p className="text-gray-600">
								Tendrás asistencia por parte de los entrenadores y recomendaciones al momento de pedirles consejo o
								ayuda.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">Registro de avances</h3>
							<p className="text-gray-600">
								Tomaremos medidas de tu cuerpo y fotografías para tener un registro de tu avance durante todo el
								proceso.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
			
		</div>
	)
}

