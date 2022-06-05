// creat varaible استدعاء المدخلات
let form = document.querySelector("form");
let inputName = document.querySelector("#NameB");
let inputFiled = document.querySelector("#FiledB");
let inputAuthor = document.querySelector("#AuthorB");
let inputCpies = document.querySelector("#copyB");
let inputDate = document.querySelector("#dateB");
let inputYear = document.querySelector("#yearB");
let inputPhoto = document.querySelector("#PhotoB");
let deleateAll = document.querySelector("#del")
let btnCreat = document.querySelector("#btnCreat");
let Search = document.querySelector("#Search")
let SearchIcon = document.querySelector("#SearchIcon")

// let edite01 = document.querySelector("#edite01");

// creat variabule to edit
let formEdit = document.querySelector("form");
let inputNameEdit = document.querySelector("#ENameB");
let inputFiledEdit = document.querySelector("#EFiledB");
let inputAuthorEdit = document.querySelector("#EAuthorB");
let inputCpiesEdit = document.querySelector("#EcopyB");
let inputDateEdit = document.querySelector("#EdateB");
let inputYearEdit = document.querySelector("#EyearB");
let btnUpdate = document.querySelector("#btnUpdate");

let contenairBooks = document.querySelector("#contanBoooks");
// cerat array to save input inside
let boxInputs = [inputName, inputFiled, inputAuthor, inputCpies, inputDate, inputYear, inputPhoto];

// creat array to stor all input
let ArrayOfContaner = [];

let indexTemp;

let SearchMod;

if (localStorage.getItem("books")) {
    ArrayOfContaner = JSON.parse(localStorage.getItem("books"));
}

GetDataFormLocalStorage();

// events

btnCreat.onclick = _ => {
    let valid;
    boxInputs.forEach(element => {
        if (element.value !== "") {
            valid = true;
            console.log(valid);
        } else {
            element.placeholder = "input value";
        }
    });
    if (valid === true) {
        AddBookToArray();
        emptyInputs();
        // alert("done");
    }
}

deleateAll.onclick = RemoveAll;

btnUpdate.onclick = upDateInfo;

Search.onkeyup = SearchBook;



// creat function 

function AddBookToArray() {

    let book = {
        id: Date.now(),
        NameBook: inputName.value,
        FiledBook: inputFiled.value,
        AuthorBook: inputAuthor.value,
        CopiesBook: inputCpies.value,
        DateBook: inputDate.value,
        YearBook: inputYear.value,
    }
    // add element to Array
    ArrayOfContaner.push(book);
    // add elemnt to page
    AddBookToPageForm(ArrayOfContaner);
    // add to local storage
    AddBookToLocalStorage(ArrayOfContaner)
}

function showEditeInfo(index) {
    inputNameEdit.value = ArrayOfContaner[index].NameBook;
    inputFiledEdit.value = ArrayOfContaner[index].FiledBook;
    inputAuthorEdit.value = ArrayOfContaner[index].AuthorBook;
    inputCpiesEdit.value = ArrayOfContaner[index].CopiesBook;
    inputDateEdit.value = ArrayOfContaner[index].DateBook;
    inputYearEdit.value = ArrayOfContaner[index].YearBook;

    indexTemp = index;
}

function upDateInfo() {
    let book = {
        NameBook: inputNameEdit.value,
        FiledBook: inputFiledEdit.value,
        AuthorBook: inputAuthorEdit.value,
        CopiesBook: inputCpiesEdit.value,
        DateBook: inputDateEdit.value,
        YearBook: inputYearEdit.value,
    }
    // add element to Array
    ArrayOfContaner[indexTemp] = book;
    // add elemnt to page
    AddBookToPageForm(ArrayOfContaner);
    // add to local storage
    AddBookToLocalStorage(ArrayOfContaner)
}

function emptyInputs() {
    boxInputs.forEach(ele => {
        ele.value = ""
    })
}

