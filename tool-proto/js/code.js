
function openCreateTableModal(){
	$('#createTableColumns').html("");
	$('#tablename-input').val("");
	$('#createTableModal').modal('show');
	$('.ui.checkbox').checkbox();
	let tid = storeHandler.retrieve("tableId");
	storeHandler.store("newTable", {id: `table-${tid}`, name: "", columns: {}}, true);
	storeHandler.store("tableId", tid+1, true);
}


function makeNewColumnHTML(attributeId){
	let columnid = `attr-${attributeId}`
	let html = '';
	html += `<div id="${columnid}" class="four fields" id=><div class="field"><input id="${columnid}-name" class="table-attr-name-field" type="text" placeholder="Column Name"></div><div class="field"><select id="${columnid}-type" class="table-attr-type-field" class="ui fluid dropdown"><option value="int">INT</option><option value="text">TEXT</option><option value="float">FLOAT</option><option value="timestamp">TIMESTAMP</option></select></div><div class="fields new-column-checkboxes"><div class="field"><div class="ui checkbox"><input id="${columnid}-pk" type="checkbox" class="hidden table-attr-pk"><label>PK</label></div></div><div class="field"><div class="ui checkbox" onclick=""><input id="${columnid}-fk" type="checkbox" class="hidden table-attr-fk"><label>FK</label></div></div><div class="field"><div class="ui checkbox"><input id="${columnid}-ai" type="checkbox" class="hidden table-attr-ai"><label>AI</label></div></div></div><div class="field"><button id="${columnid}-removebtn" class="mini ui icon basic button right floated" onclick="removeColumn(this)"><i class="icon remove"></i></button></div></div>`;
	return html
}

function addTableColumn(){
	let colId = storeHandler.retrieve("attrId");
	$('#createTableColumns').append(makeNewColumnHTML(colId));
	$('.ui.checkbox').checkbox();
	currentTableState = storeHandler.retrieve('newTable');
	currentTableState.columns[`attr-${colId}`] = {
		columnId: `attr-${colId}`,
		title: '',
		type: 'int',
		is_primary_key: false,
		is_foreign_key: false,
		auto_increment: false
	};
	storeHandler.store("attrId", colId+1, true);
	
	// update col title on change
	$('.table-attr-name-field').change(function(e){ 
		let fieldId = e.target.id;
		let attrId = fieldId.substr(0, fieldId.length-5);
		current = storeHandler.retrieve("newTable");
		current.columns[attrId].title = e.target.value;
	});

	// update col type on change
	$('.table-attr-type-field').change(function(e){ 
		let fieldId = e.target.id;
		let attrId = fieldId.substr(0, fieldId.length-5);
		current = storeHandler.retrieve("newTable");
		current.columns[attrId].type = e.target.value;
	});

	// update col pk on change
	$('.table-attr-pk').change(function(e){ 
		let fieldId = e.target.id;
		let attrId = fieldId.substr(0, fieldId.length-3);
		current = storeHandler.retrieve("newTable");
		current.columns[attrId].is_primary_key = $(`#${fieldId}`).prop('checked');
	});

	// update col fk on change
	$('.table-attr-fk').change(function(e){ 
		let fieldId = e.target.id;
		let attrId = fieldId.substr(0, fieldId.length-3);
		current = storeHandler.retrieve("newTable");
		current.columns[attrId].is_foreign_key = $(`#${fieldId}`).prop('checked');
	});

	// update col ai on change
	$('.table-attr-ai').change(function(e){ 
		let fieldId = e.target.id;
		let attrId = fieldId.substr(0, fieldId.length-3);
		current = storeHandler.retrieve("newTable");
		current.columns[attrId].auto_increment = $(`#${fieldId}`).prop('checked');
	});
}


function removeColumn(e){
	let colId = e.id;
	colId = colId.substr(0, colId.length-10)
	$(`#${colId}`).remove();
	current = storeHandler.retrieve("newTable").columns;
	delete current[colId];
}

$(document).ready(function(){
	// init attribute and table id
	storeHandler.store("attrId", 1);
	storeHandler.store("tableId", 1);

	// update table name in state
	$('#tablename-input').change(function(){
		let current = storeHandler.retrieve("newTable");
		current.name = $('#tablename-input').val();
	});
	
});