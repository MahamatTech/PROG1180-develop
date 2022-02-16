
window.addEventListener("load",function(){
  let currentURL = window.location.href;
  let btnSaveIsClicked = false;
  var jsonString = localStorage.getItem("customerObject");
  loadCities();

  function SearchCities()
  {
      var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  let data = JSON.parse(this.responseText);
                  let allData = data;
                let cities = allData.filter(c => c.cities);
                let output = "";
                let count = 0;
                let searchByCity = document.getElementById('searchtext').value
                let selectedProvince = document.getElementById('province').selectedOptions[0].value;
                
                  

                  if(searchByCity == "")
                    {
                      for(d of cities) {
                        output +="<tr>";

                        for(c of d.cities)
                        {   
                          if(selectedProvince == d.name)
                          {
                            output +="<tr>";
                            output += `<td class="data-link" dataid="${count++}">${c}</td>`;
                            output += `<td >${d.name}</td>`; 
                            output +="</tr>";
                          }
                        }
                        
                        output +="</tr>"
                      }
                    }
                    else
                    {
                      for(d of cities) {
                          output +="<tr>";
  
                          for(c of d.cities)
                          {   
                            let pro = c.toUpperCase();
                            console.log(pro);
                            if((selectedProvince == d.name) && (pro.includes(searchByCity.toUpperCase())) )
                            {
                              output +="<tr>";
                              output += `<td class="data-link" dataid="${count++}">${c}</td>`;
                              output += `<td >${d.name}</td>`; 
                              output +="</tr>";
                            }
                          }
                          
                          output +="</tr>"
                        }
                      
                    }
                document.getElementById("equipmentBrandDataTable").innerHTML = output;
              }
          };
          xmlhttp.open("GET", "/json/province_cities.json", true);
          xmlhttp.send();
  }


  function loadCities()
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          let output = "";
          let count = 0;

          for(p of data)
          {
            let province = p.name;

            for(c of p.cities)
            {
              output +="<tr>";
              output += `<td class="data-link" dataid="${count++}">${c}</td>`;
              output += `<td >${province}</td>`; 
              output +="</tr>";              
            }
          }
          document.getElementById("cityDataTable").innerHTML = output;
        }
    };
    xmlhttp.open("GET", "/json/province_cities.json", true);
    xmlhttp.send();    
  }

});

    
