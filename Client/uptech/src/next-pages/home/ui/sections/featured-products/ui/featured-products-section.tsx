import Image from "next/image";

import WirelessHeadphone from "@public/images/raster/products/wireless-headphone.jpg";
import WirelessKeyboard from "@public/images/raster/products/wireless-keyboard.jpg";
import WirelessMouse from "@public/images/raster/products/wireless-mouse.jpg";

export const FeaturedProductsSection = () => {
	return (
		<section className="relative ml-[16rem] mr-[16rem] mb-[80rem] tablet:ml-[96rem] tablet:mr-[96rem] tablet:mb-[160rem]">
			<h2 className="font-medium text-[40rem] leading-[100%] capitalize text-center text-(--color-shark-950) tablet:text-left tablet:text-[60rem] desktop:text-[80rem]">
				Featured products
			</h2>
			<ul className="mt-[40rem] flex flex-col gap-y-[32rem] tablet:mt-[60rem] desktop:mt-[80rem] tablet:flex-row tablet:gap-x-[21rem]">
				<li className="relative">
					<article className="relative">
						<Image
							src={WirelessHeadphone}
							alt="Wireless Headphone"
							priority={true}
							placeholder="blur"
							className="rounded-[16rem] h-[380rem] w-full object-cover tablet:h-[431rem] tablet:w-[384rem] desktop:h-[465rem] desktop:w-[402rem]"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem] tablet:mt-[20rem] desktop:mt-[24rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950) tablet:text-[21rem] desktop:text-[22rem]">
								Wireless Headphone
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600) tablet:text-[21rem] desktop:text-[22rem]">
								$300.00
							</strong>
						</div>
					</article>
				</li>
				<li className="relative">
					<article className="relative">
						<Image
							src={WirelessKeyboard}
							alt="Wireless Keyboard"
							priority={true}
							placeholder="blur"
							className="rounded-[16rem] h-[380rem] w-full object-cover tablet:h-[431rem] tablet:w-[384rem] desktop:h-[465rem] desktop:w-[402rem]"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem] tablet:mt-[20rem] desktop:mt-[24rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950) tablet:text-[21rem] desktop:text-[22rem]">
								Wireless Keyboard
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600) tablet:text-[21rem] desktop:text-[22rem]">
								$150.00
							</strong>
						</div>
					</article>
				</li>
				<li className="relative">
					<article className="relative">
						<Image
							src={WirelessMouse}
							alt="Redefining Your Tech Experience"
							priority={true}
							placeholder="blur"
							className="rounded-[16rem] h-[380rem] w-full object-cover tablet:h-[431rem] tablet:w-[384rem] desktop:h-[465rem] desktop:w-[402rem]"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem] tablet:mt-[20rem] desktop:mt-[24rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950) tablet:text-[21rem] desktop:text-[22rem]">
								Wireless Mouse
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600) tablet:text-[21rem] desktop:text-[22rem]">
								$100.00
							</strong>
						</div>
					</article>
				</li>
			</ul>
		</section>
	);
};
