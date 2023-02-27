// require('aframe');
// require('@editvr/aframe-dialog-popup-component');

  fetch('http://127.0.0.1:5000/products', {
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
                        <a-gltf-model animate src=${datas.url} position=${datas.position} rotation="3 0 0 15">
                          
                        </a-gltf-model>
                `;
            });
            document.getElementBy('list').innerHTML = output;
        })
        .catch((err) => console.log(err))
    

