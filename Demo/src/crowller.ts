// import superagent from 'superagent';

import superagent from "superagent";
import cheerio from 'cheerio';

class Crowller {
    private keyVale = 'secretKey';
    private url = `http://www.dell-lee.com/`;
    private saveHtml = '';
    async getHtml() {
        const result = await superagent.get(this.url);
        this.getArtice(result.text)
    }

    getArtice(html:string) {
        const $ = cheerio.load(html);
        const source = $('.course-item');
        source.map((index,element) => {
            const getItem = $(element).find('.course-desc').text();
            console.log(getItem)
        })
    }
    

    constructor(){
        this.getHtml();
    }
}
const crowller = new Crowller();