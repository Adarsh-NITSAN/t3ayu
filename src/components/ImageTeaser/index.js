"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ImageTeaser = ({ data, spaceAfter, spaceBefore }) => {
	const [swiperModules, setSwiperModules] = useState([]);
	const [Swiper, setSwiper] = useState(null);
	const [SwiperSlide, setSwiperSlide] = useState(null);

	useEffect(() => {
		const getSwiperModules = async () => {
			const modules = await import("swiper/modules");
			const { Pagination, Autoplay, Navigation } = modules;
			const swiperComponents = await import("swiper/react");

			setSwiperModules([Pagination, Autoplay, Navigation]);
			setSwiper(swiperComponents.Swiper);
			setSwiperSlide(swiperComponents.SwiperSlide);
		};

		getSwiperModules();
	}, []);

	const settings = {
		slidesPerView: 1,
		spaceBetween: 25,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			767: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
		},
	};

	return (
		<section
			className={`image-teaser  ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<div className="image-teaser-wrapper">
				{swiperModules.length > 0 && Swiper && SwiperSlide && (
					<Swiper
						modules={swiperModules}
						{...settings}
						className="swiper-slider"
					>
						{data &&
							data.items &&
							data.items.length > 0 &&
							data.items.map(({ title, link, image }, index) => {
								return (
									<SwiperSlide key={index}>
										<div
											className="teaser-item"
											style={{ backgroundImage: `url(${image[0]?.publicUrl})` }}
										>
											{title && (
												<h6>
													<Link
														href={`${link.href ? link.href : "#"}`}
														aria-label="title"
													>
														{title}
													</Link>
												</h6>
											)}
										</div>
									</SwiperSlide>
								);
							})}
					</Swiper>
				)}
			</div>
		</section>
	);
};
export default ImageTeaser;
