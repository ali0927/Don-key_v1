const LEAF = {
	closePanel: function () {
		$(".panel").removeClass("panel_open");
	},

	openPanel: function (id) {
		$(id).addClass("panel_open");
	},

	panelSetup: function () {
		var panelH = $(".panel").height();
		var panelHeaderH = $(".panel_header").height();
		var panelFooterH = $(".panel_footer").height();

		$(".panel_scroll").height(panelH - panelHeaderH - panelFooterH);
	}
}

let buruCell = {};
let selectedCell = {};
let graph = {};

let actionCells = [];
let protocolCells = [];


function showActionConfigBar(actionCellId) {
	var action = getActionForCellId(actionCellId);

	var actionBarX = 0;
	var actionBarY = 0;

	actionBarX = action.x + 20;
	actionBarY = action.y + 65;

	$('.actionConfig').css('top', actionBarY + 'px');
	$('.actionConfig').css('left', actionBarX + 'px');
	$('.actionConfig').show();
}

function hideActionBar() {
	$('.actionConfig').hide();
}

function getLastCellProtocol() {
	let protocols = _.filter(protocolCells, function (n) {
		return n.isAction == false;
	});

	return protocols[protocols.length - 1];
}

function getPreviousCellForCell(cellId) {
	var elementIndex = _.findIndex(protocolCells, function (n) {
		return n.mxObjectId == cellId;
	});

	return protocolCells[elementIndex - 1];
}

function getActionForCellId(cellId) {
	return _.filter(actionCells, function (n) {
		return n.mxObjectId == cellId;
	})[0];
}

function isProtocol(cellId) {
	var action = _.filter(actionCells, function (n) {
		return n.mxObjectId == cellId;
	})[0];

	if (!action) {
		var protocol = _.filter(protocolCells, function (n) {
			return n.mxObjectId == cellId;
		})[0];

		if (protocol) {
			return true;
		}

		return false;
	}
	else {
		return false;
	}
}

function getProtocolForCellId(cellId) {
	return _.filter(protocolCells, function (n) {
		return n.mxObjectId == cellId;
	})[0];
}

function insertProtocol(protocolName) {

	var base64 = PROTOCOLS[protocolName].base64;
	var file = dataURLtoFile(base64, protocolName);

	var w = 136;
	var h = 136;

	var data = '';
	// Converts format of data url to cell style value for use in vertex
	var semi = base64.indexOf(';');

	if (semi > 0) {
		data = base64.substring(0, semi) + base64.substring(base64.indexOf(',', semi + 1));
	}

	w = 136;
	h = 136;
	var parent = graph.getDefaultParent();

	var lastProtocol = getLastCellProtocol();
	var x = 200;
	var y = 150;

	if (lastProtocol) {
		x = lastProtocol.x + 200;
		y = lastProtocol.y;
	}

	let newVertex = graph.insertVertex(parent, null, '', x, y, w, h, 'resizable=0;shape=image;image=' + data + ';');
	protocolCells.push({ mxObjectId: newVertex.id, vertex: newVertex, isAction: false, buru: false, protocol: protocolName, x: x, y: y });

}

function dataURLtoFile(dataurl, filename) {

	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}


function drag(ev) {
	ev.dataTransfer.setData("protocol", ev.target.id);
}

function drawProtocolsBar() {
	let protocolRows = '<li style="text-align: center; font-size:13px; color:#232323; height: 32px;">Protocols</li>';
	//draw protocols

	var protocols = Object.keys(PROTOCOLS);

	for (let i = 0; i < protocols.length; i++) {
		let protocolName = protocols[i];
		let protocol = PROTOCOLS[protocolName];
		if (protocol.showOnToolbar) {
			protocolRows += '<li style="height:66px;"><img src="' + protocol.icon + '" id="' + protocolName + '" draggable="true" ondragstart="drag(event)"></li>';
		}
	}

	$('#protocolsList').html(protocolRows);
}



