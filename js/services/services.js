function buildFetchOptions(method,bodyObject) {
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }
    return fetchOptions;
}
async function makeAPICall(url,method,idParam,bodyObject) {
    let fetchOptions = buildFetchOptions(method,bodyObject);
    if (idParam && idParam != null) {
        url += "/"+idParam;
    }
    let apiResponse = await fetch(url,fetchOptions);
    if (apiResponse.status != 200) return undefined;
    let apiResponseJSON = await apiResponse.json();
    return apiResponseJSON;
}

//Move above to a common file
async function getCocktailList() {
    let cocktailList = await makeAPICall(multiIngredientURL,"get");
    return cocktailList;
}

async function loadCocktails() {
    let cocktailList = await getCocktailList();
    console.log(cocktailList);
    populateCocktails(cocktailList);
}

async function getCocktail(cocktailId) {
    let course = await makeAPICall(getCourseURL,"get",courseId);
    return course;
}