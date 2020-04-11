document.addEventListener("DOMContentLoaded", function() {
	// <button class="btn info" style="font-weight:bold;" id="choose-everything-button">All</button> \
	var allSelected = false;
	var itemCount = jQuery(".displaying-num").first().text();
	var doAction1Text = jQuery("#doaction").val();
	var doAction2Text = jQuery("#doaction2").val();
	var selectDropdown =
	'<div id="select-all-dropdown" style="display: inline-flex;"> \
		<input type="hidden" id="apply-on-everything-input" name="apply-on-everything"> \
		<span id="toggle-select-all-menu" class="ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"></span> \
	</div>';
	var selectAllMenu =
	"<div id='select-all-menu' style='display: none';> \
		<button id='select-all-table-button' class='button' style=''>All " + itemCount + "</button> \
	</div>";
	var regularSelectAll = jQuery("#cb-select-all-1").detach();

	jQuery("#cb").append(selectDropdown);
	jQuery("#select-all-dropdown").append(regularSelectAll);
	jQuery("#select-all-dropdown").after(selectAllMenu);

	// jQuery('#choose-everything-button').prop('title', 'Choose entire table (' + itemCount +')');
	jQuery(document).on('click', function(e) {
		if(e.target.id == "toggle-select-all-menu"){
			jQuery("#select-all-menu").toggle();
		}else{
			jQuery('#select-all-menu').hide();

		}
	  });

	jQuery('#select-all-table-button').on("click", function(ev) {
		allSelected = !allSelected;
		ev.preventDefault();
		jQuery("#select-all-table-button").text(allSelected ? "Deselect All" : "All " + itemCount);
		jQuery("#doaction").val(!allSelected ? doAction1Text : doAction1Text + " (" + itemCount + ")");
		jQuery("#doaction2").val(!allSelected ? doAction2Text : doAction2Text + " (" + itemCount + ")");

		jQuery("#apply-on-everything-input").val(allSelected);
		jQuery('.check-column input[type=checkbox]').prop('checked', function(i, v) { return allSelected; });
		jQuery('.check-column input[type=checkbox]').prop('disabled', function(i, v) { return allSelected; });
	});

})
