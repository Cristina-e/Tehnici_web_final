const express= require("express");
const fs=require("fs");
const sharp=require("sharp");
app=express();
const sass=require("sass");
const {Client}=require("pg");
var cssBootstrap=sass.compile(__dirname+"/resurse/scss/customizare-bootstrap.scss",{sourceMap:true});
fs.writeFileSync(__dirname+"/resurse/css/biblioteci/customizare-bootstrap.css",cssBootstrap.css);

var client= new Client({database:"Magazin_ochelari",
    user:"cristina", 
    password:"cristina", 
    host:"localhost",
    port:5432});
client.connect();
client.query("select * from produse",function(err,rez){
    if(err)
        console.log(err);
    else
        console.log(rez);
})
obGlobal={
    erori:null,
    imagini:null,
    tipuri:null
}
app.set("view engine","ejs");
console.log("Cale proiect:", __dirname);
app.use("/resurse",express.static(__dirname+"/resurse"));

/*
app.get("/*", function(req, res, next){
    console.log("1111");
    //res.send("Ha ha ha!");
    res.write("123");
    next();
})*/
    client.query("select * from unnest(enum_range(null::tipuri_produse))", function(err, rezTip){
        if(err){
            console.log(err);
            renderError(res, 2);
        }
        else{
            obGlobal.tipuri=rezTip.rows;
        }
    });

app.use("/*", function(req, res, next){

    res.locals.tipuri=obGlobal.tipuri;
    next();//ca for-ul din select simplu in header.ejs
});
function createImages(){
    var continutFisier=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf8");
    //console.log(continutFisier);
    var obiect=JSON.parse(continutFisier)
    var dim_mediu=300;
    var dim_mic=150;
    obGlobal.imagini=obiect.imagini;
    obGlobal.imagini.forEach(function(elem){
        [numeFisier,extensie]=elem.fisier.split(".")
        if(!fs.existsSync(obiect.cale_galerie+"/mediu/")){
            fs.mkdirSync(obiect.cale_galerie+"/mediu/");
        }
        if(!fs.existsSync(obiect.cale_galerie+"/mic/")){
            fs.mkdirSync(obiect.cale_galerie+"/mic/");
        }
        elem.fisier_mediu=obiect.cale_galerie+"/mediu/"+numeFisier+".webp"
        elem.fisier_mic=obiect.cale_galerie+"/mic/"+numeFisier+".webp"
        elem.fisier=obiect.cale_galerie+"/"+elem.fisier;
        sharp(__dirname+"/"+elem.fisier).resize(dim_mediu).toFile(__dirname+"/"+elem.fisier_mediu)
        sharp(__dirname+"/"+elem.fisier).resize(dim_mic).toFile(__dirname+"/"+elem.fisier_mic)    })
    //console.log(obErori.erori);
}
createImages();

function createErrors(){
    var continutFisier=fs.readFileSync(__dirname+"/resurse/json/erori.json").toString("utf8");
    
    obGlobal.erori=JSON.parse(continutFisier);
    
}
createErrors();

function renderError(res, identificator, titlu, text, imagine){
    var eroare = obGlobal.erori.info_erori.find(function(elem){
        return elem.identificator==identificator;
    })
    titlu= titlu || (eroare && eroare.titlu) || obGlobal.erori.eroare_default.titlu;
    text= text || (eroare && eroare.text) || obGlobal.erori.eroare_default.text;
    imagine= imagine || (eroare && obGlobal.erori.cale_baza+"/"+eroare.imagine) || obGlobal.erori.cale_baza+"/"+obGlobal.erori.eroare_default.imagine;
    if(eroare && eroare.status){
        res.status(identificator).render("pagini/eroare", {titlu:titlu, text:text, imagine:imagine})
    }
    else{
        res.render("pagini/eroare", {titlu:titlu, text:text, imagine:imagine, tipuri:obGlobal.tipuri});
    }
}
app.get("/*.ejs",function(req,res){
    renderError(res,403);
})
app.get("/galerie", function(req, res){
    res.render('pagini/galerie', {imagini: obGlobal.imagini});
});


app.get(["/","/index","/home"],function(req, res){
    console.log("ceva");
    //res.sendFile(__dirname+ "/index.html");
    //res.write("nu stiu");
    //res.end();
    res.render("pagini/index", {ip: req.ip, imagini:obGlobal.imagini});
});
app.get("/produse",function(req, res){
    console.log(req.query);
    client.query("select distinct producator from produse", function(err, rezCateg){
        if(err){
            console.log(err);
            renderError(res, 2);
        }//rez salvat in obiect global
        else{
            continuareQuery=""
            if (req.query.tip)
                continuareQuery+=` and tip_produs='${req.query.tip}'`
            client.query("select * from produse where 1=1 " + continuareQuery , function(err, rez){
                if(err){
                    console.log(err);
                    renderError(res, 2);
                }
                else{
                    res.render("pagini/produse", {produse:rez.rows, optiuni:rezCateg.rows});
                }
            });
        }
    });
});

app.get("/produs/:id",function(req, res){
    console.log(req.params);
    client.query("select * from produse where id="+req.params.id, function(err, rez){
        if(err){
            console.log(err);
            renderError(res, 2);
        }
        else{
            res.render("pagini/produs", {prod:rez.rows[0], optiuni: []});
            console.log(rez);
        }
    });
});
app.get("/*",function(req, res){
    console.log("url:",req.url);
    //res.sendFile(__dirname+ "/index.html");
    //res.write("nu stiu");
    //res.end();
    res.render("pagini"+req.url, function(err,rezRandare){
        //console.log("Eroare", err);
        //console.log("Rezultat randare", rezRandare);

        if(err){
            if(err.message.includes("Failed to lookup view")){
                renderError(res,404,"Eroare 404");
            }
            else{
               
            }
        }
        else{
            res.send(rezRandare);
        }


    });
});
console.log("Hello world!");

app.listen(8080);
console.log("Serverul a pornit!");