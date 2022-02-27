
function produit() {
  var items = document.getElementById("item");
  fetch('http://localhost:3000/api/products')
  .then(function(res){
    console.log(res);
    if(res.ok){
      return res.json();
    }
  })
.then(function(data){
  console.log(data);
let contents = "";
          console.log(items);
          data.map(function(product){
            contents +=`<a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
          });
          items.innerHTML = contents;
  })
.catch(function(error) {
  console.log(error);
});
}
 produit();