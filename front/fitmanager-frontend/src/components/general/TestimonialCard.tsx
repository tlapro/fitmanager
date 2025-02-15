import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"
import Image from "next/image"

interface TestimonialProps {
	name: string
	image: string
	comment: string
	rating: number
}

export function TestimonialCard({ name, image, comment, rating }: TestimonialProps) {
	
	const renderStars = (rating: number) => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 !== 0

		
		for (let i = 0; i < fullStars; i++) {
			stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
		}

		
		if (hasHalfStar) {
			stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
		}

		
		const emptyStars = 5 - Math.ceil(rating)
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<Star key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" />)
		}

		return stars
	}

	return (
		<Card className="w-full">
			<CardContent className="pt-6">
				<div className="flex items-center gap-4 mb-4">
					<div className="relative w-12 h-12 rounded-full overflow-hidden">
						<Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
					</div>
					<div>
						<h3 className="font-semibold">{name}</h3>
						<div className="flex">{renderStars(rating)}</div>
					</div>
				</div>
				<p className="text-gray-600">{comment}</p>
			</CardContent>
		</Card>
	)
}

