window.addEventListener("load",function(){
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
                              output += `<td id="desciption">${e.description}</td>`;
                              output += `<td id="color">${e.color}</td>`;
                              output += `<td id="engineSize">${e.engineSize}</td>`;
                              output += `<td id="bladeSize">${e.bladeSize}</td>`;
                              output += `<td class="data-link" dataid="${e.serial}">${e.serial}</td>`;
                              output += '<td><button id="btnEdit" type="button" onclick="editFuncation(this);">Edit</button></td>'
                          
                          output +="</tr>";
                          }

                    }
                    
                  document.getElementById("equipmentDataTable").innerHTML = output;
                }
            };
            xmlhttp.open("GET","/json/customer.json", true);
            xmlhttp.send();
 

});