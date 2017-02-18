/*** Created by adaror on 14/02/2017.*/
$(document).ready(function() {
    $("#building").click(function () {
        $("#floor").prop('disabled', false);
    });
    $("#villa").click(function () {
        $("#floor").prop('disabled', true);
    });
    $("#buildingDest").click(function () {
        $("#floorDest").prop('disabled', false);
    });
    $("#villaDest").click(function () {
        $("#floorDest").prop('disabled', true);
    });

});

function checkForItems() {
    if ($(".totalItems_amount").text() == 0) {
        alert("אנא הכנס לפחות פריט אחד");
        return false;
    } else {
        return true;
    }
};

function checkSingleItem() {
    if ($(".itemList li").length == 0){
        alert("אנא הכנס פריט");
        return false;
    }else{
        return true;
    }
};