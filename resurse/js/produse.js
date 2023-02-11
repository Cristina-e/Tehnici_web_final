window.addEventListener("load",  function(){
    function chToate() {
        if (document.getElementById("i_ch0").checked) {
            document.getElementById("i_ch1").checked = false;
            document.getElementById("i_ch2").checked = false;
            document.getElementById("i_ch3").checked = false;
            document.getElementById("i_ch4").checked = false;
            document.getElementById("i_ch5").checked = false;
            document.getElementById("i_ch6").checked = false;
            document.getElementById("i_ch7").checked = false;
        }
    }
    
    function chOrice() {
        if (document.getElementById("i_ch1").checked || document.getElementById("i_ch2").checked || document.getElementById("i_ch3").checked || document.getElementById("i_ch4").checked || document.getElementById("i_ch5").checked || document.getElementById("i_ch6").checked || document.getElementById("i_ch7").checked) {
            document.getElementById("i_ch0").checked = false;
        }
    }
    
    document.getElementById("i_ch1").onchange = chOrice;
    document.getElementById("i_ch2").onchange = chOrice;
    document.getElementById("i_ch3").onchange = chOrice;
    document.getElementById("i_ch4").onchange = chOrice;
    document.getElementById("i_ch5").onchange = chOrice;
    document.getElementById("i_ch6").onchange = chOrice;
    document.getElementById("i_ch7").onchange = chOrice;
    document.getElementById("i_ch0").onchange = chToate;
    document.getElementById("inp-nume").onchange=function(){
        condValidare=true;
        var inpNume=this.value.toLowerCase().trim();
        condValidare = condValidare && inpNume.match(new RegExp(/(\w)+(\\*)*(\w)+/));
        if (!condValidare){
            this.classList.add("is-invalid");
            document.getElementById("input-invalid-txt").style.display="block";
        }
        else if(this.classList.contains("is-invalid") && condValidare){
            this.classList.remove("is-invalid");
            document.getElementById("input-invalid-txt").style.display="none";
        }
    }
    
    document.getElementById("inp-pret").onchange=function(){
        console.log(this.value);
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }
    document.getElementById("inp-pret2").onchange=function(){
        console.log(this.value);
        document.getElementById("infoRange2").innerHTML=`(${this.value})`
    }
    document.getElementById("filtrare").onclick=function(){

        
        var inpLentile=document.querySelectorAll('input[name="gr_rad"]:checked');
        var checkedVal= [];
        inpLentile.forEach((checkbox) => {
            checkedVal.push(checkbox.value);
        });
        var inpCuloare= document.querySelectorAll('input[name="gr_ch"]:checked');
        var checkedVal2= [];
        inpCuloare.forEach((checkbox) => {
            checkedVal2.push(checkbox.value);
        });
        var selectedVal=[];
        for (let option of document.getElementById('inp-disponibil_magazin').options){
            if (option.selected){
                selectedVal.push(option.value);
            }
        }
        
        var inpDescriere = document.getElementById("inp-descriere").value;
        var text = inpDescriere.replace(/\s+/g, " ");
        var words = text.split(" ");
        var inpStoc = document.getElementById("inp-pe_stoc").value;
        var inpRange = parseInt(document.getElementById("inp-pret").value);
        var inpRange2 = parseInt(document.getElementById("inp-pret2").value);

        var lentile_inf=[];
        var lentile_sup=[];
        for(let i=0; i<checkedVal.length; i++){
            if(checkedVal[i] != 'toate'){
                var lentile_split = checkedVal[i].split(':');
                lentile_inf.push(parseFloat(lentile_split[0]));
                lentile_sup.push(parseFloat(lentile_split[1]));
            }
        }

        //verificare inputuri
        condValidare=true;
        var inpNume = document.getElementById("inp-nume").value.toLowerCase().trim();
        condValidare = condValidare && inpNume.match(new RegExp(/(\w)+(\\*)*(\w)+/));
        if (!condValidare){
            this.classList.add("is-invalid");
            document.getElementById("input-invalid-txt").style.display="block";
        }
        else if(this.classList.contains("is-invalid") && condValidare){
            this.classList.remove("is-invalid");
            document.getElementById("input-invalid-txt").style.display="none";
        }
            
            var fields = inpNume.split('*');

        var inpCategorie=document.getElementById("inp-producator").value;

        var produse=document.getElementsByClassName("produs");
        var contor_prod = 0;
        console.log(produse)

        for (let produs of produse){

            var cond1=false, cond2=false,cond3=false,cond4=false,cond5=false,cond6=false,cond7=false,cond8=false,cond9=false;
            produs.style.display="none";

            let nume= produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            if(!condValidare){
                cond1=cond2=cond3=cond4=cond5=cond6=cond7=cond8=cond9=true;
            }
            if(nume.includes(inpNume)&&!inpNume.includes("*")){
                cond1=true;
            }
            else if(inpNume.includes("*")){
                if (nume.startsWith(fields[0])&&nume.endsWith(fields[1])) {
                    cond1=true;
                }
            }
            let categorie= produs.getElementsByClassName("val-producator")[0].innerHTML;
            if(inpCategorie=="toate" || categorie==inpCategorie){
                cond2=true;
            }
            let lentila=parseFloat(produs.getElementsByClassName("val-latime_lentila")[0].innerHTML);
            for(let i=0; i<checkedVal.length; i++){
                if(checkedVal[i]=='toate' || (lentila >= lentile_inf[i] && lentila < lentile_sup[i])){
                    cond3=true;
                }
            }
            let pret= parseInt(produs.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret >= inpRange){
                cond4=true;
            }
            if(pret <= inpRange2){
                cond5=true;
            }
            let stoc= produs.getElementsByClassName("val-pe_stoc")[0].innerHTML;
            if(inpStoc=="" || inpStoc==stoc){
                cond6=true;
            }
            let culoare= produs.getElementsByClassName("val-categorie")[0].innerHTML;
            for(let i=0; i<checkedVal2.length; i++){
                
                if(checkedVal2[i]=='toate' || checkedVal2[i]==culoare){
                    cond7=true;
                }
            }
            let descriere= produs.getElementsByClassName("val-descriere")[0].innerHTML;
            for(let i=0; i<words.length; i++){
                if(descriere.toLowerCase().includes(words[i])){
                    cond8 = true;
                }
            }
            let magazin= produs.getElementsByClassName("val-disponibil_magazin")[0].innerHTML;
            for(let i=0; i<selectedVal.length; i++){
                if(selectedVal[i]=='toate' || (magazin.includes(selectedVal[i]))){
                    cond9=true;
                }
            }
            if(cond1 && cond2 && cond3 &&cond4&&cond5&&cond6&&cond7&&cond8&&cond9){
                produs.style.display="block";
                contor_prod++;
            }
        }
        if(contor_prod == 0){
            document.getElementById("fara-produse").style.display="block";
        }
        else{
            document.getElementById("fara-produse").style.display="none";
        }
    }

    document.getElementById("resetare").onclick=function(){
        //resteare produse
        var produse=document.getElementsByClassName("produs");
        for (let produs of produse){
            produs.style.display="block";
        }
        document.getElementById("fara-produse").style.display="none";
        document.getElementById("inp-nume").value="";
        for (let option of document.getElementById('inp-disponibil_magazin').options){
            if (option.selected){
                option.selected=false;
            }
        }
        //resetare filtre
        document.getElementById("sel-toate").selected=true;
        document.getElementById("sel-toate-magazin").selected=true;
        document.getElementById("inp-pret").value=0;
        document.getElementById("inp-descriere").value="";
        document.getElementById("inp-pe_stoc").value="";
        document.getElementById("i_ch0").checked = true;
        document.getElementById("i_ch1").checked = false;
        document.getElementById("i_ch2").checked = false;
        document.getElementById("i_ch3").checked = false;
        document.getElementById("i_ch4").checked = false;
        document.getElementById("i_ch5").checked = false;
        document.getElementById("i_ch6").checked = false;
        document.getElementById("i_ch7").checked = false;
        document.getElementById("i_rad4").checked=true;
        document.getElementById("infoRange").innerHTML=`(0)`;
        document.getElementById("infoRange2").innerHTML=`(0)`;
    }
    
    function sorteaza(semn){
        var produse=document.getElementsByClassName("produs");
        var v_produse=Array.from(produse);

        v_produse.sort(function(a,b){
            var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
            var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
            if(nume_a==nume_b){
                var descriere_a=parseFloat(a.getElementsByClassName("val-descriere")[0].innerHTML.length);
                var descriere_b=parseFloat(b.getElementsByClassName("val-descriere")[0].innerHTML.length);
                    
                return (descriere_a-descriere_b)*semn;
            }
            return semn*nume_a.localeCompare(nume_b);
        })
        for (let produs of v_produse){
            produs.parentNode.appendChild(produs);
        }       
    }

    document.getElementById("sortCrescNume").onclick=function(){
        sorteaza(1);
    }
    document.getElementById("sortDescrescNume").onclick=function(){
        sorteaza(-1);
    }
    document.getElementById("calculare").onclick=function(){
        var produse=document.getElementsByClassName("produs");
        let suma=0;
        for(let prod of produse){
            if (prod.style.display!="none")
                suma+=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML)
        }
        if (!document.getElementById("rezultat")){
            rezultat=document.createElement("p");
            rezultat.id="rezultat";
            rezultat.innerHTML="Pret total produse afisate: "+suma+" ron";
    

            var ps=document.getElementById("p-suma");
            ps.parentNode.insertBefore(rezultat,ps.nextSibling);
            rezultat.onclick= function(){
                this.remove();
            }
            setTimeout(function (){
                document.getElementById("rezultat").remove();
            }, 2000);
        }
    }
    
    
    var produse=document.getElementsByClassName("produs");
    var v_produse=Array.from(produse);
    var zile=["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
    var luni=["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
    for(i=0; i<v_produse.length; i++){
        var data = new Date(document.getElementsByClassName("val-data_adaugare")[i].innerHTML);
        var data_formatata = data_formatata =  data.getDate() + "/" + luni[data.getMonth()] + "/" + data.getFullYear()+"("+zile[data.getDay()]+")";
        document.getElementsByClassName("val-data_adaugare")[i].innerHTML = data_formatata;
        if(document.getElementsByClassName("val-pe_stoc")[i].innerHTML == "true"){
            document.getElementsByClassName("val-pe_stoc")[i].innerHTML = "Da";
        }
        else{
            document.getElementsByClassName("val-pe_stoc")[i].innerHTML = "Nu";
        }
    }
});