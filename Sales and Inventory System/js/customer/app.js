window.addEventListener("load",function(){
  let currentURL = window.location.href;
  let btnSaveIsClicked = false;
  var jsonString = localStorage.getItem("customerObject");

  let retrievedObject = localStorage.getItem("customerObject");
  let currentCustomerID = localStorage.getItem("currentCustomer");
  
  let customerData = getCustomerData(JSON.parse(retrievedObject), currentCustomerID);  
  document.getElementById("customerName").textContent = customerData[0].firstName + " " + customerData[0].lastName;
  document.getElementById("customerEmailAddress").textContent = customerData[0].email;
  document.getElementById("customerPhone").textContent = customerData[0].phone;
  document.getElementById("customerAddress").textContent = customerData[0].address + ", " + customerData[0].city + ", " + customerData[0].province + ", " +  customerData[0].postalCode;

  if (customerData[0].equipment.length > 0) 
  {
    loadEquipmentDetails(customerData);
    $("#btnDelete").hide();
    document.getElementById("confirmationMessage").innerHTML = "Record cannot be deleted since transactions exists!";
  }
  else{
    $("#btnDelete").show();
    document.getElementById("confirmationMessage").innerHTML = "Are you sure you want to DELETE the record?";
  }

  
  let btnCustomerDeleteRecord = document.getElementById('btnCustomerDeleteRecord');

  let buttonClearClick= document.getElementById('btnClear');

  if (buttonClearClick != null)
  {
    buttonClearClick.addEventListener("click",function(){
      let buttonClearAllClick = document.getElementById('btnClearAll');

      document.getElementById("confirmationModalLabel").innerHTML = "Confirmation";

      if (buttonClearAllClick != null)
      {
        buttonClearAllClick.addEventListener("click",function(){
          document.getElementById("firstName").value = "";
          document.getElementById("middleName").value = "";
          document.getElementById("lastName").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("address").value = "";
          document.getElementById("province").value = "";
          document.getElementById("city").value = "";
          document.getElementById("postalCode").value = "";
        });
      }
    });
  }

  $("#dataTable").fancyTable({
    /* Column number for initial sorting*/
      sortColumn:0,
      /* Setting pagination or enabling */
      pagination: true,
      /* Rows per page kept for display */
      perPage:8,
      globalSearch:true
  });

  setTimeout(function(){ 
    $(".data-link").click(function(){ //This enables the clicking on the customer data to link to its details
      localStorage.setItem("currentEquipment", $(this).attr("dataid"));
      $("#btnOverlayAdd").hide();
      $("#btnOverlayUpdate").show();
      getEquipmentDetails($(this).attr("custid"), $(this).attr("dataid"));
    });
  }, 3000);

  document.getElementById("btnAddEquipment").addEventListener("click",function()
  {
    console.log("eq");
    document.getElementById("equipmentSerial").value = "";
    document.getElementById("equipmentDescription").value = "";
    document.getElementById("inputColour").value = "";
    document.getElementById("engineSize").value = "";
    document.getElementById("bladeSize").value = "";
    document.getElementById("equipmentType").value = "";
    document.getElementById("equipmentBrand").value = "";

    $('#equipmentSerial').removeAttr('disabled');
    $('#equipmentDescription').removeAttr('disabled');
    $('#inputColour').removeAttr('disabled');
    $('#engineSize').removeAttr('disabled');
    $('#bladeSize').removeAttr('disabled');
    $('#equipmentType').removeAttr('disabled');
    $('#equipmentBrand').removeAttr('disabled');

    $("#btnOverlayAdd").show();
    $("#btnOverlayUpdate").hide();
  },false);

  Mousetrap.bind(["f6", "ctrl+c"], function(e) {
    $("#btnAddEquipment").click();
  });


  function getCustomerData(data, customerID) {
    return data.filter( customer => customer.id == customerID);      
  }

  function loadEquipmentDetails(customerData) {
    let output = "";
    let custID = customerData[0].id;
    
    for(c of customerData[0].equipment) {
      output +="<tr>";
      output += `<td class="data-link" custid="${custID}" dataid="${String(c.id)}" data-toggle="modal" data-target="#equipmentModal" data-dashlane-rid="2081001e4e21294c" data-dashlane-label="true" data-form-type="action">${c.description}</td>`;
      output += `<td>${c.brand}</td>`;
      output += `<td>${c.type}</td>`;
      output += `<td>${c.Date_Checkin}</td>`;
      output += `<td>${c.Date_Checkout}</td>`;
      output +="</tr>"
    }
    document.getElementById("equipmentDetails").innerHTML = output;
  }

  function getEquipmentDetails(customerID, equipmentID) {
    var jsonString = localStorage.getItem("customerObject");
    var retrievedObject = JSON.parse(jsonString);

    let selectedCustomer = retrievedObject.filter(cust => cust.id == customerID);
    let equipmentCustomer = selectedCustomer[0].equipment.filter(e => e.id == equipmentID);
    
    document.getElementById("equipmentSerial").value = equipmentCustomer[0].serial;
    document.getElementById("equipmentDescription").value = equipmentCustomer[0].description;
    document.getElementById("inputColour").value = equipmentCustomer[0].color;
    document.getElementById("engineSize").value = equipmentCustomer[0].engineSize;
    document.getElementById("bladeSize").value = equipmentCustomer[0].bladeSize;
    document.getElementById("equipmentType").value = equipmentCustomer[0].type;
    document.getElementById("equipmentBrand").value = equipmentCustomer[0].brand;

    if (equipmentCustomer[0].Date_Checkout.trim() == "")
    {
      $("#btnOverlayCheckOut").show();
    }
    else
    {
      $('#equipmentSerial').attr('disabled', 'disabled');
      $('#equipmentDescription').attr('disabled', 'disabled');
      $('#inputColour').attr('disabled', 'disabled');
      $('#engineSize').attr('disabled', 'disabled');
      $('#bladeSize').attr('disabled', 'disabled');
      $('#equipmentType').attr('disabled', 'disabled');
      $('#equipmentBrand').attr('disabled', 'disabled');
      $("#btnOverlayCheckOut").hide();
      $("#btnOverlayUpdate").hide();
    }
  }
});
