"use strict"

const cards = [],
      modal = document.querySelector(".modal-overlay"),
      btnPlay = document.querySelector(".reset-game")

let clickedCard = "";
let prevClick;
let cardOpen = 0;

class Card  {
    constructor(parentSelector,imgUrl,altImg,attribute) {
        this.parent = document.querySelector(parentSelector);
        this.imgUrl = imgUrl;
        this.altImg = altImg;
        this.attribute = attribute;
    }

    createCard () {
        const element = document.createElement("div")
        element.classList.add("card")
        element.setAttribute("data-type",this.attribute)
        element.insertAdjacentHTML("afterbegin", `
            <div class="front"><img src=${this.imgUrl} alt=${this.altImg}></div>
            <div class="back"></div>
        `);
        cards.push(element);
    }
}

const getCard = async(url) => {
    const res = await fetch (url);
    if(!res.ok) { // Если произошла ошибка при запросе. У фетч есть св-во .ок-все хорошо == 200 и св-во .status
      throw new Error (`Could not feth${url}, status: ${res.status}`) //throw использ чтоб вывести ошибку из функции Promise rejected
    }
    return await res.json();
};

const init = async () => {
    const data = await getCard("./db.json");
    const arr = [...data["card"],...data["card"]]
    arr.forEach(obj => { 
        new Card(".container",obj.img,obj.alt,obj.attribute).createCard();// Предаем в карточки параметры из объектов которые с сервера
    });
    shuffle(cards);
    createCard();
    start();
    showCard();
}

init();

function createCard () {
    for(let i = 0; i < cards.length; i++) {
        document.querySelector(".container").append(cards[i])
    }
}

function start() {
    setTimeout(hiddenCard,5000)
};

function showCard() {
    cards.forEach(item => {
        item.addEventListener("click",(e) =>{
            item.firstElementChild.classList.remove("hiden");
            item.lastElementChild.classList.remove("hiden");

            if(item.hasAttribute("data-open")) return

            if(!clickedCard) {
                clickedCard = item.dataset.type;
                item.setAttribute("data-open",true);
                prevClick = item;     
            }else if(clickedCard === item.dataset.type ){
                prevClick.classList.add("open");
                item.classList.add("open")
                item.setAttribute("data-open",true);
                clickedCard = "";
                cardOpen++
            }else {
                setTimeout(hiddenCard,1000)
                clickedCard = "";
                prevClick.removeAttribute("data-open")  
                item.removeAttribute("data-open")         
            } 
            showModal();
        });
    });   
};

function hiddenCard() {
    cards.forEach(item => { 
        if(item.classList.length == 2) {
            return
        }else {
            item.firstElementChild.classList.add("hiden")
            item.lastElementChild.classList.add("hiden")
        }   
    });
};

function showModal () {
    if(cardOpen == cards.length/2) {
        modal.classList.remove("hide") 
    };
};

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

btnPlay.addEventListener("click",() => {
    modal.classList.add("hide");
    document.querySelector("#container").innerHTML = "";
    cards.length = 0;
    init();
})





