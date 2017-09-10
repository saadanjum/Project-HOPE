jsPlumb.ready(function() {
	jsPlumb.connect({
	    connector: ["Straight"],
	    source:"table-students",
	    target:"table-classes",
	    anchor: ["Left", "Right"],
	    endpoint:"Dot"
	    });
});