function main(container) {
	graph = new mxGraph(container);
	graph.setEnabled(true);
	graph.setAllowDanglingEdges(false);
	graph.setDisconnectOnMove(false);
	graph.setCellsMovable(false);



	$(function () {
		drawProtocolsBar();
	
	
		$('.trigger').click(function () {
			$('.b-modal-wrapper').toggleClass('open');
			$('.page-wrapper').toggleClass('blur');
			return false;
		});

		$('#createAction').click((e) => {
			let selectedProtocol = getProtocolForCellId(selectedCell.id);

			var previousCell = getPreviousCellForCell(selectedCell.id);

			var vertexStyleAction = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
		'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=action.png';

			var x = previousCell.x + 100;
			var y = 300;

			var actionVertex = graph.insertVertex(parent, null, '', x, y, 90, 40, vertexStyleAction);
			actionCells.push({ mxObjectId: actionVertex.id, vertex: actionVertex, isAction: true, buru: false, x: x, y: y });

			//get selected cell edge color

			var lastCellProtocolEdge = PROTOCOLS[previousCell.protocol].edgeColor;
			var selectedCellProtocolEdge = PROTOCOLS[selectedProtocol.protocol].edgeColor;


			// graph.model.setValue(actionVertex, "Deposit");
			var e1 = graph.insertEdge(parent, null, '', actionVertex, selectedCell, 'strokeWidth=3;endArrow=block;' +
				'endSize=2;endFill=1;strokeColor=' + selectedCellProtocolEdge + ';rounded=1;edgeStyle=orthogonalEdgeStyle');
			var e1 = graph.insertEdge(parent, null, '', previousCell.vertex, actionVertex, 'strokeWidth=3;endArrow=block;' +
				'endSize=2;endFill=1;strokeColor=' + lastCellProtocolEdge + ';rounded=1;edgeStyle=orthogonalEdgeStyle');
		});

		$('.actionBtn').click((e) => {
			$('.b-modal-wrapper').toggleClass('open');
			$('.page-wrapper').toggleClass('blur');
			return false;
		});
	});

	function mxVertexToolHandler(state) {
		mxVertexHandler.apply(this, arguments);
	};
	mxVertexToolHandler.prototype = new mxVertexHandler();
	mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

	mxVertexToolHandler.prototype.domNode = null;

	graph.addMouseListener(
		{
			mouseDown: function (sender, evt) {
				let cell = evt.getCell();
				if (cell != null) {
					selectedCell = cell;
					LEAF.closePanel();
					var protocol = getProtocolForCellId(cell.id);

					var aIsPRotocol = isProtocol(cell.id);
					if (aIsPRotocol) {
						var pData = PROTOCOLS[protocol.protocol];
						LEAF.openPanel(pData.panel);
						hideActionBar();
					}
					else {
						LEAF.closePanel();
						showActionConfigBar(selectedCell.id);
					}

				}
				else {
					LEAF.closePanel();
					hideActionBar();
					$('#actionsBar').hide();
				}
			},
			mouseMove: function (sender, evt) {
				mxLog.debug('mouseMove');
			},
			mouseUp: function (sender, evt) {
				mxLog.debug('mouseUp');
			}
		});


	mxEvent.addListener(container, 'dragover', function (evt) {
		if (graph.isEnabled()) {
			evt.stopPropagation();
			evt.preventDefault();
		}
	});

	mxEvent.addListener(container, 'drop', function (evt) {
		if (graph.isEnabled()) {
			evt.stopPropagation();
			evt.preventDefault();
			var protocol = event.dataTransfer.getData('protocol');
			handleDrop(protocol);
		}
	});

	var parent = graph.getDefaultParent();

	// var vertexStyle = 'shape=image;strokeWidth=2;fillColor=#ffffff;strokeColor=black;resizable=0;' +
	// 	'gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=12;';

	// var vertexStyleBURU = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
	// 	'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=buru-shape.png';

	var vertexStyleAction = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
		'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=action.png';

	// var vertexStyleActionComp = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
	// 	'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=actioncomp.png';


	// var vertexStyleYFI = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
	// 	'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=YFI-shape.png;';

	// var vertexStyleCMP = 'shape=image;strokeWidth=2;fillColor=#4F4F4F;strokeColor=black;resizable=0;' +
	// 	'gradientColor=#313130;fontColor=white;fontStyle=0;spacingTop=12;image=YFI-usdt.png';

	// var actionStyle = 'shape=rectangle;strokeWidth=2;fillColor=#313130;strokeColor=white;resizable=0;' +
	// 	'gradientColor=#00D395;gradientDirection=east; fontColor=white;fontStyle=1;spacingTop=12;width=60px;height:20px;';



	graph.addListener('size', function () {
		// Adds animation to edge shape and makes "pipe" visible
		graph.view.states.visit(function (key, state) {
			if (graph.model.isEdge(state.cell)) {
				state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
				state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
				state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
				state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');
			}
		});
	});

	graph.createHandler = function (state) {
		if (state != null &&
			this.model.isVertex(state.cell)) {
			return new mxVertexToolHandler(state);
		}

		return mxGraph.prototype.createHandler.apply(this, arguments);
	};

	graph.getModel().beginUpdate();
	try {

		insertProtocol('buru', 100, 150);
	}
	finally {
		// Updates the display
		graph.getModel().endUpdate();
	}
};

// Handles each file as a separate insert for simplicity.
// Use barrier to handle multiple files as a single insert.
function handleDrop(protocolName) {
	insertProtocol(protocolName);
};

window.startBuilder = main;
