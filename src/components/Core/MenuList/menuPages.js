"use client";

import Link from "next/link";
import Header from "../Heading";

const MenuPages = ({
	data,
	spaceAfter,
	spaceBefore,
	layoutType,
	elementType,
}) => {
	const { menu } = data;
	return (
		<section
			className={`menu_pages ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<Header data={data} layoutType={layoutType} elementType={elementType}>
				{menu && menu.length > 0 && (
					<ul>
						{menu.map(({ title, link, children }, index) => {
							return (
								<li
									key={title + index}
									className={`text-${data.headerPosition}`}
								>
									<Link href={`${link}`} title={title} aria-label="menus">
										{title}
									</Link>
									{children && (
										<ul>
											{children.length &&
												children.map(({ title, link, active }, index) => {
													return (
														<li key={title + index}>
															<Link
																href={`${link}`}
																title={title}
																aria-label="title"
															>
																{title}
															</Link>
														</li>
													);
												})}
										</ul>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</Header>
		</section>
	);
};
export default MenuPages;
