import { FC, useContext } from "react";

import { HeaderContext } from "@widgets/header/ui";

import { Icon } from "@shared/ui/icon/ui";

export const SecondaryNavigation: FC = () => {
	const { toggleSearch, toggleUserProfile, toggleCart } = useContext(HeaderContext);

	const secondaryNavigationLinks = [
		{
			name: "Search",
			action: toggleSearch,
			Icon: () => <Icon type="search" />
		},
		{
			name: "Profile",
			action: toggleUserProfile,
			Icon: () => <Icon type="profile" />
		},
		{
			name: "Cart",
			action: toggleCart,
			Icon: () => <Icon type="cart" count={1} />
		}
	];

	const renderSecondaryNavigationLinks = () => {
		return secondaryNavigationLinks.map(({ name, action, Icon }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<button onClick={action} type={"button"}>
					<span className="sr-only">{name}</span>
					<Icon />
				</button>
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
