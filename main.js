// document.getElementById("senate_data").innerHTML = JSON.stringify(data, null, 2);

let table_header = ['Full Name', 'Party', 'State', 'Seniority', 'Percentage'];

let members = data.results[0].members;


function senate_table(tab_th) {

    let table_senat = document.createElement('table');
    table_senat.setAttribute('id', 'senat_tab');
    document.body.appendChild(table_senat);

    let table_senat_header = function () {
        for (var i = 0, e = tab_th.length; i < e; i++) {
            let table_senat_header = document.createElement('th');
            table_senat_header.setAttribute('id', 'senat_tab_header');
            table_senat_header.setAttribute('class', 'table');
            table_senat_header.innerHTML = tab_th[i];

            document.getElementById('senat_tab').appendChild(table_senat_header);
            table_senat.appendChild(table_senat_header);
        }
    }
    table_senat_header();

};


senate_table(table_header);

function table_members(arr) {
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

table_members(members);