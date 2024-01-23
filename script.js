const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn=document.querySelector(".search-btn");
let result=document.querySelector(".main-body");
let sound=document.querySelector("#sound");

btn.addEventListener('click',()=>{
    let inpword=document.querySelector("#input-word").value;
    fetch(`${url}${inpword}`)
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        result.innerHTML=`
        <div class="top-body">
            <h3 class="result">${inpword}</h3>
            <button onClick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
            <p class="partofspeech">${data[0].meanings[0].partOfSpeech}</p>
            <p class="pronounce">${data[0].phonetics[1].text}</p>
        </div>
        <div class="bottom-body">
            <div class="meaning">${data[0].meanings[0].definitions[0].definition}</div>
            <div class="sentence">${data[0].meanings[0].definitions[0].example || " "}</div>
        </div>`;
        sound.setAttribute("src", `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Sorry!! The word was not found.</h3>`;
    });

});

function playSound(){
    sound.play();
}