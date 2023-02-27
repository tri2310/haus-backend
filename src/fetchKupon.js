// require('aframe');
// require('@editvr/aframe-dialog-popup-component');
    fetch('http://127.0.0.1:5000/kupon/', {
     method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
  })
    .then((response) => response.json())
    .then((data) => {
            let output = '';
            data.forEach(function(datass){
                output += `
     <small>${datass.code}</small>
    
                `;
                
            });
            document.getElementById('kupon').innerHTML = output;
        })
        .catch((err) => console.log(err));
        
  fetch('http://127.0.0.1:5000/products/', {
     method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
  })
    .then((response) => response.json())
    .then((data) => {
            let output = '';
            data.forEach(function(datas){
             
                output += `
     
     <div class="col-lg-3">
        <div class="card">
             <div class="row m-3">
              <div class="col">
              <img src=${datas.url2} style="max-width: 100%; width: 120px;" />
              </div>
              <div class="col">
                <small><strong>${datas.name}</strong></small>
                <p>Small : ${datas.harga_small}</p>
                <p>Medium : ${datas.harga_medium}</p>
                <p>Large : ${datas.harga_large}</p>
                <br>
            
              </div>
             </div>
        </div>
      </div>
        
    
                `;
                

                
                
            });
            document.getElementById('list').innerHTML = output;
        })
        .catch((err) => console.log(err));
        




