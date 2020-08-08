function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const socket = io();
socket.on("connect",function () {
addUser();
})
socket.connect('http://localhost:3000/')

function addUser(){
    let num = getRandomInt(100)
    let res = socket.emit("add user",num)
    console.log(num)

}

function table_update (data) {
    for(let i of Object.keys(data)){
        let element = document.getElementById(data._id).querySelector(`[data-key='${i}']`)
        if(element) {
            console.log(element)
            console.log(element.innerHTML)
            element.innerHTML = data[i]
        }
    }
}
function message_update(data){
    let element = `<div class="stock-update row">
            <p>  <span class="tag">${data["Company"]}</span> =>  <span class="tag">${data["Price"]}</span> -> <span class="tag">${data["YTD Change"]}</span></p>
            <div class="break"></div>
        </div>`
    let container = document.getElementsByClassName("msg-box")[0]
    container.innerHTML += element

}
socket.on("fresh data",function (data) {
    console.log(data)
    let row_el = document.getElementById(data._id)
    row_el.classList.add("update-row")
    setTimeout(function () {
        row_el.classList.remove("update-row")
    },2000)

    table_update(data)
    message_update(data)
})

