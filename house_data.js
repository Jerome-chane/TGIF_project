let house_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
let house_members = data.results[0].members;
let checkboxFilter = [];
let rep = document.getElementById("Republican");
let dem = document.getElementById("Democrat");
let ind = document.getElementById("Independent");


function create_house_table() {
    let body = document.getElementById('tab');
    let table_house = document.createElement('table');
    table_house.setAttribute('class', 'table table-bordered table-hover');
    table_house.setAttribute('id', 'house_tab');
    body.appendChild(table_house);

}
create_house_table();


function tab_house_members(arg) {
    function table_house_header(header) {
        house_table_header = ['Full Name', 'Party', 'State', 'Seniority (years)', 'Percentage'];
        let thead = document.createElement('thead');
        let row = document.createElement('tr');
        for (var i = 0, e = header.length; i < e; i++) {
            let table_house_header = document.createElement('th');
            table_house_header.setAttribute('class', 'text-center');
            table_house_header.innerHTML = header[i];
            row.append(table_house_header);
        }

        thead.append(row);
        document.getElementById('house_tab').appendChild(thead);
    }
    let body = document.getElementById('house_tab');
    body.innerHTML = "";
    table_house_header(house_table_header);

    let tbody = document.createElement('tbody');
    for (var i = 0, e = arg.length; i < e; i++) {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let state = document.createElement('td');
        let years = document.createElement('td');
        let votes = document.createElement('td');


        name.innerHTML = '<a target="_blank" href="' + arg[i].url + '">' +
            arg[i].last_name + ' ' + arg[i].first_name + ' ' + (arg[i].middle_name || ' ') +
            '</a>';
        party.innerHTML = arg[i].party;
        state.innerHTML = arg[i].state;
        years.innerHTML = arg[i].seniority || '';
        votes.innerHTML = arg[i].votes_with_party_pct + '%';

        row.append(name, party, state, years, votes);
        tbody.append(row)
    }
    body.append(tbody)
}
tab_house_members(house_members);



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
            house_table_header = [];
            let empty = document.getElementById('house_tab');
            empty.innerHTML = "";
            let m = document.getElementById('message');
            m.setAttribute("class", "alert text-center alert-danger")
            m.innerHTML = "Please Select a Party"
        }
        msg();
    } else if (checkboxFilter.length === 0) {
        function NoResultMsg() {
            house_table_header = [];
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
            m.classList.remove("alert-warning")
            m.innerHTML = "";
        }
        deleteMsg();
    }
    tab_house_members(checkboxFilter);

}


filter(house_members)




rep.addEventListener('click', function () {
    filter(house_members)

})
dem.addEventListener('click', function () {
    filter(house_members)

})
ind.addEventListener('click', function () {
    filter(house_members)

})