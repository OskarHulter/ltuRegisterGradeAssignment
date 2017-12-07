const provtillfalleContainer = document.getElementById("provtillfallen-info");
const btn = document.getElementById("btn");
const form = document.getElementById("betyg-form");
const betygResultat = document.getElementById("betyg-resultat");

form.onsubmit = function (e) {
    e.preventDefault();
    let provtillfalleId = form.provTillfalleId.value;
    let putUrl = "http://localhost:4000/api/provtillfallen/" + provtillfalleId;
    let betyg = form.rbGrades.value;
    let betygsatt = true;

    let betygRequest = new XMLHttpRequest();
    betygRequest.open('PUT', putUrl, true);
    betygRequest.setRequestHeader('Content-Type', 'application/json');
    betygRequest.onload = function () {
        if (betygRequest.status === 200) {
            let userInfo = JSON.parse(betygRequest.responseText);
        }
    };
    betygRequest.send(JSON.stringify({
        "betyg": betyg,
        "betygsatt": betygsatt
    }));

    betygResultat.innerHTML = 'Du gav ett betyg!' + form.rbGrades.value;
    form.reset();
    getProvListaUtanBetyg();
}

btn.addEventListener("click", function () {
    getProvListaUtanBetyg();
});

function getProvListaUtanBetyg() {
    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:4000/api/provtillfallen", true);
    request.onload = function () {
        let responseData = JSON.parse(request.responseText);
        renderHTML(responseData);
    };
    request.send();
}

function renderHTML(data) {
    let htmlString = "";
    clearElement("provtillfallen-info");

    for (i = 0; i < data.length; i++) {
        if (data[i].betygsatt === false) {
            htmlString += "<p>" +
                data[i].student.studentId + " " +
                data[i].student.namn + " " +
                data[i].kurs.kursKod + " " +
                data[i].kurs.namn + " " +
                "Provkod:" + data[i].prov.provKod + " " +
                "<strong>Provtillfällets ID:</strong>" + data[i]._id + "</p>";
        }
    }
    provtillfalleContainer.insertAdjacentHTML('beforeend', htmlString);
};

function clearElement(elementId){
    document.getElementById(elementId).innerHTML = "";
}