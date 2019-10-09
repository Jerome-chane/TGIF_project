let glance_header = ['Party', 'Number of Reps', '% Voted with Prty'];
let engaged_header = ['Name', 'Number of Missed Votes', '% Missed'];
let loyal_header = ['Name', 'No Party Votes', '% Party Votes'];
let senat_members = data.results[0].members;
let house_members = house_data.results[0].members;
let senate_stats = {
    'Number of Democrats': 0,
    'Number of Republicans': 0,
    'Number of Independents': 0,
    'Democrats average votes with their party': 0,
    'Republicans average votes with their party': 0,
    'Members who most often vote with their party': 0,
    'Members who most often do not vote with their party': 0,
    'Members who missed the most votes': 0,
    'Members who have missed the least votes': 0,
};
let democrats = [];
let republicans = [];
let independents = [];

function count(obj) {
    for (var i = 0, e = obj.length; i < e; i++) {
        if (obj[i].party === 'R') {
            republicans.push(obj[i]);
        } else if (obj[i].party === 'D') {
            democrats.push(obj[i]);
        } else {
            independents.push(obj[i])
        };
    }
}
count(senat_members);

function averageVotes(arg) {
    let count = 0;
    for (var i = 0, e = arg.length; i < e; i++) {
        count += arg[i].votes_with_party_pct;
        averageVotes = count / e;
    }
    return averageVotes;
};

let avgVoteDemocrats = function (arg) {
    let count = 0;
    let result;
    for (var i = 0, e = arg.length; i < e; i++) {
        count += arg[i].votes_with_party_pct;
        result = count / e;
    }
    return result;
};
let avgVoteRepublicans = function (arg) {
    let count = 0;
    let result;
    for (var i = 0, e = arg.length; i < e; i++) {
        count += arg[i].votes_with_party_pct;
        result = count / e;
    }
    return result;
};

senate_stats["Number of Democrats"] = democrats.length;
senate_stats["Number of Republicans"] = republicans.length;
senate_stats["Number of Independents"] = independents.length;
senate_stats["Democrats average votes with their party"] = avgVoteDemocrats(democrats);
senate_stats["Republicans average votes with their party"] = avgVoteRepublicans(republicans);

// console.log(senate_stats);

function create_tables() {

    function create_glance_table() {
        let body = document.getElementById('glance_tab');
        let table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered table-hover');
        table.setAttribute('id', 'tab1');
        body.appendChild(table);
    };

    function create_engaged_table() {
        let body = document.getElementById('engaged_tab');
        let table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered table-hover');
        table.setAttribute('id', 'tab2');
        body.appendChild(table);
    };

    function create_engaged_table2() {
        let body = document.getElementById('engaged_tab2');
        let table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered table-hover');
        table.setAttribute('id', 'tab3');
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
    }

    function engaged_table_header() {
        let thead = document.createElement("thead");
        let row = document.createElement("tr");
        for (var i = 0, e = engaged_header.length; i < e; i++) {
            let table_engaged_header = document.createElement('th');
            table_engaged_header.setAttribute('class', 'text-center');
            table_engaged_header.innerHTML = engaged_header[i];
            row.append(table_engaged_header);
        }

        thead.append(row);
        document.getElementById('tab2').appendChild(thead);
    }

    function engaged_table2_header() {
        let thead = document.createElement("thead");
        let row = document.createElement("tr");
        for (var i = 0, e = engaged_header.length; i < e; i++) {
            let table_engaged_header = document.createElement('th');
            table_engaged_header.setAttribute('class', 'text-center');
            table_engaged_header.innerHTML = engaged_header[i];
            row.append(table_engaged_header);
        }

        thead.append(row);
        document.getElementById('tab3').appendChild(thead);
    }
    create_glance_table();
    create_engaged_table();
    create_engaged_table2();
    glance_table_header();
    engaged_table_header();
    engaged_table2_header()

};
create_tables()


function glance() {
    let body = document.getElementById('tab1');
    let tbody = document.createElement('tbody');
    let democrats_row = document.createElement('tr');
    let democrats = document.createElement('td');
    democrats_row.append(democrats);
    let republicans_row = document.createElement('tr');
    let republicans = document.createElement('td');
    republicans_row.append(republicans);
    let independents_row = document.createElement('tr');
    let independents = document.createElement('td');
    independents_row.append(independents);
    let total_row = document.createElement('tr');
    let total = document.createElement('td');
    total_row.append(total);
    democrats.innerHTML = 'Democrats';
    republicans.innerHTML = 'Republicans';
    independents.innerHTML = 'Independents';
    total.innerHTML = 'Total';
    tbody.append(democrats_row, republicans_row, independents_row, total_row);
    body.append(tbody);


}
glance();