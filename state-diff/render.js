const procHeight = 48 * 3
const procWidth = 48 * 5

var procsWidth = document.getElementById('procs-1').offsetWidth
var pagesWidth = document.getElementById('pages-1').offsetWidth
var pagesHeight = document.getElementById('pages-1').offsetHeight
var headerHeight = document.getElementsByClassName('header')[0].offsetHeight

var procPages1 = {}
var procPages2 = {}

const drawState = states => {
	procs1SVG = d3
		.select('#procs-1')
		.append('svg:svg')
		.attr('width', procsWidth)
		.attr(
			'height',
			Object.keys(states[0].procs).length * 1.25 * procHeight + 96
		)

	pages1SVG = d3
		.select('#pages-1')
		.append('svg:svg')
		.attr('width', pagesWidth)
		.attr('height', pagesHeight - headerHeight - 8)

	procs2SVG = d3
		.select('#procs-2')
		.append('svg:svg')
		.attr('width', procsWidth)
		.attr(
			'height',
			Object.keys(states[1].procs).length * 1.25 * procHeight + 96
		)

	pages2SVG = d3
		.select('#pages-2')
		.append('svg:svg')
		.attr('width', pagesWidth)
		.attr('height', pagesHeight - headerHeight - 8)

	drawProcs(1, procs1SVG, states[0].current, states[0].procs, procPages1)
	drawPages(1, pages1SVG, states[0].pages, procPages1)

	drawProcs(2, procs2SVG, states[1].current, states[1].procs, procPages2)
	drawPages(2, pages2SVG, states[1].pages, procPages2)
}

const drawProcs = (state, svg, current, procs, procPages) => {
	// draw the links between the procs first
	// procs should be rendered later over the links
	for (var i = 1; i < Object.keys(procs).length; i++) {
		svg
			.append('svg:line')
			.attr('x1', procsWidth / 2)
			.attr('x2', procsWidth / 2)
			.attr('y1', 48 + i * 1.25 * procHeight - 0.25 * procHeight)
			.attr('y2', 48 + i * 1.25 * procHeight)
			.style('stroke', 'lightgray')
			.style('stroke-width', 6)
	}

	var index = 0
	for (i in procs) {
		procPages[i] = { toggled: false, nodes: [] }
		var procGroup = svg.append('svg:g').attr('id', 'proc' + state + '-' + i)
		const proc = procs[i]

		const strokeColor =
			i == current ? '#527aff' : proc.state === 1 ? '#57E5A1' : '#CCCCCC'

		const procId = i
		procGroup
			.append('svg:rect')
			.attr('id', 'proc' + state + '-' + i + '-rect')
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
			togglePageHighlight(procId, procPages, state)
		})

		procGroup
			.append('svg:line')
			.attr('id', 'proc' + state + '-' + i + '-divider')
			.attr('x1', procsWidth / 2 - procWidth / 5)
			.attr('x2', procsWidth / 2 - procWidth / 5)
			.attr('y1', 48 + i * 1.25 * procHeight)
			.attr('y2', 48 + i * 1.25 * procHeight + procHeight)
			.style('stroke', strokeColor)
			.style('stroke-width', 6)

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-id')
			.attr('x', procsWidth / 2 - (7 * procWidth) / 20)
			.attr('y', 70 + index * 1.25 * procHeight + procHeight / 2)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 64)
			.attr('fill', proc.state === 0 ? '#CCCCCC' : 'black')
			.attr('stroke', proc.state === 0 ? '#CCCCCC' : 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return i
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-nrchild')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 48 + index * 1.25 * procHeight + procHeight / 3)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', proc.state === 0 ? '#CCCCCC' : 'black')
			.attr('stroke', proc.state === 0 ? '#CCCCCC' : 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.nr_children
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-nrchild-label')
			.attr('x', procsWidth / 2 + 48 - (7 * procWidth) / 20)
			.attr('y', 48 + index * 1.25 * procHeight + procHeight / 3 - 4)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 18)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'children'
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-nrfree')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 36 + index * 1.25 * procHeight + (procHeight / 3) * 2)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', proc.state === 0 ? '#CCCCCC' : 'black')
			.attr('stroke', proc.state === 0 ? '#CCCCCC' : 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.nr_free_pages
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-nrfree-label')
			.attr('x', procsWidth / 2 + 48 - (7 * procWidth) / 20)
			.attr('y', 36 + index * 1.25 * procHeight + (procHeight / 3) * 2 - 4)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 18)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'free pages'
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-fileid')
			.attr('x', procsWidth / 2 + procWidth / 2 - 32)
			.attr('y', 24 + index * 1.25 * procHeight + procHeight)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 28)
			.attr('fill', proc.state === 0 ? '#CCCCCC' : 'black')
			.attr('stroke', proc.state === 0 ? '#CCCCCC' : 'black')
			.style('text-anchor', 'middle')
			.text(() => {
				return proc.fileid
			})

		procGroup
			.append('svg:text')
			.attr('id', 'proc' + state + '-' + i + '-fileid-label')
			.attr('x', procsWidth / 2 + 48 - (7 * procWidth) / 20)
			.attr('y', 24 + index * 1.25 * procHeight + procHeight - 4)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 18)
			.attr('fill', '#c4c4c4')
			.attr('stroke', '#c4c4c4')
			.text(() => {
				return 'file id'
			})

		index++
	}
}

