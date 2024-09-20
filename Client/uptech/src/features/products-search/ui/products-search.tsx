"use client";

import { ComponentPropsWithoutRef, FC, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

import { useWindowSize } from "@shared/lib/hooks";

// TODO
// Implement Search functionality

type ProductsSearchProps = {
	mobileNavigationState: "opened" | "closed";
	searchState: "opened" | "closed";
	classes?: string;
} & ComponentPropsWithoutRef<"div"> &
	MotionProps;

const productsSearchInitialAnimations = { opacity: 0, y: 10, scale: 0.975, filter: "blur(4px)" };

const productsSearchEntryAnimations = {
	opacity: 1,
	y: 0,
	scale: 1,
	filter: "blur(0px)",
	transition: { delay: 0.15 }
};

const productsSearchExitAnimations = {
	opacity: 0,
	y: 10,
	scale: 0.975,
	filter: "blur(4px)",
	transition: { delay: 0.15 }
};

const searchedProducts = [
	{
		id: 1,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 2,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 3,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 4,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 5,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 6,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 7,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 8,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 9,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 10,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 11,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 12,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 13,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 14,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 15,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	},
	{
		id: 16,
		imageUrl: "/images/raster/products/headphones.jpg",
		name: "Wireless Headphone",
		price: "$300.00",
		href: "#"
	}
];

export const ProductsSearch: FC<ProductsSearchProps> = ({
	searchState,
	mobileNavigationState,
	classes
}) => {
	const [maxProducts, setMaxProducts] = useState<number>(4);
	const { width } = useWindowSize();

	let searchClasses = "";

	useEffect(() => {
		const determineMaxProducts = (width: number) => {
			if (width <= 553) return 4;
			if (width <= 716) return 6;
			if (width <= 879) return 8;
			if (width <= 990) return 10;
			if (width >= 1090 && width < 1253) return 12;
			if (width >= 1253 && width < 1416) return 14;
			if (width >= 1416) return 16;
			return 10; // Default case
		};

		setMaxProducts(determineMaxProducts(width));
	}, [width]);

	if (mobileNavigationState === "opened" && width < 990) {
		searchClasses = "top-[268rem] pt-[18rem] pb-[18rem] pr-[16rem] pl-[16rem] m-[16rem]";
	} else if (searchState === "opened" && width >= 990) {
		searchClasses = "top-[104rem] pt-[32rem] pb-[32rem] pr-[32rem] pl-[32rem] m-[24rem]";
	}

	const renderFoundProducts = () => {
		return searchedProducts.map(({ id, imageUrl, name, price, href }, index) => {
			if (index >= maxProducts) return null;
			return (
				<li key={name + "-" + id + "-" + index}>
					<a href={href}>
						<article className="relative rounded-[8rem] bg-white-50 overflow-hidden">
							<Image
								width={640}
								height={959}
								src={imageUrl}
								alt="Uptech company logotype"
								style={{ objectFit: "cover", height: "140rem", width: "100%" }}
							/>
							<div className="p-[12rem] font-medium">
								<h2 className="text-[12rem] whitespace-nowrap overflow-ellipsis w-full overflow-hidden">
									{name}
								</h2>
							</div>
							<div className="absolute top-[12rem] left-[12rem] rounded-[8rem] px-[12rem] py-[6rem] inline-block bg-shark-950">
								<p className="text-[12rem] text-white-50">{price}</p>
							</div>
						</article>
					</a>
				</li>
			);
		});
	};

	return (
		<AnimatePresence>
			{((mobileNavigationState === "opened" && width < 990) ||
				(searchState === "opened" && width >= 990)) && (
				<motion.div
					initial={productsSearchInitialAnimations}
					animate={productsSearchEntryAnimations}
					exit={productsSearchExitAnimations}
					className={
						searchClasses +
						" fixed left-0 rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] block w-fill-chrome w-fill-firefox"
					}
				>
					<div className="pb-[18rem] flex flex-row items-center justify-between">
						<div className="relative w-full">
							<label className="sr-only" htmlFor="search">
								Search
							</label>
							<input
								className="text-[14rem] rounded-[8rem] px-[12rem] py-[8rem] block bg-white-50 w-[-webkit-fill-available] w-[-moz-available] mr-[16rem]"
								type="text"
								name="search"
								id="search"
								placeholder="Search"
							/>
						</div>
						<button className="text-[14rem] rounded-[32rem] px-[18rem] py-[6rem] bg-shark-950 text-white-50 text-center">
							Search
						</button>
					</div>
					<ul className="mb-[24rem] gap-x-[16rem] gap-y-[16rem] grid grid-cols-mobile-navigation-auto-fit">
						{renderFoundProducts()}
					</ul>
					<div className="flex items-center justify-center">
						<a
							href="#"
							className="text-[14rem] rounded-[32rem] px-[46rem] py-[6rem] text-center bg-shark-950 text-white-50"
						>
							Show all
						</a>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
