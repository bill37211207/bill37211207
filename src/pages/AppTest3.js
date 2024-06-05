export function FuncDate() 
{
    var d = new Date();
    var full = d.getMonth + 1; // getMonth returns 0 - 11
    full += "/" + d.getDate;
    full += "/" + d.getFullYear;
    document.getElementById("id1").innerHTML = full;
}