var BASE_URI="http://147.83.7.203:8080/dsaApp/game";
var idJugador = sessionStorage.getItem("token");
var monedas = sessionStorage.getItem("monedas")
if (idJugador == null){
    var url = "http://147.83.7.203:8080/login.html";
    window.open(url, "_self");
}


$(document).ready(function() {
    console.log(idJugador);
    console.log(monedas);
    $("#m").text(monedas);
    var cantidad1 = parseInt($("#numero1").text());
    var cantidad2 = parseInt($("#numero2").text());
    var cantidad3 = parseInt($("#numero3").text());
    var cantidad4 = parseInt($("#numero4").text());
    var cantidad5 = parseInt($("#numero5").text());
    var cantidad6 = parseInt($("#numero6").text());
    $('#s1').click(function (){
        cantidad1 = cantidad1 + 1;
        $("#numero1").text(cantidad1);
    })
    $('#r1').click(function () {
        if(cantidad1 != 1) cantidad1 = cantidad1 - 1;
        else alert("Noooooo");
        $("#numero1").text(cantidad1);
    })
    $('#s2').click(function (){
        cantidad2= cantidad2 + 1;
        $("#numero2").text(cantidad2);
    })
    $('#r2').click(function () {
        if(cantidad2 != 1) cantidad2 = cantidad2 - 1;
        else alert("Noooooo");
        $("#numero2").text(cantidad2);

    })
    $('#s3').click(function (){
        cantidad3= cantidad3 + 1;
        $("#numero3").text(cantidad3);
    })
    $('#r3').click(function () {
        if(cantidad3 != 1) cantidad3 = cantidad3 - 1;
        else alert("Noooooo");
        $("#numero3").text(cantidad3);

    })
    $('#s4').click(function (){
        cantidad4= cantidad4 + 1;
        $("#numero4").text(cantidad4);
    })
    $('#r4').click(function () {
        if(cantidad4 != 1) cantidad4 = cantidad4 - 1;
        else alert("Noooooo");
        $("#numero4").text(cantidad4);

    })
    $('#s5').click(function (){
        cantidad5= cantidad5 + 1;
        $("#numero5").text(cantidad5);
    })
    $('#r5').click(function () {
        if(cantidad5 != 1) cantidad5 = cantidad5 - 1;
        else alert("Noooooo");
        $("#numero5").text(cantidad5);

    })
    $('#s6').click(function (){
        cantidad6= cantidad6 + 1;
        $("#numero6").text(cantidad6);
    })
    $('#r6').click(function () {
        if(cantidad6 != 1) cantidad6 = cantidad6 - 1;
        else alert("Noooooo");
        $("#numero6").text(cantidad6);

    })
    $('#des1').click(function () {
        var inventario = {"idObjeto": 1, "cantidad": cantidad1, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 75*cantidad1;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero1").text(1);
        cantidad1 = 1;

    });
    $('#des2').click(function () {
        var inventario = {"idObjeto": 2, "cantidad": cantidad2, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 125*cantidad2;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero2").text(1);
        cantidad2 = 1;
    });
    $('#des3').click(function () {
        var inventario = {"idObjeto": 3, "cantidad": cantidad3, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 200*cantidad3;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero3").text(1);
        cantidad3 = 1;
    });
    $('#masc1').click(function () {
        var inventario = {"idObjeto": 4, "cantidad": cantidad4, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 150*cantidad4;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero4").text(1);
        cantidad4 = 1;
    });
    $('#masc2').click(function () {
        var inventario = {"idObjeto": 5, "cantidad": cantidad5, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 300*cantidad5;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero5").text(1);
        cantidad5 = 1;
    });
    $('#jabon').click(function () {
        var inventario = {"idObjeto": 6, "cantidad": cantidad6, "idJugador": idJugador};
        console.log(inventario);
        compraObjeto(inventario);
        monedas = monedas - 25*cantidad6;
        window.sessionStorage.setItem("monedas", monedas);
        $("#m").text(monedas);
        $("#numero6").text(1)
        cantidad6 = 1;
    });

    function compraObjeto(inventario) {
        console.log("comprando objeto",inventario);
        $.ajax({
            type: 'POST',
            url: BASE_URI.concat("/compra"),
            headers: {'content-type': 'application/json', "x-kii-appid": "XXXXX", "x-kii-appkey": "XXXXX"},
            data: JSON.stringify(inventario),
            //dataType: 'json',
            success: function () {
                alert("Objeto comprado con exito")
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
});