document.addEventListener("DOMContentLoaded", function(e){
    $("input").on("change input", compute)
});

function compute()
{
    const intercept = 4.25561270981822;

    var rbs = $("#resid-bowel-short").is(":checked") ? 1 : 0; //
    var noicv = $("#no-icv").is(":checked") ? 1 : 0; //
    var endstoma = $("#end-stoma").is(":checked") ? 1 : 0; //
    var usg = $("#short-gut").is(":checked") ? 1 : 0; //
    var mgf = $("#mucosal-gut-failure").is(":checked") ? 1 : 0; //
    var ngf = $("#neuromuscular-gut-failure").is(":checked") ? 1 : 0; //
    var sb = $("#serum-bilirubin").val(); //
    var tpndur = $("#tpn-duration").val(); //
    var tpnvol = $("#tpn-volume").val(); //
    var tpne = $("#tpn-energy").val(); //

    var psum = intercept    +

        noicv * -1.07880966137193       +
        endstoma * -0.653926467406664   +
        rbs * -0.0725706928348354       +
        usg * -2.52572864430826         +
        mgf * -0.072570692834835        +
        ngf * -2.30258509299405         +
        sb * -0.342490308946776         +
        tpndur * -0.0202027073175195    +
        tpnvol * -0.0725706928348354    +
        tpne * -0.301105092783922
    ;

    var prob = Math.exp(psum)/(1+Math.exp(psum));

    if (isNaN(prob)) {
        result = "input all variables";
    } else {
        result = prob > 0.5 ? "Yes" : "No";
        $("#probability").text(prob);
    }

    $("#result").text(result);
}