# Train Schedule

## Problem 
Create an application that displays train times from a Firebase database and allows site visitors to input in new train data which is saved to the database and then used to calculate the next arrival time and minutes away for each train. 

## Application Description 
This web application allows visitors to view a table with the names, destinations, frequencies, next arrivals and minutes to next arrivals of current trains stored in its Firebase database. The next arrival and minutes to next arrival columns are updated every 60 seconds. Visitors can also use the form on the page to add new trains to the database. They must provide the name, destination, frequency, and first arrival time. Next arrival time and minutes to next arrival time will be calculated upon data retrieval. 

## Technical Approach
Logic was written to capture user inputs and store them in Firebase database. A function is set to run on any changes to the database and then use values to calculate the minutes to next train arrival and next time arriving using the Moment.js library. These values are then dynamically displayed to the HTML in a table. 

## https://lexi-winstanley.github.io/TrainSchedule/
