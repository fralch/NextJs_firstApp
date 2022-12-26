import fs from 'fs-extra';
import axios from 'axios';
import {getImageSize} from './getImageSize.js';

const {writeJson} = fs;

for (let i = 2477; i < 2505; i++) {
    const url = `https://xkcd.com/${i}/info.0.json`;
    const {data} = await axios.get(url);
    const {num, img,  ...restoDelComic} = data;
    const  {height, width}= await getImageSize({url: img});
    const comicToStore = {
        id: num,
        img, 
        height,
        width,
        ...restoDelComic
    }
    await writeJson(`./comics/${i}.json`, comicToStore);
    
}