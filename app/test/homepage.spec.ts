import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { Builder, By, WebDriver } from 'selenium-webdriver';

describe('Homepage Tests', () => {
    let driver: WebDriver;
    
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 5000 });
    }, 10000);

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('should load homepage successfully', async () => {
        await driver.get('http://localhost:5173/homepage');
        const title = await driver.getTitle();
        expect(title).toBeDefined();
    });

    it('should display the ElePath logo', async () => {
        const logo = await driver.findElement(By.css('img[src*="elepath-logo-hr.png"]'));
        expect(await logo.isDisplayed()).toBe(true);
    });

    it('should have a working menu button', async () => {
        const menuButton = await driver.findElement(By.css('[class*="lucide-menu"]'));
        expect(await menuButton.isDisplayed()).toBe(true);
    });

    it('should have a working logout button', async () => {
        const logoutButton = await driver.findElement(By.css('[class*="lucide-log-out"]'));
        expect(await logoutButton.isDisplayed()).toBe(true);
        const linkParent = await logoutButton.findElement(By.xpath('./..'));
        expect(await linkParent.getAttribute('href')).toContain('/login');
    });

    describe('Quick Access Section', () => {
        it('should display the section title', async () => {
            const sectionTitle = await driver.findElement(By.xpath('//h2[contains(text(), "Quick Access")]'));
            expect(await sectionTitle.isDisplayed()).toBe(true);
            expect(await sectionTitle.getText()).toBe('Quick Access');
        });

        it('should have four quick access buttons', async () => {
            const quickAccessButtons = await driver.findElements(By.css('.grid > *'));
            expect(quickAccessButtons.length).toBe(4);
        });

        it('should have working Report Sighting link', async () => {
            const reportButton = await driver.findElement(By.xpath('//span[text()="Report Sighting"]/ancestor::a'));
            expect(await reportButton.getAttribute('href')).toContain('/capture');
        });

        it('should have working Live Map link', async () => {
            const liveMapButton = await driver.findElement(By.xpath('//span[text()="Live Map"]/ancestor::a'));
            expect(await liveMapButton.getAttribute('href')).toContain('/livemap');
        });

        it('should have working Movement Tracking link', async () => {
            const movementButton = await driver.findElement(By.xpath('//span[text()="Movement Tracking"]/ancestor::a'));
            expect(await movementButton.getAttribute('href')).toContain('/movement');
        });

        it('should have Survival Tips button', async () => {
            const survivalButton = await driver.findElement(By.xpath('//span[text()="Survival Tips"]/ancestor::button'));
            expect(await survivalButton.isDisplayed()).toBe(true);
        });
    });

    describe('Report Section', () => {
        it('should display the report section', async () => {
            const reportSection = await driver.findElement(By.xpath('//p[text()="Report"]'));
            expect(await reportSection.isDisplayed()).toBe(true);
        });

        it('should display the subtitle "Tuskers & Elephants"', async () => {
            const subtitle = await driver.findElement(By.xpath('//p[text()="Tuskers & Elephants"]'));
            expect(await subtitle.isDisplayed()).toBe(true);
        });

        it('should display the elephant vector image', async () => {
            const vectorImage = await driver.findElement(By.css('img[src*="elepath-vector-image.png"]'));
            expect(await vectorImage.isDisplayed()).toBe(true);
        });
    });
});