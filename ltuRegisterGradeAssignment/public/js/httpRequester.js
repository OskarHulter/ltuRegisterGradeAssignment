const provtillfalleContainer = document.getElementById("provtillfallen-info");
const btn = document.getElementById("btn");
const form = document.getElementById("betyg-form");
const betygResultat = document.getElementById("betyg-resultat");

btn.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:4000/api/provtillfallen", true);
    request.onload = function () {
        let responseData = JSON.parse(request.responseText);
        renderHTML(responseData);
    };
    request.send();
});

form.onsubmit = function(e) {
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
}

function renderHTML(data) {
    let htmlString = "";

    for (i = 0; i < data.length; i++) {
        if (data[i].betygsatt === false) {
        htmlString += "<p>" +
        data[i]._id + " " +
        data[i].prov.provKod + " " +
        data[i].student.namn + " " +
        data[i].student.pnr + " " +
        data[i].student.studentId + " " +
        data[i].kurs.kursKod + " " +
        data[i].kurs.namn + ".</p>";
        }
    }

    provtillfalleContainer.insertAdjacentHTML('beforeend', htmlString);
};