jj = null


function createTableHTML(data){
	html = "";
	html += `<div id="table-${data.name}" class="dbtable">`;
	html += `<div id="table-${data.name}-header" class="dbtable-header">`;
	html += `<div id="table-${data.name}-header-name" class="dbtable-header-name">${data.name}</div>`;
	html += `<div id="table-${data.name}-header-actions" class="dbtable-header-actions">`;
    html += `<a href=""><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>`;
	html += `<a href=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div></div>`;
	html += `<div id="table-${data.name}-body" class="dbtable-body">`;
	html += `<table><tbody>`;
	data.columns.forEach(function(c){
		html += `<tr id="table-attr-${c.column_id}">`;
		html += `<td>${c.title}</td><td>${c.type}</td>`;
		html += `<td>`;
		if (c.is_primary_key){
			html += `PK`;
		}
		if (c.is_foreign_key){
			html += `FK`;
		}
		if (c.auto_increment){
			html += ` [AI]`;
		}
		html += `</td></tr>`;
	});
	html += `</tbody></table></div></div>`;

	return html;
}


jsPlumb.ready(function() {
	setTimeout(function(){
		connection1 = jsPlumb.connect({
		    connector: ["Bezier"],
		    source:"table-students",
		    target:"table-classes",
		    anchor: ["Left", "Right"],
		    endpoint:["Dot", {radius:5}]
		    });
		connection1.endpoints.forEach(function(e){
			e.setEnabled(false);
		})
		jsPlumb.draggable("table-students");
		jsPlumb.draggable("table-classes")
	}, 2000);
	
});