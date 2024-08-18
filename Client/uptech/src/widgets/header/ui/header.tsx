import { FC, Fragment } from "react";

import { ProductsSearch } from "@features/products-search/ui";

import {
	MobileNavigationTrigger,
	PrimaryMobileNavigation,
	SecondaryMobileNavigation
} from "@widgets/mobile-navigation/ui";

import { Logotype } from "@shared/ui/logotype/ui";

export const Header: FC = () => {
	return (
		<Fragment>
			<header className="pt-[18rem] pr-[24rem] pb-[18rem] pl-[16rem] flex flex-row items-center justify-between rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] m-[16rem] sticky top-[16rem] left-0">
				<Logotype colorScheme={"light"} />
				<MobileNavigationTrigger />
			</header>
			<PrimaryMobileNavigation />
			<ProductsSearch />
			<div className="m-[16rem] sticky top-[637rem] left-0 flex justify-end">
				<SecondaryMobileNavigation />
			</div>
		</Fragment>
	);
};

// TODO
// Get rid of ../../../../../public
// Create an alias
// Also make Some hooks when screen width
// And Create Mobile desktop header
