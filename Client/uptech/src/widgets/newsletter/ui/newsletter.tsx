"use client";

import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "motion/react";

import { useWindowSize } from "@shared/lib/hooks";

import { newsletterFormSchema } from "../model";

import { NewsletterSubmitButton } from "./newsletter-submit-button";

export const Newsletter: FC = () => {
	const [newsletterFormState, setNewsletterFormState] = useState<
		"idle" | "loading" | "success" | "failure"
	>("idle");

	const { width } = useWindowSize();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(newsletterFormSchema)
	});

	const handleNewsletterFormSubmit = async (data: { email: string }) => {
		const randomNumber = Math.floor(Math.random() * 11);

		const fakeDataSend = new Promise<string>((resolve, reject) => {
			setTimeout(() => {
				if (randomNumber >= 5) {
					resolve("Subscription successful!");
				} else {
					reject("Subscription failed. Please try again.");
				}
			}, 5000);
		});

		try {
			setNewsletterFormState("loading");
			const result = await fakeDataSend;
			setNewsletterFormState("success");
			console.log("Data sent successfully:", result);
		} catch (error) {
			setNewsletterFormState("failure");
			console.error("Data failed to send:", error);
		} finally {
			setTimeout(() => {
				setNewsletterFormState("idle");
			}, 5000);
		}
	};

	return (
		<div className="tablet:basis-[43%] desktop:mr-[unset] desktop:basis-[477rem]">
			<h2 className="text-[40rem] font-medium leading-[125%] text-white-50 mb-[24rem] opacity-[0.9]">
				Stay Updated on Latest Product Releases
			</h2>
			<form
				onSubmit={handleSubmit(handleNewsletterFormSubmit)}
				className="flex flex-col gap-y-[8rem] mb-[40rem] tablet:flex-row tablet:gap-x-[8rem] tablet:mb-[unset]"
			>
				<div className="relative w-full tablet:basis-[320rem]">
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
				<NewsletterSubmitButton windowWidth={width} formState={newsletterFormState} />
			</form>
		</div>
	);
};

// TODO
// Decompose input if it is not unique across website

// TODO
// Buttons of drawer must highlight when drawer opened, we can use red color crimson 600
// Also drawer exit animation must use radix
// Refactor all components to useHook pattern if possible

// TODO
// Create ThreeJs slider !!!!!!!!!!
