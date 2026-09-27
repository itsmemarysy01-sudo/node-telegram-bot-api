/**
 * 18 - Next.js App Router with Vercel Speed Insights.
 *
 * This example shows how to integrate Vercel Speed Insights into a Next.js
 * application that uses node-telegram-bot-api for webhook handling.
 *
 * Files you'll need in a real Next.js project:
 *
 * 1. app/layout.tsx - Root layout with Speed Insights component
 * 2. app/api/telegram/route.ts - Webhook endpoint for Telegram
 * 3. app/page.tsx - Your main page (optional)
 *
 * Register webhook with Telegram:
 *   api.setWebhook({ url: "https://your-app.vercel.app/api/telegram", secret_token: SECRET })
 */

/**
 * File: app/layout.tsx
 * 
 * Root layout that includes the Speed Insights component to track
 * Core Web Vitals and performance metrics across your entire app.
 */
// import { SpeedInsights } from "@vercel/speed-insights/next";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//         <SpeedInsights />
//       </body>
//     </html>
//   );
// }

/**
 * File: app/api/telegram/route.ts
 * 
 * Telegram webhook endpoint using node-telegram-bot-api.
 * Speed Insights will automatically track the performance of this route.
 */
import { Bot, nextAppWebhook } from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN!;
const secret = process.env.WEBHOOK_SECRET!;

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Hello from Next.js with Speed Insights! ▲"));
bot.command("help", (ctx) => ctx.reply("This bot is running on Vercel with Speed Insights tracking."));

bot.on("message", (ctx) => {
  if (ctx.message?.text && !ctx.message.text.startsWith("/")) {
    ctx.reply(`You said: ${ctx.message.text}`);
  }
});

// Export the webhook handler for Next.js App Router
export const POST = nextAppWebhook(bot, { secretToken: secret });

/**
 * File: app/page.tsx (optional)
 * 
 * A simple landing page for your bot. Speed Insights will track
 * page load performance, CLS, FID, LCP, etc.
 */
// export default function Home() {
//   return (
//     <main>
//       <h1>My Telegram Bot</h1>
//       <p>This app uses Vercel Speed Insights to monitor performance.</p>
//       <a href="https://t.me/your_bot">Chat with the bot</a>
//     </main>
//   );
// }

/**
 * Installation steps:
 * 
 * 1. Install dependencies:
 *    npm install node-telegram-bot-api @vercel/speed-insights
 * 
 * 2. Create the files above in your Next.js project
 * 
 * 3. Deploy to Vercel:
 *    vercel deploy
 * 
 * 4. Register your webhook with Telegram
 * 
 * 5. View Speed Insights data:
 *    - Go to your Vercel dashboard
 *    - Navigate to your project
 *    - Click on "Speed Insights" tab
 *    - Metrics will appear after users visit your app
 * 
 * Speed Insights tracks:
 * - Core Web Vitals (LCP, FID, CLS)
 * - First Contentful Paint (FCP)
 * - Time to First Byte (TTFB)
 * - Interaction to Next Paint (INP)
 */
