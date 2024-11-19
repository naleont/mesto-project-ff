const serverURL = 'https://mesto.nomoreparties.co/'
const token = 'b5e96800-78a2-4736-af87-a10e43965653'
const cohortId = 'wff-cohort-26'

const fetchConfig = {
    baseURL: serverURL + 'v1/' + cohortId,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
}

function handleResponse(request, resolve, reject) {
    request
    .then((res) => {
        if (res.ok) { 
            resolve(res.json()) 
        } else { 
            reject(`Ошибка: ${res.status}`) 
        }
    })
}

const profileInfoPromise = new Promise((resolve, reject) => {
    const request = fetch(fetchConfig.baseURL + '/users/me', {
        headers: fetchConfig.headers
    })
    handleResponse(request, resolve, reject)
});

const cardsInfoPromise = new Promise((resolve, reject) => {
    const request = fetch(fetchConfig.baseURL + '/cards', {
        headers: fetchConfig.headers
    })
    handleResponse(request, resolve, reject)
})

function saveProfileRequest(nameValue, jobValue) {
    const saveProfilePromise = new Promise((resolve, reject) => {
        const request = fetch(fetchConfig.baseURL + '/users/me', {
            method: 'PATCH',
            headers: fetchConfig.headers,
            body: JSON.stringify({
                name: nameValue,
                about: jobValue
            })
        })
        handleResponse(request, resolve, reject)
    })
    return saveProfilePromise
}

function addCardRequest(cardInfo) {
    const newPromise = new Promise((resolve, reject) => {
        const request = fetch(fetchConfig.baseURL + '/cards', {
            method: 'POST',
            headers: fetchConfig.headers,
            body: JSON.stringify(cardInfo)
        })
        handleResponse(request, resolve, reject)
    })
    return newPromise
}

function saveAvatarRequest(newPhoto) {
    const profilePhotoPromise = new Promise((resolve, reject) => {
        const request = fetch(fetchConfig.baseURL + '/users/me/avatar', {
            method: 'PATCH',
            headers: fetchConfig.headers,
            body: JSON.stringify({
                avatar: newPhoto
            })
        })
        handleResponse(request, resolve, reject)
    })
    return profilePhotoPromise
}

function likeCardRequest(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE'
    const likePromise = new Promise((resolve, reject) => {
        const request = fetch(fetchConfig.baseURL + '/cards/likes/' + cardId, {
            method: method,
            headers: fetchConfig.headers
        })
        handleResponse(request, resolve, reject)
    })
    return likePromise
}

function deleteCardRequest(cardId) {
    const deleteCardPromise = new Promise((resolve, reject) => {
        const request =  fetch(fetchConfig.baseURL + '/cards/' + cardId, {
            method: 'DELETE',
            headers: fetchConfig.headers
            })
        handleResponse(request, resolve, reject)
    })
    return deleteCardPromise
}


export { profileInfoPromise, cardsInfoPromise, saveProfileRequest, addCardRequest, saveAvatarRequest, likeCardRequest, deleteCardRequest }