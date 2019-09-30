library(xml2)
library(data.table)

dirToRScript <- dirname(rstudioapi::getSourceEditorContext()$path)
pathAnvilXML1 <- paste0(dirToRScript, "/2019_09_05_17_12_01.anvil")
pathAnvilXML2 <- paste0(dirToRScript, "/2019_09_21_12_27_29.anvil")

dataEvents1 <- getEventsData(pathAnvilXML1)
dataEvents2 <- getEventsData(pathAnvilXML2)
dataEvents <- rbind(dataEvents1, dataEvents2)
paste0("Loaded ", NROW(dataEvents), " events.")
grouped <- dataEvents[, .N, by=eventName]
grouped[order(eventName)]
#

getEventsData <- function(filePath) {
  xmlFile <- read_xml(filePath)
  events <- xml_find_all(xmlFile, ".//el")
  result <- data.table()
  for (i in 1:NROW(events)) {
    start <- xml_attr(events[i], "start")
    end <- xml_attr(events[i], "end")
    child <- xml_children(events[i])
    eventName <- as.character(xml_contents(child))
    
    result <- rbind(result, data.table(start=as.numeric(start),
                                       end=as.numeric(end), 
                                       eventName=eventName))
  }
  return (result)
}

