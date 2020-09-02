var app = Sammy('main', function() {
    let user = new User() // I created a user class and its methods, you can see the code in actions.js
    let recipe = new Recipe(user) // I passed the user in the contructor so that I can check the user session
    let authenticated = false
    let navTemplate = document.querySelector('nav').innerHTML //get nav element so we can update its html later

    const checkLoggined = (callback) => { // called by this.around() runs when the url hash changes, we can uses this to check if user is loggined or not
        let names = ''
        if(user.session) { //check if user loggined
            console.log('loggined')
            authenticated = true
            names = user.session.username
        } else {
            console.log('not loggined')
            authenticated = false
        }

        let nav = document.querySelector('nav')
        let template = Handlebars.compile(navTemplate)
        nav.innerHTML = template({authenticated, names})
        callback() // calling calback works like continue in a  loop
    }

    this.around(checkLoggined)

    // this is only for the food template added as partial, this is used for home view this is accessible globally
    let food_template = document.getElementById('food-template').innerHTML
    Handlebars.registerPartial('recipe-template', food_template)

    const handleChangeView = async (templateID, context) => { // this function handles all the view changes in the page we only pass the id of the element we need to change
        // let recipes = await recipe.list()

        let { index } = context?context.params:0 // this is for the recipe/view/index that will be used to get the index of recipe in the recipe array

        // basic handlebars usage
        let src = document.getElementById(templateID).innerHTML
        let template = Handlebars.compile(src)
        let html = template({authenticated, index})

        // this.swap() works like element.innerHTML = <h1>Hello</h1>, it swaps the selected element as you can see at the top Sammy('main')
        this.swap(html)
    }

    // get routes can be accessed by an anchor tag <a> or by directly changing the url in the browser
    this.get('#/', () => handleChangeView('home-template'));
    this.get('#/recipe/share', () => handleChangeView('share-recipe-template'));
    this.get('#/recipe/edit/:index', (context) => handleChangeView('edit-recipe-template', context));
    this.get('#/recipe/view/:index', (context) => handleChangeView('view-recipe-template', context));
    this.get('#/login', () => handleChangeView('login-template'));
    this.get('#/register', () => handleChangeView('register-template'));

    this.get('#/action/user/logout', () => user.logout());

    // post method can be called by html forms when submitted, just specify the action property in the form, you can check in the html code
    this.post('#/action/user/login', (context) => user.login(context)); // passing the context so that we can access the params object
    this.post('#/action/user/register', (context) => user.register(context)); 

    this.post('#/action/recipe/share', (context) => recipe.shareRecipe(context));

    this.post('#/action/recipe/edit/:id/:index', (context) => recipe.editRecipe(context));

    this.get('#/action/recipe/delete/:id', (context) => recipe.deleteRecipe(context));
    this.get('#/action/recipe/like/:id/:index', (context) => recipe.likeRecipe(context));


});


$(function () { // this is the short hand function of document.ready in JQuery, means this will run after the html loads everything.
    // this runs sammy on the the first page load. and the parameters will be the first route, in this case the home route
    app.run('#/'); 
});