const pageDimension = 36

const drawPages = (state, svg, pages, procPages) => {
	const pagesPerRow = Math.floor(pagesWidth / (pageDimension * 1.5))

	var row = 0
	var column = 0

	for (var i in pages) {
		if (column >= pagesPerRow) {
			row++
			column = 0
		}

		const page = pages[i]

		const color = page.free ? '#57E5A1' : '#aaaaaa'
		console.log(pagesPerRow)
		const xOffset =
			pagesWidth / 2 -
			(pageDimension * 1.5 * pagesPerRow - 0.5 * pageDimension) / 2

		//console.log(xOffset)
		const pageRect = svg
			.append('svg:rect')
			.attr('id', 'page-' + i)
			.attr('height', pageDimension)
			.attr('width', pageDimension)
			.attr('x', column * pageDimension * 1.5 + xOffset)
			.attr('y', row * pageDimension * 1.5 + 32)
			.attr('rx', 8)
			.attr('ry', 8)
			.attr('fill', color)
			.attr('stroke', '#527aff')
			.attr('stroke-width', 0)

		const pageText = svg
			.append('svg:text')
			.attr('id', 'page-' + i + '-text')
			.attr('x', column * pageDimension * 1.5 + xOffset + pageDimension / 2)
			.attr('y', row * pageDimension * 1.5 + 32 + (3 * pageDimension) / 4)
			.attr('font-family', 'Sofia Pro')
			.attr('font-size', 24)
			.attr('fill', 'white')
			.attr('stroke', 'white')
			.style('text-anchor', 'middle')
			.text(() => {
				return page.owner
			})

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
	var thisProcPages1 = procPages1[procId]
	var thisProcPages2 = procPages2[procId]

	if (!thisProcPages1 || !thisProcPages2) return

	const on = !thisProcPages1.toggled
	thisProcPages1.toggled = on
	thisProcPages2.toggled = on

	const newStrokeWidth = on ? 4 : 0
	const newProcBorderWidth = on ? 12 : 6

	thisProcPages1.nodes.forEach(pageRect => {
		pageRect
			.transition()
			.attr('stroke-width', newStrokeWidth)
			.duration(speed)
	})

	thisProcPages2.nodes.forEach(pageRect => {
		pageRect
			.transition()
			.attr('stroke-width', newStrokeWidth)
			.duration(speed)
	})

	// highlight this proc
	selectByD3Id('proc1-' + procId + '-rect')
		.transition()
		.attr('stroke-width', newProcBorderWidth)
		.duration(speed)

	// TODO: highlight field diffs

	selectByD3Id('proc2-' + procId + '-rect')
		.transition()
		.attr('stroke-width', newProcBorderWidth)
		.duration(speed)

	// TODO: if "on" is false, that means they are deactivating their selection,
	// make everything visible opacity, no more observation overlay or diff highlights

	// unhighlight the pages and the proc that don't belong to this procId
	for (var id in procPages1) {
		if (id == procId) continue

		// TODO: make these procs de-emphasized (opacity down to 20%)

		var unhighlightProcPages = procPages1[id]

		if (!unhighlightProcPages.toggled) continue

		selectByD3Id('proc1-' + id + '-rect')
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

	for (var id in procPages2) {
		if (id == procId) continue

		// TODO: make these procs de-emphasized (opacity down to 20%)

		var unhighlightProcPages = procPages2[id]

		if (!unhighlightProcPages.toggled) continue

		selectByD3Id('proc2-' + id + '-rect')
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
	if (procs1SVG) procs1SVG.remove()
	if (pages1SVG) pages1SVG.remove()
	if (procs2SVG) procs2SVG.remove()
	if (pages2SVG) pages2SVG.remove()
}
