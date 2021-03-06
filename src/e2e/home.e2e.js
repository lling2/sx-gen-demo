import Nightmare from 'nightmare';

describe('Homepage', () => {
    let page;
    beforeEach(() => {
        page = Nightmare({show: true}); // 显示浏览器
        page.goto('http://localhost:8000/login')
            .type('#userName', 'test')
            .type('#password', '111')
            .click('button[type="submit"]')
            .wait('.no-print')
            .goto('http://localhost:8000');
    });
    it('成功进入首页', async () => {
        const text = await page
            .wait('.no-print')
            .evaluate(() => document.body.innerHTML)
            .end();

        expect(text).toContain('<h1>首页</h1>');
    });
});
