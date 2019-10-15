let senat_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let senat_members = data.results[0].members;
let checkboxFilter = [];
let rep = document.getElementById("Republican");
let dem = document.getElementById("Democrat");
let ind = document.getElementById("Independent");

function create_senate_table() {
    let body = document.getElementById('tab');
    let table_senat = document.createElement('table');
    table_senat.setAttribute('class', 'table table-bordered table-hover');
    table_senat.setAttribute('id', 'senat_tab');
    body.appendChild(table_senat);
};
create_senate_table();


function tab_senate_members(arr) {
    function table_senat_header(header) {
        senat_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
        let thead = document.createElement("thead");
        let row = document.createElement("tr");
        for (var i = 0, e = header.length; i < e; i++) {
            let table_senat_header = document.createElement('th');
            table_senat_header.setAttribute('class', 'text-center');
            table_senat_header.innerHTML = header[i];
            row.append(table_senat_header);
        }

        thead.append(row);
        document.getElementById('senat_tab').appendChild(thead);
    }

    let body = document.getElementById('senat_tab');
    body.innerHTML = "";
    table_senat_header(senat_table_header)
    let tbody = document.createElement("tbody");

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




function filter(obj) {
    checkboxFilter = [];


    for (var i = 0; i < obj.length; i++) {

        if (rep.checked && obj[i].party == 'R') {
            checkboxFilter.push(obj[i]);

        } else if (dem.checked && obj[i].party == 'D') {
            checkboxFilter.push(obj[i]);

        } else if (ind.checked && obj[i].party == 'I') {
            checkboxFilter.push(obj[i]);

        }
    }
    if (rep.checked != true && dem.checked != true && ind.checked != true) {
        function msg() {
            senat_table_header = [];
            let empty = document.getElementById('senat_tab');
            empty.innerHTML = ""
            let m = document.getElementById('message');
            m.setAttribute("class", "alert text-center alert-danger")
            m.innerHTML = "Please Select a Party"
        }
        msg();
    } else if (checkboxFilter.length === 0) {
        function NoResultMsg() {
            senat_table_header = [];
            let empty = document.getElementById('house_tab');
            empty.innerHTML = "";
            let m = document.getElementById('message');
            m.setAttribute("class", "alert text-center alert-warning")
            m.innerHTML = "No Matches found "
        }
        NoResultMsg();
    } else {
        function deleteMsg() {
            let m = document.getElementById('message')
            m.classList.remove("alert-danger");
            m.innerHTML = "";
        }
        deleteMsg();
    }
    tab_senate_members(checkboxFilter)

}


filter(senat_members)




rep.addEventListener('click', function () {
    filter(senat_members)

})
dem.addEventListener('click', function () {
    filter(senat_members)

})
ind.addEventListener('click', function () {
    filter(senat_members)

})