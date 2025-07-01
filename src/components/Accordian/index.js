"use client";

import { sanitizeLink } from "@/utils/sanitizeLink";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { Accordion } from "react-bootstrap";

const CustomAccordian = ({ data, spaceAfter, spaceBefore }) => {
	const router = useRouter();

	return (
		<section
			className={`faq-section  ${
				spaceBefore && `frame-space-before-${spaceBefore}`
			} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
		>
			<Accordion defaultActiveKey="0">
				{data &&
					data.items &&
					data.items.length > 0 &&
					data.items.map(({ title, content }, index) => {
						return (
							<Accordion.Item eventKey={index} key={index}>
								<Accordion.Header>
									{title && <span>{title}</span>}

									<span className="accordian-icon">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
											<g
												id="SVGRepo_tracerCarrier"
												strokeLinecap="round"
												strokeLinejoin="round"
											></g>
											<g id="SVGRepo_iconCarrier">
												{" "}
												<path
													d="M4 12H20M12 4V20"
													stroke="#000000"
													strokeWidth="2.4"
													strokeLinecap="round"
													strokeLinejoin="round"
												></path>{" "}
											</g>
										</svg>
									</span>
								</Accordion.Header>
								<Accordion.Body
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(content),
									}}
									onClick={(e) => sanitizeLink(e, router)}
								/>
							</Accordion.Item>
						);
					})}
			</Accordion>
		</section>
	);
};
export default CustomAccordian;
