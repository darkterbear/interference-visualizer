var procsWidth = document.getElementById('procs').offsetWidth
var procsHeight = document.getElementById('procs').offsetHeight

var pagesWidth = document.getElementById('pages').offsetWidth
var pagesHeight = document.getElementById('pages').offsetHeight

var headerHeight = document.getElementsByClassName('header')[0].offsetHeight

var procsSVG = d3
	.select('#procs')
	.append('svg:svg')
	.attr('width', procsWidth)
	.attr('height', procsHeight - headerHeight - 8)

var pagesSVG = d3
	.select('#pages')
	.append('svg:svg')
	.attr('width', pagesWidth)
	.attr('height', pagesHeight - headerHeight - 8)

var speed = 300

var uploadButton = document.getElementById('uploadButton')

uploadButton.onclick = () => {
	var input = document.createElement('input')

	input.setAttribute('type', 'file')
	input.setAttribute('accept', '.json')
	input.onchange = () => {
		const file = input.files[0]

		const fileReader = new FileReader()

		fileReader.readAsText(file)

		fileReader.onload = async e => {
			var state = JSON.parse(fileReader.result)

			drawState(state)
		}
	}

	input.click() // opening dialog
	return false // avoiding navigation
}
