import { FC, Fragment, useEffect, useState } from "react";

import { PrimaryNavigation, SecondaryNavigation } from "@widgets/navigation/ui";

import { Logotype } from "@shared/ui/logotype/ui";
import { useWindowSize } from "@shared/lib/hooks";

export const StaticHeader: FC = () => {
	const [currentWindowWidth, setCurrentWindowWidth] = useState<number | null>(null);
	const { width } = useWindowSize();

	useEffect(() => {
		setCurrentWindowWidth(width);
	}, [width]);

	return (
		<Fragment>
			{currentWindowWidth && currentWindowWidth >= 990 && (
				<header className="pl-[32rem] pr-[32rem] mt-[24rem] mb-[24rem] flex flex-row items-center justify-between max-h-[80rem]">
					<Logotype colorScheme={"dark"} size={"medium"} />
					<PrimaryNavigation />
					<SecondaryNavigation />
				</header>
			)}
		</Fragment>
	);
};
