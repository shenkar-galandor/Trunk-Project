$('#bigSearch').keyup(function() {
	var searchField = $('#bigSearch').val();
	if(searchField != "") {
		var myExp = new RegExp("^" + searchField, 'i');
		$.getJSON('includes/data.json', function(data) {
			var output = "<ul class='searchResult'>";
			$.each(data, function(key, val) {
				// if (key > 5) {
		  //              return false;
		  //       }
				if(val.product.search(myExp) != -1) {
					output += '<li>';
					output += '<p class=item>' + val.product + '</p>';
					output += '<p class=desc>' + val.desc + '</p>';
					output += '</li>';
				}
			});
			output += '</ul>';
			$('#update').html(output);
		});
	}
	else
		$('#update').html("");
});

$("document").ready(function() {
	var searchItem, isAdded, num, totalItems_amount, curr;
	$("#update").on('click','li', function() {
		isAdded = false;
		searchItem = $(this).text();
		isAdd();
		if(!isAdded) {
			$("#itemList").append("<li>" + $(this).html() + "<span class='amount'>1</span></li>");
		}
		num = parseInt($.trim($(".totalItems_amount").html()));
		$(".totalItems_amount").text(++num);
		// reset input
		document.getElementById("bigSearch").value = "";
		$('#update').html("");
	});
	function isAdd() {
		curr = 0;
		for(i=1; i <= $("#itemList li").length ; i++) {
			++curr;
			if($("#itemList li:nth-child("+i+")").is(":contains("+searchItem+")")) {
				curr  = i;
				num = parseInt($.trim($("#itemList li:nth-child("+(curr)+") .amount").html()));
				console.log(num);
				$("#itemList li:nth-child("+curr+") .amount").html(++num);
				isAdded = true;
				return true;
			}
		}
	};
});
function galaa() {
	var item = "<p class=item>" + document.getElementById('productName').value; + "</p>";
	item += "<p class=desc>" + document.getElementById('productDesc').value + "</p>";
	// reset form inputs
	document.getElementById('productName').value = "";
	document.getElementById('productDesc').value = "";
	console.log(item);
	$("#itemList").append("<li>" + item + "<span class='amount'>1</span></li>");
}