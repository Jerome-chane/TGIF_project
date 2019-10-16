let tab1 = document.getElementById('tab1');
let tab2 = document.getElementById('tab2');

function glance_tab() {
    let r1 = document.getElementById('r1')
    let r2 = document.getElementById('r2')
    let d1 = document.getElementById('d1')
    let d2 = document.getElementById('d2')
    let i1 = document.getElementById('i1')
    let i2 = document.getElementById('i2')
    let t1 = document.getElementById('t1')
    let t2 = document.getElementById('t2')
    r1.innerHTML = republicans.length
    r2.innerHTML = stats["Republicans average votes with their party"].toFixed(2) + '%';
    d1.innerHTML = democrats.length
    d2.innerHTML = stats["Democrats average votes with their party"].toFixed(2) + '%';
    i1.innerHTML = independents.length
    i2.innerHTML = '0.00' + "%"
    t1.innerHTML = total_members
    t2.innerHTML = totalAvg.toFixed(2) + "%";

}
glance_tab()


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
let sorted;
let topTen = function () {
    let a = []
    for (var i = 0; i < (sorted.length * 10 / 100); i++) {
        a.push(sorted[i]);
    }
    return a;
};

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