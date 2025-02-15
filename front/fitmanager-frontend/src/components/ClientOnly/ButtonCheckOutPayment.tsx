"use client";
import React from 'react'
import { Button } from '../ui/button'

export default  function ButtonCheckOutPayment({ priceId }: { priceId: string }) {
	return (
		<Button
				className="w-full"
				onClick={async () => { 
						const response = await fetch('/api/checkout', {
							method: 'POST',
							body: JSON.stringify({ priceId }), 
							headers: { 'Content-Type': 'application/json' } })
						const data = await response.json();
						window.location.href = data.url;
						
					}}
		>Seleccionar </Button>
	)
}
