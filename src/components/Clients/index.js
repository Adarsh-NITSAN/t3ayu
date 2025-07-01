"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Client = ({ data, spaceBefore, spaceAfter }) => {
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
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			400: {
				slidesPerView: 2,
			},
			576: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
		},
	};

	return (
		<section
			className={`client-section ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<div className="client-wrapper">
				{swiperModules.length > 0 && Swiper && SwiperSlide && (
					<Swiper
						modules={swiperModules}
						{...settings}
						className="swiper-slider"
					>
						{data &&
							data.clientLogos &&
							data.clientLogos.length > 0 &&
							data.clientLogos.map((item, index) => {
								return (
									<SwiperSlide key={index} className="client-item">
										<Link href={"/"} aria-label="client_image">
											<Image
												src={item.publicUrl}
												alt={item?.properties?.alternative || "Image"}
												title={item?.properties?.title}
												width={0}
												height={0}
												style={{ width: "80%", height: "auto" }}
											/>
										</Link>
									</SwiperSlide>
								);
							})}
					</Swiper>
				)}
			</div>
		</section>
	);
};

export default Client;
