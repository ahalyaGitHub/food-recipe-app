//Search button
document.getElementById("button").addEventListener('click', () => {

    //Search input 
    let inputValue = document.getElementById('inputName').value

    //Search meal by name
    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items")
            items.innerHTML = ""
            if (data.meals == null) {
                document.getElementById("msg").style.display = "block"
            } else {
                document.getElementById("msg").style.display = "none"
                data.meals.forEach(meal => {

                    itemDiv = document.createElement("div")
                    itemDiv.className = "m-2 singleItem"
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`)
                    const itemInfo =
                        `<div class="card" style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="img">
                        <div class="card-body text-center">
                            <h3 class="card-text fw-bolder">${meal.strMeal}</h3>
                        </div>
                    </div>`

                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)
                })
            }
        })
})

//Details function
function details(id) {

    //Display the id of the item
    console.log(id)

    //Lookup full meal details by id
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0]
            console.log(meal)
            let details = document.getElementById("details")
            details.innerHTML = ""
            let detailsDiv = document.createElement("div")
            let detailsInfo = `
            <div class="card" style="width: 100%; display: flex; flex-direction: row;">
            <img src="${meal.strMealThumb}" class="card-img-left img-fluid" alt="img" style="width: 40%; ">
            <div class="card-body" style="width: 60%; padding-left: 20px;">
                <h3 class="card-text fw-bold">${meal.strMeal}</h3>
                <b>Area : ${meal.strArea}</b><br>
                <b>Category : ${meal.strCategory}</b><br>
                <b>Instruction :</b><br>
                <p class="fw-light">${meal.strInstructions}</p>
            </div>
        </div>
        `

            detailsDiv.innerHTML = detailsInfo
            details.appendChild(detailsDiv)
        })
}
