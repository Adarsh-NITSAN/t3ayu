"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
const SlidingBlog = ({ content, spaceAfter, spaceBefore }) => {
	const [swiperModules, setSwiperModules] = useState([]);
	const [Swiper, setSwiper] = useState(null);
	const [SwiperSlide, setSwiperSlide] = useState(null);
	const [blogData, setBlogData] = useState(content || []);

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
		centeredSlides: true,
		loop: true,
		autoHeight: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		centeredSlidesBounds: true,
		breakpoints: {
			769: {
				slidesPerView: 1.2,
			},
			1200: {
				slidesPerView: 1.8,
			},
		},
	};

	const renderBlogs = (blogs) => {
		return (
			<>
				{swiperModules.length > 0 && Swiper && SwiperSlide && (
					<Swiper
						modules={swiperModules}
						{...settings}
						className="swiper-slider"
					>
						{blogs.length > 0 &&
							blogs.map((item, index) => {
								return (
									<SwiperSlide key={index}>
										<div className="sliding-blog-item">
											{item &&
												item.featuredImage &&
												item.featuredImage.length > 0 &&
												item.featuredImage[0].images &&
												item.featuredImage[0].images.defaultImage &&
												item.featuredImage[0].images.defaultImage.publicUrl && (
													<div className="sliding-blog-img">
														<div
															className="blog-bg-img"
															style={{
																backgroundImage: `url(${item.featuredImage[0].images.defaultImage.publicUrl})`,
															}}
														/>
													</div>
												)}

											<div className="sliding-blog-desc">
												{item &&
													item.categories &&
													item.categories.listCategories &&
													item.categories.listCategories.length > 0 && (
														<span className="blog-category">
															{item.categories.listCategories.map(
																(category, index) => {
																	return item.categories.listCategories
																		.length ===
																		index + 1 ? (
																		<>{`${category.title}`}</>
																	) : (
																		<>{`${category.title}, `}</>
																	);
																}
															)}
														</span>
													)}

												<h2>
													<Link
														href={`${item.detail ? item.detail : "#"}`}
														aria-label="blog_title"
													>
														{item.title}
													</Link>
												</h2>
												<Link
													href={`${item.detail ? item.detail : "#"}`}
													className="blog-link"
													aria-label="blog_detail"
												>
													<svg
														stroke="currentColor"
														fill="currentColor"
														strokeWidth="0"
														viewBox="0 0 512 512"
														height="1em"
														width="1em"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"></path>
													</svg>
												</Link>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
					</Swiper>
				)}
			</>
		);
	};

	return (
		<section
			className={`sliding-blog ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			{blogData && blogData.list && blogData.list.length && (
				<div className="sliding-blog-wrapper">{renderBlogs(blogData.list)}</div>
			)}
		</section>
	);
};
export default SlidingBlog;
