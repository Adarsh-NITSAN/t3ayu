"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const Testimonial = ({ data, spaceAfter, spaceBefore }) => {
	const [swiperModules, setSwiperModules] = useState([]);
	const [Swiper, setSwiper] = useState(null);
	const [SwiperSlide, setSwiperSlide] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	useEffect(() => {
		const getSwiperModules = async () => {
			const modules = await import("swiper/modules");
			const { Pagination, Autoplay, Navigation, Thumbs } = modules;
			const swiperComponents = await import("swiper/react");

			setSwiperModules([Pagination, Autoplay, Navigation, Thumbs]);
			setSwiper(swiperComponents.Swiper);
			setSwiperSlide(swiperComponents.SwiperSlide);
		};

		getSwiperModules();
	}, []);

	const similarConfig = {
		navigation: data.sliderNavigation === "1" ? true : false,
		loop: data.sliderLoop === "1" ? true : false,
		autoplay:
			data && data.sliderAutoplay === "1"
				? {
						delay:
							data.autoplayTimeInMilliSeconds !== "0"
								? data.autoplayTimeInMilliSeconds
								: 2000,
						disableOnInteraction: false,
				  }
				: false,
		pagination:
			data && data.dotsDynamicStyle === "1"
				? {
						clickable: true,
						dynamicBullets: true,
				  }
				: data && data.sliderDots === "1"
				? {
						clickable: true,
				  }
				: false,
	};
	const settings = {
		slidesPerView: 1,
		spaceBetween: 25,
		centeredSlides: true,
		centeredSlidesBounds: true,
		breakpoints: {
			767: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
		},
	};

	const fillStarRating = (rating) => {
		let totalStars = Number(rating);
		let emptyStar = 5 - totalStars;

		let stars = new Array(5)
			.fill(emptyStar)
			.map((value, index) =>
				index < totalStars
					? index < Math.floor(totalStars)
						? 1
						: totalStars % index === 0.5
						? 0.5
						: totalStars === 0.5
						? 0.5
						: 0
					: 0
			);
		return stars;
	};

	const renderStarRating = (stars) => {
		return (
			<div className="testimonial-rating">
				{stars.map((star, index) => {
					return (
						<React.Fragment key={index}>
							{star === 1 ? (
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 576 512"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
								</svg>
							) : star === 0.5 ? (
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 536 512"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path>
								</svg>
							) : (
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 576 512"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
								</svg>
							)}
						</React.Fragment>
					);
				})}
			</div>
		);
	};

	return (
		<section
			className={`testimonial ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<div
				className={`testimonial-wrapper ${
					data.variations === "0" ? "combine-testimonials" : ""
				}`}
			>
				{swiperModules.length > 0 &&
					Swiper &&
					SwiperSlide &&
					(data.variations === "0" ? (
						<>
							<Swiper
								modules={swiperModules}
								{...similarConfig}
								slidesPerView={1}
								thumbs={{ swiper: thumbsSwiper }}
								className="swiper-slider"
							>
								{data.items &&
									data.items.length > 0 &&
									data.items.map(({ content, image, rating }, index) => {
										let stars = fillStarRating(rating);

										return (
											<SwiperSlide key={index}>
												<div className="combine-testimonial">
													{image && image.length && (
														<div className="author-pic">
															<Image
																src={`${image[0].publicUrl}`}
																alt={image?.properties?.alternative || "image"}
																title={image?.properties?.title}
																width={0}
																height={0}
																style={{ width: "100%", height: "auto" }}
															/>
														</div>
													)}

													<div className="author-desc">
														{renderStarRating(stars)}
														{content && <h2>{content}</h2>}
													</div>
												</div>
											</SwiperSlide>
										);
									})}
							</Swiper>

							<Swiper
								modules={swiperModules}
								slidesPerView={1}
								breakpoints={{
									576: {
										slidesPerView: 2,
									},
									767: {
										slidesPerView: 3,
									},
								}}
								onSwiper={setThumbsSwiper}
								watchSlidesProgress={true}
							>
								{data.items &&
									data.items.length > 0 &&
									data.items.map(({ designation, name }, index) => {
										return (
											<SwiperSlide key={index}>
												<div className="single-slider">
													{name && <h4>{name}</h4>}
													{designation && <span>{designation}</span>}
												</div>
											</SwiperSlide>
										);
									})}
							</Swiper>
						</>
					) : (
						<Swiper
							modules={swiperModules}
							{...settings}
							{...similarConfig}
							className="swiper-slider"
						>
							{data.items &&
								data.items.length > 0 &&
								data.items.map(
									({ content, image, rating, designation, name }, index) => {
										let stars = fillStarRating(rating);
										return (
											<SwiperSlide key={index}>
												<div className="single-testimonial">
													{content && <p>{content}</p>}

													<div className="testimonial-author">
														{image && image.length && (
															<div className="author-img">
																<Image
																	src={`${image[0].publicUrl}`}
																	alt={
																		image?.properties?.alternative || "Image"
																	}
																	title={image?.properties?.title}
																	width={80}
																	height={80}
																/>
															</div>
														)}

														<div className="author-info">
															{name && <h5>{name}</h5>}
															{designation && <span>{designation}</span>}
															{renderStarRating(stars)}
														</div>
													</div>
													<span className="testimonial-quote" />
												</div>
											</SwiperSlide>
										);
									}
								)}
						</Swiper>
					))}
			</div>
		</section>
	);
};
export default Testimonial;
