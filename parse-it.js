const fs = require('fs');
const es = require('event-stream');

let rowCount = 0;
const etl = (line)=> { 
    const pieces = line.split(",")
    rowCount++
    console.log(rowCount + "   " +  pieces[1] + "| " + pieces[2])

}
// let steamReader = fs.createReadStream('very-large-file.csv')
let steamReader = fs.createReadStream('really_big_file.csv')
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