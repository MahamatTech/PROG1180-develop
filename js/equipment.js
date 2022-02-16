window.addEventListener("load",function(){
    let currentURL = window.location.href;
    if(currentURL.includes("/pages/equipment/index.html"))
    {
        var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        let output = "";
                        //console.log(data);
                        for(d of data) {
                                
                                for (e of d.equipment)
                                {
                                    console.log(e.description);
                                    output +="<tr>";
                                    output += `<td>${e.description}</td>`;
                                    output += `<td>${e.color}</td>`;
                                    output += `<td>${e.engineSize}</td>`;
                                    output += `<td>${e.bladeSize}</td>`;
                                    output += `<td>${e.serial}</td>`;
                                
                                output +="</tr>";
                                }

                        }
                        
                        document.getElementById("equipmentDataTable").innerHTML = output;
                    }
                };
                xmlhttp.open("GET","/json/customer.json", true);
                xmlhttp.send();
    }
    if(currentURL.includes("/pages/equipment/create.html"))
    {
        document.getElementById('btnSelectCustomer').addEventListener("click",function(){
            $("#confirmationModal").show();
        });
    }
});

    
