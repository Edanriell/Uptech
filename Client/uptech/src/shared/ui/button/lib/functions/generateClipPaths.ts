import { Orientation } from "../../ui";

type generateClipPathParameters = {
	orientation: Orientation;
	isButtonActive: boolean;
};

export const generateClipPath = ({ orientation, isButtonActive }: generateClipPathParameters) => {
	const orientationClipPathVariants = {
		"top-to-bottom": {
			initial: "inset(0 0 100% 0)",
			final: "inset(0 0 0 0%)"
		},
		"bottom-to-top": {
			initial: "inset(100% 0 0 0)",
			final: "inset(0% 0 0 0)"
		},
		"left-to-right": {
			initial: "inset(0 100% 0 0)",
			final: "inset(0 0% 0 0)"
		},
		"right-to-left": {
			initial: "inset(0 0 0 100%)",
			final: "inset(0 0 0 0%)"
		},
		"top-left-to-bottom-right": {
			initial: "polygon(0% 0%, 0% 0%, 0% 100%, -50% 100%)",
			final: "polygon(125% 0%, 0% 0%, 0% 100%, 100% 100%)"
		},
		"bottom-right-to-top-left": {
			initial: "polygon(100% 100%, 100% 100%, 100% 0%, 150% 0%)",
			final: "polygon(-25% 100%, 100% 100%, 100% 0%, 0% 0%)"
		},
		"top-right-to-bottom-left": {
			initial: "polygon(100% 0%, 100% 0%, 100% 100%, 150% 100%)",
			final: "polygon(-100% 0%, 100% 0%, 100% 100%, -25% 100%)"
		},
		"bottom-left-to-top-right": {
			initial: "polygon(0% 100%, 0% 100%, 0% 0%, -50% 0%)",
			final: "polygon(125% 100%, 0% 100%, 0% 0%, 100% 0%)"
		}
	};

	const { initial, final } = orientationClipPathVariants[orientation];
	return isButtonActive ? final : initial;
};
