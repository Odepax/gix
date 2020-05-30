class InputPort {
	constructor(label = "Unnamed Input") {
		this.label = label
		this.source = null
	}
}

class OutputPort {
	constructor(label = "Unnamed Output") {
		this.label = label
		this.destinations = new Set()
	}
}

class Node {
	constructor(label = "Unnamed Node", inputs = new Set(), outputs = new Set()) {
		this.label = label
		this.inputs = inputs
		this.outputs = outputs
	}
}

const inputPortTemplate = `
	<div class="node-input">
		<div id="label" class="node-input-label"></div>
		<div id="connector" class="node-input-connector"></div>
	</div>
`

const outputPortTemplate = `
	<div class="node-output">
		<div id="label" class="node-output-label"></div>
		<div id="connector" class="node-output-connector"></div>
	</div>
`

const nodeTemplate = `
	<div class="node">
		<div id="label" class="node-label"></div>
		<div id="inputs" class="node-inputs"></div>
		<div id="outputs" class="node-outputs"></div>
	</div>
`

const connectionTemplate = `
	<path class="connection"/>
`

class Graph extends HTMLElement {
	constructor() {
		super()

		this.nodes = new Map() // [Node] => HTMLDivElement
		this.connections = new WeakMap() // [InputPort] => SVGPathElement
		this.connectors = new WeakMap() // [InputPort | OutputPort] => HTMLDivElement

		this.$nodes = document.parseHTML(`<div class="nodes"></div>`)[0]
		this.$connections = document.parseHTML(`<svg xmlns="http://www.w3.org/2000/svg" class="connections"></svg>`)[0]

		this.classList.add("graph")
		this.appendChild(this.$nodes)
		this.appendChild(this.$connections)
	}

	addNode(x, y, node) {
		const [ $node, { label: $label, inputs: $inputs, outputs: $outputs } ] = document.parseHTML(nodeTemplate)

		$label.textContent = node.label

		$inputs.appendChildren(node.inputs.map(input => {
			const [ $input, { label: $label, connector: $connector } ] = document.parseHTML(inputPortTemplate)

			$label.textContent = input.label

			this.connectors.set(input, $connector)

			if (input.source)
				this.addConnection(input, input.source)

			return $input
		}))

		$outputs.appendChildren(node.outputs.map(output => {
			const [ $output, { label: $label, connector: $connector } ] = document.parseHTML(outputPortTemplate)

			$label.textContent = output.label

			this.connectors.set(output, $connector)

			return $output
		}))

		$node.style.top = y + "px"
		$node.style.left = x + "px"

		this.nodes.set(node, $node)
		this.$nodes.appendChild($node)
	}

	addConnection(input, output) {
		const $connection = document.parseSVG(connectionTemplate)[0]

		const parent = this.$nodes.getBoundingClientRect()
		const inputConnector = this.connectors.get(input).getBoundingClientRect()
		const outputConnector = this.connectors.get(output).getBoundingClientRect()


		const xInput = inputConnector.x - parent.x + inputConnector.width / 2
		const yInput = inputConnector.y - parent.y + inputConnector.height / 2
		const xOutput = outputConnector.x - parent.x + outputConnector.width / 2
		const yOutput = outputConnector.y - parent.y + outputConnector.height / 2

		$connection.setAttribute("d", `M ${ xOutput } ${ yOutput } L ${ xInput } ${ yInput }`)
		$connection.setAttribute("d", `M ${ xOutput } ${ yOutput } C ${ xOutput + 60 } ${ yOutput }, ${ xInput - 60 } ${ yInput }, ${ xInput } ${ yInput }`)

		this.connections.set(input, $connection)
		this.$connections.appendChild($connection)
	}

	removeNode(node) {
		// ...
	}

	removeConnection(input, output) {
		// ...
	}
}

customElements.define("gix-graph", Graph)


// this.nextPairingId = 0
// this.pairingId = Symbol()

// pairHash(a, b) {
// 	a = a[this.pairingId] || (a[this.pairingId] = ++this.nextPairingId)
// 	b = b[this.pairingId] || (b[this.pairingId] = ++this.nextPairingId)

// 	const n = Math.min(a, b)
// 	const m = Math.max(a, b)

// 	return 0.5 * (n + m) * (n + m + 1) + n
// }

