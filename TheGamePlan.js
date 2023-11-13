var gamePlanSheetName = "The Game Plan"
var objTransferSheetName = "Objective Transfer"
var archiveSheetName = "Completed Moves"
var savedMovesSheetName = "Saved Moves"
var timeTablesArchiveSheetName = "Time Tables Archive"
var moveToTransferToObjectivesSheetName = "Game Plan Move to Transfer to Objectives"
var checkboxesCounterSheetName = "Game Plan Checkboxes Counter"

var rowOfFirstMove = 19
var rowOfLastMove = 48

var rowOfFirstFutureMove = 50
var rowOfLastFutureMove = 100

function listenForCheckedBox() {
  listenToAddMoveToTimeTableFromEntryField()
  if(getSheet(gamePlanSheetName).getRange(2, 7).getValue()) {
    manageNextMoveSubmission()
  } else {
    var sheet = getSheet(checkboxesCounterSheetName)
    var nCompleted = sheet.getRange("B2").getValue()
    var nTransferToFuture = sheet.getRange("C2").getValue()
    var nSaveMove = sheet.getRange("D2").getValue()
    var nAddToTimeTable = sheet.getRange("E2").getValue()
    var nUseSavedMove = sheet.getRange("F2").getValue()
    
    listenToTransferToObjectives()
    updateTimeTableVisibility()
    if(nCompleted > 0) archiveCompletedMove()
    listenToSaveTimeTable()
    listenForResetCheckboxes()
    listenForMoveTransferCheckbox(nTransferToFuture)
    saveMove(nSaveMove)
    if(nUseSavedMove > 0) useSavedMove()
    if(nAddToTimeTable > 0) addSubmittedMoveToTimeTable()
  }
  updateMoveListRowsVisibility()
  updateFutureMovesRowsVisibility()
}

function addSubmittedMoveToTimeTable() {
  sheet = getSheet(gamePlanSheetName)
  
  for(var row = rowOfFirstMove; row < rowOfLastFutureMove+1; row++) {
    if(row == rowOfLastMove+1) row++
    if(sheet.getRange(row, 11).getValue()) {
      sheet.getRange(row, 11).setValue("FALSE")
      var move = ""
      if(row < rowOfFirstFutureMove) {
        move = sheet.getRange(row, 2).getValue()
      } else {
        move = sheet.getRange(row, 1).getValue()
      }
      var startTime = sheet.getRange(row, 6).getValue()
      listenToAddMoveToTimeTable(move, startTime)
      break
    }
  }
}

function listenToTransferToObjectives() {
  var sheet = getSheet(moveToTransferToObjectivesSheetName)
  if(sheet.getRange("A1").getValue() > 0) {
    sheet = getSheet(gamePlanSheetName)
  
    if(sheet.getRange("J2").getValue()) {
      var move = sheet.getRange(2, 2).getValue()
      sheet.getRange("I4").setValue("TRUE")
      
      sheet = getSheet(moveToTransferToObjectivesSheetName)
      sheet.getRange(1, 2).setValue(move)
      var transferIndex = sheet.getRange(1, 3).getValue()
      sheet.getRange(1, 3).setValue(++transferIndex)
    } else {
      var moveToTransferIsFound = false
    
      for(var row = rowOfFirstMove; row < rowOfLastMove+1; row++) {
        if(sheet.getRange(row, 10).getValue()) {
          moveToTransferIsFound = true
          sheet.getRange(row, 10).setValue("FALSE")
          var move = sheet.getRange(row, 2).getValue()
          
          sheet.getRange(row, 2).setValue("")
          sheet.getRange(row, 5).setValue("TRUE")
          
          sheet = getSheet(moveToTransferToObjectivesSheetName)
          sheet.getRange(1, 2).setValue(move)
          var transferIndex = sheet.getRange(1, 3).getValue()
          sheet.getRange(1, 3).setValue(++transferIndex)
          break
        }
      }
      
      if(!moveToTransferIsFound) {
        for(var row = rowOfFirstFutureMove; row < rowOfLastFutureMove+1; row++) {
          if(sheet.getRange(row, 10).getValue()) {
            moveToTransferIsFound = true
            sheet.getRange(row, 10).setValue("FALSE")
            var move = sheet.getRange(row, 1).getValue()
            
            sheet.getRange(row, 1).setValue("")
            sheet.getRange(row, 5).setValue("")
            sheet.getRange(row, 6).setValue("")
            sheet.getRange(row, 7).setValue("")
            
            sheet = getSheet(moveToTransferToObjectivesSheetName)
            sheet.getRange(1, 2).setValue(move)
            var transferIndex = sheet.getRange(1, 3).getValue()
            sheet.getRange(1, 3).setValue(++transferIndex)
            break
          }
        }
      }
    }
  }
}

