const sumbitButton = document.getElementById("sumbit");
const url = "http://tunetc.ddns.net/api/fmi_schedule/3/%D0%86%D0%9F%D0%97-31";
async function fetchHandler(){
    try{
        const response = await fetch(url);
        console.log(response);
    } catch (error){
        console.log(error);
    }
}
sumbitButton.addEventListener("click", function(){   
    fetchHandler();
});