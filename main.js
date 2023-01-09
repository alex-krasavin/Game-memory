"use strict"

class Game {
    constructor(parentSelector,imgUrl,altImg,attribute) {
        this.parent = document.querySelector(parentSelector);
        this.imgUrl = imgUrl;
        this.altImg = altImg;
        this.attribute = attribute;
    }

    startGame() {
        let prevClick;
        let cardOpen = 0;
        let clickedCard = "";
        const modal = document.querySelector(".modal-overlay");
    
        const element = document.createElement("div")
        element.classList.add("card")
        element.setAttribute("data-type",this.attribute)
        element.insertAdjacentHTML("afterbegin", `
        <div class="front"><img src=${this.imgUrl} alt=${this.altImg}></div>
        <div class="back"></div>
        `);
        cards.push(element);
        this.parent.append(element)


        console.log(cards)

        function showModal () {
            if(cardOpen == cards.length) {
                modal.classList.remove("hide") 
            };
        };

        function start() {
            setTimeout(hiddenCard,5000)
        };

        start();

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

        function showCard() {
            cards.forEach(item => {
                item.addEventListener("click",(e) =>{
                    item.firstElementChild.classList.remove("hiden");
                    item.lastElementChild.classList.remove("hiden");
                    if(!clickedCard) {
                        clickedCard = item.dataset.type;
                        prevClick = item;     
                    }else if(clickedCard === item.dataset.type){
                        prevClick.classList.add("open");
                        item.classList.add("open")
                        clickedCard = "";
                        cardOpen++
                    }else {
                        setTimeout(hiddenCard,1000)
                        clickedCard = "";         
                    } 
                    showModal();
                });
            });   
        };

        showCard();    
    };
};

// const getCard = async(url) => {
//     const res = await fetch (url);
//     if(!res.ok) { // Если произошла ошибка при запросе. У фетч есть св-во .ок-все хорошо == 200 и св-во .status
//       throw new Error (`Could not feth${url}, status: ${res.status}`) //throw использ чтоб вывести ошибку из функции Promise rejected
//     }
//     return await res.json();
// };

// getCard("./db.json") // Получили массив объектов из карточек
// .then(data => { 
//     console.log(data)
//   data["card"].forEach(obj => { // Проходимся по каждому объекту и вызываем метод startGame
//     new Game(".container",obj.img,obj.alt,obj.attribute).startGame();// Предаем в карточки параметры из объектов которые с сервера
//   });
// });


const cards = [],
      modal = document.querySelector(".modal-overlay")

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
        // this.parent.append(element)
    }
}

const getCard = async(url) => {
    const res = await fetch (url);
    if(!res.ok) { // Если произошла ошибка при запросе. У фетч есть св-во .ок-все хорошо == 200 и св-во .status
      throw new Error (`Could not feth${url}, status: ${res.status}`) //throw использ чтоб вывести ошибку из функции Promise rejected
    }
    return await res.json();
};

getCard("./db.json") // Получили массив объектов из карточек
.then(data => { 
    console.log(data)
  data["card"].forEach(obj => { // Проходимся по каждому объекту и вызываем метод startGame
    new Card(".container",obj.img,obj.alt,obj.attribute).createCard();// Предаем в карточки параметры из объектов которые с сервера
  });
})
.then(() => { 
    const cardsArr = [...cards,...cards]

    console.log(cardsArr)
    shuffle();
    createCard();
    start();
    showCard();

    function createCard () {
        for(let i = 0; i < cardsArr.length; i++) {
            document.querySelector(".container").append(cardsArr[i])
            console.log(cardsArr[i])
        }
    }
    
    function start() {
        setTimeout(hiddenCard,5000)
    };
    
    function showCard() {
        cardsArr.forEach(item => {
            item.addEventListener("click",(e) =>{
                item.firstElementChild.classList.remove("hiden");
                item.lastElementChild.classList.remove("hiden");
                if(!clickedCard) {
                    clickedCard = item.dataset.type;
                    prevClick = item;     
                }else if(clickedCard === item.dataset.type){
                    prevClick.classList.add("open");
                    item.classList.add("open")
                    clickedCard = "";
                    cardOpen++
                }else {
                    setTimeout(hiddenCard,1000)
                    clickedCard = "";         
                } 
                showModal();
            });
        });   
    };
    
    function hiddenCard() {
        cardsArr.forEach(item => { 
            if(item.classList.length == 2) {
                return
            }else {
                item.firstElementChild.classList.add("hiden")
                item.lastElementChild.classList.add("hiden")
            }   
        });
    };
    
    function showModal () {
        if(cardOpen == cardsArr.length/2) {
            modal.classList.remove("hide") 
        };
    };
    
    function shuffle() {
        return cardsArr.sort(() => Math.random() - 0.5);
    }

    // shuffle();
    // createCard();
    // start();
    // showCard();
});


// createCard();
// start();
// showCard();


// function createCard () {
//     for(let i = 0; i < cards.length; i++) {
//         document.querySelector(".container").append(cards[i])
//     }
// }

// function start() {
//     setTimeout(hiddenCard,5000)
// };

// function showCard() {
//     cards.forEach(item => {
//         console.log(item)
//         item.addEventListener("click",(e) =>{
//             item.firstElementChild.classList.remove("hiden");
//             item.lastElementChild.classList.remove("hiden");
//             if(!clickedCard) {
//                 clickedCard = item.dataset.type;
//                 prevClick = item;     
//             }else if(clickedCard === item.dataset.type){
//                 prevClick.classList.add("open");
//                 item.classList.add("open")
//                 clickedCard = "";
//                 cardOpen++
//             }else {
//                 setTimeout(hiddenCard,1000)
//                 clickedCard = "";         
//             } 
//             showModal();
//         });
//     });   
// };

// function hiddenCard() {
//     cards.forEach(item => { 
//         if(item.classList.length == 2) {
//             return
//         }else {
//             item.firstElementChild.classList.add("hiden")
//             item.lastElementChild.classList.add("hiden")
//         }   
//     });
// };

// function showModal () {
//     if(cardOpen == cards.length/2) {
//         modal.classList.remove("hide") 
//     };
// };

// function shuffle() {
//     return cards.sort(() => Math.random() - 0.5);
// }



