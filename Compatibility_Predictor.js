
function start(inputFile, outputFile){
    const input = require(`./${inputFile}.json`); 
    let fs = require("fs");
    let output = { "scoredApplicants" : [] };

    for(let i = 0; i < input.applicants.length; i++ ){
        let name = input.applicants[i].name;
        let score = calculateScore(input.team, input.applicants[i] );
        output.scoredApplicants.push({"name":name,"score":score});
    }

    //create/write output to json
    fs.writeFile(`./${outputFile}.json`, JSON.stringify(output, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    }); 
}

function calculateScore( team, applicant ){
    let score = 0;
    for(let i = 0; i < team.length; i++){
        let totalAttributes = getTotalAttributes(team[i]);
        score += calculateAttributeScore(team[i].attributes.intelligence, applicant.attributes.intelligence, totalAttributes)
        score += calculateAttributeScore(team[i].attributes.strength, applicant.attributes.strength, totalAttributes);
        score += calculateAttributeScore(team[i].attributes.endurance,applicant.attributes.endurance, totalAttributes);
        score += calculateAttributeScore(team[i].attributes.spicyFoodTolerance, applicant.attributes.spicyFoodTolerance, totalAttributes);
        //console.log(`Attrubutes score : ${score}`);
    }
    score = 1 - (score/(team.length));
    console.log(`${applicant.name} score : ${score}`);
    return score.toFixed(1) ;
}

//return the different of two Attributes with ratio to the total attributes
function calculateAttributeScore(teamMemberAttribute, applicantAttribute, totalAttributes){
    //different of two attributes divide by 9 (max different between two attributes, 1 and 10) times the ratio of that attribute to total attributes
    let attributeScore = Math.abs(teamMemberAttribute - applicantAttribute) / 9 * (teamMemberAttribute/totalAttributes); 
    //console.log(`Attribute score : ${attributeScore}`);
    return attributeScore;
}

//return sum of attributes of a person
function getTotalAttributes(person){
    let attributes = person.attributes;
    let totalAttributes = attributes.intelligence + attributes.strength + attributes.endurance + attributes.spicyFoodTolerance;
    //console.log(`total Attributes : ${totalAttributes}`);
    return totalAttributes;
}

start('Input', 'Output');
//start('Input_V2','Output_V2');
//start('Input_V3','Output_V3');


