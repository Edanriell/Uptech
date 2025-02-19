"use client";

import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@shared/ui/button/ui";
import { Spinner } from "@shared/ui/spinner/ui";

import { newsletterFormSchema } from "../model";

export const Newsletter: FC = () => {
	const [newsletterFormState, setNewsletterFormState] = useState<
		"idle" | "loading" | "success" | "failure"
	>("idle");

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading, isSubmitting, isSubmitted, isSubmitSuccessful, isValid }
	} = useForm({
		resolver: yupResolver(newsletterFormSchema)
	});

	useEffect(() => {
		console.log(isLoading + " isLoading");
		console.log(isSubmitting + " isSubmitting");
		console.log(isSubmitted + " isSubmitted");
		console.log(isSubmitSuccessful + " isSubmitSuccessful");
	}, [isLoading, isSubmitting, isSubmitted, isSubmitSuccessful]);

	const handleNewsletterFormSubmit = async (data: { email: string }) => {
		const randomNumber = Math.floor(Math.random() * 11);

		const fakeDataSend = new Promise<string>((resolve, reject) => {
			setTimeout(() => {
				if (randomNumber >= 5) {
					resolve("Subscription successful!");
				} else {
					reject("Subscription failed. Please try again.");
				}
			}, 65000);
		});

		try {
			setNewsletterFormState("loading");
			const result = await fakeDataSend;
			setNewsletterFormState("success");
			console.log("Data sent successfully:", result);
		} catch (error) {
			setNewsletterFormState("failure");
			console.error("Data failed to send:", error);
		}
	};

	return (
		<div className="tablet:mr-[40rem] tablet:basis-[477rem] desktop:mr-[unset]">
			<h2 className="text-[40rem] font-medium leading-[125%] text-white-50 mb-[24rem] opacity-[0.9]">
				Stay Updated on Latest Product Releases
			</h2>
			<form
				onSubmit={handleSubmit(handleNewsletterFormSubmit)}
				className="flex flex-col gap-y-[8rem] mb-[40rem] tablet:flex-row tablet:gap-x-[8rem] tablet:mb-[unset]"
			>
				<div className="relative w-full tablet:basis-[320rem] tablet:shrink-0">
					<label className="visually-hidden" htmlFor="email">
						Enter your email
					</label>
					<input
						{...register("email")}
						id="email"
						name="email"
						placeholder="Enter your email"
						type="email"
						className="border-solid border-[1rem] border-white-900 rounded-[46rem] px-[24rem] py-[14rem] max-h-[52rem] bg-white-950 text-[16rem] font-light leading-[150%] text-white-50 placeholder:text-[#FFFFFFCC] w-full"
					/>
					<AnimatePresence>
						{errors.email && (
							<motion.p
								initial={{ opacity: 0, x: 20, filter: "blur(4rem)" }}
								animate={{ opacity: 1, x: 0, filter: "blur(0rem)" }}
								exit={{ opacity: 0, x: 20, filter: "blur(4rem)" }}
								className="text-[16rem] font-medium leading-[150%] text-alizarin-crimson-500 absolute top-[-30rem] tablet:top-[unset] tablet:bottom-[-30rem] left-[24rem]"
							>
								{errors.email?.message}
							</motion.p>
						)}
					</AnimatePresence>
				</div>
				<Button.Provider>
					<Button
						className="tablet:min-w-[149rem]"
						transitionOptions={{ type: "spring", duration: 0.65, bounce: 0 }}
						type="submit"
					>
						<Button.StaticLayer className="flex items-center justify-center">
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.span
									transition={{
										type: "spring",
										duration: 2,
										bounce: 0
									}}
									initial={{ opacity: 0, y: -50 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 50 }}
									key={newsletterFormState}
								>
									{newsletterFormState === "loading" ? (
										<Spinner width={32} height={32} />
									) : (
										<span className="drop-shadow-lg flex w-full justify-center items-start text-white-50">
											Subscribe
										</span>
									)}
								</motion.span>
							</AnimatePresence>
						</Button.StaticLayer>
						<Button.DynamicLayer className="flex items-center justify-center">
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.span
									transition={{
										type: "spring",
										duration: 2,
										bounce: 0
									}}
									initial={{ opacity: 0, y: -50 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 50 }}
									key={newsletterFormState}
								>
									{newsletterFormState === "loading" ? (
										<Spinner width={32} height={32} />
									) : (
										<span className="drop-shadow-lg flex w-full justify-center items-start text-shark-950">
											Subscribe
										</span>
									)}
								</motion.span>
							</AnimatePresence>
						</Button.DynamicLayer>
					</Button>
				</Button.Provider>
			</form>
		</div>
	);
};
