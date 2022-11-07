const fs = require('fs');
const es = require('event-stream');

let rowCount = 0;
const etl = (line)=> { 
    const pieces = line.split(",")
    rowCount++
    console.log(rowCount + "   " +  pieces[1] + "| " + pieces[2])

}
let steamReader = fs.createReadStream('PDP_Content_Export_Valid_Styles.csv')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        steamReader.pause();

        etl(line);

        // resume the readstream, possibly from a callback
        steamReader.resume();
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);


/* 
var lineNr = 0;
const logMemoryUsage = (thing)=> { 
    console.log(thing)
}

// var s = fs.createReadStream('very-large-file.csv')
var s = fs.createReadStream('PDP_Content_Export_Valid_Styles.csv')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        logMemoryUsage(lineNr);

        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);
*/ 