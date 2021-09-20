// import superagent from 'superagent';

import superagent from "superagent";
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface Cource {
    title: string
}
interface Source {
    time: number,
    data: Cource[]
}
interface Filesource {
    [propName: number]: Cource[];
}
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
        const textAry:Cource[] = [];
        source.map((index,element) => {
            const getItem = $(element).find('.course-desc');
            const title =  getItem.eq(0).text();
            textAry.push({title})         
        })
        const result = {
            time: (new Date()).getTime(),
            data: textAry
        }
        console.log(result)
        this.getJsonData(result);
    }
    
    //把拿到的数据存到文件里面
    getJsonData(source:Source) {
        const filePath = path.resolve(__dirname,'../data/cource.json');
        let fileCount:Filesource = {};
        if(fs.existsSync(filePath)) {
            fileCount = JSON.parse(fs.readFileSync(filePath,'utf-8'));
        }
        fileCount[source.time] = source.data;
        fs.writeFileSync(filePath,JSON.stringify(fileCount))
    }

    constructor(){
        this.getHtml();
    }
}
const crowller = new Crowller();