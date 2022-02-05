const main = document.getElementById("main");
const addUserBtn= document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");
const showBtn = document.getElementById("show-millionaires");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser(){
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    const user = data.results[0];
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random() * 10000000)
    };
    addData(newUser);
}

function doubleMoney(){
    data = data.map(user=>{
        return {...user, money: user.money *2};
    });
    updateDom();
}
function showMillionaires(){
    data = data.filter(item => item.money>1000000);
    updateDom();
}
function sort(){
    data = data.sort((a, b) => b.money - a.money);
    updateDom();
}
function calculateWelath(){
    const totalA = data.reduce((acc, item)=>(acc += item.money),0);
        const total = document.createElement("div");
        total.innerHTML=`<h3> Total Wealth: <strong>$ ${totalA}</strong></h3>`
        main.appendChild(total);
}
function addData(obj){
    data.push(obj);
    updateDom();
}

function updateDom(newdata = data){
    main.innerHTML="<h2><strong>Person</strong>Wealth</h2>"
    newdata.forEach(item=>{
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML =`<strong>${item.name}</strong> $ ${item.money}`
    main.appendChild(element);
    })

}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sort);
calculateBtn.addEventListener("click", calculateWelath);