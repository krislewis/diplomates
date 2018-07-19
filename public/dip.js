var errHandler = function (err) {
    console.log(err);
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var page = window.location.pathname.replace('/', '').replace('.html','');
    switch(page){
        case "diplomate":
            page = "/dip/";
            break;
        case "cert":
            page = "/cert/";
            break;
        default:
            window.location.href("/list.html");
    }
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return {page:page, id:pair[1]}}; 
    }
    return (false);
}
function post(path, data) {
    return window.fetch(path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(response){
        if (response.status === 200){
            $("#lister").append("<br />Updated!");
            setTimeout(function () { window.location.reload(true); }, 1000);
        }
    }, errHandler);
}
ourPage = getQueryVariable("id").page;
ourId = getQueryVariable("id").id;
window.fetch(ourPage + ourId).then(function (response) {
    return response.json();
})
    .then(function (myJson) {
        if (ourPage == "/dip/"){
            for (var i = 0, len = myJson.length; i < len; ++i) {
                var dip = myJson[i];
                if (i == 0){
                    $("#lister").append('<div id="' + dip.id + '">' + dip.name + " (" + dip.city + ", " + dip.state_prov + " - " + dip.country + ") " + dip.cert_number + " : " + dip.status + "</div>");
                    $(".ourID").attr("value", dip.id);
                    $(".name").attr("value", dip.name);
                    $(".city").attr("value", dip.city);
                    $(".country").attr("value", dip.country);
                    $(".state_prov").attr("value", dip.state_prov);
                    $(".cert_number").attr("value", dip.cert_number);
                    $(".status").attr("value", dip.status);
                    
                }
                $("#cert_list").append(`<div id="${dip.cert_id}"><a href="cert.html?id=${dip.cert_id}">[${dip.certificate_year}]</a></div>`);
            }
            $("#cert_list").append(`<a href="cert_add.html?dip=${dip.id}">&nbsp;&nbsp;&nbsp;[+]</a>`);
        }else{
            // cert page
            for (var i = 0, len = myJson.length; i < len; ++i) {
                var cert = myJson[i];
                if (i == 0) {
                    $("#lister").append('<div id="' + cert.cert_id + '">(' + cert.cert_id + "), Year: " + cert.certificate_year + ", Diplomate: " + cert.name + "</div>");
                    $(".certID").attr("value", cert.cert_id);
                    $(".dipID").attr("value", cert.diplomate_id);
                    $(".dipName").attr("value", cert.name);
                    $(".certYear").attr("value", cert.certificate_year);
                    $(".dipSelector").html(cert.name);
                    $(".dipSelector").attr("value", cert.diplomate_id);
                }
                
            }
        }
       
    }).then(function (){
        //listen and return form data from either sheet
        if (ourPage == "/dip/"){
            const EditDip = document.querySelector(".EditDip");
            EditDip.addEventListener("submit", e => {
                e.preventDefault();
                const DipID = EditDip.querySelector(".ourID").value;
                const DipName = EditDip.querySelector(".name").value;
                const DipCity = EditDip.querySelector(".city").value;
                const DipState = EditDip.querySelector(".state_prov").value;
                const DipCountry = EditDip.querySelector(".country").value;
                const DipCert = EditDip.querySelector(".cert_number").value;
                const DipStatus = EditDip.querySelector(".status").value;
                post("/EditDip", { DipID, DipName, DipCity, DipState, DipCountry, DipCert, DipStatus });
                
            });
        }else{
            const EditCert = document.querySelector(".EditCert");
            EditCert.addEventListener("submit", d => {
                const CertID = EditCert.querySelector(".certID").value;
                const DiplomateID = EditCert.querySelector(".dipID").value;
                const CertYear = EditCert.querySelector(".certYear").value;
                const DiplomateName = EditCert.querySelector(".dipName").value;
                post("/EditCert", {CertID, DiplomateID, CertYear});
        });
        }
        
    });