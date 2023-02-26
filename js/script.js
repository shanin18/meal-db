const loadMeals = async (dish, dataLimit) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`
    const res = await fetch(url)
    const data = await res.json();
    allMeals(data.meals, dataLimit);
}

const allMeals = (meals, dataLimit) =>{
    const btnSeeAll = document.getElementById("btn-see-all");
    const mealsContainer = document.getElementById("meals-container");
    mealsContainer.innerHTML = "";

    if(dataLimit && meals.length > 6){
        console.log(meals)
        meals = meals.slice(0,6);
        btnSeeAll.classList.remove("hidden");
    }
    else{
        btnSeeAll.classList.add("hidden");
    }

    
    // display no meals found
    const nothingFound = document.getElementById("nothing-found");
    if(meals.length === 0){
        nothingFound.classList.remove("hidden");
    }else{
        nothingFound.classList.add("hidden");
    }

    meals.forEach(meal => {
        const item = document.createElement("div");
        item.innerHTML =`
        <div class="lg:flex border rounded-lg mx-2">
        <img class="lg:w-2/5 rounded-lg" src="${meal.strMealThumb}" alt="">
        <div class="lg:w-3/5 p-3 md:p-6">
            <h2 class="font-bold text-3xl">${meal.strMeal}</h2>
            <p class="my-3 lg:my-5 text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, sunt. Inventore labore cumque perferendis a eius quas odio minus aliquam.</p>
            <label for="my-modal" onclick="loadMealDetails(${meal.idMeal})" class="btn bg-white hover:bg-white  text-yellow-400 hover:text-yellow-500 pl-0 text-lg underline border-0">View Details</label>
        </div>
    </div>
    `;
        mealsContainer.appendChild(item);
    });
}


const loadMealDetails = async (idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
}


const displayMealDetails = (data) =>{
    const mealImg = document.getElementById("meal-img");
    mealImg.innerHTML = `
    <img class="h-52" src="${data.strMealThumb}">
    `
    document.getElementById("meal-name").innerText = data.strMeal;
    document.getElementById("meal-details").innerText = data.strInstructions;

}


const loadSearchMeal = () =>{
    const search = document.getElementById("input-search").value;
    loadMeals(search, 10);
}


document.getElementById("input-search").addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        loadMeals(e.target.value, 10);
    }
})


document.getElementById("btn-see-all").addEventListener("click",()=>{
    const search = document.getElementById("input-search").value;
    loadMeals(search);
})

loadMeals("fish");

// window.addEventListener("load",()=>{
//     const loader = document.getElementById("loader");
//     loader.classList.add("hidden");
// })

