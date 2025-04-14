"use client";

import { type FC } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useNewsletterForm } from "../lib/hooks";

import { NewsletterSubmitButton } from "./newsletter-submit-button";

export const Newsletter: FC = () => {
	const { formState, windowWidth, register, handleSubmit, errors, handleNewsletterFormSubmit } =
		useNewsletterForm();

	return (
		<div className="tablet:basis-[43%] desktop:mr-[unset] desktop:basis-[477rem]">
			<h2 className="text-[40rem] font-medium leading-[125%] text-white-50 mb-[24rem] opacity-[0.9]">
				Stay Updated on Latest Product Releases
			</h2>
			<form
				onSubmit={handleSubmit(handleNewsletterFormSubmit)}
				className="flex flex-col gap-y-[8rem] mb-[40rem] tablet:flex-row tablet:gap-x-[8rem] tablet:mb-[unset]"
			>
				<motion.div layout className="relative w-full tablet:basis-[320rem]">
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
				</motion.div>
				<NewsletterSubmitButton windowWidth={windowWidth} formState={formState} />
			</form>
		</div>
	);
};

// TODO
// Decompose input if it is not unique across website

// TODO
// Also drawer exit animation must use radix
