/** Site-wide personal information */
export const siteData = {
	name: "Yalçıncan Ulus",
	title: "Yalçıncan Ulus | Web Developer",
	description: "Full-stack web developer based in Türkiye",
	email:
		"&#121;&#97;&#108;&#99;&#105;&#110;&#99;&#97;&#110;&#46;&#117;&#108;&#117;&#115;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;",
	githubUrl: "https://github.com/veotaar",
	linkedinUrl: "https://www.linkedin.com/in/yalcincan/",
	resumePath: "/resume.pdf",
};

/** Main project type */
export interface Project {
	id: string;
	name: string;
	tags: string[];
	description: string;
	details: string[];
	githubUrl: string;
	liveUrl?: string;
}

/** Other/smaller project type */
export interface OtherProject {
	name: string;
	tags: string[];
	description: string;
	details: string[];
	githubUrl?: string;
	liveUrl?: string;
}

// ============================================================
// MAIN PROJECTS (3-4 featured projects with screenshots)
// ============================================================
export const projects: Project[] = [
	{
		id: "project-4",
		name: "Automated Price Tracking Platform",
		tags: [
			"TypeScript",
			"Turborepo",
			"Bun",
			"React",
			"PostgreSQL",
			"TimescaleDB",
			"Drizzle ORM",
			"Redis",
			"BullMQ",
			"Better Auth",
			"TanStack Router",
			"Playwright",
			"Docker",
		],
		description:
			"Full-stack price tracking app built as a Turborepo monorepo. Tracks grocery prices across 20+ sites and 10+ countries with time-series analytics and a public comparison frontend.",
		details: [
			"Scrapes prices from 27+ grocery sites across 19 countries using Playwright (browser rendering) and Cheerio (fetch) strategies, selectable per site",
			"TimescaleDB hypertables with time_bucket and time_bucket_gapfill queries for historical price trend charts",
			"Daily EUR-based FX rates fetched via BullMQ workers; all prices normalized to EUR for cross-country comparison",
			"Pack-size normalization via per-item factors and per-site price divisors for fair cross-market comparisons",
			"Four apps in one monorepo: internal API + admin dashboard, and a public API + storefront for product price comparison",
			"Recharts-powered line and bar charts on the public frontend for visualizing lowest price over time per country",
			"Bull Board UI for monitoring and managing scheduled scraping and exchange rate jobs",
			"Better Auth for admin authentication; public API is fully read-only with no auth required",
			"Drizzle ORM for type-safe PostgreSQL queries; Redis for BullMQ job queues and API response caching",
			"Containerized with Docker Compose",
		],
		githubUrl: "https://github.com/veotaar/price-tracking-app",
		liveUrl: "https://compare.ulus.uk/",
	},
	{
		id: "project-1",
		name: "Social Media Platform",
		tags: [
			"TypeScript",
			"Turborepo",
			"Bun",
			"React",
			"PostgreSQL",
			"Drizzle ORM",
			"Redis",
			"S3 (minIO)",
			"Better Auth",
			"TanStack Router",
			"WebSockets",
			"Docker",
		],
		description:
			"Full-stack social media app built as a Turborepo monorepo with a Bun backend and React frontend.",
		details: [
			"Posts with image uploads via self-hosted MinIO S3, processed server-side with Sharp",
			"Global and following feeds with cursor-based infinite scroll using TanStack Virtual",
			"Real-time notifications delivered over WebSockets",
			"Authentication via Better Auth with email/password, username, and guest login support",
			"User profiles with follow/block system, bookmarks, likes, and comments",
			"Admin dashboard with runtime system settings (toggle signups, guest login)",
			"End-to-end type-safe tRPC-like API client; generated from the backend app type (elysiajs/eden)",
			"Drizzle ORM for type-safe SQL with PostgreSQL",
			"Redis caching for profiles, block lists, settings and session storage",
			"Fully containerized with Docker Compose. Multi-stage builds using Turborepo prune",
		],
		githubUrl: "https://github.com/veotaar/social",
		liveUrl: "https://social.ulus.uk/",
	},
	{
		id: "project-2",
		name: "Messaging App",
		tags: [
			"TypeScript",
			"Node.js",
			"Express",
			"React",
			"Vite",
			"MongoDB",
			"Socket.IO",
			"Docker",
			"Bun",
		],
		description:
			"Real-time messaging application with JWT auth, friend system, and live WebSocket chat.",
		details: [
			"JWT authentication and protected route guards",
			"Friend request system; find users by email, send/accept/reject requests",
			"One-on-one conversations with cursor-based paginated message history",
			"Real-time messaging via Socket.IO rooms",
			"Originally Node.js, migrated to Bun runtime. Still a standard Express.js app",
			"Integration tests with Bun test runner, Supertest, and mongodb-memory-server",
			"Frontend built with TanStack Router, TanStack Query, React Hook Form + Zod, and shadcn/ui",
		],
		githubUrl: "https://github.com/veotaar/messaging-app-api",
		liveUrl: "https://messenger.ulus.uk/",
	},
	{
		id: "project-3",
		name: "Blog Platform",
		tags: [
			"TypeScript",
			"JavaScript",
			"Node.js",
			"Express",
			"React",
			"Vite",
			"MongoDB",
			"Docker",
		],
		description:
			"Blog platform with a REST API, public-facing blog, and an admin CMS. Three separate apps.",
		details: [
			"CRUD operations for blog posts and comments across three apps (API + CMS + public blog)",
			"JWT authentication and role-based access control (admin/user)",
			"Server settings to toggle comment creation and user signups at runtime",
			"Both frontends built with React, TanStack Router, TanStack Query, and Zod",
			"CI/CD pipeline with Docker and GitHub Actions for deployment",
		],
		githubUrl: "https://github.com/veotaar/blog-api",
		liveUrl: "https://blog.ulus.uk",
	},
];

// ============================================================
// OTHER PROJECTS (accordion section, no screenshots)
// ============================================================

export const otherProjects: OtherProject[] = [
	{
		name: "Multiplayer Location Guessing Game",
		tags: ["MongoDB", "Node.js", "1400+ games played"],
		description: "Multiplayer location guessing game played via a Discord bot.",
		details: [
			"Users can send google maps links and screenshots to start a game",
			"Other players try to guess which country the location is in",
			"MongoDB used to store game state and track player stats",
			"D3.js and canvas used to paint incorrect guesses on world map",
			"Over 1400 games played and 27.000+ guesses made by players",
		],
		githubUrl: "https://github.com/veotaar/guess-the-country-prototype",
	},
	{
		name: "GeoGuessr Account Status Checker",
		tags: ["SQLite", "Hono", "BullMQ", "Web Scraping"],
		description:
			"A Discord bot that monitors GeoGuessr accounts for ban status and alerts your server when accounts get banned.",
		details: [
			"GeoGuessr is a popular geography game where players guess locations based on Street View images. Some players get banned for cheating, and this bot helps monitor accounts for bans.",
			"Users can add GeoGuessr accounts to be monitored via Discord commands",
			"BullMQ used to schedule periodic checks of account status by fetching GeoGuessr profiles",
			"Users get notified in Discord when monitored accounts get banned",
			"SQLite used to store monitored accounts and their status history",
		],
		githubUrl: "https://github.com/veotaar/geo-polis",
	},
	// {
	// 	name: "Other Project Three",
	// 	tags: ["Shell", "Automation"],
	// 	description: "A short description of this project.",
	// 	details: [
	// 		"What the project does",
	// 		"What technologies you used",
	// 		"What you learned or achieved",
	// 	],
	// 	liveUrl: "https://other-two.example.com",
	// },
];
