import { FC, JSX } from "react";
import { motion } from "framer-motion";

import { useHeaderContext } from "@widgets/header/lib";

import { Icon } from "@shared/ui/icon/ui";

type SecondaryNavigationLink = {
	name: string;
	handleLinkClick: () => void;
	Icon: () => JSX.Element;
};

export const SecondaryNavigation: FC = () => {
	const { toggleSearch, toggleUserProfile, toggleCart } = useHeaderContext();

	const secondaryNavigationLinks: Array<SecondaryNavigationLink> = [
		{
			name: "Search",
			handleLinkClick: toggleSearch,
			Icon: () => <Icon type="search" />
		},
		{
			name: "Profile",
			handleLinkClick: toggleUserProfile,
			Icon: () => <Icon type="profile" />
		},
		{
			name: "Cart",
			handleLinkClick: toggleCart,
			Icon: () => <Icon type="cart" count={1} />
		}
	];

	const renderSecondaryNavigationLinks = () => {
		return secondaryNavigationLinks.map(({ name, handleLinkClick, Icon }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<motion.button
					whileHover={{
						scale: 1.15,
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.2
						}
					}}
					whileTap={{
						scale: 0.85,
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.15
						}
					}}
					onClick={handleLinkClick}
					type={"button"}
				>
					<span className="sr-only">{name}</span>
					<Icon />
				</motion.button>
			</li>
		));
	};

	return (
		<nav>
			<ul className="flex flex-row items-center justify-center gap-x-[16rem]">
				{renderSecondaryNavigationLinks()}
			</ul>
		</nav>
	);
};
