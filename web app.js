var selectedRow = null

function onFormSubmit(){
    var formData = readFormData();
    if (selectedRow == null)
     insertRecord(formData);
     else
     updateRecord(formData);

    resetForm();

}

function readFormData(){
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["status"] = document.getElementById("status").value;
    return formData;
}

function insertRecord(data){
    var table = document.getElementById("userList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.status;

    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                        <button onClick="onDelete(this)">Delete</button>`;
}

function resetForm(){
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("status").value = "";
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
    document.getElementById("status").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.gender;
    selectedRow.cells[4].innerHTML = formData.status;
}

function onDelete(td){
    if(confirm(`Sure to delete?`))
    {
    row = td.parentElement.parentElement;
    document.getElementById("userList").deleteRow(row.rowIndex);
    resetForm();
    }
}

/* api call by using XMLHttpRequest
const request = new XMLHttpRequest();
request.open("GET","https://gorest.co.in/public/v1/users");
request.send();
request.onload = ()=>{
    console.log(request);
    if(request.status === 200){
        console.log(JSON.parse(request.response));
    }
    else {
        console.log(request)
        console.log(`error ${request.status}`)
    }
}
*/

// post request from REST API
var form = document.getElementById('form')
form.addEventListener('submit',function(e){
    e.preventDefault()
    var id = document.getElementById('id').value
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var gender = document.getElementById('gender').value
    var status = document.getElementById('status').value

    //fetch post request
    fetch("https://gorest.co.in/public/v1/users",{
        method:'POST',
        body:JSON.stringify({
            id:id,
            name:name,
            email:email,
            gender:gender,
            status:status
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "Authorization":"Bearer 5c4c96891092a627288f549595905b50b2e9857b650005b383e812d11d80392c" //api access token
        }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
})
