const socket = io.connect('http://localhost:3000/');

socket.on("fresh data",function (data) {
    console.log(data)
    let row_el = document.getElementById(data._id)
    row_el.classList.add("update-row")
    setTimeout(function () {
        row_el.classList.remove("update-row")
    },2000)
    for(let i of Object.keys(data)){
        let element = document.getElementById(data._id).querySelector(`[data-key='${i}']`)
        if(element) {
            console.log(element)
            console.log(element.innerHTML)
            element.innerHTML = data[i]
        }
    }
})