function listenForResetCheckboxes() {
  var sheet = getSheet(gamePlanSheetName)
  var resetEntryFieldBool = sheet.getRange(4, 9).getValue()
  var resetTimeTableBool = sheet.getRange(4, 3).getValue()
  var resetFutureTasksBool = sheet.getRange(4, 5).getValue()
  if(resetEntryFieldBool) {
    resetEntryField()
  } else if(resetTimeTableBool) {
    resetTimeTable()
  } else if(resetFutureTasksBool) {
    resetFutureTasks()
  }
}

function resetEntryField() {
  var sheet = getSheet(gamePlanSheetName)
  sheet.getRange(4, 9).setValue("FALSE")
  sheet.getRange(2, 2).setValue("")
  sheet.getRange(3, 2).setValue("")
  sheet.getRange(3, 4).setValue("")
  sheet.getRange(3, 6).setValue("")
}

function resetTimeTable() {
  var sheet = getSheet(gamePlanSheetName)
  sheet.getRange(4, 3).setValue("FALSE")
  for(var row = 7; row < 17; row++) {
    sheet.getRange(row, 2).setValue("")
    sheet.getRange(row, 6).setValue("")
  }
}

function resetFutureTasks() {
  var sheet = getSheet(gamePlanSheetName)
  sheet.getRange(4, 5).setValue("FALSE")
  for(var row = rowOfFirstFutureMove; row < rowOfLastFutureMove + 1; row++) {
    sheet.getRange(row, 1).setValue("")
  }
}

function updateTimeTableVisibility() {
  var sheet = getSheet(gamePlanSheetName)
  var showTimeTableBool = sheet.getRange(6, 7).getValue()
  if(showTimeTableBool) {
    sheet.showRows(7, 10)
  } else {
    sheet.hideRows(7, 10)
  }
}

function updateMoveListRowsVisibility() {
  var sheet = getSheet(gamePlanSheetName)
  for(var row = rowOfFirstMove; row < rowOfLastMove + 1; row++) {
    var move = sheet.getRange(row, 2).getValue()
    if(move != "") {
      sheet.showRows(row)
    } else {
      sheet.hideRows(row)
    }
  }
}

function updateFutureMovesRowsVisibility() {
  var sheet = getSheet(gamePlanSheetName)
  var consolidateFutureMovesIsSelected = false
  if(sheet.getRange("K2").getValue()) consolidateFutureMovesIsSelected = true
  for(var row = rowOfFirstFutureMove; row < rowOfLastFutureMove + 1; row++) {
    var move = sheet.getRange(row, 1).getValue()
    if(move != "" || !consolidateFutureMovesIsSelected) {
      sheet.showRows(row)
    } else {
      sheet.hideRows(row)
    }
  }
}

function manageNextMoveSubmission() {
  var sheet = getSheet(gamePlanSheetName)
  var nextMove = sheet.getRange(2, 2).getValue()
  var expStartTime = sheet.getRange(3, 2).getValue()
  var estDuration = sheet.getRange(3, 4).getValue()
  var numInQueue = sheet.getRange(3, 6).getValue()
  
  sheet.getRange(2, 2).setValue("")
  sheet.getRange(3, 2).setValue("")
  sheet.getRange(3, 4).setValue("")
  sheet.getRange(3, 6).setValue("")
  sheet.getRange(2, 7).setValue("FALSE")
  
  var row = 0
  if(numInQueue != "") {
    row = rowOfFirstMove + numInQueue-1
    sheet.insertRowBefore(row)
    sheet.deleteRow(rowOfLastMove+1)
  } else {
    for(row = rowOfFirstMove; row < rowOfLastMove+1; row++) {
      if(sheet.getRange(row, 2).getValue() == "") break
    }
    if(row == rowOfLastMove+1) row = rowOfLastMove
  }
  
  sheet.getRange(row, 2, 1, 3).merge()
  
  sheet.getRange(row, 2).setValue(nextMove)
  sheet.getRange(row, 6).setValue(expStartTime)
  sheet.getRange(row, 7).setValue(estDuration)
}

