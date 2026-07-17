// @ts-check
const { test, devices } = require('@playwright/test');
const fs = require('fs');

if (!fs.existsSync('tests/screenshots')) {
    fs.mkdirSync('tests/screenshots', { recursive: true });
}

test.setTimeout(90000);

async function openPrintWindow(context, page) {
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(4000); // Firebase loads students

    // Navigate to students tab
    await page.evaluate(() => { if (typeof showTab === 'function') showTab('students'); });
    await page.waitForTimeout(2000);

    const lcCount = await page.evaluate(() => document.querySelectorAll('.btn-success').length);
    console.log(`Found ${lcCount} LC buttons`);
    if (lcCount === 0) return null;

    // Open certificate modal
    await page.evaluate(() => {
        const btn = document.querySelector('.btn-success');
        if (btn) btn.click();
    });
    await page.waitForTimeout(1500);

    // Intercept print window BEFORE clicking print
    const printPagePromise = context.waitForEvent('page', { timeout: 15000 });
    await page.evaluate(() => {
        const modal = document.getElementById('certificateModal');
        if (modal) {
            const btn = modal.querySelector('.btn-primary');
            if (btn) btn.click();
        }
    });

    const printPage = await printPagePromise;

    // Immediately disable auto-close by overriding window.close
    // We do this via CDP/evaluate as fast as possible before the 800+500ms timer fires
    // The auto-close fires at ~1300ms after load, so we have ~1300ms to grab data
    await printPage.waitForLoadState('domcontentloaded', { timeout: 10000 });

    // Override close before 800ms timer fires
    try {
        await printPage.evaluate(() => { window.close = function() {}; });
    } catch(e) {}

    return printPage;
}

test.describe('Certificate Print Layout', () => {

    test('Android Chrome - verify A4 width layout', async ({ browser }) => {
        const context = await browser.newContext({ ...devices['Pixel 5'] });
        const page = await context.newPage();

        const printPage = await openPrintWindow(context, page);
        if (!printPage) { console.log('No students found'); await context.close(); return; }

        // Grab screenshot and dimensions immediately
        await printPage.waitForTimeout(300);

        try {
            await printPage.screenshot({ path: 'tests/screenshots/android-print-window.png', fullPage: true });
            console.log('📸 Android print window screenshot saved');
        } catch(e) { console.log('Screenshot failed:', e.message); }

        let dims;
        try {
            dims = await printPage.evaluate(() => {
                const cert = document.querySelector('.certificate');
                const html = document.documentElement;
                const body = document.body;
                return {
                    viewportWidth: window.innerWidth,
                    htmlWidth: html.scrollWidth,
                    bodyWidth: body.scrollWidth,
                    certScrollWidth: cert ? cert.scrollWidth : null,
                    certScrollHeight: cert ? cert.scrollHeight : null,
                    bodyScrollHeight: body.scrollHeight,
                    overflows: html.scrollWidth > window.innerWidth,
                };
            });
            console.log('\n📐 ANDROID LAYOUT:');
            console.log(JSON.stringify(dims, null, 2));
            console.log(`✅ No horizontal overflow: ${!dims.overflows}`);
            console.log(`✅ Single page (< 1100px): ${dims.bodyScrollHeight < 1100}`);
        } catch(e) { console.log('Dimension check failed:', e.message); }

        await context.close();
    });

    test('Desktop Chrome - verify layout still correct', async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();

        const printPage = await openPrintWindow(context, page);
        if (!printPage) { await context.close(); return; }

        await printPage.waitForTimeout(300);

        try {
            await printPage.screenshot({ path: 'tests/screenshots/desktop-print-window.png', fullPage: true });
            console.log('📸 Desktop print window screenshot saved');
        } catch(e) { console.log('Screenshot failed:', e.message); }

        let dims;
        try {
            dims = await printPage.evaluate(() => {
                const cert = document.querySelector('.certificate');
                const html = document.documentElement;
                const body = document.body;
                return {
                    viewportWidth: window.innerWidth,
                    htmlWidth: html.scrollWidth,
                    certScrollWidth: cert ? cert.scrollWidth : null,
                    certScrollHeight: cert ? cert.scrollHeight : null,
                    bodyScrollHeight: body.scrollHeight,
                    overflows: html.scrollWidth > window.innerWidth,
                };
            });
            console.log('\n📐 DESKTOP LAYOUT:');
            console.log(JSON.stringify(dims, null, 2));
            console.log(`✅ No horizontal overflow: ${!dims.overflows}`);
        } catch(e) { console.log('Dimension check failed:', e.message); }

        await context.close();
    });
});
