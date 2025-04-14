"use client";

import { type FC } from "react";

import { NewsletterForm } from "./newsletter-form";

export const Newsletter: FC = () => {
	return (
		<div className="tablet:basis-[43%] desktop:mr-[unset] desktop:basis-[477rem]">
			<h2 className="text-[40rem] font-medium leading-[125%] text-white-50 mb-[24rem] opacity-[0.9]">
				Stay Updated on Latest Product Releases
			</h2>
			<NewsletterForm />
		</div>
	);
};

// TODO
// Also drawer exit animation must use radix
