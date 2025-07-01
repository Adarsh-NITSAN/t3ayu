"use client";
import React, { useEffect, useState } from "react";
import { FaAnglesUp } from "react-icons/fa6";

const GoToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 200) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);
	const goTo = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			{showTopBtn && (
				<div className="go-top" onClick={goTo}>
					<FaAnglesUp className="goto-top-btn" />
				</div>
			)}{" "}
		</>
	);
};

export default GoToTop;
