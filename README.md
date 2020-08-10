# Compatibility-Predictor
Compatibility Predictor helps you decide who to hire from a list of applicants. 

This is a Datahouse's take home project.  

## Installation
This project required Node.js, get it at https://nodejs.org/en/.

## To run
Prepare a JSON with an array of applicants and an array of team members as the input in the below format. 

Name it Input.JSON and save it in the same folder as Compatibility_predictor.js.   

```JSON
{
    "team" : [
        {
            "name" : name,
            "attributes" : {
                "intelligence" : integer [1-10],
                "strength" : integer [1-10],
                "endurance" : integer [1-10],
                "spicyFoodTolerance" : integer [1-10]
            }
        }
    ],
    "applicants" : [
        {
            "name" : name,
            "attributes" : {
                "intelligence" : integer [1-10],
                "strength" : integer [1-10],
                "endurance" : integer [1-10],
                "spicyFoodTolerance" : integer [1-10]
            }
        }
    ]
}
```
Then run the below command. 

`node Compatibility_Predictor.js`

It will create/update Output.JSON with an array of applicants with their compatibility score between 0 and 1. 

## How it works
The application takes the difference of the team member's attribute and the applicant's attribute. Then divide it by the maximum difference (9), to keep the value between 0 and 1. 
```Javascript
Math.abs(teamMemberAttribute - applicantAttribute) / 9 
```

The application also estimates what attributes are preferred by each team member by dividing each attribute to the sum of all attributes for that team member. 
```Javascript
teamMemberAttribute / totalAttributes
```
Combining the attribute's preference and the difference to get the attribute score. 
```Javascript
let AttributeScore = Math.abs(teamMemberAttribute - applicantAttribute) / 9 * (teamMemberAttribute/totalAttributes); 
```
Add up all 4 attribute scores from every team member then divide by the number of member in the team. Then 1 subtract that score to get the compatibility score of the applicant.   
```Javascript
score = 1 - (score/(team.length));
```
