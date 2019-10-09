document.getElementById("butt").addEventListener("click", function () {
    let butt_txt = document.getElementById('butt');
    if (butt_txt.innerHTML === "Read Less") {
        butt_txt.innerHTML = "Read More";
    } else {
        butt_txt.innerHTML = "Read Less";
    }
});