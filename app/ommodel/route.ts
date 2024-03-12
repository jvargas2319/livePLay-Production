import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { useState } from "react";

interface Product {
    title: string;
    imageUrl: string;
}

export async function POST(request: Request) {
    const url = 'https://cherry.tv/';
    const { searchPrompt: userSearch } = await request.json();
    

    if (!userSearch) {
        return NextResponse.json(
            { error: "Search parameter not provided" },
            { status: 400 }
        );
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")

        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('[data-testid="btn-approve"]');
        await page.click('[data-testid="btn-approve"]');

        // Use page.evaluate to directly extract the products information
        const products = await page.evaluate(() => {
            const items: Product[] = [];
            // Adjust the query to find your items and their titles/image URLs
            document.querySelectorAll('div.card-stream').forEach((el) => { // Placeholder, adjust selector as needed
                const title = el.querySelector('span.font-semibold.text-white.drop-shadow')?.textContent || '';
                const imageUrl = el.querySelector('img.object-cover')?.getAttribute('src') || '';
                items.push({ title, imageUrl });
            });
            
            return items;
            
        });
        console.log(products)
        return NextResponse.json({ products });
    } catch (error: any) {
        return NextResponse.json(
            { error: `An error occurred: ${error.message}` },
            { status: 500 }
        );
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
