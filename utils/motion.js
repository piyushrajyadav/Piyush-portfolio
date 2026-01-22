export const textVariant = (delay) => {
	return {
		hidden: {
			y: -30, // Reduced from -50
			opacity: 0
		},
		show: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween", // Changed from spring for better performance
				duration: 0.6, // Reduced from 1.25
				delay: delay || 0,
				ease: "easeOut"
			}
		}
	};
};

export const fadeIn = (direction, type, delay, duration) => {
	return {
		hidden: {
			x: direction === "left" ? 50 : direction === "right" ? -50 : 0, // Reduced from 100
			y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
			opacity: 0
		},
		show: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: {
				type: "tween", // Always use tween for performance
				delay: delay || 0,
				duration: duration || 0.5,
				ease: "easeOut"
			}
		}
	};
};

export const zoomIn = (delay, duration) => {
	return {
		hidden: {
			scale: 0.9, // Changed from 0 for smoother animation
			opacity: 0
		},
		show: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "tween",
				delay: delay || 0,
				duration: duration || 0.4,
				ease: "easeOut"
			}
		}
	};
};

export const slideIn = (direction, type, delay, duration) => {
	return {
		hidden: {
			x:
				direction === "left"
					? "-50%" // Reduced from -100%
					: direction === "right"
					? "50%"
					: 0,
			y: direction === "up" ? "50%" : direction === "down" ? "50%" : 0,
			opacity: 0 // Added opacity for smoother effect
		},
		show: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: {
				type: "tween", // Changed from variable type
				delay: delay || 0,
				duration: duration || 0.5,
				ease: "easeOut"
			}
		}
	};
};

export const staggerContainer = (staggerChildren, delayChildren) => {
	return {
		hidden: {},
		show: {
			transition: {
				staggerChildren: staggerChildren,
				delayChildren: delayChildren || 0
			}
		}
	};
};
