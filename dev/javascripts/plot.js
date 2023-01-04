var TOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15', '16', '17', '18', '19', '20'];
var config = {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	},
	options: {
		responsive: true,
		tooltips: {
			mode: 'index',
			intersect: true,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Tour'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Temps (sec)'
				}
			}]
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);
};

var colorNames = Object.keys(window.chartColors);
function addPlot(tab,nom) {
	var colorName = colorNames[config.data.datasets.length % colorNames.length];
	var newColor = window.chartColors[colorName];
	var newDataset = {
		label: nom,
		backgroundColor: newColor,
		borderColor: newColor,
		data: tab,
		fill: false
	};

	config.data.datasets.push(newDataset);
	window.myLine.update();
}

function addData1(number) {
	if (config.data.datasets.length > 0) {
		var tour = TOURS[config.data.labels.length % TOURS.length];
		config.data.labels.push(tour);

		/*config.data.datasets.forEach(function(dataset) {
			dataset.data.push(randomScalingFactor());
		});*/

		window.myLine.update();
	}
}

function addData() {
	var tour = TOURS[config.data.labels.length % TOURS.length];
	config.data.labels.push(tour);
	window.myLine.update();
}

function removeData() {
	config.data.labels.splice(-1, 1);
	onfig.data.datasets.forEach(function(dataset) {
		dataset.data.pop();
	});
	window.myLine.update();
}

function removeData1 () {
	config.data.labels.splice(-1, 1); // remove the label first

	window.myLine.update();
}

var preced_number = (document.getElementById('nombre-input').value)*1;

function testData () {
	current_num = (document.getElementById('nombre-input').value)*1;

	if (current_num < 21 && current_num > 3) {
		if ( current_num == preced_number + 1 ) {
			addData();
		} else if ( current_num == preced_number - 1 ) {
			removeData1();
		} else {
			document.getElementById('nombre-input').value = preced_number;
		}
		preced_number = (document.getElementById('nombre-input').value)*1;

	} else {
		document.getElementById('nombre-input').value = preced_number;
	}
}