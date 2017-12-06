const provtillfalleContainer = document.getElementById("provtillfallen-info");
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:4000/api/provtillfallen", true);
    request.onload = function () {
        let responseData = JSON.parse(request.responseText);
        renderHTML(responseData);
    };
    request.send();
});

function renderHTML(data) {
    let htmlString = "";

    for (i = 0; i < data.length; i++) {
        if (data[i].betygsatt === false) {
        htmlString += "<p>" +
        data[i].datum + " " +
        data[i].student.namn + " " +
        data[i].student.pnr + " " +
        data[i].kurs.kursKod + " " +
        data[i].kurs.namn + ".</p>";
        }
    }

    provtillfalleContainer.insertAdjacentHTML('beforeend', htmlString);
};