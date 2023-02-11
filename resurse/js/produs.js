function produs_load_handler()
{
    var pe_stoc = document.getElementsByClassName("pe_stoc")[0];
    var data_adaugare = document.getElementsByClassName("data_adaugare")[0];

    var zile=["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
    var luni=["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

    var data = new Date(data_adaugare.innerHTML);
    var data_formatata =  data.getDate() + "/" + luni[data.getMonth()] + "/" + data.getFullYear()+"("+zile[data.getDay()]+")";
    data_adaugare.innerHTML = data_formatata;
    if(pe_stoc.innerHTML == "true"){
        pe_stoc.innerHTML = "Da";
    } 
    else{
        pe_stoc.innerHTML = "Nu";
    }
}
window.onload = produs_load_handler;
   