function archiveCompletedMove() {
  var sheet = getSheet(gamePlanSheetName)
  for(var row = rowOfFirstMove; row < rowOfLastMove+1; row++) {
    if(sheet.getRange(row, 5).getValue()) {
      sheet.getRange(row, 5).setValue("FALSE")
      sheet.insertRowAfter(rowOfLastMove)
      sheet.getRange(rowOfLastMove+1, 2, 1, 3).merge()
      sheet.hideRows(rowOfLastMove+1)
      sheet.getRange(rowOfLastMove+1, 2).setValue("")
      sheet.getRange(rowOfLastMove+1, 6).setValue("")
      sheet.getRange(rowOfLastMove+1, 7).setValue("")
      
      var move = sheet.getRange(row, 2).getValue()
      var expStartTime = sheet.getRange(row, 6).getValue()
      var estDuration = sheet.getRange(row, 7).getValue()
      sheet.deleteRow(row)
      
      if(move != "") {
        sheet = getSheet(archiveSheetName)
        sheet.insertRowAfter(1)
        sheet.getRange(2, 1).setValue(move)
        sheet.getRange(2, 2).setValue(expStartTime)
        sheet.getRange(2, 5).setValue(estDuration)
        sheet.getRange(2, 3).setValue(new Date())
        sheet.getRange(2, 4).setValue(new Date())
        sheet.getRange(2, 2).setNumberFormat('h:mm:ss am/pm')
        sheet.getRange(2, 3).setNumberFormat('h:mm:ss am/pm')
        sheet.getRange('2:2').setBorder(null, null, true, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID).setFontWeight(null)
      }
      break
    }
  }
}

function listenForMoveTransferCheckbox(nTransferToFuture) {
  var sheet = getSheet(gamePlanSheetName)
  if(sheet.getRange(2, 8).getValue()) {
    transferToFutureMoves(2)
  } else if(nTransferToFuture > 0) {
    for(var row = rowOfFirstMove; row < rowOfLastMove+1; row++) {
      if(sheet.getRange(row, 8).getValue()) {
        transferToFutureMoves(row)
        break
      }
    }
    transferToSubmissionField()
  }
}

function transferToFutureMoves(row) {
  var sheet = getSheet(gamePlanSheetName)
  sheet.getRange(row, 8).setValue("FALSE")
  var move = sheet.getRange(row, 2).getValue()
  var startTime = ""
  var duration = ""
  if(row == 2) {
    startTime = sheet.getRange(3, 2).getValue()
    duration = sheet.getRange(3, 4).getValue()
    sheet.getRange(2, 2).setValue("")
    sheet.getRange(3, 2).setValue("")
    sheet.getRange(3, 4).setValue("")
    sheet.getRange(3, 6).setValue("")
  } else {
    startTime = sheet.getRange(row, 6).getValue()
    duration = sheet.getRange(row, 7).getValue()
    sheet.deleteRow(row)
    sheet.insertRowAfter(rowOfLastMove-1)
    sheet.getRange(rowOfLastMove, 2, 1, 3).merge()
    sheet.hideRows(rowOfLastMove)
    sheet.getRange(rowOfLastMove, 2).setValue("")
    sheet.getRange(rowOfLastMove, 6).setValue("")
    sheet.getRange(rowOfLastMove, 7).setValue("")
    
    sheet.getRange(2, 2).setValue(move)
    sheet.getRange(3, 2).setValue(startTime)
    sheet.getRange(3, 4).setValue(duration)
  }
  
  for(var row = rowOfFirstFutureMove; row < rowOfLastFutureMove+1; row++) {
    if(sheet.getRange(row, 1).getValue() == "") {
      sheet.getRange(row, 1).setValue(move)
      sheet.getRange(row, 6).setValue(startTime)
      sheet.getRange(row, 7).setValue(duration)
      break;
    }
  }
}

