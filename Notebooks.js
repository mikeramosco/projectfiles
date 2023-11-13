var submissionSheetName = "New Note Submission"
var trackerSheetName = "Notes"
var archiveSheetName = "Archive"

function checkForNewSubmission() {
  if(getSheet(submissionSheetName).getRange("C1").getValue()) manageNewSubmittedProjectDetails()
  archiveSubmissions()
}

function manageNewSubmittedProjectDetails() {
  var sheet = getSheet(submissionSheetName)
  var notebook = sheet.getRange("B1").getValue()
  var note = sheet.getRange("B2").getValue()
  
  sheet.getRange("B1").setValue("")
  sheet.getRange("B2").setValue("")
  sheet.getRange("C1").setValue("FALSE")
  
  sheet = getSheet(trackerSheetName)
  sheet.insertRowAfter(1)
  sheet.getRange("A2").setValue(notebook)
  sheet.getRange("B2").setValue(note)
  sheet.getRange("B2").setHorizontalAlignment('left')
  sheet.getRange("C2").setValue(new Date())
  sheet.getRange("D2").setDataValidation(SpreadsheetApp.newDataValidation()
  .setAllowInvalid(true)
  .requireCheckbox()
  .build())
  sheet.getRange('2:2').setBackground('#ffffff').setFontColor('#000000').setVerticalAlignment('middle').setFontSize(20).setFontWeight(null)
  .setBorder(null, null, true, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID)
}

function archiveSubmissions() {
  for(var row = 2; row < 1000; row++) {
    var sheet = getSheet(trackerSheetName)
    if(sheet.getRange(row, 4).getValue()) {
      var dateAdded = sheet.getRange(row, 3).getValue()
      var note = sheet.getRange(row, 2).getValue()
      var notebook = sheet.getRange(row, 1).getValue()
      sheet.deleteRow(row)
      
      sheet = getSheet(archiveSheetName)
      sheet.insertRowAfter(1)
      sheet.getRange("A2").setValue(notebook)
      sheet.getRange("B2").setValue(note)
      sheet.getRange("C2").setValue(dateAdded)
      sheet.getRange("D2").setValue(new Date())
      break
    }
  }
}

// helper functions

function getSheet(sheetname) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname)
  return sheet
}

function rowOf(value, column, maxcount, sheet) {
  for(var row = 1; row < maxcount + 1; row++)
    if(sheet.getRange(row, column).getValue() == value)
      return row
}

function columnOf(value, row, maxcount, sheet) {
  for(var column = 1; column < maxcount + 1; column++)
    if(sheet.getRange(row, column).getValue() == value)
      return column
}
