import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { i18n } from "../i18n-config";

const { locales, pathName } = i18n;
export const { Link, redirect, usePathname, useRouter } =
	createLocalizedPathnamesNavigation({
		locales,
		pathName,
	});
