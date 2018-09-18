var speed = 300

var procs1SVG
var pages1SVG
var procs2SVG
var pages2SVG

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

			clearCanvas()

			drawState(state)
		}
	}

	input.click() // opening dialog
	return false // avoiding navigation
}
