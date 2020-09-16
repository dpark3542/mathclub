window.onload = function() {
    var xhttp  = new XMLHttpRequest();
    var xhttp2 = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // populate problems page
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var text = xhttp.responseText;
            var problems = JSON.parse(text);
            for (type in problems) {
                var list = document.getElementById(type);
                var i;
                for (i = 0; i < problems[type].length; i++) {
                    var name = problems[type][i].name
                    var nameClass = name.replace(/ /g, '-');
                    var date = problems[type][i].date
                    // add list item link to problem
                    list.innerHTML += "<li><a href=\"#" + nameClass + "\">" + name + "</a></li>";
                    var desc = document.getElementById("descriptions");
                    // create headers for problem
                    desc.innerHTML += "<article class=\"collapse\" id=\"" + nameClass + "\">";
                    desc.innerHTML += "<h3 class=text-center><strong>" + name + "</strong></h3>";
                    desc.innerHTML += "<h4 class=text-center>" + date + "</h4>";
                    var j;
                    // add problem, one paragraph at a time
                    for (j = 0; j < problems[type][i].text.length; j++) {
                        var par = problems[type][i].text[j].trim();
                        shouldP = par != "" && par[0] != '<';
                        if (shouldP)
                            desc.innerHTML += "<p>"
                            desc.innerHTML += par;
                        if (shouldP)
                            desc.innerHTML += "</p>";
                    }
                    // add image
                    var imgURL = problems[type][i].img;
                    if (imgURL != undefined && imgURL != "") {
                        desc.innerHTML += "<img src=\"" + imgURL + "\" class=\"img-responsive center-block\" alt=\"" + name + "\">";
                    }
                    desc.innerHTML += "</article><hr>";
                }
            }
        }
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    };

    xhttp2.onreadystatechange = function() {
        // populate leaderboard
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            var text = xhttp2.responseText;
            var scores = JSON.parse(text);
            scores.sort(function(a,b) {
                scoreDiff = b.score - a.score;
                if (scoreDiff != 0) return scoreDiff;
                return a.name.localeCompare(b.name);
            });
            var i;
            var leaderboard = document.getElementById('leaderboard');
            for (i = 0; i < scores.length; i++) {
                leaderboard.innerHTML += "<tr><td>" + scores[i].name + "</td><td>" + scores[i].score + "</td></tr>";
            }
        }
    };

    xhttp.open("GET", "https://dl.dropboxusercontent.com/s/wfec4tt7itnuu58/problems.json?dl=1", true);
    xhttp2.open("GET", "https://dl.dropboxusercontent.com/s/82io2ccrnw43e9w/leaderboard.json?dl=1", true);
    xhttp.send();
    xhttp2.send();
};