"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Logo from "../Logo";
const ContentType = dynamic(() => import("@/utils/ContentType"), {
	ssr: false,
});

const RenderComponents = dynamic(() => import("@/utils/RenderComponents"), {
	ssr: false,
});

const RenderContainerSection = ({ singleCol }) => {
	return (
		<div
			className={`${
				singleCol.appearance.spaceBefore &&
				`frame-space-before-${singleCol.appearance.spaceBefore}`
			} ${
				singleCol.appearance.spaceAfter &&
				`frame-space-after-${singleCol.appearance.spaceAfter}`
			} ${
				singleCol.content?.settings?.background_option === "light"
					? "section--bg-light-color"
					: singleCol.content?.settings?.background_option === "dark"
					? `section--bg-dark-color ${
							singleCol.content?.settings?.overlaytext === true
								? "bg-dark-overlay"
								: ""
					  }`
					: singleCol.content?.settings?.background_option === "transport"
					? "section--bg-white-color"
					: `section--bg-image ${
							singleCol.content?.settings?.overlaytext === true
								? "bg-image-overlay"
								: ""
					  }`
			}`}
			style={
				singleCol.content?.settings?.background_option === "image" &&
				singleCol.content &&
				singleCol.content.settings &&
				singleCol.content.settings.image &&
				singleCol.content.settings.image.length
					? {
							backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${singleCol.content.settings.image[0]}`})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "50%",
					  }
					: {}
			}
		>
			{singleCol.content?.settings?.containerfluid === true ||
			singleCol.content?.settings?.containerfluid === "1" ? (
				<Container
					fluid
					className={`${
						singleCol.content?.settings?.nogoutter === true ? "g-0" : ""
					}`}
				>
					<Row
						className={`${
							singleCol.content?.settings?.nogoutter === true ? "g-0" : ""
						}`}
					>
						<RenderComponents
							pageData={singleCol.content.items}
							settings={singleCol.content?.settings}
							type={singleCol.type}
						/>
					</Row>
				</Container>
			) : (
				<Container
					className={`${
						singleCol.content?.settings?.nogoutter === true ? "g-0" : ""
					}`}
				>
					<Row
						className={`${
							singleCol.content?.settings?.nogoutter === true ? "g-0" : ""
						}`}
					>
						<RenderComponents
							pageData={singleCol.content.items}
							settings={singleCol.content?.settings}
							type={singleCol.type}
						/>
					</Row>
				</Container>
			)}
		</div>
	);
};

const Footer = ({ pageData }) => {
	const { themeSwitcher, footerData, baseThemeData, socialLinks } =
		useContext(GlobalContext);

	let footerLayout =
		pageData &&
		pageData.data &&
		pageData.data.page &&
		pageData.data.page.constants &&
		pageData.data.page.constants.ns_style &&
		pageData.data.page.constants.ns_style.footerLayout &&
		pageData.data.page.constants.ns_style.footerLayout.value;

	let footerBgLayout =
		pageData &&
		pageData.data &&
		pageData.data.page &&
		pageData.data.page.constants &&
		pageData.data.page.constants.ns_style &&
		pageData.data.page.constants.ns_style.footerBgLayout &&
		pageData.data.page.constants.ns_style.footerBgLayout.value;

	let baseTheme =
		pageData &&
		pageData.data &&
		pageData.data.page &&
		pageData.data.page.constants &&
		pageData.data.page.constants.ns_basetheme;

	const renderSocialMedia = () => {
		return (
			<React.Fragment>
				{socialLinks && socialLinks.seo_facebook_link && (
					<Link
						href={`${socialLinks.seo_facebook_link.value}`}
						target="_blank"
						aria-label="fb"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="20px"
							width="20px"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path>
						</svg>
					</Link>
				)}
				{socialLinks && socialLinks.seo_twitter_link && (
					<Link
						href={`${socialLinks.seo_twitter_link.value}`}
						target="_blank"
						aria-label="twitter"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="20px"
							width="20px"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path>
						</svg>
					</Link>
				)}
				{socialLinks && socialLinks.seo_linkedin_link && (
					<Link
						href={socialLinks.seo_linkedin_link.value}
						target="_blank"
						aria-label="linkedIn"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="20px"
							width="20px"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path>
						</svg>
					</Link>
				)}
			</React.Fragment>
		);
	};
	const renderCopyRight = (props) => {
		return (
			<div
				className={`copy-right-section ${props === "small" ? "with-icon" : ""}`}
			>
				<Container>
					<div
						className={`copy-right-text ${
							props === "large"
								? "d-block"
								: props === "medium"
								? ""
								: "without-border"
						}`}
					>
						{baseThemeData &&
							baseThemeData.copyright &&
							baseThemeData.copyright.value && (
								<p>{baseThemeData.copyright.value}</p>
							)}
						{props === "large" ? null : (
							<div className="social-icon">{renderSocialMedia()}</div>
						)}
					</div>
				</Container>
			</div>
		);
	};

	const renderLargeFooter = () => {
		return (
			<footer
				className={`footer-section ${
					footerBgLayout === "light_color" ? "" : "dark-footer"
				}`}
			>
				<div className="footer-top">
					<Container>
						{baseTheme.logo.value && (
							<Logo data={baseTheme} footerBgLayout={footerBgLayout} />
						)}

						<div className="social-icon">{renderSocialMedia()}</div>
					</Container>
				</div>

				<div className="footer-widget-area">
					{footerData &&
						footerData.map((singleCol, index) => {
							return (
								<React.Fragment key={index}>
									{singleCol.type === "ns_base_2Cols" ||
									singleCol.type === "ns_base_3Cols" ||
									singleCol.type === "ns_base_4Cols" ||
									singleCol.type === "ns_base_6Cols" ? (
										<RenderContainerSection singleCol={singleCol} />
									) : singleCol.type === "ns_base_container" ? (
										<RenderContainerSection singleCol={singleCol} />
									) : (
										<Container>
											<ContentType pageData={singleCol} />
										</Container>
									)}
								</React.Fragment>
							);
						})}
				</div>
				{renderCopyRight("large")}
			</footer>
		);
	};

	const renderMediumFooter = () => {
		return (
			<footer
				className={`footer-section ${
					footerBgLayout === "light_color" ? "" : "dark-footer"
				}`}
			>
				<div className="footer-widget-area medium-footer">
					<div className="medium-footer__logo">
						{baseTheme.logo.value && (
							<Logo data={baseTheme} footerBgLayout={footerBgLayout} />
						)}
					</div>
					{footerData &&
						footerData.map((singleCol, index) => {
							return (
								<React.Fragment key={index}>
									{singleCol.type === "ns_base_2Cols" ||
									singleCol.type === "ns_base_3Cols" ||
									singleCol.type === "ns_base_4Cols" ||
									singleCol.type === "ns_base_6Cols" ? (
										<RenderContainerSection singleCol={singleCol} />
									) : singleCol.type === "ns_base_container" ? (
										<RenderContainerSection singleCol={singleCol} />
									) : (
										<Container>
											<ContentType pageData={singleCol} />
										</Container>
									)}
								</React.Fragment>
							);
						})}
				</div>
				{renderCopyRight("medium")}
			</footer>
		);
	};

	const renderSmallFooter = () => {
		return (
			<footer
				className={`footer-section ${
					footerBgLayout === "light_color" ? "" : "dark-footer"
				}`}
			>
				{renderCopyRight("small")}
			</footer>
		);
	};
	return (
		<React.Fragment>
			{themeSwitcher.footerLayout ? (
				themeSwitcher.footerLayout === "Large Footer" ? (
					<>{renderLargeFooter()}</>
				) : themeSwitcher.footerLayout === "Medium Footer" ? (
					<>{renderMediumFooter()}</>
				) : themeSwitcher.footerLayout === "Small Footer" ? (
					<>{renderSmallFooter()}</>
				) : null
			) : footerLayout === "Large Footer" ? (
				<>{renderLargeFooter()}</>
			) : footerLayout === "Medium Footer" ? (
				<>{renderMediumFooter()} </>
			) : footerLayout === "Small Footer" ? (
				<>{renderSmallFooter()}</>
			) : null}
		</React.Fragment>
	);
};

export default Footer;
export { RenderContainerSection };
