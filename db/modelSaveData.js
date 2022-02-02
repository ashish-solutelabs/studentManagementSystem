const fs = require('fs');
const path = require('path');

exports.save = async(studentData) => {

    let newData = JSON.stringify(studentData);

    fs.writeFile(path.join(__dirname, './student.json'), newData, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("New data added");
    });

}