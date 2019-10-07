// document.getElementById("senate_data").innerHTML = JSON.stringify(data, null, 2);
let senat_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let senat_members = data.results[0].members;


function create_senate_table(header) {

    let table_senat = document.createElement('table');
    table_senat.setAttribute('id', 'senat_tab');
    document.body.appendChild(table_senat);

    let table_senat_header = function () {
        for (var i = 0, e = header.length; i < e; i++) {
            let table_senat_header = document.createElement('th');
            table_senat_header.setAttribute('id', 'senat_tab_header');
            table_senat_header.setAttribute('class', 'table');
            table_senat_header.innerHTML = header[i];

            document.getElementById('senat_tab').appendChild(table_senat_header);
            table_senat.appendChild(table_senat_header);
        }
    }
    table_senat_header();
};

create_senate_table(senat_table_header);

function tab_senate_members(arr) {
    let body = document.getElementById('senat_tab');

    for (var i = 0, e = arr.length; i < e; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');

        name.innerHTML = arr[i].last_name + ' ' + arr[i].first_name + ' ' + (arr[i].middle_name || ' ');
        party.innerHTML = arr[i].party;
        state.innerHTML = arr[i].state;
        years.innerHTML = arr[i].seniority;
        votes.innerHTML = arr[i].votes_with_party_pct + '%';

        row.append(name, party, state, years, votes)
        body.append(row);
    }
};

tab_senate_members(senat_members);