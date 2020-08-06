// window.onload = function () {

//     let myHeading = document.querySelector('h1');
//     myHeading.textContent = 'Hello, my friends!';
// };


window.onload = function () {

    let myImage = document.querySelector('img');

    myImage.onclick = function () {
        let mySrc = myImage.getAttribute('src');
        if (mySrc === '../images/1564912856214029.png') {
            myImage.setAttribute('src', '../images/1564840137702143.jpg');
        } else {
            myImage.setAttribute('src', '../images/1564912856214029.jpg');
        }
    }
};