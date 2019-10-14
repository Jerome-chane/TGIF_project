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
    r2.innerHTML = Math.floor(stats["Republicans average votes with their party"]) + '%';
    d1.innerHTML = democrats.length
    d2.innerHTML = Math.floor(stats["Democrats average votes with their party"]) + '%';
    i1.innerHTML = independents.length
    i2.innerHTML = 0 + "%"
    t1.innerHTML = total_members
    t2.innerHTML = Math.floor((stats["Republicans average votes with their party"] + stats["Democrats average votes with their party"]) / 2) + "%";

}

glance_tab()

function sortMembers(a, b) {
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
let sorted = members.sort(sortMembers);
let topTen = (sorted.length * 10 / 100)

function lessMissedVotes(arr) {
    let body = document.getElementById('tab1');
    let tbody = document.createElement('tbody');
    for (var i = 0; i < topTen; i++) {
        if (arr[11].votes_with_party_pct === arr[i].votes_with_party_pct) {
            topTen++;
        }
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let tot_votes = document.createElement('td');
        let votes_pct = document.createElement('td')

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        tot_votes.innerHTML = arr[i].total_votes;
        votes_pct.innerHTML = arr[i].votes_with_party_pct + '%';
        row.append(name, tot_votes, votes_pct)
        tbody.append(row);
        if (arr[11].votes_with_party_pct === arr[i].votes_with_party_pct) {
            topTen++;
        }

    }
    body.append(tbody)

};

lessMissedVotes(sorted);

function topMissedVotes(arr) {
    let body = document.getElementById('tab2');
    let tbody = document.createElement('tbody');
    for (var i = 0; i < topTen; i++) {

        let row = document.createElement('tr');
        let name = document.createElement('td');
        let tot_votes = document.createElement('td');
        let votes_pct = document.createElement('td')

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        tot_votes.innerHTML = arr[i].total_votes;
        votes_pct.innerHTML = arr[i].votes_with_party_pct + '%';
        row.append(name, tot_votes, votes_pct)
        tbody.append(row);

        if (arr[11].votes_with_party_pct === arr[i].votes_with_party_pct) {
            topTen++;
        }
    }
    body.append(tbody)

};

topMissedVotes(sorted.reverse());