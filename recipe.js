class Recipe {
    constructor(user) {
      this._list - null
      this.user = user
    }

    async list() {
      fetch(`https://baas.kinvey.com/appdata/${appID}/recipes`, {
      method: "GET", 
      body: JSON.stringify(data),
        headers: {
          "Authorization": "Kinvey " + authToken
        }
      }).then(response => {
        console.log(response.json())
        return response.json()
      })
    }

    async shareRecipe({params}) {
      fetch(`https://baas.kinvey.com/appdata/${appID}/recipes`, {
      method: "POST", 
      body: JSON.stringify(data),
        headers: {
          "Authorization": "Kinvey " + authToken,
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        console.log(response.json())
        return response.json()
      })
    }

    async editRecipe({params}) {
      fetch(`https://baas.kinvey.com/appdata/${appID}/recipes/${recipeID}`, {
      method: "PUT", 
      body: JSON.stringify(data),
        headers: {
          "Authorization": "Kinvey " + authToken,
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        console.log(response.json())
        return response.json()
      })
    }

    async deleteRecipe({params}) {
      fetch(`https://baas.kinvey.com/appdata/${appID}/recipes/${recipeID}`, {
      method: "DELETE", 
      body: JSON.stringify(data),
        headers: {
          "Authorization": "Kinvey " + authToken
        }
      }).then(response => {
        console.log(response.json())
        return response.json()
      })
    }

    async likeRecipe({params}) {
      fetch(`https://baas.kinvey.com/appdata/${appID}/recipes/${recipeID}`, {
      method: "PUT", 
      body: JSON.stringify(data),
        headers: {
          "Authorization": "Kinvey " + authToken,
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        console.log(response.json())
        return response.json()
      })
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
