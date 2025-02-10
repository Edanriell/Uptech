"use client";

import { type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@shared/ui/button/ui";

import { newsletterFormSchema } from "../model";

export const Newsletter: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(newsletterFormSchema)
	});

	const handleNewsletterFormSubmit = (data) => console.log(data);

	return (
		<div className="tablet:mr-[40rem] tablet:basis-[477rem] desktop:mr-[unset]">
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
				<Button.Provider>
					<Button
						className="tablet:min-w-[149rem]"
						transitionOptions={{ type: "spring", duration: 0.65, bounce: 0 }}
						type="submit"
					>
						<Button.StaticLayer className="text-white-50">Subscribe</Button.StaticLayer>
						<Button.DynamicLayer className="text-shark-950">
							Subscribe
						</Button.DynamicLayer>
					</Button>
				</Button.Provider>
			</form>
		</div>
	);
};
