var container = document.getElementById('def');
var e = document.getElementById('error')

container.style.display = "none";


document.getElementById('submit').addEventListener('click', function (ele) {
    ele.preventDefault();
    var word = document.getElementById('word');
    if (word.value == "") {
        word.focus();
        e.style.display = "block";
        e.innerText = "Please Enter Word!!";
        setTimeout(function () {
            e.style.display = "none";
        }, 2000);

    } else {
        // console.log(word.value);
        def(word.value)
        word.value = ""
    }
});


function def(word) {
    var xhr = new XMLHttpRequest();
    let link = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

    xhr.open('GET', link, true)

    xhr.onload = function () {

        if (this.status == 200) {
            let data = JSON.parse(this.responseText);

            container.style.display = "block";
            document.getElementById('heading').style.display = "none";

            document.getElementById('title').innerText = "Word '" + word + "'";
            document.getElementById('title-origin').innerText = data[0].origin;

            var mean = data[0].meanings;

            var html = "";
            var syn = "";
            var ant = "";

            for (x in mean) {
                // console.log(mean[x]);
                html += `<div class="card text-white bg-danger mb-3 col" style="max-width: 18rem;">
                <div class="card-header bg-success"><h2>${(mean[x].partOfSpeech)}</h2></div>
                <div class="card-body">
                        <h5 class="card-title">Definitions</h5>
                        `;
                let defi = mean[x].definitions;
                for (p in defi) {
                    html += `
                        <p class="card-text">${defi[p].definition}</p>`;
                    //   console.log(defi[p]);
                    syn += defi[p].synonyms;
                    ant += defi[p].antonyms;
                }
                html += ` </div>
                </div>`;
            }
          

            document.getElementById('chits').innerHTML = html;

            if (syn.length > 0){
                document.getElementById('synon').style.display = "block";
                synfun(syn);
            }
            else 
                document.getElementById('synon').style.display = "none";
            if (ant.length > 0) 
                {
                    antfun(ant);
                    document.getElementById('anton').style.display = "block";
                }
            else
                document.getElementById('anton').style.display = "none";

        } else {
            document.getElementById('word').focus();
            e.style.display = "block";
            e.innerText = "Worng Word...Please Try Again!!";
            setTimeout(function () {
                e.style.display = "none";
            }, 2000);
        }

    }

    xhr.send()
}

function synfun(syn) {
    var synhtml = "";
    console.log(syn);
    var synarr = syn.split(',');

    for (let i = 0; i < synarr.length; i++) {
        synhtml += ` <li class="list-group-item text-white bg-danger">${synarr[i]}</li>
        `;
    }

    document.getElementById('sy').innerHTML = synhtml;
}


function antfun(ant) {
    var anthtml = "";
    console.log(ant);

    var antarr = ant.split(',');

    for (let i = 0; i < antarr.length; i++) {
        anthtml += ` <li class="list-group-item text-white bg-danger">${antarr[i]}</li>
        `;
    }

    document.getElementById('an').innerHTML = anthtml;
}
