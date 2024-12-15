"use server"
import { validateMnemonic } from "bip39"
import { Wallet, ethers } from "ethers"
import { permutations } from "obliterator"
import fs from "fs"
import Web3 from "web3"
import { words } from "@/lib/words"
let i = 0

export const verify = async () => {
	const shuffledWords = words.sort(() => 0.5 - Math.random())
	const iterator = permutations(shuffledWords, 12)
	let noVal = 0
	// const web3Ether = new Web3(process.env.ETH_API)
	const web3Bnb = new Web3("https://bsc-dataseed.binance.org/")

	const provider = ethers.getDefaultProvider("mainnet")

	try {
		for await (const item of iterator) {
			console.log(item)
			const mnemonic = item.join(" ")
			console.log(mnemonic)
			if (validateMnemonic(mnemonic)) {
				noVal++
				console.log("Valid mnemonic phrase!")

				// Recover wallet from mnemonic
				const wallet = Wallet.fromPhrase(mnemonic)
				console.log("Recovered address: ", wallet.address)
				console.log("Recovered private key: ", wallet.privateKey)
				console.log("Recovered public key: ", wallet.publicKey)
				console.log("Recovered mnemonic: ", mnemonic)
				const balanceEth = await provider.getBalance(wallet.address)
				// const balanceEth = await web3Ether.eth.getBalance(wallet.address)
				const balanceBnb = await web3Bnb.eth.getBalance(wallet.address)
				console.log("Balance: ", balanceEth)
				console.log("Balance: ", balanceBnb)
				const filePath = "wallet.json"
				const emptyFile = "empty_wallet.json"

				// Read the existing file to check if there's already data
				let data = []
				let data2 = []
				if (fs.existsSync(filePath)) {
					const fileContent = fs.readFileSync(filePath, "utf8")
					if (fileContent === "") {
						data = []
					} else {
						data = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}
				if (fs.existsSync(emptyFile)) {
					const fileContent = fs.readFileSync(emptyFile, "utf8")
					if (fileContent === "") {
						data2 = []
					} else {
						data2 = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}

				data2.push({
					mnemonic,
					address: wallet.address,
					balance_eth: balanceEth.toString(),
					balance_bnb: balanceBnb.toString(),
					privateKey: wallet.privateKey,
					publicKey: wallet.publicKey,
				})
				fs.writeFileSync(emptyFile, JSON.stringify(data2, null, 2))
				// Append the new wallet data to the array
				if (balanceBnb > 0 || balanceEth > 0) {
					i++
					data.push({
						mnemonic,
						address: wallet.address,
						balance_eth: balanceEth.toString(),
						balance_bnb: balanceBnb.toString(),
						privateKey: wallet.privateKey,
						publicKey: wallet.publicKey,
					})

					// Write the updated data back to the file, ensuring it's properly formatted as JSON
					fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
					if (i === 100) {
						break
					}
				}
				if (noVal === 500) {
					verify()
				}
			} else {
				console.log("Invalid mnemonic phrase.")
			}
		}
	} catch (error) {
		console.error(error)
		verify()
	}
}
export const verify24 = async () => {
	const shuffledWords = words.sort(() => 0.5 - Math.random())
	const iterator = permutations(shuffledWords, 24)
	let noVal = 0
	// const web3Ether = new Web3(process.env.ETH_API)
	const web3Bnb = new Web3("https://bsc-dataseed.binance.org/")

	const provider = ethers.getDefaultProvider("mainnet")

	try {
		for await (const item of iterator) {
			console.log(item)
			const mnemonic = item.join(" ")
			console.log(mnemonic)
			if (validateMnemonic(mnemonic)) {
				noVal++
				console.log("Valid mnemonic phrase!")

				// Recover wallet from mnemonic
				const wallet = Wallet.fromPhrase(mnemonic)
				console.log("Recovered address: ", wallet.address)
				console.log("Recovered private key: ", wallet.privateKey)
				console.log("Recovered public key: ", wallet.publicKey)
				console.log("Recovered mnemonic: ", mnemonic)
				const balanceEth = await provider.getBalance(wallet.address)
				// const balanceEth = await web3Ether.eth.getBalance(wallet.address)
				const balanceBnb = await web3Bnb.eth.getBalance(wallet.address)
				console.log("Balance: ", balanceEth)
				console.log("Balance: ", balanceBnb)
				const filePath = "wallet.json"
				const emptyFile = "empty_wallet.json"

				// Read the existing file to check if there's already data
				let data = []
				let data2 = []
				if (fs.existsSync(filePath)) {
					const fileContent = fs.readFileSync(filePath, "utf8")
					if (fileContent === "") {
						data = []
					} else {
						data = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}
				if (fs.existsSync(emptyFile)) {
					const fileContent = fs.readFileSync(emptyFile, "utf8")
					if (fileContent === "") {
						data2 = []
					} else {
						data2 = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}

				data2.push({
					mnemonic,
					address: wallet.address,
					balance_eth: balanceEth.toString(),
					balance_bnb: balanceBnb.toString(),
					privateKey: wallet.privateKey,
					publicKey: wallet.publicKey,
				})
				fs.writeFileSync(emptyFile, JSON.stringify(data2, null, 2))
				// Append the new wallet data to the array
				if (balanceBnb > 0 || balanceEth > 0) {
					i++
					data.push({
						mnemonic,
						address: wallet.address,
						balance_eth: balanceEth.toString(),
						balance_bnb: balanceBnb.toString(),
						privateKey: wallet.privateKey,
						publicKey: wallet.publicKey,
					})

					// Write the updated data back to the file, ensuring it's properly formatted as JSON
					fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
					if (i === 100) {
						break
					}
				}
				if (noVal === 500) {
					verify()
				}
			} else {
				console.log("Invalid mnemonic phrase.")
			}
		}
	} catch (error) {
		console.error(error)
		verify()
	}
}
export const verifyCustom = async (array: string[]) => {
	const iterator = permutations(array, array.length)
	// const web3Ether = new Web3(process.env.ETH_API)
	const web3Bnb = new Web3("https://bsc-dataseed.binance.org/")

	const provider = ethers.getDefaultProvider("mainnet")

	try {
		for await (const item of iterator) {
			console.log(item)
			const mnemonic = item.join(" ")
			console.log(mnemonic)
			if (validateMnemonic(mnemonic)) {
				console.log("Valid mnemonic phrase!")

				// Recover wallet from mnemonic
				const wallet = Wallet.fromPhrase(mnemonic)
				console.log("Recovered address: ", wallet.address)
				console.log("Recovered private key: ", wallet.privateKey)
				console.log("Recovered public key: ", wallet.publicKey)
				console.log("Recovered mnemonic: ", mnemonic)
				const balanceEth = await provider.getBalance(wallet.address)
				// const balanceEth = await web3Ether.eth.getBalance(wallet.address)
				const balanceBnb = await web3Bnb.eth.getBalance(wallet.address)
				console.log("Balance: ", balanceEth)
				console.log("Balance: ", balanceBnb)
				const filePath = "wallet.json"
				const emptyFile = "empty_wallet.json"

				// Read the existing file to check if there's already data
				let data = []
				let data2 = []
				if (fs.existsSync(filePath)) {
					const fileContent = fs.readFileSync(filePath, "utf8")
					if (fileContent === "") {
						data = []
					} else {
						data = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}
				if (fs.existsSync(emptyFile)) {
					const fileContent = fs.readFileSync(emptyFile, "utf8")
					if (fileContent === "") {
						data2 = []
					} else {
						data2 = JSON.parse(fileContent) // Parse the existing content into an array
						// console.log(data)
					}
				}

				data2.push({
					mnemonic,
					address: wallet.address,
					balance_eth: balanceEth.toString(),
					balance_bnb: balanceBnb.toString(),
					privateKey: wallet.privateKey,
					publicKey: wallet.publicKey,
				})
				fs.writeFileSync(emptyFile, JSON.stringify(data2, null, 2))
				// Append the new wallet data to the array
				if (balanceBnb > 0 || balanceEth > 0) {
					i++
					data.push({
						mnemonic,
						address: wallet.address,
						balance_eth: balanceEth.toString(),
						balance_bnb: balanceBnb.toString(),
						privateKey: wallet.privateKey,
						publicKey: wallet.publicKey,
					})

					// Write the updated data back to the file, ensuring it's properly formatted as JSON
					fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
					if (i === 100) {
						break
					}
				}
				
			} else {
				console.log("Invalid mnemonic phrase.")
			}
		}
	} catch (error) {
		console.error(error)
		verify()
	}
}
