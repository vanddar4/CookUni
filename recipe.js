class Recipe {
    constructor(user) {
      this._list - null
      this.user = user
    }

    async list() {
      // TODO
    }

    async shareRecipe({params}) {
      // TODO
    }

    async editRecipe({params}) {
      // TODO
    }

    async deleteRecipe({params}) {
      // TODO
    }

    async likeRecipe({params}) {
      // TODO
    }
}

// document.getElementById("shareit").addEventListener("click", function() {
// console.log(authToken);
// let data = {
//     "meal": document.getElementById("defaultRecepieShareMeal").value,
//     "ingredients": document.getElementById("defaultRecepieShareIngredients").value,
//     "prepMethod": document.getElementById("defaultRecepieShareMethodOfPreparation").value,
//     "description": document.getElementById("defaultRecepieShareDescription").value,
//     "category": document.getElementById("category").value,
//     "foodImageURL": document.getElementById("defaultRecepieShareFoodImageURL").value,
// }
// fetch("https://baas.kinvey.com/appdata/kid_SJqu6rsWD/recipes", {
// method: "POST", 
// body: JSON.stringify(data),
// headers: {
//     "Authorization": "Kinvey " + authToken,
//     'Content-type': 'application/json; charset=UTF-8'
// }
// }).then(response => {
//         return response.json()
//     })
// })
