const fs = require("fs");
const { parse } = require('json2csv');
const authors = fs.readFileSync('./Authors.csv', 'utf-8')
const books = fs.readFileSync('./Books.csv', 'utf-8')
const magazines = fs.readFileSync('./Magazines.csv', 'utf-8')

function convertToJson(datas) {
    let convertedjson = [];
    datas = datas.split('\n');
    let headers = datas[0].split(';');
    // console.log(headers,"------------",datas);
    for (let i = 1; i < datas.length; i++) {
        let obj = {}
        let data = datas[i].split(';');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = data[j];
        }
        convertedjson.push(obj)

    }
    return convertedjson
}

//////////////2. Print out all books and magazines (on either console UI) with all their details (In Json format).

function printAllBookAndMagazines() {
    const allBooks = convertToJson(books);
    console.log("All Books-------->", allBooks);
    const allMagazines = convertToJson(magazines);
    console.log("All Magazines-------->", allMagazines);
}
// printAllBookAndMagazines()

/////////////////////////////////////////////////////////////////////////////


//////////////////////3. Find a book or magazine by its ISBN./////////////////////////////

function findByIsbn(data, isbn) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]["isbn"] == isbn) {
            return data[i]
        }
    }
    return "Not Found"
}

function printBookOrMagazines(data, isbn) {
    const allData = convertToJson(data);
    let isbnDetails = findByIsbn(allData, isbn)

    console.log(isbnDetails);
}
// printBookOrMagazines(books,"2221-5548-8585")
// printBookOrMagazines(magazines,"2365-5632-7854")

/////////////////////////////////////////////////////////////////////////////


////////////////////////4. Find all books and magazines by their authors’ email/////////////////////////////////

function printBookAndMagazineByAuthor() {
    let arr = [], arr1 = [], obj = {};
    let author = convertToJson(authors);
    let book = convertToJson(books);
    let magazine = convertToJson(magazines);
    let arr2 = book.concat(magazine);
    for (let j = 0; j < author.length; j++) {
        obj[author[j]["email"]] = JSON.stringify(arr1);
        arr.push(obj)
        obj = {}
        arr1 = []

        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i]["authors"] == author[j]["email"]) {
                arr1.push(arr2[i]["title"])
            }
        }
    }
    if (arr.length > 0) {
        return arr
    }
}
let authorDetails = printBookAndMagazineByAuthor()
// console.log(authorDetails);

//////////////////////////////////////////////////////////////////////////


///////////////////////5th //////////////////////////////

function sortBookAndMagazines() {
    let book = convertToJson(books);
    let magazine = convertToJson(magazines);
    let mergedTogether = book.concat(magazine);
    mergedTogether.sort((a, b) => {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    })
    console.log(mergedTogether);

}
sortBookAndMagazines()

/////////////////////////////////////////////////////////////////////////


///////////////////////////////6th ///////////////////////////////
function addBookAndMagazine() {
    let book = convertToJson(books);
    book.push({
        "title": "computer",
        "isbn": "1234-5678-4321",
        "authors": "comp@gmail.com",
        "description": "A detailed study of oops concepts..!!"
    })
    let magazine = convertToJson(magazines);
    magazine.push({
        "title": "mathematics",
        "isbn": "5678-4321-1234",
        "authors": "maths@gmail.com",
        "publishedAt": "19-11-2021"
    })
    let mergedTogether = book.concat(magazine);
    const csv = parse(mergedTogether);
    fs.writeFileSync("updatedBookAndMagazine.csv", csv)
}
// addBookAndMagazine()

//////////////////////////////////////////////////////////////////////////////////