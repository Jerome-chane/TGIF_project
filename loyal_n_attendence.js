const stats = {
    'total_members': 0,
    'totalAvg': 0,
    'democrats': [],
    'republicans': [],
    'independents': [],
    'sumDemVotes': 0,
    'sumRepVotes': 0,
    'sumIndVotes': 0,
    'Number of Democrats': 0,
    'Number of Republicans': 0,
    'Number of Independents': 0,
    'Democrats average votes with their party': 0,
    'Republicans average votes with their party': 0,
    'Independents average votes with their party': 0,

    'Members who most often vote with their party': 0,
    'Members who most often do not vote with their party': 0,
    'Members who missed the most votes': 0,
    'Members who have missed the least votes': 0,
};
let tab1 = document.getElementById('tab1');
let tab2 = document.getElementById('tab2');
let data;
let members;
let sorted;
let topTen = function () {
    let a = []
    for (var i = 0; i < (sorted.length * 10 / 100); i++) {
        a.push(sorted[i]);
    }
    return a;
};

if (window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/senate_attendence.html") {
    link = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/house_attendance.html") {
    link = "https://api.propublica.org/congress/v1/113/house/members.json";
};


fetch(link, {
        headers: {
            "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
        },
        method: 'GET'
    })
    .then(function (response) {

        return response.json();
    })
    .then((newData) => {
        data = newData;

        function init() {
            members = data.results[0].members;
            count(members);
            glance_tab()
            if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/senate_loyalty.html") {
                sorted = members.sort(sortMembers2);
                MissedVotes(sorted, tab1, {
                    total: "total_votes",
                    pct: "votes_with_party_pct"
                });

                MissedVotes(sorted.reverse(), tab2, {
                    total: "total_votes",
                    pct: "votes_with_party_pct"
                });
            } else if (window.location.pathname == "/house_attendance.html" || window.location.pathname == "/senate_attendence.html") {
                sorted = members.sort(sortMembers);
                MissedVotes(sorted, tab2, {
                    total: "missed_votes",
                    pct: "missed_votes_pct"
                });

                MissedVotes(sorted.reverse(), tab1, {
                    total: "missed_votes",
                    pct: "missed_votes_pct"
                });
                sorted = members.sort(sortMembers);
            }

        }
        init();
    })
    .catch((error) => console.log(`Oops, Error`, error.message));

loader()



function count(obj) {
    deleteLoader()
    showGlanceTab()
    for (var i = 0, e = obj.length; i < e; i++) {

        if (obj[i].party === 'R') {
            stats['republicans'].push(obj[i]);
            stats['sumRepVotes'] += obj[i].votes_with_party_pct;
        } else if (obj[i].party === 'D') {
            stats['democrats'].push(obj[i]);
            stats['sumDemVotes'] += obj[i].votes_with_party_pct;
        } else {
            stats['independents'].push(obj[i]);
            stats['sumIndVotes'] += obj[i].votes_with_party_pct;
        };
    }
    stats["Number of Democrats"] = stats['democrats'].length;
    stats["Number of Republicans"] = stats['republicans'].length;
    stats["Number of Independents"] = stats['independents'].length;
    stats["Democrats average votes with their party"] = stats['sumDemVotes'] / stats['democrats'].length;
    stats["Republicans average votes with their party"] = stats['sumRepVotes'] / stats['republicans'].length;
    stats['totalAvg'] = (stats['sumDemVotes'] + stats['sumIndVotes'] + stats['sumRepVotes']) / members.length;
    stats["Independents average votes with their party"] = stats['sumIndVotes'] / stats['independents'].length;
    stats['total_members'] = stats["Number of Democrats"] + stats["Number of Republicans"] + stats["Number of Independents"];
}

function glance_tab() {
    let r1 = document.getElementById('r1')
    let r2 = document.getElementById('r2')
    let d1 = document.getElementById('d1')
    let d2 = document.getElementById('d2')
    let i1 = document.getElementById('i1')
    let i2 = document.getElementById('i2')
    let t1 = document.getElementById('t1')
    let t2 = document.getElementById('t2')
    r1.innerHTML = stats['republicans'].length
    r2.innerHTML = stats["Republicans average votes with their party"].toFixed(2) + '%';
    d1.innerHTML = stats['democrats'].length
    d2.innerHTML = stats["Democrats average votes with their party"].toFixed(2) + '%';
    i1.innerHTML = stats['independents'].length
    i2.innerHTML = '0.00' + "%"
    t1.innerHTML = stats['total_members']
    t2.innerHTML = stats['totalAvg'].toFixed(2) + "%";

}

function sortMembers(a, b) {
    let missed = a.missed_votes_pct;
    let missed2 = b.missed_votes_pct;
    let comparaison = 0;

    if (missed > missed2) {
        comparaison = 1;
    } else if (missed < missed2) {
        comparaison = -1;
    }
    return comparaison;
}

function sortMembers2(a, b) {
    let missed = a.votes_with_party_pct;
    let missed2 = b.votes_with_party_pct;
    let comparaison = 0;

    if (missed > missed2) {
        comparaison = 1;
    } else if (missed < missed2) {
        comparaison = -1;
    }
    return comparaison;
}

function MissedVotes(members, tab, key) {
    let body = tab;
    let tbody = document.createElement('tbody');
    for (var i = 0; i < topTen().length; i++) {

        let row = document.createElement('tr');
        let name = document.createElement('td');
        let missed_votes = document.createElement('td');
        let missed_pct = document.createElement('td')

        name.innerHTML = '<a target="_blank" href="' + members[i].url + '">' +
            members[i].last_name + ' ' + members[i].first_name + ' ' + (members[i].middle_name || ' ') +
            '</a>';
        missed_votes.innerHTML = members[i][key.total];
        missed_pct.innerHTML = members[i][key.pct] + '%';
        row.append(name, missed_votes, missed_pct)
        tbody.append(row);
        if (members[topTen().length][key.pct] === members[i][key.pct]) {
            topTen().length += 1
        }
        body.append(tbody)

    };

}


function loader() {
    let loader = document.getElementById('load');
    let loader2 = document.getElementById('load2');
    let loader3 = document.getElementById('load3');
    loader.setAttribute('class', 'loader');
    loader2.setAttribute('class', 'loader');
    loader3.setAttribute('class', 'loader');

}

function deleteLoader() {
    let loader = document.getElementById('load');
    let loader2 = document.getElementById('load2');
    let loader3 = document.getElementById('load3');
    loader.classList.remove('loader');
    loader2.classList.remove('loader');
    loader3.classList.remove('loader');
}

function hideGlanceTab() {
    let tab = document.getElementById('hide');
    tab.style.visibility = "hidden";
}
hideGlanceTab()

function showGlanceTab() {
    let tab = document.getElementById('hide');
    tab.style.visibility = "visible";
}
document.getElementById("butt").addEventListener("click", function () {
    let butt_txt = document.getElementById('butt');
    if (butt_txt.innerHTML === "Read Less") {
        butt_txt.innerHTML = "Read More";
    } else {
        butt_txt.innerHTML = "Read Less";
    }
});