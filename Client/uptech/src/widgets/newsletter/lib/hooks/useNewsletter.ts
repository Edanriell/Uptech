import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useWindowSize } from "@shared/lib/hooks";

import { newsletterFormSchema } from "../../model";

export enum NewsletterFormState {
	IDLE = "idle",
	LOADING = "loading",
	SUCCESS = "success",
	FAILURE = "failure"
}

type NewsletterFormData = {
	email: string;
};

type UseNewsletterForm = {
	formState: NewsletterFormState;
	windowWidth: number;
	register: ReturnType<typeof useForm<NewsletterFormData>>["register"];
	handleSubmit: ReturnType<typeof useForm<NewsletterFormData>>["handleSubmit"];
	errors: ReturnType<typeof useForm<NewsletterFormData>>["formState"]["errors"];
	handleNewsletterFormSubmit: (data: NewsletterFormData) => Promise<void>;
};

export const useNewsletterForm = (): UseNewsletterForm => {
	const [formState, setFormState] = useState<NewsletterFormState>(NewsletterFormState.IDLE);

	const { width } = useWindowSize();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(newsletterFormSchema)
	});

	const handleNewsletterFormSubmit = async (data: { email: string }) => {
		if (formState !== NewsletterFormState.IDLE) return;

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
			setFormState(NewsletterFormState.LOADING);
			const result = await fakeDataSend;
			setFormState(NewsletterFormState.SUCCESS);
			console.log("Data sent successfully:", result);
		} catch (error) {
			setFormState(NewsletterFormState.FAILURE);
			console.error("Data failed to send:", error);
		} finally {
			setTimeout(() => {
				setFormState(NewsletterFormState.IDLE);
			}, 5000);
		}
	};

	return {
		formState,
		windowWidth: width,
		register,
		handleSubmit,
		errors,
		handleNewsletterFormSubmit
	};
};
