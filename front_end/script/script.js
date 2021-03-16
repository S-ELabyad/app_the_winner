// console.log("test from javascript")

// var data = document.getElementsByName('categoryList')

// for(var i = 0; i < data.length; i++) {
//     console.log(data[i].value)
// }

axios.get('http://localhost:4000/formadd')
.then((result) => {
    for(var i = 0; i <= result.data.length; i++) {
        console.log(result.data[i].name)
        document.getElementById('getSelected').innerHTML += `
        <option value="${result.data[i]._id}">${result.data[i].name}</option>
        `
    }
})

var selected = document.getElementById('getSelected').value

function getSelectedCat() {
    selected = document.getElementById('getSelected').value
    console.log(selected)
}
