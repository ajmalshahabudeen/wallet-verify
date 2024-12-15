"use client"
import { verify, verify24, verifyCustom } from "@/lib/verify"
import React from "react"

const HomePage = () => {
	const [running, setRunning] = React.useState(false)
	const [running24, setRunning24] = React.useState(false)
	const [runningCustom, setRunningCustom] = React.useState(false)
	const [arr, setArr] = React.useState<string[]>([])
	const verification = async () => {
		setRunning(true)
		verify()
	}
	const verification24 = async () => {
		setRunning24(true)
		verify24()
	}
	const verificationCustom = () => {
		setRunningCustom(true)
		verifyCustom(arr)
	}
	return (
		<div className='flex flex-col gap-4 min-h-screen justify-center items-center'>
			<div className='text-7xl font-extralight'>X</div>
			<button
				onClick={verification}
				disabled={running}
				className={`text-4xl bg-white text-black rounded-lg px-10 lowercase ${
					running && "opacity-50 animate-pulse"
				}`}>
				{running ? "running..." : "run"}
			</button>
			<button
				onClick={verification24}
				disabled={running}
				className={`text-4xl bg-white text-black rounded-lg px-10 lowercase ${
					running && "opacity-50 animate-pulse"
				}`}>
				{running24 ? "running..." : "run24"}
			</button>
			<div className='flex flex-col gap-4'>
				<input className="text-2xl text-black p-2 rounded-lg" type="text" onChange={(e) => setArr(e.target.value.split(" "))} />
				<button
					onClick={verificationCustom}
					disabled={runningCustom}
					className={`text-4xl bg-white text-black rounded-lg px-10 lowercase ${
						runningCustom && "opacity-50 animate-pulse"
					}`}>
					{runningCustom ? "running..." : "runCustom"}
				</button>
			</div>
			{(running || running24) && (
				<p className='text-green-500'>Check the terminal</p>
			)}
		</div>
	)
}

export default HomePage
