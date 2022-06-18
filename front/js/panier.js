const recupObjet = JSON.parse(localStorage.getItem("cadie"));
console.log(recupObjet);
function produitPanier(){
let content = "";
if(recupObjet.length >0){
  recupObjet.forEach(resultats => {
    console.log(recupObjet)
   
    content +=`<article class="cart__item" data-id="product-ID" data-color="product-color">
    <div class="cart__item__img">
      <img src="${resultats.photo}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${resultats.nom}</h2>
        <p>${resultats.couleur}</p>
        <p>${resultats.prix}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${resultats.quantite} </p>
          <!--<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">-->
        </div>
        <div class="cart__item__content__settings__delete">
        <button class="deleteItem" onclick="btnSupprimer('`+resultats.id+`')">Supprimer</button>
        </div>
      </div>
    </div>
  </article>`
  
  });
}else{
  content="<div> Panier vide</div>";
  document.getElementsByClassName("cart__price")[0].style.display = 'none';
  document.getElementsByClassName("cart__order")[0].style.display = 'none';
}

cart__items.innerHTML = content;
}
produitPanier();

function btnSupprimer(id){
console.log(id);
const index = search (recupObjet, id);
console.log(index);

recupObjet[index].quantite-=1
if(recupObjet[index].quantite == 0){
  recupObjet.splice(index, 1);
}
localStorage.setItem("cadie", JSON.stringify(recupObjet));
location.reload();
return false;
}

function search(cadie, id)
    {
      console.log(id);console.log(cadie);
        for(var i = 0 ; i <cadie.length ; i++){
          console.log(cadie[i].id);
            if (id == cadie[i].id) {console.log(i)
              return i};
            }
        {console.log(1)
          return -1};
    }

    const btnCommander = document.getElementById("order");
    btnCommander.addEventListener('click', function(e){
      e.preventDefault();
      const cadie = JSON.parse(localStorage.getItem('cadie'));
      let productIds =[];
      for(var i = 0 ; i <cadie.length; i++){
        productIds.push(cadie[i].id);
      }
     const order = {
      contact:{
          firstName :  document.getElementById("firstName").value.trim(),
           lastName : document.getElementById("lastName").value.trim(),
           address : document.getElementById("address").value,
           city : document.getElementById("city").value.trim(),
          email : document.getElementById("email").value.trim(),
      },
      products: productIds
         }
      console.log(order);

      if (order.contact.firstName.length < 1 || order.contact.firstName.length > 10){
        alert('error prenom');
        return;
      }else if(order.contact.lastName.length < 1 || order.contact.lastName.length > 255){
        alert('error nom')
        return;
      }else if(order.contact.address.length < 1 || order.contact.address.length > 255){
        alert('error address')
        return;
      }else if(order.contact.city.length < 1 || order.contact.city.length > 15 ){
        alert('error ville');
        return;
      }else if(!validateEmail(order.contact.email)){
        alert('error email');
        return;
      };

      fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(order)
      })
        .then(function(data){
          console.log(data);
          return data.json();
        })
        .then(function(res){
          console.log(res.orderId);
          
        })
        .catch(function(error) {
          console.log(error);
        })
      ;
    })
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

