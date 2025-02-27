"use client";

import { type FC, type ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";

type NavigationLinkProps = {
	href: string;
	children: ReactNode;
};

export const FooterNavigationLink: FC<NavigationLinkProps> = ({ href, children }) => {
	return (
		<MotionConfig transition={{ duration: 0.25, type: "spring", bounce: 0 }}>
			<motion.li
				whileHover={{ color: "#ef233c", opacity: 1 }}
				whileFocus={{ color: "#ef233c", opacity: 1 }}
				whileTap={{ scale: 0.9 }}
				className={"text-white-50 relative opacity-[0.6]"}
				tabIndex={0}
			>
				<Link
					className="inline-block font-medium text-[16rem] leading-[125%] pl-[16rem] pr-[16rem] pt-[8rem] pb-[8rem]"
					href={href}
					tabIndex={1}
				>
					{children}
				</Link>
			</motion.li>
		</MotionConfig>
	);
};
