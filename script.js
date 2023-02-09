
const popup = document.querySelector(".popup");
const wifiicon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupdesc = document.querySelector(".desc");
const reconnectbtn = document.querySelector(".reconnect");
const container = document.querySelector(".container");
const olstatus = document.querySelector(".status h2 ");

let isOnline =true, intervalId,timer=10;
const check_connection = async ()=>{
    olstatus.innerHTML = `Status: <b>Online</b>`;
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        //200 and 300, the network connection is considered online
        isOnline = response.status >=200 && response.status <300;
    } catch (error) {
        isOnline=false;
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status)=>{
    if(status){
        wifiicon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupdesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        container.classList.add("show");
        

        return setTimeout(()=>popup.classList.remove("show"),2000);
    }
    wifiicon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupdesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds"
    popup.className = "popup show"
    container.classList.add("offline")
    container.classList.remove("show")
    
    // popup.classList.add("show")
    intervalId = setInterval(() => {
        timer--;
        if(timer === 0 ) check_connection();
        popup.querySelector(".desc b").innerText = timer;

    },1000)
}

setInterval(() => isOnline && check_connection(),3000);
reconnectbtn.addEventListener("click", check_connection);