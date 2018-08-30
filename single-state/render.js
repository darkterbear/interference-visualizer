const procHeight = 48 * 3
const procWidth = 48 * 5

var procsWidth = document.getElementById('procs').offsetWidth
var pagesWidth = document.getElementById('pages').offsetWidth
var headerHeight = document.getElementsByClassName('header')[0].offsetHeight

const drawState = state => {
	procsSVG = d3
		.select('#procs')
		.append('svg:svg')
		.attr('width', procsWidth)
		.attr('height', Object.keys(state.procs).length * 1.25 * procHeight + 96)

	// pagesSVG = d3
	// 	.select('#pages')
	// 	.append('svg:svg')
	// 	.attr('width', pagesWidth)
	// 	.attr('height', pagesHeight - headerHeight - 8)

	drawProcs(state.current, state.procs)
	// drawPages(state.pages)
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
		var procGroup = procsSVG.append('svg:g').attr('id', 'proc-' + i)
		const proc = procs[i]

		const strokeColor =
			i == current ? '#527aff' : proc.state === 1 ? '#57E5A1' : '#F05056'

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
