$("document").ready(function() {
    $.ajax({
        type:"POST",
    	url: "includes/trunkQuery.php",
		cache:true,
		success: function(html){
                $("#myTrunking").html(html);
    }});
    $(".exit").click(function() {
		$("#changed").html("מאושר");
		$("#changed").addClass("approved");
		$(".exit span").remove();
	});
	$("#publish,#publishResp").click(function(){
		var trunkType;
		var loc = localStorage.getItem("trunkLocation");
		var dest = localStorage.getItem("trunkDestination");
		var date = localStorage.getItem("trunkDate");
        if(window.location.href.indexOf("Single") > -1){
        	trunkType = "פריט בודד";
        }else{
        	trunkType = "הובלת דירה";
        }
		$.ajax({
			url:"includes/trunkInsert.php",
            type: "POST",
            data: {
				trunkT:trunkType,
				trunkLoc: loc,
				trunkDest: dest,
				trunkDate: date,
				trunkStatus:'ממתין לאישור'},
            success: function (data) {
            	console.log(data);
            }
        });
	});
	//open the side nav
	$("#openSideNav").click(function () {
        document.getElementById("mySidenav").style.width = "250px";
    });
	$(".closebtn").click(function () {
        document.getElementById("mySidenav").style.width = "0";
    })
	//add items to list
	$('#bigSearch').keyup(function() {
	var searchField = $('#bigSearch').val();
	if(searchField != "") {
		var myExp = new RegExp("^" + searchField, 'i');
		$.getJSON('includes/data.json', function(data) {
			var output = "<ul class='searchResult'>";
			$.each(data, function(key, val) {
				if(val.product.search(myExp) != -1) {
					output += '<li>';
					output += '<p class=item>' + val.product + '</p>';
					output += '<p class=desc>' + val.desc + '</p>';
					output += '</li>';	
				}
				});
				output += '</ul>';
				$('#update , #updateSingle').html(output);
			});
		}
		else
			$('#update , #updateSingle').html("");
	});
	$(".nextStep").click(function() {
		localStorage.setItem("trunkLocation", $("#trunkLocation").val());
		if(document.getElementById("villa").checked) {
			localStorage.setItem("houseType", "בית פרטי");
		}
		else {
			localStorage.setItem("houseType", "בניין קומות");
			localStorage.setItem("floor", $("#floor").val());
		}
		localStorage.setItem("trunkDestination", $("#trunkDestination").val());
		if(document.getElementById("villaDest").checked) {
			localStorage.setItem("houseTypeDest", "בית פרטי");
		}
		else {
			localStorage.setItem("houseTypeDest", "בניין קומות");
			localStorage.setItem("floorDest", $("#floorDest").val());
		}
		localStorage.setItem("trunkDate", $("#trunkDate").val());
	});
	$(".sendData").click(function() {
		localStorage.setItem("itemsList", $(".itemList").html());
		localStorage.setItem("itemsListAmount", $(".totalItems_amount").html());
	});
	$(".sendSingleData").click(function() {
		localStorage.setItem("setItem", $(".itemList").html());
	});

	$("#publish, #publishResp").click(function() {
		localStorage.clear();
	});

	if(window.location.href.indexOf("Step3") > -1 || window.location.href.indexOf("Single3") > -1) {
		$(".getItems").append(localStorage.getItem("itemsList"));
		$(".totalItems_amount1,  #restTotalItems1").append(localStorage.getItem("itemsListAmount"));
		$("#SingleItem").append(localStorage.getItem("setItem"));
		$("#getTrunkLocation").append(localStorage.getItem("trunkLocation"));
		$("#getHouseType").append(localStorage.getItem("houseType"));
		$("#getTrunkDestination").append(localStorage.getItem("trunkDestination"));
		$("#getHouseTypeDest").append(localStorage.getItem("houseTypeDest"));
        $("#getFloor").append(localStorage.getItem("floor"));
		$("#getFloorDest").append(localStorage.getItem("floorDest"));
		$("#getTrunkDate").append(localStorage.getItem("trunkDate"));

    }


	// counter
	
	// Search form for Apartment
	var searchItem, isAdded, num, totalItems_amount, curr, map;
	$("#update").on('click','li', function() {
		isAdded = false;
		searchItem = $(this).text();
		isAdd();
		if(!isAdded) {
			$(".itemList").append("<li>" + $(this).html() + "<span class='amount'>1</span></li>");
		}
		num = parseInt($.trim($(".totalItems_amount").html()));
		$(".totalItems_amount , #restTotalItems").text(++num);
		// reset input
		document.getElementById("bigSearch").value = "";
		$('#update').html("");
	});
	// Search form for single item
	$("#updateSingle").on('click','li', function() {
		searchItem = $(this).text();
		$(".itemList").html("<li>" + $(this).html() + "<span class='amount'>1</span></li>");
		// reset input
		document.getElementById("bigSearch").value = "";
		$('#updateSingle').html("");
	});
	function isAdd() {
		curr = 0;
		for(i=1; i <= $(".itemList li").length ; i++) {
			if($(".itemList li:nth-child("+i+")").is(":contains("+searchItem+")")) {
				curr  = i;
				num = parseInt($.trim($(".itemList li:nth-child("+(curr)+") .amount").html()));
				$(".itemList li:nth-child("+curr+") .amount").html(++num);
				isAdded = true;
				return true;
			}
		}
	};
});
// Sidebar Items
function addItem() {
	var item = "<p class=item>" + document.getElementById('productName').value; + "</p>";
	item += "<p class=desc>" + document.getElementById('productDesc').value + "</p>";
	// reset form inputs
	document.getElementById('productName').value = "";
	document.getElementById('productDesc').value = "";
	$(".itemList").append("<li>" + item + "<span class='amount'>1</span></li>");
    num = parseInt($.trim($(".totalItems_amount").html()));
    $(".totalItems_amount, #restTotalItems").text(++num);
}
function addSingleItem() {
	var item = "<p class=item>" + document.getElementById('productName').value; + "</p>";
	item += "<p class=desc>" + document.getElementById('productDesc').value + "</p>";
	// reset form inputs
	document.getElementById('productName').value = "";
	document.getElementById('productDesc').value = "";
	$(".itemList").html("<li>" + item + "<span class='amount'>1</span></li>");
}
// Google map API
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 31.513903, lng: 35.286833},
	    zoom: 5
    });
}
