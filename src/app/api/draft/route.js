import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  //   if (secret !== process.env.NEXT_PRIVATE_PREVIEW_KEY || !slug) {
  //     return new Response("Invalid Token", { status: 401 });
  //   }
  const post = await getAPIData(slug);
  if (post.error) {
    return new Response("Invalid Slug", { status: 401 });
  }
  draftMode().enable();
  redirect(`${slug}`);
}
