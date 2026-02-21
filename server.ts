import { join } from "node:path";

const DIST_DIR = join(import.meta.dirname, "dist");
const PORT = Number(process.env.PORT) || 4321;

Bun.serve({
	port: PORT,
	async fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname;

		// Resolve path to file
		let filePath = join(DIST_DIR, pathname);

		// If path ends with "/" or has no extension, try index.html
		if (pathname.endsWith("/")) {
			filePath = join(filePath, "index.html");
		}

		const file = Bun.file(filePath);

		if (await file.exists()) {
			return new Response(file);
		}

		// Try appending .html for clean URLs (e.g. /about -> /about.html)
		const htmlFile = Bun.file(`${filePath}.html`);
		if (await htmlFile.exists()) {
			return new Response(htmlFile);
		}

		// Fallback to 404
		const notFound = Bun.file(join(DIST_DIR, "404.html"));
		if (await notFound.exists()) {
			return new Response(notFound, { status: 404 });
		}

		return new Response("Not Found", { status: 404 });
	},
});

console.log(`Serving on http://localhost:${PORT}`);
