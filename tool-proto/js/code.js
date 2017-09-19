

var openCreateTableModal = function(){
	$('#createTableColumns').html("");
	$('#tablename-input').val("");
	$('#createTableModal').modal('show');
	$('.ui.checkbox').checkbox();
	let tid = storeHandler.retrieve("tableId");
	storeHandler.store("newTable", {id: `table-${tid}`, name: "", columns: {}}, true);
	storeHandler.store("tableId", tid+1, true);
}

function closeCreateTableModal(){
	$('#createTableModal').modal('hide');
}

function refreshTablesView(){
	$('#table-view-container').html("");
	let currentTables = storeHandler.retrieve('tables');
	currentTables.forEach(function(table){
		let newHtml = `<div class="column">
						<div class="ui segment">
							<h3><a><i class="icon edit right floated"></i></a><span>${table.name}</span></h3>
							<table class="ui table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Type</th>
										<th>Keys</th>
										<th>References</th>
										<th>Modifiers</th>
									</tr>
								</thead>
								<tbody>`;
		for (colId in table.columns){
			newHtml += `<tr>
							<td>${table.columns[colId].title}</td><td>${table.columns[colId].type}</td>`;
			newHtml += `<td>`;
			newHtml += (table.columns[colId].is_primary_key) ? '[PK]' : '';
			newHtml += (table.columns[colId].is_foreign_key) ? '[FK]' : '';
			newHtml += '</td>';

			newHtml += '<td>References</td>';
			newHtml += `<td>${(table.columns[colId].auto_increment) ? '[AI]' : ''}</td>`;
			newHtml += '</tr>';
		}
									
		newHtml += `</tbody></table></div></div>`;
		$('#table-view-container').append(newHtml);
	});
	
}

function makeNewColumnHTML(attributeId){
	let columnid = `attr-${attributeId}`
	let html = '';
	html += `<div id="${columnid}" class="four fields" id=><div class="field"><input id="${columnid}-name" class="table-attr-name-field" type="text" placeholder="Column Name"></div><div class="field"><select id="${columnid}-type" class="table-attr-type-field" class="ui fluid dropdown"><option value="int">INT</option><option value="text">TEXT</option><option value="float">FLOAT</option><option value="timestamp">TIMESTAMP</option></select></div><div class="fields new-column-checkboxes"><div class="field"><div class="ui checkbox"><input id="${columnid}-pk" type="checkbox" class="hidden table-attr-pk"><label>PK</label></div></div><div class="field"><div class="ui checkbox" onclick=""><input id="${columnid}-fk" type="checkbox" class="hidden table-attr-fk"><label>FK</label></div></div><div class="field"><div class="ui checkbox"><input id="${columnid}-ai" type="checkbox" class="hidden table-attr-ai"><label>AI</label></div></div></div><div class="field"><button id="${columnid}-removebtn" class="mini ui icon basic button right floated" onclick="removeColumn(this)"><i class="icon remove"></i></button></div></div>`;
	return html
}


var createTableCommit = function(){
	let current = storeHandler.retrieve("newTable");
	let freshCopy = Object.assign(current);
	let currentTables = storeHandler.retrieve("tables");
	currentTables.push(freshCopy);
	closeCreateTableModal();
	refreshTablesView();
}


var addTableColumn = function(){
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

	if (Object.keys(currentTableState.columns).length > 0){
		$('#createTableCommitBtn').attr('class', 'ui teal button');
	}
}


function removeColumn(e){
	let colId = e.id;
	colId = colId.substr(0, colId.length-10)
	$(`#${colId}`).remove();
	current = storeHandler.retrieve("newTable").columns;
	delete current[colId];

	console.log(Object.keys(current).length);
	if (Object.keys(current).length > 0){
		$('#createTableCommitBtn').attr('class', 'ui teal button');
	} else {
		$('#createTableCommitBtn').attr('class', 'ui teal button disabled');
	}
}

$(document).ready(function(){
	// init attribute and table id
	storeHandler.store("attrId", 1);
	storeHandler.store("tableId", 1);
	storeHandler.store("tables", []);

	// update table name in state
	$('#tablename-input').change(function(){
		let current = storeHandler.retrieve("newTable");
		current.name = $('#tablename-input').val();
	});

	//bind buttons
	$('#launcher-create-table').click(openCreateTableModal);
	$('#addTableColumnBtn').click(addTableColumn);
	$('#createTableCommitBtn').click(createTableCommit);

	//vertical center menu
	window.onresize= function(){
		document.getElementById('side-menu').style.top = window.innerHeight/2 - (document.getElementById('side-menu').clientHeight+14)/2 + "px"
	}
	window.onload = function(){
		document.getElementById('side-menu').style.top = window.innerHeight/2 - (document.getElementById('side-menu').clientHeight+14)/2 + "px"
	}
	
});