function transferToSubmissionField() {
  var sheet = getSheet(gamePlanSheetName)
  for(var row = rowOfFirstFutureMove; row < rowOfLastFutureMove+1; row++) {
    if(sheet.getRange(row, 8).getValue()) {
      var move = sheet.getRange(row, 1).getValue()
      var startTime = sheet.getRange(row, 6).getValue()
      var duration = sheet.getRange(row, 7).getValue()
        
      sheet.getRange(row, 1).setValue("")
      sheet.getRange(row, 5).setValue("")
      sheet.getRange(row, 6).setValue("")
      sheet.getRange(row, 7).setValue("")
      sheet.getRange(row, 8).setValue("FALSE")
        
      sheet.getRange(2, 2).setValue(move)
      sheet.getRange(3, 2).setValue(startTime)
      sheet.getRange(3, 4).setValue(duration)
      break
    }
  }
}

function saveMove(nSaveMove) {
  var sheet = getSheet(gamePlanSheetName)
  var move = ""
  var startTime = ""
  var duration = ""
  var checkedBoxFound = false
  if(sheet.getRange(2, 9).getValue()) {
    sheet.getRange(2, 9).setValue("FALSE")
    checkedBoxFound = true
    move = sheet.getRange(2, 2).getValue()
    startTime = sheet.getRange(3, 2).getValue()
    duration = sheet.getRange(3, 4).getValue()
  } else if(nSaveMove > 0) {
    for(var row = rowOfFirstMove; row < rowOfLastFutureMove+1; row++) {
      if(row != rowOfLastMove+1 && sheet.getRange(row, 9).getValue()) {
        sheet.getRange(row, 9).setValue("FALSE")
        checkedBoxFound = true
        if(row < rowOfFirstFutureMove) {
          move = sheet.getRange(row, 2).getValue()
        } else {
          move = sheet.getRange(row, 1).getValue()
        }
        startTime = sheet.getRange(row, 6).getValue()
        duration = sheet.getRange(row, 7).getValue()
        break
      }
    }
  }
  
  if(checkedBoxFound) {
    sheet = getSheet(savedMovesSheetName)
    sheet.insertRowAfter(2)
    sheet.getRange('3:3').setBorder(null, true, null, true, true, null, '#000000', SpreadsheetApp.BorderStyle.SOLID)
    sheet.getRange(3, 2).setValue(move)
    sheet.getRange(3, 3).setValue(startTime)
    sheet.getRange(3, 4).setValue(duration)
  }
}
  
function useSavedMove() {
  var sheet = getSheet(savedMovesSheetName)
  var nRows = sheet.getRange(2, 5).getValue()
  for(var row = 3; row < nRows + 1; row++) {
    if(sheet.getRange(row, 1).getValue()) {
      sheet.getRange(row, 1).setValue("FALSE")
      var move = sheet.getRange(row, 2).getValue()
      var startTime = sheet.getRange(row, 3).getValue()
      var duration = sheet.getRange(row, 4).getValue()
      
      sheet = getSheet(gamePlanSheetName)
      sheet.getRange(2, 2).setValue(move)
      sheet.getRange(3, 2).setValue(startTime)
      sheet.getRange(3, 4).setValue(duration)
      
      sheet.getRange(2, 7).setValue("TRUE")
      manageNextMoveSubmission()
      break
    }  
  }
}

function listenForObjectives() {
  sheet = getSheet(objTransferSheetName)
  var newestObjective = sheet.getRange(1, 1).getValue()
  var newestTransferIndex = sheet.getRange(1, 2).getValue()
  if(newestTransferIndex != sheet.getRange(1, 3).getValue()) {
    sheet.getRange(1, 3).setValue(newestTransferIndex)
    
    sheet = getSheet(gamePlanSheetName)
    sheet.getRange(2, 2).setValue(newestObjective)
    
    var autoSubmitObjectivesIsSelected = sheet.getRange(4, 11).getValue()
    if(autoSubmitObjectivesIsSelected) {
      sheet.getRange(2, 7).setValue("TRUE")
      manageNextMoveSubmission()
      updateMoveListRowsVisibility()
    } else {
      sheet.getRange(2, 8).setValue("TRUE")
      listenForMoveTransferCheckbox(0)
      updateFutureMovesRowsVisibility()
    }
  }
}

