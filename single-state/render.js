const procHeight = 48 * 3
const procWidth = 48 * 5

var procsWidth = document.getElementById('procs').offsetWidth
var pagesWidth = document.getElementById('pages').offsetWidth
var pagesHeight = document.getElementById('pages').offsetHeight
var headerHeight = document.getElementsByClassName('header')[0].offsetHeight

var procPages = {}

const drawState = state => {
	procsSVG = d3
		.select('#procs')
		.append('svg:svg')
		.attr('width', procsWidth)
		.attr('height', Object.keys(state.procs).length * 1.25 * procHeight + 96)

	pagesSVG = d3
		.select('#pages')
		.append('svg:svg')
		.attr('width', pagesWidth)
		.attr('height', pagesHeight - headerHeight - 8)

	drawProcs(state.current, state.procs)
	drawPages(state.pages)
}

const drawProcs = (current, procs) => {
	// draw the links between the procs first
	// procs should be rendered later over the links
	for (var i = 1; i < Object.keys(procs).length; i++) {
		procsSVG
			.append('svg:line')
			.attr('x1', procsWidth / 2 - procWidth / 4)
			.attr('x2', procsWidth / 2 - procWidth / 4)
			.attr('y1', 48 + i * 1.25 * procHeight - 0.25 * procHeight)
			.attr('y2', 48 + i * 1.25 * procHeight)
			.style('stroke', 'lightgray')
			.style('stroke-width', 6)
	}

	var index = 0
	for (i in procs) {
		procPages[i] = { toggled: false, nodes: [] }
		var procGroup = procsSVG.append('svg:g').attr('id', 'proc-' + i)
		const proc = procs[i]

		const strokeColor =
			i == current ? '#527aff' : proc.state === 1 ? '#57E5A1' : '#F05056'

		const procId = i
		procGroup
			.append('svg:rect')
			.attr('id', 'proc-' + i + '-rect')
			.attr('height', procHeight)
			.attr('width', procWidth)
			.attr('x', procsWidth / 2 - procWidth / 2)
			.attr('y', 48 + index * 1.25 * procHeight)
			.attr('rx', 16)
			.attr('ry', 16)
			.attr('fill', 'white')
			.attr('stroke', strokeColor)
			.attr('stroke-width', 6)
		// .on('click', () => {
		// 	togglePageHighlight(procId)
		// })

		procGroup.on('click', () => {
			togglePageHighlight(procId)
		})

		procGroup
			.append('svg:line')
			.attr('id', 'proc-' + i + '-divider')
			.attr('x1', procsWidth / 2)
			.attr('x2', procsWidth / 2)
			.attr('y1', 48 + i * 1.25 * procHeight)
			.attr('y2', 48 + i * 1.25 * procHeight + procHeight)
			.style('stroke', strokeColor)
			.style('stroke-width', 6)

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-id')
			.attr('x', procsWidth / 2 - procWidth / 4)
			.attr('y', 48 + 28 + index * 1.25 * procHeight + procHeight / 2)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 84)
			.attr('fill', 'black')
			.attr('stroke', 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return i
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrchild')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 48 + index * 1.25 * procHeight + procHeight / 3)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', 'black')
			.attr('stroke', 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.nr_children
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrchild')
			.attr('x', procsWidth / 2 + 16)
			.attr('y', 48 + index * 1.25 * procHeight + procHeight / 3)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'C'
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrfree')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 36 + index * 1.25 * procHeight + (procHeight / 3) * 2)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', 'black')
			.attr('stroke', 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.nr_free_pages
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrchild')
			.attr('x', procsWidth / 2 + 16)
			.attr('y', 36 + index * 1.25 * procHeight + (procHeight / 3) * 2)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'F'
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrfree')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 24 + index * 1.25 * procHeight + procHeight)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', 'black')
			.attr('stroke', 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.fileid
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc-' + i + '-nrchild')
			.attr('x', procsWidth / 2 + 16)
			.attr('y', 24 + index * 1.25 * procHeight + procHeight)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'FI'
			})

		index++
	}
}

const pageDimension = 36

const drawPages = pages => {
	const pagesPerRow = Math.floor(pagesWidth / (pageDimension * 1.5))

	var row = 0
	var column = 0

	for (var i in pages) {
		if (column >= pagesPerRow) {
			row++
			column = 0
		}

		console.log(row + ' ' + column)

		const page = pages[i]

		const color = page.free ? '#57E5A1' : '#aaaaaa'

		const pageRect = pagesSVG
			.append('svg:rect')
			.attr('id', 'page-' + i)
			.attr('height', pageDimension)
			.attr('width', pageDimension)
			.attr('x', column * pageDimension * 1.5 + 32)
			.attr('y', row * pageDimension * 1.5 + 32)
			.attr('rx', 8)
			.attr('ry', 8)
			.attr('fill', color)
			.attr('stroke', '#527aff')
			.attr('stroke-width', 0)

		procPages[page.owner].nodes.push(pageRect)
		// if (procPages[page.owner]) {
		// 	procPages[page.owner].nodes.push(pageRect)
		// } else {
		// 	procPages[page.owner] = { toggled: false, nodes: [pageRect] }
		// }

		column++
	}
}

const togglePageHighlight = procId => {
	// highlight the pages that belong to this procId
	var thisProcPages = procPages[procId]

	if (!thisProcPages) return

	const on = !thisProcPages.toggled
	thisProcPages.toggled = on

	const newStrokeWidth = on ? 4 : 0
	const newProcBorderWidth = on ? 12 : 6

	thisProcPages.nodes.forEach(pageRect => {
		pageRect
			.transition()
			.attr('stroke-width', newStrokeWidth)
			.duration(speed)
	})

	// highlight this proc
	selectByD3Id('proc-' + procId + '-rect')
		.transition()
		.attr('stroke-width', newProcBorderWidth)
		.duration(speed)

	// unhighlight the pages and the proc that don't belong to this procId
	for (var id in procPages) {
		if (id == procId) continue

		var unhighlightProcPages = procPages[id]

		if (!unhighlightProcPages.toggled) continue

		selectByD3Id('proc-' + id + '-rect')
			.transition()
			.attr('stroke-width', 6)
			.duration(speed * 2)

		unhighlightProcPages.toggled = false

		unhighlightProcPages.nodes.forEach(pageRect => {
			pageRect
				.transition()
				.attr('stroke-width', 0)
				.duration(speed)
		})
	}
}

const clearCanvas = () => {
	if (procsSVG) procsSVG.remove()
	if (pagesSVG) pagesSVG.remove()
}
