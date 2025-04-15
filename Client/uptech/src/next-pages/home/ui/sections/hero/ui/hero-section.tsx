"use client";

import Image from "next/image";

import { Button } from "@shared/ui/button/ui";

import TechImage from "@public/images/raster/pages/home/sections/hero/tech.jpg";

export const HeroSection = () => {
	return (
		<section className="w-full h-[760rem] relative pl-[16rem] pr-[16rem] pb-[100rem] flex flex-col items-center justify-end">
			<Image
				src={TechImage}
				alt="Redefining Your Tech Experience"
				priority={true}
				placeholder="blur"
				className="w-full h-full object-cover absolute top-[0] left-[0] z-[10]"
				loading="eager"
			/>
			<h2 className="min-w-[358rem] font-medium text-[46rem] leading-[100%] capitalize text-center text-(--neutral-100) relative z-[20] mb-[16rem] text-balance">
				Redefining Your Tech Experience
			</h2>
			<div className="relative z-[20]">
				<p className="min-w-[358rem] font-light text-[16rem] leading-[160%] text-center text-(--neutral-100) mb-[32rem] text-balance">
					At UpTech, we&#39;re redefining your tech experience by offering the latest &
					most innovative products.
				</p>
				<div className="flex flex-col gap-y-[8rem]">
					<Button.Provider>
						<Button
							className="max-h-[48rem]! h-[48rem]!"
							transitionOptions={{ type: "spring", duration: 0.5, bounce: 0 }}
							type="button"
							initial={false}
						>
							<Button.StaticLayer
								color="bg-(--neutral-100)"
								className="flex items-center justify-center z-10 pointer-events-none"
							>
								<span className="font-semibold text-[16rem] leading-[100%] capitalize text-(--neutral-800)">
									Browse products
								</span>
							</Button.StaticLayer>
							<Button.DynamicLayer
								color="bg-(--color-alizarin-crimson-600)"
								orientation="top-right-to-bottom-left"
								className="flex items-center justify-center z-20 pointer-events-none"
							>
								<span className="font-medium text-[16rem] leading-[100%] capitalize text-(--neutral-100)">
									Browse products
								</span>
							</Button.DynamicLayer>
						</Button>
					</Button.Provider>
					<Button.Provider>
						<Button
							className="border-[1rem] border-solid border-(--neutral-100) max-h-[48rem]! h-[48rem]!"
							transitionOptions={{ type: "spring", duration: 0.5, bounce: 0 }}
							type="button"
							initial={false}
						>
							<Button.StaticLayer
								color="bg-transparent"
								className="flex items-center justify-center z-10 pointer-events-none"
							>
								<span className="font-medium text-[16rem] leading-[100%] capitalize text-(--neutral-100)">
									About us
								</span>
							</Button.StaticLayer>
							<Button.DynamicLayer
								color="bg-(--neutral-100)"
								orientation="bottom-left-to-top-right"
								className="flex items-center justify-center z-20 pointer-events-none"
							>
								<span className="font-semibold text-[16rem] leading-[100%] capitalize text-(--neutral-800)">
									About us
								</span>
							</Button.DynamicLayer>
						</Button>
					</Button.Provider>
				</div>
			</div>
		</section>
	);
};