function listenToAddMoveToTimeTableFromEntryField() {
  var sheet = getSheet(gamePlanSheetName)
  var addMoveToTimeTableBool = sheet.getRange(4, 7).getValue()
  if(addMoveToTimeTableBool) {
    sheet.getRange(4, 7).setValue("FALSE")
    sheet.getRange(2, 7).setValue("TRUE")
    var startTime = sheet.getRange(3, 2).getValue()
    var move = sheet.getRange(2, 2).getValue()
    listenToAddMoveToTimeTable(move, startTime)
  }
}

function listenToAddMoveToTimeTable(move, startTime) {
    if(startTime != "") {
      if(startTime == "5:00 AM") {
        addMoveToTimeTable(move, 7, 2)
      } else
      if(startTime == "6:00 AM") {
        addMoveToTimeTable(move, 8, 2)
      } else
      if(startTime == "7:00 AM") {
        addMoveToTimeTable(move, 9, 2)
      } else
      if(startTime == "8:00 AM") {
        addMoveToTimeTable(move, 10, 2)
      } else
      if(startTime == "9:00 AM") {
        addMoveToTimeTable(move, 11, 2)
      } else
      if(startTime == "10:00 AM") {
        addMoveToTimeTable(move, 12, 2)
      } else
      if(startTime == "11:00 AM") {
        addMoveToTimeTable(move, 13, 2)
      } else
      if(startTime == "12:00 PM") {
        addMoveToTimeTable(move, 14, 2)
      } else
      if(startTime == "1:00 PM") {
        addMoveToTimeTable(move, 15, 2)
      } else
      if(startTime == "2:00 PM") {
        addMoveToTimeTable(move, 16, 2)
      } else
      if(startTime == "3:00 PM") {
        addMoveToTimeTable(move, 7, 6)
      } else
      if(startTime == "4:00 PM") {
        addMoveToTimeTable(move, 8, 6)
      } else
      if(startTime == "5:00 PM") {
        addMoveToTimeTable(move, 9, 6)
      } else
      if(startTime == "6:00 PM") {
        addMoveToTimeTable(move, 10, 6)
      } else
      if(startTime == "7:00 PM") {
        addMoveToTimeTable(move, 11, 6)
      } else
      if(startTime == "8:00 PM") {
        addMoveToTimeTable(move, 12, 6)
      } else
      if(startTime == "9:00 PM") {
        addMoveToTimeTable(move, 13, 6)
      } else
      if(startTime == "10:00 PM") {
        addMoveToTimeTable(move, 14, 6)
      } else
      if(startTime == "11:00 PM") {
        addMoveToTimeTable(move, 15, 6)
      } else {
        addMoveToTimeTable(move, 16, 6)
      }
    }
  
}

function addMoveToTimeTable(move, row, column) {
  var sheet = getSheet(gamePlanSheetName)
  var timeTableCellValue = sheet.getRange(row, column).getValue()
  if(timeTableCellValue != "") {
    timeTableCellValue += ", "
  }
  timeTableCellValue += move
  sheet.getRange(row, column).setValue(timeTableCellValue)
}

function listenToSaveTimeTable() {
  var sheet = getSheet(gamePlanSheetName)
  if(sheet.getRange(6, 9).getValue()) {
    sheet.getRange(6, 9).setValue("FALSE")
    if(sheet.getRange(6, 11).getValue()) {
      sheet.getRange(4, 3).setValue("TRUE")
    }
    sheet = getSheet(timeTablesArchiveSheetName)
    sheet.insertRowsBefore(1, 12)
    sheet.getRange('\'The Game Plan\'!A6:I16').copyTo(sheet.getRange(2, 1))
    sheet.getRange(2, 1, 1, 9).merge()
    sheet.getRange(2, 1).setValue("Time Table Saved on: " + new Date)
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
