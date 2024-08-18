import { FC } from "react";
import Image from "next/image";

// TODO
// Implement Search functionality

export const ProductsSearch: FC = () => {
	return (
		<div className="m-[16rem] sticky top-[287rem] left-0 rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] block">
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
				<li>
					<a href="#">
						<article className="relative rounded-[8rem] bg-white-50 overflow-hidden">
							<Image
								width={640}
								height={959}
								src="/images/raster/products/headphones.jpg"
								alt="Uptech company logotype"
								style={{ objectFit: "cover", height: "140rem", width: "100%" }}
							/>
							<div className="p-[12rem] font-medium">
								<h2 className="text-[12rem] whitespace-nowrap overflow-ellipsis w-full overflow-hidden">
									Wireless Headphone
								</h2>
							</div>
							<div className="absolute top-[12rem] left-[12rem] rounded-[8rem] px-[12rem] py-[6rem] inline-block bg-shark-950">
								<p className="text-[12rem] text-white-50">$300.00</p>
							</div>
						</article>
					</a>
				</li>
				<li>
					<a href="#">
						<article className="relative rounded-[8rem] bg-white-50 overflow-hidden">
							<Image
								width={640}
								height={959}
								src="/images/raster/products/headphones.jpg"
								alt="Uptech company logotype"
								style={{ objectFit: "cover", height: "140rem", width: "100%" }}
							/>
							<div className="p-[12rem] font-medium">
								<h2 className="text-[12rem] whitespace-nowrap overflow-ellipsis w-full overflow-hidden">
									Wireless Headphone
								</h2>
							</div>
							<div className="absolute top-[12rem] left-[12rem] rounded-[8rem] px-[12rem] py-[6rem] inline-block bg-shark-950">
								<p className="text-[12rem] text-white-50">$300.00</p>
							</div>
						</article>
					</a>
				</li>
			</ul>
			<a
				className="text-[14rem] rounded-[32rem] px-[18rem] py-[6rem] bg-shark-950 block text-white-50 text-center"
				href="#"
			>
				Show all
			</a>
		</div>
	);
};
