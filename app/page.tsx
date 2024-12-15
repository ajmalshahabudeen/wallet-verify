"use client"
import { verify } from "@/lib/verify"
import React from "react"

const HomePage = () => {
	const verification = async () => {
		verify()
	}
	return (
		<div className='flex flex-col gap-4 min-h-screen justify-center items-center'>
			<div className='text-7xl font-extralight'>X</div>
			<button
				onClick={verification}
				className='text-4xl bg-white text-black rounded-lg px-10 lowercase'>
				Run
			</button>
		</div>
	)
}

export default HomePage
