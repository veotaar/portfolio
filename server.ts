import { stat } from "node:fs/promises";
import { join } from "node:path";

const DIST_DIR = join(import.meta.dirname, "dist");
const PORT = Number(process.env.PORT) || 4321;

// Astro outputs content-hashed filenames under /_astro/ — safe to cache forever.
// Everything else (HTML) should revalidate on every request.
function cacheControlFor(filePath: string): string {
	if (filePath.includes("/_astro/")) {
		return "public, max-age=31536000, immutable";
	}
	return "no-cache";
}

async function resolveFile(
	pathname: string,
): Promise<{ file: ReturnType<typeof Bun.file>; path: string } | null> {
	let filePath = join(DIST_DIR, pathname);

	if (pathname.endsWith("/")) {
		filePath = join(filePath, "index.html");
	}

	let file = Bun.file(filePath);
	if (await file.exists()) return { file, path: filePath };

	const htmlPath = `${filePath}.html`;
	file = Bun.file(htmlPath);
	if (await file.exists()) return { file, path: htmlPath };

	return null;
}

Bun.serve({
	port: PORT,
	async fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname;

		if (pathname === "/healthz") {
			return new Response("ok", { status: 200 });
		}

		const resolved = await resolveFile(pathname);

		if (!resolved) {
			const notFound = Bun.file(join(DIST_DIR, "404.html"));
			if (await notFound.exists()) {
				return new Response(notFound, { status: 404 });
			}
			return new Response("Not Found", { status: 404 });
		}

		const { file, path } = resolved;
		const fileStat = await stat(path);
		const etag = `"${fileStat.mtimeMs.toString(16)}-${fileStat.size.toString(16)}"`;
		const cacheControl = cacheControlFor(path);

		// Respond 304 if the client already has a fresh copy
		if (req.headers.get("if-none-match") === etag) {
			return new Response(null, {
				status: 304,
				headers: { ETag: etag, "Cache-Control": cacheControl },
			});
		}

		return new Response(file, {
			headers: { ETag: etag, "Cache-Control": cacheControl },
		});
	},
});

console.log(`Serving on http://localhost:${PORT}`);
