import { type FC } from "react";

type SpinnerProps = {
	primaryColor?: string;
	secondaryColor?: string;
	primaryAnimationDuration?: string;
	secondaryAnimationDuration?: string;
	circleRadius?: number;
	circleCount?: number;
	ringRadius?: number;
	width?: number;
	height?: number;
	viewBox?: string;
};

export const Spinner: FC<SpinnerProps> = ({
	primaryColor = "rgba(255,255,255, 0.15)",
	secondaryColor = "rgba(255,255,255, 1)",
	primaryAnimationDuration = "10s",
	secondaryAnimationDuration = "1s",
	circleRadius = 1.8,
	circleCount = 8,
	ringRadius = 9,
	width = 32,
	height = 32,
	viewBox = "0 0 24 24"
}) => {
	const renderCircles = Array.from({ length: circleCount }, (_, i) => {
		const angle = (2 * Math.PI * i) / circleCount;
		const cx = 12 + ringRadius * Math.cos(angle);
		const cy = 12 + ringRadius * Math.sin(angle);
		return <circle key={i} cx={cx} cy={cy} r={circleRadius} fill={primaryColor} />;
	});

	return (
		<div
			className="relative"
			style={{
				width,
				height
			}}
		>
			<svg
				className="absolute top-0 left-0 z-1"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox={viewBox}
			>
				<g>
					{renderCircles}
					<animateTransform
						attributeName="transform"
						dur={primaryAnimationDuration}
						repeatCount="indefinite"
						type="rotate"
						values="360 12 12;0 12 12"
					/>
				</g>
			</svg>
			<svg
				className="absolute top-0 left-0 z-2"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox={viewBox}
			>
				<path
					fill={secondaryColor}
					d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
				>
					<animateTransform
						attributeName="transform"
						dur={secondaryAnimationDuration}
						repeatCount="indefinite"
						type="rotate"
						values="0 12 12;360 12 12"
					/>
				</path>
			</svg>
		</div>
	);
};
