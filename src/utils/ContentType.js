import React from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Core/Heading"), {
	ssr: false,
});

const Text = dynamic(() => import("@/components/Core/Text"), { ssr: false });

const TextPic = dynamic(() => import("@/components/Core/TextPic"), {
	ssr: false,
});

const Textmedia = dynamic(() => import("@/components/Core/Textmedia"), {
	ssr: false,
});

const Images = dynamic(() => import("@/components/Core/Images"), {
	ssr: false,
});

// const Bullets = dynamic(() => import("@/components/Core/Bullets"), {
//   ssr: false,
// }); // Not created

const Table = dynamic(() => import("@/components/Core/Table"), { ssr: false });

const Uploads = dynamic(() => import("@/components/Core/Uploads"), {
	ssr: false,
});

const SimpleHTML = dynamic(() => import("@/components/Core/SimpleHTML"), {
	ssr: false,
});

const Client = dynamic(() => import("@/components/Clients"), {
	ssr: false,
});

const Team = dynamic(() => import("@/components/Team"), {
	ssr: false,
});

const Accordian = dynamic(() => import("@/components/Accordian"), {
	ssr: false,
});

const Testimonial = dynamic(() => import("@/components/Testimonial"), {
	ssr: false,
});

const Counter = dynamic(() => import("@/components/Counter"), {
	ssr: false,
});

const BlockQuote = dynamic(() => import("@/components/Blockquote"), {
	ssr: false,
});

const Slider = dynamic(() => import("@/components/Slider"), {
	ssr: false,
});

const LandingBanner = dynamic(() => import("@/components/LandingBanner"), {
	ssr: false,
});

const CustomForm = dynamic(() => import("@/components/CustomForm"), {
	ssr: false,
});

const CallToAction = dynamic(() => import("@/components/CTA"), { ssr: false });

const BlogList = dynamic(() => import("@/components/Blog/BlogList"), {
	ssr: false,
});

const LatestBlog = dynamic(() => import("@/components/Blog/LatestBlog"), {
	ssr: false,
});

const IndexedSearch = dynamic(() => import("@/sections/IndexedSearch"), {
	ssr: false,
});

const IconTeaser = dynamic(() => import("@/components/IconTeaser"), {
	ssr: false,
});

const Stepper = dynamic(() => import("@/components/Stepper"), {
	ssr: false,
});

const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
	ssr: false,
});

const ColumnTeaser = dynamic(() => import("@/components/ColumnTeaser"), {
	ssr: false,
});

const Map = dynamic(() => import("@/components/Core/Map"), {
	ssr: false,
});

const ServiceCard = dynamic(() => import("@/components/ServiceCard"), {
	ssr: false,
});

const ContactInformation = dynamic(
	() => import("@/components/ContactInformation"),
	{
		ssr: false,
	}
);

const Video = dynamic(() => import("@/components/Video"), { ssr: false });

const TextWithMedia = dynamic(() => import("@/components/TextWithMedia"), {
	ssr: false,
});

const ImageTeaser = dynamic(() => import("@/components/ImageTeaser"), {
	ssr: false,
});

const MenuPages = dynamic(
	() => import("@/components/Core/MenuList/menuPages"),
	{
		ssr: false,
	}
);

const BlogCategories = dynamic(
	() => import("@/components/Blog/BlogDetails/BlogCategories"),
	{ ssr: false }
);

const BlogTags = dynamic(
	() => import("@/components/Blog/BlogDetails/BlogTags"),
	{ ssr: false }
);

const BlogRelatedPosts = dynamic(
	() => import("@/components/Blog/BlogDetails/BlogRelatedPosts"),
	{ ssr: false }
);

const Audio = dynamic(() => import("@/components/Audio"), { ssr: false });

export const componentMapping = {
	header: Header,
	text: Text,
	textpic: TextPic,
	textmedia: Textmedia,
	image: Images,
	table: Table,
	uploads: Uploads,
	form_formframework: CustomForm,
	mask_ns_cta: CallToAction,
	mask_ns_testimonials: Testimonial,
	blog_posts: BlogList,
	blog_latestposts: LatestBlog,
	ke_search_pi2: IndexedSearch,
	mask_ns_icon_teaser: IconTeaser,
	mask_ns_stepper: Stepper,
	mask_ns_progress: ProgressBar,
	mask_ns_three_column_teaser: ColumnTeaser,
	mask_ns_map: Map,
	mask_ns_service_card: ServiceCard,
	mask_ns_contact_information: ContactInformation,
	html: SimpleHTML,
	mask_ns_hero_slider: LandingBanner,
	mask_ns_video: Video,
	mask_ns_text_with_media: TextWithMedia,
	mask_ns_slider: Slider,
	mask_ns_accordion: Accordian,
	mask_ns_counters: Counter,
	menu_pages: MenuPages,
	menu_subpages: MenuPages,
	mask_ns_clients_logo_slider: Client,
	mask_ns_team: Team,
	mask_ns_image_teaser: ImageTeaser,
	mask_ns_quote: BlockQuote,
	mask_ns_audio: Audio,
	blog_category: BlogCategories,
	blog_tag: BlogTags,
	blog_relatedposts: BlogRelatedPosts,
};

const ContentType = ({ pageData }) => {
	if (!pageData) {
		return false;
	}
	const renderContent = (pageData, index) => {
		let contentType = pageData.type;
		let contentData;
		if (pageData.content?.items) {
			contentData = findValuesObject(pageData.content.items, "items");
		} else {
			contentData = findValuesObject(pageData?.content, "pi_flexform_content");
		}

		const marBottom = pageData?.appearance?.spaceAfter;
		const marTop = pageData?.appearance?.spaceBefore;
		const layout = pageData?.appearance?.layout;
		const Component = componentMapping[contentType];

		if (Component) {
			return (
				<Component
					data={
						contentData && contentData.length
							? contentData[0]
							: pageData?.content
					}
					id={pageData.id}
					spaceAfter={marBottom}
					spaceBefore={marTop}
					layoutType={layout}
					elementType={contentType}
					key={index && index}
				/>
			);
		}
		return null;
	};
	return (
		<>
			{pageData && pageData.length
				? pageData.map((items, index) => {
						if (items) {
							return renderContent(items, index);
						}
				  })
				: renderContent(pageData)}
		</>
	);
};
export default ContentType;

export function findValuesObject(obj, key) {
	return findValuesObjectHelper(obj, key, []);
}

export function findValuesObjectHelper(obj, key, list) {
	if (!obj) return list;
	if (obj instanceof Array) {
		for (var i in obj) {
			list = list.concat(findValuesObjectHelper(obj[i], key, []));
		}
		return list;
	}
	if (obj[key]) list.push(obj[key]);

	if (typeof obj == "object" && obj !== null) {
		var children = Object.keys(obj);
		if (children.length > 0) {
			for (i = 0; i < children.length; i++) {
				list = list.concat(findValuesObjectHelper(obj[children[i]], key, []));
			}
		}
	}
	return list;
}
