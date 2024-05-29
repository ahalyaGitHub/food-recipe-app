document.getElementById("button").addEventListener('click', () => {
    // Search input 
    let inputValue = document.getElementById('inputName').value;
    details
    // Search meal by name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";  // Clear previous results

            if (data.meals == null) {
                const msg = document.getElementById("msg");
                msg.style.display = "block";
                // Hide the message after 2 seconds
                setTimeout(() => { msg.remove() }, 2000);
                document.getElementById("details").style.display = "none";
            } else {
                document.getElementById("msg").style.display = "none";
                // Display each meal
                data.meals.forEach(meal => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "m-2 singleItem";
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);
                    const itemInfo = `
                        <div class="card" style="width: 12rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="img">
                            <div class="card-body text-center">
                                <h3 class="card-text fw-bolder fs-6">${meal.strMeal}</h3>
                            </div>
                        </div>`;
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv);
                });
                // Scroll to the items smoothly
                items.scrollIntoView({ behavior: 'smooth' });
            }
        });
});

function details(id) {
    // Display the id of the item
    console.log(id);

    // Lookup full meal details by id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            const meal = detail.meals[0];
            console.log(meal);
            const details = document.getElementById("details");
            details.innerHTML = "";  // Clear previous details
            const detailsDiv = document.createElement("div");
            const detailsInfo = `
                <div class="card" style="width: 100%; display: flex; flex-direction: row;">
                    <img src="${meal.strMealThumb}" class="card-img-left img-fluid" alt="img" style="width: 40%;">
                    <div class="card-body" style="width: 60%; padding-left: 20px;">
                        <h3 class="card-text fw-bold">${meal.strMeal}</h3>
                        <b>Area: ${meal.strArea}</b><br>
                        <b>Category: ${meal.strCategory}</b><br>
                        <b>Instruction:</b><br>
                        <p class="fw-light">${meal.strInstructions}</p>
                        <a href="${meal.strYoutube}">Click to view recipe</a>
                    </div>
                </div>`;
            detailsDiv.innerHTML = detailsInfo;
            details.appendChild(detailsDiv);
        });
}
