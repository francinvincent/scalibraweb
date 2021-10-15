const homecontactform = document.querySelector("#home-contact-form");

if(homecontactform){
    homecontactform.addEventListener("submit", function(e) {
        submitForm(e, this);
    }) 
}

async function submitForm(e, form){
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmit');

    btnSubmit.disabled = true;

    setTimeout( () => btnSubmit.disabled = false, 2000);

    const jsonFormData = buildJsonFormData(form);

    const headers = buildHeaders();

    const response = await performPostHttpRequest('https://jsonplaceholder.typicode.com/posts', headers, jsonFormData);
    console.log(response);

    if(response) {
        alert('yay');
    } else {
        alert('an error');
    }
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}

async function performPostHttpRequest(fetchLink, headers, body) {
    if(!fetchLink || !headers || !body) {
        throw new Error("One or more POST request parameters were not passed.");
    }

    try{
        const rawResponse = await fetch(fetchLink, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        return content;
    }
    catch(err) {
        console.error('Error at fetch POST: ${err}');
        throw err;
    }
}