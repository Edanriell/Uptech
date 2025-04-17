import Image from "next/image";

import WirelessHeadphone from "@public/images/raster/products/wireless-headphone.jpg";
import WirelessKeyboard from "@public/images/raster/products/wireless-keyboard.jpg";
import WirelessMouse from "@public/images/raster/products/wireless-mouse.jpg";

export const FeaturedProductsSection = () => {
	return (
		<section className="relative ml-[16rem] mr-[16rem] mb-[80rem]">
			<h2 className="font-medium text-[40rem] leading-[100%] capitalize text-center text-(--color-shark-950)">
				Featured products
			</h2>
			<ul className="mt-[40rem] flex flex-col gap-[32rem]">
				<li className="relative">
					<article className="relative">
						<Image
							src={WirelessHeadphone}
							alt="Wireless Headphone"
							priority={true}
							placeholder="blur"
							className="rounded-[16rem] h-[380rem] w-full object-cover"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950)">
								Wireless Headphone
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600)">
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
							className="rounded-[16rem] h-[380rem] w-full object-cover"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950)">
								Wireless Keyboard
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600)">
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
							className="rounded-[16rem] h-[380rem] w-full object-cover"
							loading="eager"
						/>
						<div className="flex flex-row items-center justify-between mt-[16rem]">
							<h3 className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-shark-950)">
								Wireless Mouse
							</h3>
							<strong className="font-medium text-[20rem] leading-[125%] capitalize text-(--color-alizarin-crimson-600)">
								$100.00
							</strong>
						</div>
					</article>
				</li>
			</ul>
		</section>
	);
};
