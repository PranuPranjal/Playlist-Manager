const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const { request } = require('http');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// const filepath = 'playlist.xlsl';
// let workbook;
// if(fs.existsSync(filepath)){
//     workbook = xlsx.readfile(filepath);
// }else{
//     workbook = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([['playlist']]);
//     xlsx.utils.book_append_sheet(workbook, ws, 'Users');
//     xlsx.writeFile(workbook, filepath)
// }

// app.post('/submit', (req, res)=>{
//     const {id} = req.body;
//     const ws = workbook.Sheets['Users'];
//     const users = xlsx


// })


const apiKey = 'AIzaSyDO8YLFMj2vMQ0OdK6UYjf7m9dFNZWdxe0';
const playlistId = 'PL9RcWoqXmzaKlY_V5x74DJjogb_ZwiVpv';
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

const titles = [];
async function getNumberOfVideos() {
    let totalVideos = 0;
    let nextPageToken = '';
    // const titles = [];

    // const response = await fetch(`${url}&pageToken=${nextPageToken}`);
    // const data = await response.json();
    // // data.items.forEach(item => {
    // //     const snippet = item.snippet;
    // //     console.log(snippet.title);
    // // })
    // const item = data.items[49].snippet.title
    // console.log(item)
    // totalVideos = data.items.length;

    do {
        const response = await fetch(`${url}&pageToken=${nextPageToken}`);
        const data = await response.json();
        data.items.forEach(item => {
            const snippet = item.snippet;
            titles.push(snippet.title);
            // console.log(snippet.title);
        })
        // const i = 50
        // if(data.items && data.items.length>i){
        //     const item = data.items[i].snippet.title
        //     console.log(item)
        
        // }
        const i = 52;
        if(titles.length>i){
            console.log(titles[53]);
        }
        
        // console.log(data.items.snippet)
        totalVideos += data.items.length;
        nextPageToken = data.nextPageToken;

    } while (nextPageToken);
    // const item = arr.items[0].snippet.title
    // console.log(item)
    

    return totalVideos;
}

getNumberOfVideos().then(count => console.log(`Total videos: ${count}`)).catch(error => console.error(error));

app.get('/message', (req, res) => {
    res.json(titles);
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});