const csv = require('csv')
const fs = require('fs')
const path = require('path')
//
fs.readFile(path.join(__dirname, './customer-data.csv'), {encoding: 'utf-8'}, function(error, data) {
	if (error) return console.error(error)
	var converted = '['
	csv.parse(data, {}, function(error, output) {
		if (error) return console.error(error)
		const headers = output.shift()
		for (i = 0; i < output.length; i++) {
			converted += '{'
			for (j = 0; j < headers.length; j++) {
				converted += '"' + headers[j] + '":"' + output[i][j] + '"'
				if (j != headers.length-1) {
					converted += ','
				}
			}
			converted += '}'
			if (i != output.length-1) {
				converted += ',\n'
			}
		}
		converted += ']'
		const parsedJSON = JSON.parse(converted)
		// wanted to use it to see if the JSON was formatted correctly.
		const convertedAgain = JSON.stringify(parsedJSON)
		fs.writeFile(path.join(__dirname, './customer-data.json'), convertedAgain, 'utf-8', function(error) {
			if (error) return console.error(error)
			console.log('Finished')
		})
		// console.log(converted)
		// console.log(parsedJSON)
	})
})