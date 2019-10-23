// Variables for Attendence and Party Loyalty pages
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
let data;
let members;
let sorted;
// Variables for congress 113 pages
let link;
let header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];


// This define which link will be sen to the fetch
if (window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/senate_attendence.html" || window.location.pathname == "/senate.html") { // loyal_n_attendence IF
    link = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/house.html") {
    link = "https://api.propublica.org/congress/v1/113/house/members.json";
};


// This run the loaders or other funtion needed bebore fetch
if (window.location.pathname == "/house.html" || window.location.pathname == "/senate.html") {
    loader() // For senat and house congress 113
} else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/senate_attendence.html") {
    multiLoader();
    hideGlanceTab() // For attendence and loyalty pages
} else {
    readMoreOrLess() // home page
}

// ---------------------//

fetch(link, {
        headers: {
            "X-API-Key": "kwpzZtXi0XIKTNGLteY8NHvhMzNgxETsg9Lw0SAH"
        },
        // method: 'GET' // optional in this case
    })
    .then(response => response.json())
    .then(newData => {
        data = newData;
        members = data.results[0].members;
        init();
    })
    .catch((error) => console.log(`Oops, Error`, error.message));

// ---------------------//

function init() {
    if (window.location.pathname == "/house.html" || window.location.pathname == "/senate.html") {
        deleteLoader() // For senat and house congress 113
        let filtered = stateFilter(members)
        create_table();
        filter(members);
        createSelect(filtered);

    } else if (window.location.pathname == "/house_loyalty.html" || window.location.pathname == "/senate_loyalty.html" || window.location.pathname == "/house_attendance.html" || window.location.pathname == "/senate_attendence.html") {
        deleteMultiLoader() // For attendence and loyalty pages
        count(members);
        glance_tab()

        let tab1 = document.getElementById('tab1');
        let tab2 = document.getElementById('tab2');
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
}



// Functions for attendence and loyalty pages
function count(obj) {
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
    let topTen = function () {
        let a = []
        for (var i = 0; i < (sorted.length * 10 / 100); i++) {
            a.push(sorted[i]);
        }
        return a;
    };
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

function multiLoader() {
    let loader = document.getElementById('load');
    let loader2 = document.getElementById('load2');
    let loader3 = document.getElementById('load3');
    loader.setAttribute('class', 'loader');
    loader2.setAttribute('class', 'loader');
    loader3.setAttribute('class', 'loader');
}

function deleteMultiLoader() {
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

function showGlanceTab() {
    let tab = document.getElementById('hide');
    tab.style.visibility = "visible";
}

//  Functions for Congress 113 pages
function create_table() {

    let body = document.getElementById('tab');
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered table-hover');
    table.setAttribute('id', 'new_tab');
    body.appendChild(table);

}

function fill_table(arr, head) {

    header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
    let body = document.getElementById('new_tab');
    body.innerHTML = "";
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");
    let row = document.createElement("tr");

    for (var i = 0; i < head.length; i++) {
        let th = document.createElement('th');
        th.setAttribute('class', 'text-center');
        th.innerHTML = head[i];
        row.append(th);
    }
    thead.append(row);
    document.getElementById('new_tab').appendChild(thead);

    for (var i = 0; i < arr.length; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        party.innerHTML = arr[i].party;
        state.innerHTML = arr[i].state;
        years.innerHTML = arr[i].seniority;
        votes.innerHTML = arr[i].votes_with_party_pct + '%';
        row.append(name, party, state, years, votes)
        tbody.append(row);

    }
    body.appendChild(tbody)
};

function msg(arg, cl) {
    header = [];
    let empty = document.getElementById('new_tab');
    empty.innerHTML = ""
    let m = document.getElementById('message');
    m.setAttribute("class", cl);
    m.innerHTML = arg;
}

function deleteMsg() {
    let m = document.getElementById('message')
    m.classList.remove("alert-danger");
    m.classList.remove("alert-warning")
    m.innerHTML = "";
}

function stateFilter(arg) {
    let allStates = [];
    for (let i = 0; i < arg.length; i++) {
        allStates.push(arg[i].state)
    }
    let setStates = new Set(allStates);
    let states = [...setStates];
    return states;
}

function createSelect(arg) {
    let statesNames = {
        AL: "Alabama",
        AS: "American Samoa",
        AK: "Alaska",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DC: "Dist. of Columbia",
        DE: "Delaware",
        FL: "Florida",
        GA: "Georgia",
        GU: "Guam",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MP: "Mariana Islands",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        PR: "Porto Rico",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VI: "Virgin Islands",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wiscosi",
        WY: "Wyoming"
    };
    let select = document.getElementById("mylist");
    for (let i = 0; i < arg.length; i++) {
        let option = document.createElement("option");
        for (let [key, value] of Object.entries(statesNames)) {
            if ([key] == arg[i]) {
                option.innerHTML = [value];
            }
        }
        option.setAttribute("value", arg[i]);
        select.add(option);
    };
};

function filter(obj) {
    let noMatch = "No Match found";
    let noResult = "Please Select a Party";
    let cl1 = "alert text-center alert-danger";
    let cl2 = "alert text-center alert-warning";
    let rep = document.getElementById("Republican");
    let dem = document.getElementById("Democrat");
    let ind = document.getElementById("Independent");
    let dropFilter = document.getElementById("mylist");

    rep.addEventListener('click', () => filter(members));
    dem.addEventListener('click', () => filter(members));
    ind.addEventListener('click', () => filter(members));
    dropFilter.addEventListener('change', () => filter(members));
    let checkboxFilter = [];
    let listVal = document.getElementById("mylist").value
    for (let i = 0; i < obj.length; i++) {

        if (listVal === obj[i].state || listVal === "all") {
            if (rep.checked && obj[i].party == 'R') {
                checkboxFilter.push(obj[i]);
            } else if (dem.checked && obj[i].party == 'D') {
                checkboxFilter.push(obj[i]);
            } else if (ind.checked && obj[i].party == 'I') {
                checkboxFilter.push(obj[i]);
            };
        }
    };
    if (rep.checked != true && dem.checked != true && ind.checked != true) {
        msg(noResult, cl1);
    } else if (checkboxFilter.length === 0) {
        msg(noMatch, cl2);
    } else {
        deleteMsg();
    }
    fill_table(checkboxFilter, header)
}

function loader() {
    let loader = document.getElementById('load');
    loader.setAttribute('class', 'loader');

}

function deleteLoader() {
    let loader = document.getElementById('load');
    loader.classList.remove('loader');
}

// home page function Read More-Less button
function readMoreOrLess() {
    document.getElementById("butt").addEventListener("click", function () {
        let butt_txt = document.getElementById('butt');
        if (butt_txt.innerHTML === "Read Less") {
            butt_txt.innerHTML = "Read More";
        } else {
            butt_txt.innerHTML = "Read Less";
        }
    });
}