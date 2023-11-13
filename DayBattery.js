var currentTimeSheet = "Current Time"
var barSheet = "Clock Calculator"
var loadingBarSheet = "Loading Bar"
var batterySheet = "Day Battery"
var nBarRows = 96

function updateLoadingBarClock() {
  var sheet = getSheet(currentTimeSheet)
  sheet.getRange(1, 1).setValue(new Date())
  
  var hour = sheet.getRange(1, 2).getValue()
  var minute = sheet.getRange(1, 3).getValue()
  
  sheet = getSheet(barSheet)
  
  var fillUpToThisRow = -1
  
  for(var row = nBarRows; row > 0; row--) {
    barHour = sheet.getRange(row, 2).getValue()
    barMinute = sheet.getRange(row, 3).getValue()
    
    if(hour == barHour) {
      
      if(minute > 45 && barMinute == 45) {
        fillUpToThisRow = row
        break
      } else if(minute > 45 && barMinute != 45) {
        // do nothing
      } else if(minute > 30 && barMinute == 30) {
        fillUpToThisRow = row
        break
      } else if(minute > 30 && barMinute != 30) {
        // do nothing
      } else if(minute > 15 && barMinute == 15) {
        fillUpToThisRow = row
        break
      } else if(minute > 15 && barMinute != 15) {
        // do nothing
      } else {
        fillUpToThisRow = row
        break
      }
    }
  }
  
  sheet.getRange(1, 1, nBarRows, 3).setBackground('#666666').setFontColor('#cccccc')
  var color = ""
  if(hour > 21) {
    color = "#351c75"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#ffffff')
  } else if(hour > 19) {
    color = "#1155cc"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#ffffff')
  } else if(hour > 17) {
    color = "#e69138"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#ffffff')
  } else if(hour > 14) {
    color = "#f1c232"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#000000')
  } else if(hour > 10) {
    color = "#ffff00"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#000000')
  } else if(hour > 6) {
    color = "#6d9eeb"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#ffffff')
  } else {
    color = "#351c75"
    sheet.getRange(row, 1, (nBarRows - row + 1), 3).setFontColor('#ffffff')
  }
  sheet.getRange(row, 1, (nBarRows - row + 1), 3).setBackground(color)
  updateHorizontalBar(hour, minute)
}

function updateHorizontalBar(hour, minute) {
  var sheet = getSheet(barSheet)
  var hourLeft = 24 - hour - 1
  var minLeft = 60 - minute
  if(minLeft == 0) {
    hourLeft += 1
    minLeft = 0
  }
  var timeLeft = "Time Remaining: " + hourLeft + "hrs " + minLeft + "mins"
  var barColor = sheet.getRange(nBarRows, 1).getBackground()
  var lastGrayRow = 0
  for(var row = 1; row < nBarRows+1; row++) {
    if(sheet.getRange(row, 1).getBackground() != '#666666') {
      lastGrayRow = row - 1
      break
    }
  }
  if(lastGrayRow != 0) {
    var firstGrayColumn = nBarRows - lastGrayRow + 1
    var percentageComplete = ((nBarRows - lastGrayRow) / nBarRows) * 100
    percentageComplete = Math.round(percentageComplete)
    percentageComplete += "% complete"
    sheet = getSheet(loadingBarSheet)
    sheet.getRange(1, 1, 1, nBarRows).setBackground(barColor)
    sheet.getRange(1, firstGrayColumn, 1, lastGrayRow).setBackground('#efefef')
    sheet.getRange(4,1).setValue(new Date())
    sheet.getRange(5,1).setValue(timeLeft)
    sheet.getRange(5,nBarRows/2+1).setValue(percentageComplete)
  }
  updateBatteryClock(lastGrayRow, timeLeft)
}

function updateBatteryClock(lastGrayRow, timeLeft) {
  var percentageRemaining = (lastGrayRow / nBarRows) * 100
  percentageRemaining = Math.round(percentageRemaining)
  percentageRemaining += "% remaining"
  var sheet = getSheet(batterySheet)
  sheet.getRange(1,3).setValue(percentageRemaining)
  sheet.getRange(1,2).setValue(timeLeft)
  sheet.getRange(1,1).setValue(new Date())
  var nGrayRows = nBarRows - lastGrayRow
  var batteryColor = '#6aa84f'
  if(lastGrayRow < ((2.0/5.0)*nBarRows)) batteryColor = '#e69138'
  if(lastGrayRow < ((1.0/5.0)*nBarRows)) batteryColor = '#dd7e6b'
  sheet.getRange(2, 1, nBarRows, 1).setBackground(batteryColor)
  sheet.getRange(2, 1, nGrayRows, 1).setBackground('#666666')
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
