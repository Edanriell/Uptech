import { FC, Fragment } from "react";
import Image from "next/image";

export const Header: FC = () => {
	return (
		<Fragment>
			<header className="pt-[18rem] pr-[24rem] pb-[18rem] pl-[16rem] flex flex-row items-center justify-between rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] m-[16rem] sticky top-[16rem] left-0">
				<Image
					src="/images/vector/logotype-light.svg"
					width="115"
					height="28"
					alt="Uptech company logotype"
				/>
				<button className="absolute right-[5rem] top-[50%] translate-y-[-50%] rounded-[8rem] p-[8rem] w-[40rem] h-[40rem] flex items-center justify-center">
					<span className="sr-only">Toggle mobile navigation</span>
					<svg
						width="20"
						height="14"
						viewBox="0 0 20 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="mobile-navigation-line-0"
							d="M1 7H19"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							id="mobile-navigation-line-1"
							d="M1 1H19"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							id="mobile-navigation-line-2"
							d="M1 13H19"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</header>
			<nav className="m-[16rem] sticky top-[97rem] left-0 rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] pt-[18rem] pr-[24rem] pb-[18rem] pl-[16rem] block">
				<ul className="flex flex-col items-start gap-y-[4rem]">
					<li>
						<a className="uppercase p-[10rem] text-white-50" href="#">
							Home
						</a>
					</li>
					<li>
						<a className="uppercase p-[10rem] text-white-50" href="#">
							Catalogue
						</a>
					</li>
					<li>
						<a className="uppercase p-[10rem] text-white-50" href="#">
							Catalogue
						</a>
					</li>
					<li>
						<a className="uppercase p-[10rem] text-white-50" href="#">
							Popular
						</a>
					</li>
					<li>
						<a className="uppercase p-[10rem] text-white-50" href="#">
							Contacts
						</a>
					</li>
				</ul>
			</nav>
		</Fragment>
	);
};

// TODO
// Get rid of ../../../../../public
// Create an alias
// Also make Some hooks when screen width
// And Create Mobile desktop header
