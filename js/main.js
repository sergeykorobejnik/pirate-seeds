function selector(className) {
    return document.querySelector(className);
}
function selectorAll(className) {
    return document.querySelectorAll(className);
}


let elemList = {
    cardArr: selectorAll('.card .card__buy-btn'),
    popupArr: selectorAll('.card-popup'),
    bodyOverlay: selector('.body-overlay'),
    loginpopup: selector('.order-popup'),
    className: 'card-popup_active'
}



function showPopup (cardArr, popupArr, bodyOverlay, loginPopup, className) {
    //Option is boolean: true -> addClass, false -> removeClass
    const swapClass = (element, className, option) => {
        option ?
            element.classList.add(className) :
            element.classList.remove(className)
    }
    let composedArr = [];
    for (let index = 0; index < cardArr.length; index++) {
        composedArr[index] = {
            card: cardArr[index],
            popup: popupArr[index],
        }
    }

    composedArr.forEach(element => {
        element.card.addEventListener('click', function (e) {
            e = e.target
            swapClass(bodyOverlay, 'body-overlay_active', true)
            swapClass(element.popup, className, true)
        })
        element.popup.addEventListener('click', (e) => {
            e = e.target
            if (e.classList.contains('card-popup__close-icon')) {
                swapClass(bodyOverlay, 'body-overlay_active', false)
                swapClass(element.popup, className, false)
            }
            if (e.classList.contains('card__buy-btn')) {
                swapClass(element.popup, className, false)
                swapClass(loginPopup, 'order-popup_active', true)
            }
        })
    })


    loginPopup.addEventListener('click', (e) => {
        e = e.target

        if (e.classList.contains('card-popup__close-icon')) {
            swapClass(bodyOverlay, 'body-overlay_active', false)
            swapClass(loginPopup, 'order-popup_active', false)
        }

    })
    selector('.body-overlay').addEventListener('click', function () {

        [bodyOverlay, loginPopup, ...popupArr].forEach(element => {
            if (element.classList.length > 1) element.classList.remove(element.classList[element.classList.length - 1])
        })
    })
}
showPopup(elemList.cardArr, elemList.popupArr, document.body, elemList.loginpopup , elemList.className)
