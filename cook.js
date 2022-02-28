function loadGif(value){
  document.getElementById('img').style.display = value;
}
function loadGif2(value){
  document.getElementById('display').style.display = value;
}
   
document.getElementById('search-button').addEventListener('click', function(){
    const inputValue = document.getElementById('input-field');
    const inputValueText = inputValue.value;
    inputValue.value = ""
    loadGif('block');
    loadGif2('none');
    const url = (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValueText}`)
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.drinks))

})

const displayData = (drinks)=>{
    const parent = document.getElementById('parent-div');
    parent.textContent = ""
    if(!drinks){
      document.getElementById('error').innerText = "No Result Found!";
      loadGif2('block')
      document.getElementById('detail').style.display = "none";
      loadGif('none')

    }
    

    
    drinks?.forEach(drink => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick = "getId(${drink.idDrink})" class="card h-100">
                <img  class ="rounded" src="${drink.strDrinkThumb}" class="card-img-top" alt="image">
                <div class="card-body">
                    <h4 class="text-primary">ID: ${drink.idDrink}</h4>
                  <h5 class="card-title text-primary">${drink.strCategory}</h5>
                  <p>${drink.strIngredient4 ? drink.strIngredient4 : ''}</p>
                  <p class="card-text">${drink.strInstructions.slice(0,200)}</p>
                </div>
              </div>
        `
        document.getElementById('error').innerText =""
        parent.appendChild(div);
    
        loadGif('none');
        loadGif2('block')

    });

}
const getId = id=>{
    const url = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.drinks[0]))
}
const showDetail = (drink)=>{
    
    const parenDetail = document.getElementById('detail');
    const div = document.createElement('div');
    parenDetail.textContent = ""
    div.classList.add('col');
    div.innerHTML = `
            <div class="card ">
                <img  class ="rounded section-img float-none"src="${drink.strDrinkThumb}" class="card-img-top" alt="image">
                <div class="card-body">
                    <h5 class="text-dark">ID: ${drink.idDrink}</h5>
                  <h6 class="card-title text-primary">${drink.strCategory}</h6> 
                </div>
            </div>
    `; 

    parenDetail.appendChild(div);
}