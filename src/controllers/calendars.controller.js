const axios = require("axios");
const ical = require("cal-parser");
const fs = require("fs");
const path = require("path");
const download = require('download');

exports.getCalendars = (req, res) => {

    // Path of the image to be downloaded
    const file1 = 'https://iwise.loreto.nsw.edu.au/iwise/Calendar/iCal.php?id=021BFDEE-B170-475F-8DC6-322346EEC8AA&type=public';
    const file2 = 'https://iwise.loreto.nsw.edu.au/iwise/Calendar/iCal.php?id=1D39EDAA-7DC2-4F8E-AB22-2B098225CFEA%3B&type=public';

    // Path to store the downloaded file
    const filePath =  path.join(__dirname, "../assets/");

    // const oldFilePath1 = path.join(__dirname, "../assets/senior.ics");
    // const oldFilePath2 = path.join(__dirname, "../assets/junior.ics");

    // try {
    //     fs.unlinkSync(oldFilePath1)
    //     console.log("first file removed")
    //     //file removed
    //     } catch(err) {
    //     console.error(err)
    // }

    // try {
    //     fs.unlinkSync(oldFilePath2)
    //     console.log("seond file removed.")
    //     //file removed
    //     } catch(err) {
    //     console.error(err)
    // }

    download(file1,filePath)
    .then(() => {
        console.log("first file downloaded");
        fs.rename(path.join(__dirname, "../assets/iWiseCalendar.ics"), path.join(__dirname, "../assets/senior.ics"), function (err) {
            if (err) throw err;
            console.log('First file Renamed.');
        });
        download(file2,filePath)
        .then(() => {
            console.log('second file downloaded')
            fs.rename(path.join(__dirname, "../assets/iWiseCalendar.ics"), path.join(__dirname, "../assets/junior.ics"), function (err) {
                if (err) throw err;
                console.log('second file Renamed.');
            });

            // senior school blue
            const myCalendarString1 = fs.readFileSync(
                path.join(__dirname, "../assets/senior.ics"),
                "utf-8"
            );
            
            const parsed1 = ical.parseString(myCalendarString1);
            
            parsed1.events.map((event,index)=>{
                event['type'] = 'senior'
            });
            
            // junior school yellow
            const myCalendarString2 = fs.readFileSync(
                path.join(__dirname, "../assets/junior.ics"),
                "utf-8"
            );
                
            const parsed2 = ical.parseString(myCalendarString2);
            parsed2.events.map((event,index)=>{
                event['type'] = 'junior'
            });
            
            
            const allevents = parsed1.events.concat(parsed2.events);

            allevents.sort((allevents,b)=>{
                return new Date(b.dtstart.value) - new Date(allevents.dtstart.value)
            })

            let today = new Date();
            let tomorrow = new Date(today);
            let threeEvents = [];
            let todayRes = new Date().toDateString().slice(0,15);
            let tomorrowRes = new Date(tomorrow.setDate(tomorrow.getDate()+1)).toDateString().slice(0,15);
            let nextdayRes = new Date(tomorrow.setDate(tomorrow.getDate()+2)).toDateString().slice(0,15);
            let tmp1 = [];
            let tmp2 = [];
            let tmp3 = [];

            allevents.some((eventdata)=>{
                if(eventdata.dtstart.value.toDateString().slice(0,15) == todayRes){
                    tmp1.push(eventdata);
                }
                else if(eventdata.dtstart.value.toDateString().slice(0,15) == tomorrowRes){
                    tmp2.push(eventdata)
                }
                else if(eventdata.dtstart.value.toDateString().slice(0,15) == nextdayRes){
                    tmp3.push(eventdata)
                }
            })
            threeEvents.push(tmp1);
            threeEvents.push(tmp2);
            threeEvents.push(tmp3);
            
            if(threeEvents.length){
                // console.log(threeEvents);
                res.status(200).send(threeEvents);
            }
        })
    })
};

