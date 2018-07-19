window.fetch('/dips').then(function (response) {
    return response.json();
})
    .then(function (myJson) {
        //console.log(myJson);
        for (var i = 0, len = myJson.length; i < len; ++i) {
            var dip = myJson[i];
            $("#mylist").append('<li id="' + dip.id + '"><a href="diplomate.html?id=' + dip.id + '">' + dip.name + " (" + dip.city + " - " + dip.state_prov + ")</li>");
            
        }
        
    })
    .then(() => {
        var input = document.getElementById("lister");
        new Awesomplete(input, {list: "#mylist"});
        Awesomplete.$.bind(input, {
          "awesomplete-selectcomplete": selectDip
        });
        function selectDip(evt){
            var ourID = $('ul#mylist').children('li:contains("' + evt.text.value + '")').attr('id');
            console.log(ourID);
            window.location.assign("diplomate.html?id=" + ourID);
        }
    });