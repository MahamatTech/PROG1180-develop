window.addEventListener("load",function(){
    var xmlhttp = new XMLHttpRequest();
              xmlhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      let data = JSON.parse(this.responseText);
                      let allData = data;
                     let cities = allData.filter(c => c.cities);
                     let output = "";
                     let count = 0;
                     
                      for(d of cities) {
                        output +="<tr>";

                        for(c of d.cities)
                        {   output +="<tr>";
                            output += `<td class="data-link" dataid="${count++}">${c}</td>`;
                            output += `<td >${d.name}</td>`; 
                            output +="</tr>";
                        }
                        
                        
                        
                        
                        output +="</tr>"
                      }
                    document.getElementById("equipmentBrandDataTable").innerHTML = output;
                  }
              };
              xmlhttp.open("GET", "/json/province_cities.json", true);
              xmlhttp.send();
   

});

    