function AddBookToPageForm(ArrayOfContaner) {
    contenairBooks.innerHTML = "";
    ArrayOfContaner.forEach((ele, i) => {
        contenairBooks.innerHTML += `
        <section class="col my-5">
    // Add card 01
    <div class=" card " style="width: 18rem;">
        <button type="button" onclick="RemoveFromPage(${i})" class="btn fs-6 m-2 btn-danger btn_close"><i class="fa-solid fa-xmark"></i></button>
        <button type="button" onclick="showEditeInfo(${i})" data-bs-toggle="modal" data-bs-target="#book"
        class="btn fs-6 m-2 btn-danger btn_edite"><i class="fa-solid fa-gear"></i></button>
        <img src="asset/img/book cover.jpg" class="card-img-top" alt="coverBook">
        <div class="card-body">
            <h5 class="card-title">${ele.NameBook}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${ele.AuthorBook}</li>
            <li class="list-group-item">${ele.CopiesBook} Copies</li>
        </ul>
        <div class="card-body">
            <button type="button" data-bs-toggle="modal" href="#C${i}" class="btn btn-info btn-sm card-link">More
                Details</button>
        </div>
    </div>
    // more debitis
    <div class="modal fade" id="C${i}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">${ele.NameBook}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                <td>1</td>
                                <td>book name</td>
                                <td>${ele.NameBook}</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>book filed</td>
                                <td>${ele.FiledBook}</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>book author</td>
                                <td>${ele.AuthorBook}</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>copies</td>
                                <td>${ele.CopiesBook}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>date of compostion</td>
                                <td>${ele.DateBook}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>year of write</td>
                                <td>${ele.YearBook}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    // edite book
    
</section>
        `;

    });
}

function AddBookToLocalStorage(ArrayOfContaner) {
    window.localStorage.setItem("books", JSON.stringify(ArrayOfContaner))
}

function GetDataFormLocalStorage() {
    let data = localStorage.getItem("books");
    if (data) {
        let ARR = JSON.parse(data);
        AddBookToPageForm(ARR);
    }
}

function RemoveFromPage(index) {
    // remove form page
    ArrayOfContaner.splice(index, 1);
    // remove  form local storge 
    localStorage.books = JSON.stringify(ArrayOfContaner);
    AddBookToPageForm(ArrayOfContaner);
}

function RemoveAll() {
    // remove form page
    ArrayOfContaner.splice(0);
    // remove  form local storge 
    localStorage.books = JSON.stringify(ArrayOfContaner);
    AddBookToPageForm(ArrayOfContaner);
}

function GetSearchMod(id) {
    if (id === 'FiledMod') {
        SearchMod = 'FiledMod';
    } else if (id === 'AuthorMod') {
        SearchMod = 'AuthorMod';
    } else if (id === 'YearMod') {
        SearchMod = 'YearMod';
    }
    Search.focus();
}

function SearchBook() {
    let ArrayTemp = []
    if (SearchMod === 'FiledMod') {
        ArrayOfContaner.forEach(ele => {
            if (ele.FiledBook.includes(Search.value)) {
                // console.log(ele.NameBook);
                ArrayTemp.push(ele);
            }
        });
        // add elemnt to page
        AddBookToPageForm(ArrayTemp);
        // add to local storage
        AddBookToLocalStorage(ArrayTemp);
    }else if(SearchMod === 'AuthorMod'){
        ArrayOfContaner.forEach(ele => {
            if (ele.AuthorBook.includes(Search.value)) {
                // console.log(ele.NameBook);
                ArrayTemp.push(ele);
            }
        });
        // add elemnt to page
        AddBookToPageForm(ArrayTemp);
        // add to local storage
        AddBookToLocalStorage(ArrayTemp);
    }else if(SearchMod === 'YearMod'){
        ArrayOfContaner.forEach(ele => {
            if (ele.YearBook.includes(Search.value)) {
                // console.log(ele.NameBook);
                ArrayTemp.push(ele);
            }
        });
        // add elemnt to page
        AddBookToPageForm(ArrayTemp);
        // add to local storage
        AddBookToLocalStorage(ArrayTemp);
    }
}
// ele.NameBook === Search.value

