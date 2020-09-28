/*
	Dijkstra search
	Jamie Huddlestone
	v1.0 28/05/2019
*/

// Destination optional; will return solution path if set, else returns predecessor-linked list
function dijkstra(graphMatrix, source, destination) {

	// Create map of vertex labels from header row if exists
	if (graphMatrix[0].some(x => typeof x == "string")) {
		var labels = graphMatrix.shift();
		source = labels.indexOf(source);
		if (destination) destination = labels.indexOf(destination);
	}

	// Set up data structures
	var Node = (vertex, predecessor, distance) => (
		{
			"vertex": vertex,
			"predecessor": predecessor,
			"distance": distance
		}
	);

	var closedList = [];
	var openList = [];

	for (var vertex = 0; vertex < graphMatrix.length; vertex++) {
		if (vertex == source) {
			openList.push(Node(vertex, null, 0));
		}
		else {
			openList.push(Node(vertex, null, Infinity));
		}
	}

	while (openList.length) {
		// Sort list by distance, extract minimum and add to closed list
		openList.sort((x, y) => x.distance - y.distance);
		var currentNode = openList.shift();
		closedList.push(currentNode);
		// Update total distance to adjacent nodes
		for (var node in openList) {
			var distance = currentNode.distance +
			               (graphMatrix[currentNode.vertex][openList[node].vertex] || Infinity);
			if (distance < openList[node].distance) {
				openList[node].distance = distance;
				openList[node].predecessor = currentNode.vertex;
			}
		}
	}

	closedList.sort((x, y) => x.vertex - y.vertex);

	if (destination != null) {
		var currentNode = closedList[destination];
		var totalDistance = currentNode.distance;
		var solutionPath = [];
		while (currentNode) {
			solutionPath.push(currentNode.vertex);
			currentNode = closedList[currentNode.predecessor];
		}
		solutionPath.reverse();
		if (labels) {
			return [solutionPath.map(x => labels[x]), totalDistance];
		}
		else return [solutionPath, totalDistance];
	}
	else {
		if (labels) {
			return JSON.stringify(
				closedList.map(x => Node(labels[x.vertex], labels[x.predecessor], x.distance))
			);
		}
		else return JSON.stringify(closedList);
	}
}

/*

var graph = [
	[ "London", "Manchester", "Sheffield", "Birmingham", "Bristol" ],
	[ 0,        null,         200,         150,          100       ],
	[ null,     0,            40,          100,          null      ],
	[ 200,      40,           0,           60,           null      ],
	[ 150,      100,          60,          0,            50        ],
	[ 100,      null,         null,        50,           0         ]
];

document.write(dijkstra(graph, "London"));

*/
