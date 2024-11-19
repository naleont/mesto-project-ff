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

const profileInfoPromise = new Promise((resolve, reject) => {
    return fetch(fetchConfig.baseURL + '/users/me', {
        headers: fetchConfig.headers
    })
    .then((res) => {
        if (res.ok) {
            resolve(res.json())
        } else {
            reject(`Ошибка: ${res.status}`)
        }
    })
    .catch((err) => {
        console.log(err);
    })
});

const cardsInfoPromise = new Promise((resolve, reject) => {
    return fetch(fetchConfig.baseURL + '/cards', {
        headers: fetchConfig.headers
    })
    .then((res) => {
        if (res.ok) {
            resolve(res.json())
        } else {
            reject(`Ошибка: ${res.status}`)
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

function saveProfileRequest(nameValue, jobValue) {
    return fetch(fetchConfig.baseURL + '/users/me', {
        method: 'PATCH',
        headers: fetchConfig.headers,
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
    })
}

function addCardRequest(cardInfo) {
    const newPromise = new Promise((resolve, reject) => {
        fetch(fetchConfig.baseURL + '/cards', {
            method: 'POST',
            headers: fetchConfig.headers,
            body: JSON.stringify(cardInfo)
        })
        .then((res) => {
            if (res.ok) {
                resolve(res.json())
            } else {
                reject(`Ошибка: ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
    return newPromise
}

function saveAvatarRequest(newPhoto) {
    const profilePhotoPromise = new Promise((resolve, reject) => {
        fetch(fetchConfig.baseURL + '/users/me/avatar', {
            method: 'PATCH',
            headers: fetchConfig.headers,
            body: JSON.stringify({
                avatar: newPhoto
            })
        })
        .then((res) => {
            if (res.ok) {
                resolve(res.json())
            } else {
                reject(`Ошибка: ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
    return profilePhotoPromise
}

function likeCardRequest(cardId, method) {
    const likePromise = new Promise((resolve, reject) => {
        fetch(fetchConfig.baseURL + '/cards/likes/' + cardId, {
            method: method,
            headers: fetchConfig.headers
        })
        .then((res) => {
            if (res.ok) {
                resolve(res.json())
            } else {
                reject(`Ошибка: ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return likePromise
}

function deleteCardRequest(cardId) {
    return fetch(fetchConfig.baseURL + '/cards/' + cardId, {
        method: 'DELETE',
        headers: fetchConfig.headers
        })
}


export { profileInfoPromise, cardsInfoPromise, saveProfileRequest, addCardRequest, saveAvatarRequest, likeCardRequest, deleteCardRequest }