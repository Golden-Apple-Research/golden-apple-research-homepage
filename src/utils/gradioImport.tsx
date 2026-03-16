// import { QueryClient } from "@tanstack/solid-query";
// import { createServerFn } from "@tanstack/solid-start";
// import { onMount } from "solid-js";

// export const gradioApps = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 60, // 1 Minute
//     },
//   },
// });

// export const fetchBookmarks = createServerFn().handler(async () => {
//   const res = await fetch(`${env.LINKDING_API_ENDPOINT}/bookmarks`, {
//     headers: {
//       Authorization: `Token ${env.LINKDING_API_TOKEN}`,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return (await res.json()) as BookmarkListResponse;
// });

// export const bookmarksQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["bookmarks"],
//     queryFn: () => fetchBookmarks(),
//   });
// };

// export const filteredBookmarksQueryOptions = (tag: string) => {
//   return queryOptions({
//     queryKey: ["bookmarks", "filtered", tag],
//     queryFn: async () => {
//       const data = await fetchBookmarks();
//       return {
//         ...data,
//         results: data.results.filter((bookmark) =>
//           bookmark.tag_names.includes(tag),
//         ),
//       };
//     },
//   });
// };
