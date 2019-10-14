function create_tables() {

    let glance_header = ['Party', 'Number of Reps', '% Voted with Prty'];
    let glance_rows = ['Democrats', 'Republicans', 'Independents', 'Total'];

    function create_glance_table() {
        let body = document.getElementById('glance_tab');
        let table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered table-hover');
        table.setAttribute('id', 'tab1');
        body.appendChild(table);
    };

    function glance_table_header() {
        let thead = document.createElement("thead");
        let row = document.createElement("tr");
        for (var i = 0, e = glance_header.length; i < e; i++) {
            let table_glance_header = document.createElement('th');
            table_glance_header.setAttribute('class', 'text-center');
            table_glance_header.innerHTML = glance_header[i];
            row.append(table_glance_header);
        }

        thead.append(row);
        document.getElementById('tab1').appendChild(thead);
    };

    function glance_tab() {
        let table = document.getElementById('tab1');
        let body = document.createElement('tbody');
        table.append(body);
        for (var i = glance_rows.length - 1; i >= 0; i--) {
            let row = body.insertRow(glance_rows[i]);
            let data = row.insertCell(glance_rows[i]);
            row.setAttribute('id', glance_rows[i]);
            data.innerHTML = glance_rows[i];

        }
        let d = document.getElementById('Democrats')
        let d1 = d.insertCell(1);
        let d2 = d.insertCell(2);
        d1.innerHTML = stats["Number of Democrats"];
        d2.innerHTML = stats["Democrats average votes with their party"].toFixed(2) + '%';
        let r = document.getElementById('Republicans')
        let r1 = r.insertCell(1);
        let r2 = r.insertCell(2);
        r1.innerHTML = stats["Number of Republicans"];
        r2.innerHTML = stats["Republicans average votes with their party"].toFixed(2) + '%';
        let id = document.getElementById('Independents');
        let id1 = id.insertCell(1)
        let id2 = id.insertCell(2)
        id1.innerHTML = stats["Number of Independents"];
        id2.innerHTML = stats["Independents average votes with their party"].toFixed(2) + '%';
        let tot = document.getElementById('Total');
        let tot1 = tot.insertCell(1)
        let tot2 = tot.insertCell(2)
        tot1.innerHTML = total_members
        tot2.innerHTML = totalAvg.toFixed(2) + '%';
    };
    create_glance_table();
    glance_table_header();
    glance_tab();
};
create_tables()

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
let sorted = members.sort(sortMembers);
let topTen = (sorted.length * 10 / 100)

function lessMissedVotes(arr) {
    let body = document.getElementById('tab2');
    let tbody = document.createElement('tbody');
    for (var i = 0; i < topTen; i++) {


        let row = document.createElement('tr');
        let name = document.createElement('td');
        let missed_votes = document.createElement('td');
        let missed_pct = document.createElement('td')

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        missed_votes.innerHTML = arr[i].missed_votes;
        missed_pct.innerHTML = arr[i].missed_votes_pct + '%';
        row.append(name, missed_votes, missed_pct)
        tbody.append(row);
        if (arr[11].missed_votes_pct === arr[i].missed_votes_pct) {
            topTen++;
        }
    }
    body.append(tbody)

};
lessMissedVotes(sorted);

function topMissedVotes(arr) {
    let body = document.getElementById('at_tab');
    let tbody = document.createElement('tbody');
    for (var i = 0; i < topTen; i++) {


        let row = document.createElement('tr');
        let name = document.createElement('td');
        let missed_votes = document.createElement('td');
        let missed_pct = document.createElement('td')

        name.innerHTML = '<a target="_blank" href="' + arr[i].url + '">' +
            arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ') +
            '</a>';
        missed_votes.innerHTML = arr[i].missed_votes;
        missed_pct.innerHTML = arr[i].missed_votes_pct + '%';
        row.append(name, missed_votes, missed_pct)
        tbody.append(row);

        if (arr[11].missed_votes_pct === arr[i].missed_votes_pct) {
            topTen++;
        }
    }
    body.append(tbody)

};

topMissedVotes(sorted.reverse());