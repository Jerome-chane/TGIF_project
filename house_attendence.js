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