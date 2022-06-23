
let submit = document.getElementById("submit");
submit.addEventListener('click', (event) => {
    let number = document.querySelector("#input").value;
    if (!number){
        event.preventDefault();
    }else{
        validityChecker(number);
    }
})

let input = document.getElementById("input");
input.addEventListener('keypress', (event) => {
    if (event.key === "Enter"){
        if (input.value){
            validityChecker(input.value);
        }
    }
})

function validityChecker(number) {
    let string = number.toString();
    let lengthOfString = string.length;
    let min = 13;
    let max = 17;

    if (lengthOfString < 17){
        printError("Invalid input !, at least 17 numbers needed");
    }else{
        let [index, year] = findDateOfBirth(string, lengthOfString, min);
        if(index){
            if (!checkLeapYear(year)){
                let nid = string.substr(index-3, max);
                printNid(nid);
            }else{
                printError("NID is not valid !, year of birth is leap year");
            }
        }else{
            printError("NID is not valid..!");
        }
    }
}

function findDateOfBirth(nidNumber, lengthOfNid, min){
    let i = 0;
    while(lengthOfNid - i >= min + 4){
        let subStr = parseInt(nidNumber.substr(i, 4));
        if (subStr >= 1900 && subStr <= 2000){
            return [i+3, subStr];
        }
        i++;
    }
    return [];
}

function checkLeapYear(year){
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
}

function printNid(nid){
    document.querySelector("#display_info").innerHTML = 
    `<p class="display_info__text" id="info__text">Your NID Number:<br><span id="copy_nid">${nid}</span></p> 
    <span onclick="copyNid()" class="copy_button" title="Make a copy">
        <i class="fa-solid fa-copy"></i>
    </span>`;
}

function printError(message){
    document.querySelector("#display_info").innerHTML = `<p class="error_text">${message}</p>`;

    setTimeout(() =>{
        document.querySelector("#display_info").innerHTML = "";
    }, 5000)
}

function copyNid(){
    let text = document.getElementById("copy_nid").textContent;
    navigator.clipboard.writeText(text);
}



// validityChecker(n.toString());

// const list = [19898087874343400000n, 124543520002143432887987978763430n, 3242364768239739829834976n, 199221478949327847644394n, 233243478719343473894n, 3476419233247349874938794n];

// for (let value of list){
//     validityChecker(value.toString());
// }
