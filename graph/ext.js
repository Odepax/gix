Document.prototype.parseHTML = function parseHTML(htmlString) {
	const div = this.createElement("div")

	div.innerHTML = htmlString

	const identifiedElements = {}

	for (const element of div.querySelectorAll("[id]")) {
		identifiedElements[element.getAttribute("id")] = element
		element.removeAttribute("id")
	}

	return [ div.children[0], identifiedElements ]
}

Document.prototype.parseSVG = function parseSVG(svgString) {
	const g = this.createElementNS("http://www.w3.org/2000/svg", "g")

	g.innerHTML = svgString

	const identifiedElements = {}

	for (const element of g.querySelectorAll("[id]")) {
		identifiedElements[element.getAttribute("id")] = element
		element.removeAttribute("id")
	}

	return [ g.children[0], identifiedElements ]
}

Node.prototype.appendChildren = function appendChildren(htmlCollection) {
	for (const element of htmlCollection)
		this.appendChild(element)

	return htmlCollection
}

EventTarget.prototype.on = function on(event, action) {
	return this.addEventListener(event, action, false)
}

Set.prototype.map = function map(transformation) {
	return Array.from(this).map(transformation)
}
