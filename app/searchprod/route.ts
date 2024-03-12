import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import {setTimeout} from "node:timers/promises";

export async function POST(request: Request) {
	const { searchPrompt: userSearch } = await request.json();

	if (!userSearch) {
		return NextResponse.json(
			{ error: "Search parameter not provided" },
			{ status: 400 }
		);
	}
	let browser;

	try {
		browser = await puppeteer.launch({headless: true, ignoreDefaultArgs: ['--mute-audio'], args: ['--start-maximized', '--autoplay-policy=no-user-gesture-required'] });  
		const page = await browser.newPage();
		await page.goto(`https://cherry.tv/embed/${userSearch}`);
		
		await page.waitForNavigation();

    await setTimeout(50000);
    
    await page.screenshot({ path: 'bot.jpg' })

		return NextResponse.json({ status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: `An error occurred: ${error.message}` },
			{ status: 200 }
		);
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
