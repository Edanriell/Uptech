import { type FC } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@shared/ui/button/ui";
import { Spinner } from "@shared/ui/spinner/ui";

import { NewsletterFormState } from "../lib/hooks";

type NewsletterSubmitButtonProps = {
	formState: NewsletterFormState;
	windowWidth: number;
};

// TODO
// Fix animations

export const NewsletterSubmitButton: FC<NewsletterSubmitButtonProps> = ({
	formState,
	windowWidth
}) => {
	const submitButtonAnimationVariants = {
		idle: {
			width: windowWidth <= 990 ? "100%" : "149rem"
		},
		loading: {
			width: windowWidth <= 990 ? "100%" : "96rem"
		},
		success: {
			width: windowWidth <= 990 ? "100%" : "188rem"
		},
		failure: {
			width: windowWidth <= 990 ? "100%" : "170rem"
		}
	};

	const renderButtonStaticLayerContent = (state: typeof formState) => {
		switch (state) {
			case NewsletterFormState.IDLE:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-white-50 font-medium">
						Subscribe
					</span>
				);
			case NewsletterFormState.LOADING:
				return <Spinner width={32} height={32} />;
			case NewsletterFormState.SUCCESS:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-white-50 font-medium gap-x-[6rem]">
						Subscribed
						<span>🎉</span>
					</span>
				);
			case NewsletterFormState.FAILURE:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-white-50 font-medium gap-x-[6rem]">
						Try again
						<span>❌</span>
					</span>
				);
			default:
				return null;
		}
	};

	const renderButtonDynamicLayerContent = (state: typeof formState) => {
		switch (state) {
			case NewsletterFormState.IDLE:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-shark-950 font-semibold">
						Subscribe
					</span>
				);
			case NewsletterFormState.LOADING:
				return (
					<Spinner
						width={32}
						height={32}
						primaryColor="rgba(0,0,0, 0.25)"
						secondaryColor="rgba(0,0,0, 1)"
					/>
				);
			case NewsletterFormState.SUCCESS:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-shark-950 font-semibold gap-x-[6rem]">
						Subscribed
						<span>🎉</span>
					</span>
				);
			case NewsletterFormState.FAILURE:
				return (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-shark-950 font-semibold gap-x-[6rem]">
						Try again
						<span>❌</span>
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<Button.Provider>
			<Button
				className="tablet:w-[149rem] shrink-0 grow-0"
				transitionOptions={{ type: "spring", duration: 0.65, bounce: 0.35 }}
				type="submit"
				variants={submitButtonAnimationVariants}
				animate={formState}
				initial={false}
			>
				<Button.StaticLayer className="flex items-center justify-center z-10 pointer-events-none">
					<AnimatePresence mode="popLayout" initial={false}>
						<motion.span
							transition={{
								type: "spring",
								duration: 1.35,
								bounce: 0.25
							}}
							initial={{ opacity: 0, y: -50, filter: "blur(4rem)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0rem)" }}
							exit={{ opacity: 0, y: 50, filter: "blur(4rem)" }}
							key={formState}
						>
							{renderButtonStaticLayerContent(formState)}
						</motion.span>
					</AnimatePresence>
				</Button.StaticLayer>
				<Button.DynamicLayer className="flex items-center justify-center z-20 pointer-events-none">
					<AnimatePresence mode="popLayout" initial={false}>
						<motion.span
							transition={{
								type: "spring",
								duration: 1.35,
								bounce: 0.25
							}}
							initial={{ opacity: 0, y: -50, filter: "blur(4rem)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0rem)" }}
							exit={{ opacity: 0, y: 50, filter: "blur(4rem)" }}
							key={formState}
						>
							{renderButtonDynamicLayerContent(formState)}
						</motion.span>
					</AnimatePresence>
				</Button.DynamicLayer>
			</Button>
		</Button.Provider>
	);
};
