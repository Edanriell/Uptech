import {
	Children,
	cloneElement,
	isValidElement,
	type MouseEvent,
	type ReactNode,
	useCallback
} from "react";

import { useDrawerStore } from "./useDrawerStore";

export const useDrawerTrigger = (children: ReactNode) => {
	const { openDrawer } = useDrawerStore();

	// Handles click events for elements with `data-content-id`
	const handleDrawerOpen = useCallback(
		(contentId: string) => {
			if (!contentId) return;
			openDrawer(contentId);
		},
		[openDrawer]
	);

	// Validates that children have a valid `data-content-id` attribute
	const validateDrawerTriggerChildren = useCallback((nodes: ReactNode): boolean => {
		return Children.toArray(nodes).some((node) => {
			if (!isValidElement(node)) return false;
			if (node.props?.["data-content-id" as never]) return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((node.props as any)?.children)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return validateDrawerTriggerChildren((node.props as any).children);
			return false;
		});
	}, []);

	// Throw error if validation fails
	if (!validateDrawerTriggerChildren(children)) {
		throw new Error(
			`<Drawer.Trigger> must contain at least one child with a "data-content-id" attribute. ` +
				`This attribute is required for identifying drawer content and must exist either directly at the top level or nested within child components.`
		);
	}

	// Recursively processes child nodes
	const renderChildren = useCallback(
		(nodes: ReactNode): ReactNode => {
			return Children.map(nodes, (child) => {
				if (!isValidElement(child)) {
					return child;
				}

				const contentId = child.props?.["data-content-id" as never];
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const existingOnClick = (child.props as any)?.onClick;

				if (contentId) {
					return cloneElement(child, {
						onClick: (
							event: MouseEvent<
								HTMLButtonElement | HTMLDivElement | HTMLAnchorElement
							>
						) => {
							existingOnClick?.(event);
							handleDrawerOpen(contentId);
						}
					} as Partial<typeof child.props>);
				}

				// Recursively process nested children
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if ((child.props as any)?.children) {
					return cloneElement(child, {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						children: renderChildren((child.props as any).children)
					} as Partial<typeof child.props>);
				}

				return child;
			});
		},
		[handleDrawerOpen]
	);

	const processedChildren = renderChildren(children);

	return { processedChildren };
};
