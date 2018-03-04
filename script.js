var _row = null;

function Person(name, surname, phone, email) {
  this.name = name;
  this.surname = surname;
  this.phone = phone;
  this.email = email;
}

var contactList = new Array();


function refreshTable() {
  var storedNames = JSON.parse(localStorage.getItem("contacts"));

  $.each(storedNames, function() {
    $("#demoTable tbody").append(
      "<tr>"
    )
    $.each(this, function (name, value) {
      this.value = value;
      console.log(name + '=' + value);
      $("#demoTable tbody tr:last-child").append(
        "<td>" + value + "</td>"
      );

    })
    $("#demoTable tbody tr:last-child").append(
      "<td><button id='updateButton' onclick='productDisplay(this);'>Edit</button></td>" +
      "<td><button id='deleteButton' onclick='productDelete(this);'>Delete</button></td>" +
      "</tr>"
    )
  });

}


function productAddToTable() {
  var newContact = new Person($("#name").val(), $("#surname").val(),$("#email").val(),$("#phone").val());
  contactList.push(newContact);

  localStorage.setItem("contacts",JSON.stringify(contactList));
  refreshTable();

  $("div.holder").jPages("destroy");
  $("div.holder").jPages({
    containerID: "itemContainer",
    perPage      : 5

  });
}

function productDelete(ctl) {
  $(ctl).parents("tr").remove();
}

function formClear() {
  $("#name").val("");
  $("#surname").val("");
  $("#email").val("");
  $("#phone").val("");
}

function productUpdateInTable() {
  //Add changed date to table
  $(_row).replaceWith(
    "<tr>" +
    "<td>" + $("#name").val() + "</td>" +
    "<td>" + $("#surname").val() + "</td>" +
    "<td>" + $("#email").val() + "</td>" +
    "<td>" + $("#phone").val() + "</td>" +
    "<td><button id='updateButton' onclick='productDisplay(this);'>Edit</button></td>" +
    "<td><button id='deleteButton' onclick='productDelete(this);'>Delete</button></td>" +
    "</tr>"
  )

  //Clear form fields
  formClear();
  //Change Update Button text
  $("#updateBtn").text("Add");
}

function productUpdate() {
  if ($("#updateBtn").text() == "Update") {
    productUpdateInTable();
  }
  else {
    //Add product to table
    productAddToTable();
    //Clear form fields
    formClear( );
    //Focus to product name field
    $("#name").focus();
  }
}

function productDisplay(ctl) {
  _row = $(ctl).parents("tr");
  var cols = _row.children("td");
  $("#name").val($(cols[0]).text());
  $("#surname").val($(cols[1]).text());
  $("#email").val($(cols[2]).text());
  $("#phone").val($(cols[3]).text());
  $("#updateBtn").text("Update");
}

$(document).ready(function () {
  refreshTable();
});
