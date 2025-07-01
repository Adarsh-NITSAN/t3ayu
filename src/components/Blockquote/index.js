"use client";

import Image from "next/image";

const BlockQuote = ({ data, spaceBefore, spaceAfter }) => {
	return (
		<section
			className={`blockquote-section ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<blockquote
				className={`${
					data && data.authorImage && data.authorImage.length > 0
						? "quote-with-img"
						: "quote-without-img"
				} ${data && data.backgroundColor === "1" ? "primary-bg" : "light-bg"}`}
			>
				{data && data.authorName && (
					<span>
						{data &&
							data.authorImage &&
							data.authorImage.length > 0 &&
							data.authorImage[0].publicUrl && (
								<Image
									src={data.authorImage[0].publicUrl}
									alt={data.authorImage[0].properties.alternative || "image"}
									title={data.authorImage[0].properties.title}
									width={0}
									height={0}
									style={{ width: "100%", height: "auto" }}
								/>
							)}
						{data.authorName}
					</span>
				)}
				{data && data.quoteText && (
					<p
						className={`${
							data.position === "0" ? "quote-left" : "quote-right"
						}`}
					>
						{data && data.quoteText}
					</p>
				)}
			</blockquote>
		</section>
	);
};
export default BlockQuote;
