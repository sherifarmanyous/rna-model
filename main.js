document.addEventListener("DOMContentLoaded", function(e){
    $("input").on("change input", compute)
});

function compute()
{
    const intercept = 3.91847;
    var rd = $("#reduced-duodenum").is(":checked") ? 1 : 0; // duodenum reduced
    var noicv = $("#no-icv").is(":checked") ? 1 : 0; //
    var endstoma = $("#end-stoma").is(":checked") ? 1 : 0; //
    var rbs = $("#resid-bowel-short").is(":checked") ? 1 : 0; //
    var usg = $("#short-gut").is(":checked") ? 1 : 0; //
    var mgf = $("#mucosal-gut-failure").is(":checked") ? 1 : 0; //
    var ngf = $("#neuromuscular-gut-failure").is(":checked") ? 1 : 0; //
    var sb = $("#serum-bilirubin").val(); //
    var tpndur = $("#tpn-duration").val(); //
    var tpnvol = $("#tpn-volume").val(); //
    var tpne = $("#tpn-energy").val(); //

    var psum = intercept    +
        rd * 0.12838        +
        noicv * -0.82285    +
        endstoma * -0.73775 +
        rbs * -0.35601      +
        usg * -2.95987      +
        mgf * -0.27824      +
        ngf * -1.63467      +
        sb * -0.3435        +
        tpndur * -0.02858   +
        tpnvol * -0.05254   +
        tpne * -0.34924
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