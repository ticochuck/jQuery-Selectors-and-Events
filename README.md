# jQuery-Selectors-and-Events

# Overview

In labs 2 and 3, you and your partner(s) will be using the provided JSON files to create a photo gallery. You will style it using floats.

## Feature #1: Display images

**Why are we implementing this feature?**

- As a user, I want to view the images on the page so that I can browse the photo collection.

**What are we going to implement?**

- Given that a user opens the application in the browser When the user navigates to the home page Then the photo gallery should display all of the images in the gallery

**How are we implementing it?**

- Use AJAX, specifically $.ajax(), to read the provided JSON file.
- Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.
- Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.

_Estimate of time needed to complete: 1.5 hrs_

_Start time: 9:15_

_Finish time: 9:45_

_Actual time needed to complete: 30  minutes_


## Feature #2: Filter images

Why are we implementing this feature?

- As a user, I want to be able to filter the images so that I can view only images that match a keyword.

**What are we going to implement?**

- Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed

**How are we implementing it?**

- Create a \<select> element which contains unique \<option> elements extracted dynamically from the JSON file, one for each keyword.
- Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

_Estimate of time needed to complete: 1.5 hrs_

_Start time: 1_

_Finish time: 1_

_Actual time needed to complete: 1_

## Feature #3: Style the application

**Why are we implementing this feature?**

- As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images in a grid like pattern.

**What are we going to implement?**

- Given that a user opens the application in the browser When the user navigates to the home page Then the images should be displayed in rows across the screen

**How are we implementing it?**

- Style your application using floats.
- Utilize at least one Google font.

_Estimate of time needed to complete: 1.5 hrs_

_Start time: 1_

_Finish time: 1_

_Actual time needed to complete: 1_

## Stretch Goal: Sort the images

**Why are we implementing this feature?**

As a user, I want to be able to sort the images so there is an order to how they render.

**What are we going to implement?**

Given that a user is presented with sort options When the user clicks on one option Then the images should be sorted accordingly

**How are we implementing it?**

Add the ability for the user to sort the images by either title or by number of horns.
Sort the images by one of the properties on page load. This should also apply to the second page of images.

_Estimate of time needed to complete: 1.5 hrs_

_Start time: 1_

_Finish time: 1_

_Actual time needed to complete: 1_

__A question within the context of today's lab assignment__
What is the purpose of doing the clone html? Instead of doing that, I was doing this to append to the DOM: 
```
 $('#photo-template').append(`<div> <h2>${object.title}</h2>, <img src="${object.image_url}">, <br> <span>${object.description}</span> <br> <span> ${object.keyword}</span></div>` );
 ```


__An observation about the lab assignment, or related 'Ah-hah!' moment__
I was creating an event listener for the select on click. It took me a while to realize that I needed to use on change. 

__How long you spent working on this assignment__
3 hours +

# References

- https://www.w3schools.com/jsref/jsref_includes_array.asp

- https://github.com/codefellows/seattle-301n17/blob/master/class-02/demo/read-json/app.js


# Author 
- Chuck Li Villalobos

# License
- This project is licensed under the MIT License. 
