$("document").ready(function () {

    var socket = null;
    var graph;

    // vrai si le formulaire va ajouter une nouvelle surface
    // faux si le formulaire modifie une surface existante
    var isAdding = true; 

   //----------------------------------------
   // Gestion des bouttons  
   //----------------------------------------
   $('#trigo_oui').click(function(){
       $.get("/api/surfaces/true", "", setMenu3DPanel, "html");
   });
   
   $('#trigo_non').click(function(){
       $.get("/api/surfaces/false", "", setMenu3DPanel, "html");
   });
   
    $("#action_update").click(function(){
        $.get('/api/surfaces/', "", setMenuEditPanel, "html");
        $("#submit_edit_panel").html("Mettre à jour");
        disableEditForm();
    }); 
    
    $("#action_add").click(function(){
        $("form").submit(function(e){
        $.post('/api/surfaces/',"", prefillForm, "html");
    })
        $(".form-control").trigger("reset");
        $(".col-md-6.btn-default dropdown-toggle").empty();
        $("#submit_edit_panel").html("Ajouter");
        enableEditForm();
    });
    
    
    //---------------------------------
    // Gestion du formulaire
    //---------------------------------

    // Les champs du formulaire peuvent être édités
   function enableEditForm()
    {
        $("form#surface_descr input").each(function(){
            $(this).prop("disabled", false);
        });
        $("#submit_edit_panel").prop("disabled", false);
    }
    

    // Les champs du formulaires ne peuvent plus être édités
    function disableEditForm()
    {
        $("form#surface_descr input").each(function(){
            $(this).prop("disabled", true);
        });
        $("#submit_edit_panel").prop("disabled", true);
    }

    // Pré rempli les champs du formulaire avec les 
    // valeurs fournies par value
    function prefillForm(value, statut)
    {
        $("#nom").val(value.nom);
        $("#equation").val(value.equation);
        $("#x_min").val(value.x_min);
        $("#x_max").val(value.x_max);
        $("#y_min").val(value.y_min);
        $("#y_max").val(value.y_max);
        
        enableEditForm();
    }

    //-----------------------------------------
    // Gestion des menus déroulants
    //-----------------------------------------

    function setMenu3DPanel(data)
    {
        $("#fonction3DList").html(data);
        console.log(data);
        $('.fonction').click(function(e) {
            var l = e.currentTarget;
            var id = l.getAttribute("data-name");
            $.get('/api/surface/points/'+id, "", drawSurface, "json");
        });
    }

    function setMenuEditPanel(data)
    {
        $("#fonctionEditList").html(data);
        $(".fonction").click(function(e){
            var l = e.currentTarget;
            var id = l.getAttribute("data-name");
            $.get('/api/surface/'+id, "", prefillForm, "json");
        });
    }

//------------------------------
// Affichage des surfaces
//------------------------------

    // specify options
    var options = {
        width: '600px',
        height: '450px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
    };

    // Instantiate our graph object.
    var container = document.getElementById('mygraph');

    function drawSurface(val, statut) {
        console.log(val);
        options.zMax = val.zMax;
        var data = new vis.DataSet(val.data);
        graph = new vis.Graph3d(container, data, options);
        $("#titreSurface").html("Surface: " + val.equation);
    }
});
