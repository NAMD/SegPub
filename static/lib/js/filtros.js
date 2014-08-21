$(document).ready(function() {

    //click en la lista desplegada de los dropdown
    $(".dropdown-menu li a").click(function(){
        var obj = $(this);
        $(obj).closest(".btn-group").find(".btn").text($(obj).text() );
        $(obj).closest(".btn-group").find(".btn").val($(obj).attr("val"))
        crear_consulta ();
    });




});

function corrige_periodo (){
    var desde = $("#desde").val();
    var hasta = $("#hasta").val();

    if (desde > hasta){
        $("#hasta").val(desde);
        $("#hasta").text(desde);
    }

    $(".hasta li").show();
    $( ".hasta li a" ).each(function() {

      if ( $(this).text() < desde ){
        $(this).closest("li").hide();
      }
    });
}



function crear_consulta (){
    corrige_periodo ();
    $("#loading").show();
    var desde = $("#desde").val();
    var hasta = $("#hasta").val();
    var tipo_edad = $("#tipo-edad").val();
    var sexo = $("#sexo").val();
    var fuerza = $("#fuerza").val();
    var provincia = $("#provincia").val();
    
    $.post( "/archivo/cargar-marcadores/", {
        desde: desde,
        hasta: hasta,
        tipo_edad: tipo_edad,
        sexo: sexo,
        fuerza: fuerza,
        provincia: provincia
    }, function( data ) {
        try{
            remueve_marcadores();
        }catch(err){
          //Handle errors here
        }
        $("#loading").hide();
        crear_marcadores (data);
    });
}


function remueve_marcadores(){
    //remueve todos los marcadores del mapa
    map.removeLayer(markers);
}



function crear_marcadores (data){
    //crea e inserta los marcadores de casos en el mapa
    var data_length = data.length;
    markers = new L.MarkerClusterGroup({
                                        maxClusterRadius:10,
                                        iconCreateFunction: function(cluster) {
                                                                return new L.DivIcon({ html: '<img src="/static/img/iconos/cluster.png"><b>' + cluster.getChildCount() + '</b>' });
                                                                             }
    });
    for (var i = 0; i < data_length; i++) {
        var coordenadas = data[i][0].split(",");
        var lat = parseFloat(coordenadas[0], 10) - (Math.random()* (0.02 - -0.02) + 0.02);
        var lon = parseFloat(coordenadas[1], 10) - (Math.random()* (0.02 - -0.02) + 0.02);
        if (data[i][4] == "V"){
            var icono = iconoMasculino;
        }else{
            var icono = iconoFemenino;
        }
        var marker = L.marker( [lat, lon], {icon: icono} ).bindPopup("<p class='caso-popup' id_caso='"+data[i][3]+"'>" + data[i][1] + " " + data[i][2] + "</span>  <span class='glyphicon glyphicon-new-window'></p>");
        markers.addLayer(marker);
        map.addLayer(markers);
    }

    casos_mostrados(data_length);
}