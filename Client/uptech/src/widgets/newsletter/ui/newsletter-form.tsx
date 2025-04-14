import { AnimatePresence, motion } from "motion/react";

import { NewsletterSubmitButton } from "./newsletter-submit-button";
import { useNewsletterForm } from "../lib/hooks";
import { useMemo } from "react";

export const NewsletterForm = () => {
	const { formState, windowWidth, register, handleSubmit, errors, handleNewsletterFormSubmit } =
		useNewsletterForm();

	const renderNewsletterFormErrorMessage = useMemo(() => {
		return (
			<AnimatePresence>
				{errors.email && (
					<motion.p
						initial={{ opacity: 0, x: 20, filter: "blur(4rem)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0rem)" }}
						exit={{ opacity: 0, x: 20, filter: "blur(4rem)" }}
						transition={{ type: "spring", duration: 0.5, bounce: 0 }}
						className="text-[16rem] font-medium leading-[150%] text-alizarin-crimson-500 absolute top-[-30rem] tablet:top-[unset] tablet:bottom-[-30rem] left-[24rem]"
					>
						{errors.email?.message}
					</motion.p>
				)}
			</AnimatePresence>
		);
	}, [errors.email?.message]);

	return (
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
				{renderNewsletterFormErrorMessage}
			</motion.div>
			<NewsletterSubmitButton windowWidth={windowWidth} formState={formState} />
		</form>
	);
};
