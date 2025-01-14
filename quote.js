
//MAKING HTML AND JS COMMUNICATE

//1. IMPORT THE JS FILE INTO THE HTML FOOTER

//2. IMPORT THE INDIVIDUAL HTML ELEMENTS INTO YOUR JAVASCRIPT TO ADD FUNCTIONALITY TO THEM

//build form in html and bring over pieces that need functionality (number of floors, radio buttons, etc.) then make variables

//BUILDING TYPE BUTTONS
const residentialButton = document.getElementById("residentialButton")
const commercialButton = document.getElementById("commercialButton")
const industrialButton= document.getElementById("industrialButton")

//INPUT DIV CONTAINERS
const divNumOfApartments = document.getElementById("div-number-of-apartments")
const divNumOfFloors = document.getElementById("div-number-of-floors")
const divNumOfElevators = document.getElementById("div-number-of-elevators")
const divMxOccupancy = document.getElementById("div-maximum-occupancy")


//INPUT FIELDS FOR USER
const inputApartments = document.getElementById("number-of-apartments")
const inputFloors = document.getElementById("number-of-floors")
const inputElevators = document.getElementById("number-of-elevators")
const inputMaxOccupancy = document.getElementById("maxmimum-occupancy")


//CLASS TIER TYPE BUTTONS
const standardtierButton = document.getElementById("standardtierButton")
const premiumtierButton = document.getElementById("premiumtierButton")
const excelliumtierButton= document.getElementById("excelliumtierButton")

//INPUT DIV CONTAINERS 2
const divElevatorsReq= document.getElementById("div-elevators-required")
const divCostperUnit= document.getElementById("div-cost-per-unit")
const divNumberOfElevators = document.getElementById("div-number-of-elevators")
const divTotalCost = document.getElementById("div-maximum-occupancy")


//OUTPUT FIELDS FOR USER 2
const inputReq4Elevators = document.getElementById("elevators-required")
const inputCostperUnit = document.getElementById("cost-per-unit")
const inputInstallationFees = document.getElementById("installation-fees")
const inputTotalCost= document.getElementById("total-cost")



//SHOWING AND HIDING INPUT FIELDS BASED ON BUILDING TYPE


//HIDING ALL INPUTS
divNumOfApartments.style.display = "none"
divNumOfElevators.style.display = "none"
divNumOfFloors.style.display = "none"
divMxOccupancy.style.display = "none"

//COMMERCIAL
//number of floors
//maximum occupancy
commercialButton.addEventListener("click", () => {
    divMxOccupancy.style.display = "block"
    divNumOfFloors.style.display = "block"
    divNumOfApartments.style.display = "none"
    divNumOfElevators.style.display = "none"
})

//INDUSTRIAL
//number of elevators
industrialButton.addEventListener("click", () => {
    divNumberOfElevators.style.display = "block"
    divNumOfApartments.style.display = "none"
    divNumOfFloors.style.display = "none"
    divMxOccupancy.style.display = "none"
})

//RESIDENTIAL
//number of floors
//number of apartments
residentialButton.addEventListener("click", () => {
    divNumOfApartments.style.display = "block"
    divNumOfFloors.style.display = "block"
    divMxOccupancy.style.display = "none"
    divNumOfElevators.style.display = "none"
})


// If the type of building is Industrial, the number of elevators required is equal to the number entered in the input.

inputElevators.addEventListener("input", () => {
    if(inputElevators.value < 0){
        inputElevators.value = 0;
        return;
    }
    inputReq4Elevators.value = inputElevators.value

    calculateFinalValues()

})


//============================================RESIDENTIAL SECTION============================================//


// If the type of building is Residential, 
// divide the number of apartments by the number of floors to obtain an average of apartments per floor 
// and require an elevator for every 6 apartments per floor. 
// If the building has more than 20 stories, 
// it is necessary to provide an additional elevator bank and thus double the number of elevators.
//  A new elevator bank is therefore added to each new group of 20 stories.

const ResidentialMath = () => {
    //input is so that you take input from the user in order to start providing calculations
    //number of apartments
    const numberOfApartments = inputApartments.value

    //number of floors
    const numberOfFloors = inputFloors.value

    //average apartments per floor
    const averageApartmentsPerFloor = Math.ceil(numberOfApartments/numberOfFloors)

    //required elevators
    const requiredElevators = Math.ceil(averageApartmentsPerFloor/6)

    //elevator banks
    const elevatorBanks = Math.ceil(numberOfFloors/20)

    //total elevators
    const totalElevators = Math.ceil(requiredElevators * elevatorBanks)

    //displaying the elevators to the user
    inputReq4Elevators.value = totalElevators

    calculateFinalValues()
    
}

//event listener island
inputApartments.addEventListener("input", () => {
    if(inputApartments.value < 0){
        inputApartments.value = 0;
        return;
    }
    ResidentialMath()

})


//============================================COMMERCIAL SECTION============================================//


// If the type of building is Commercial, multiply the maximum occupancy per floor by the number of floors to obtain the total number of occupants.
// The number of elevators required per elevator bank is determined by dividing the total number of occupants by 200.
// The number of elevator banks required is determined by dividing the number of floors by 10, as opposed to 20 for residential buildings.
// In addition, for commercial buildings, each elevator bank must have an additional elevator for freight.


const commercialMath = () => {
    //Getting the maximum occupancy provided by the user in the input field
    const maximumOccupancy = inputMaxOccupancy.value

    //Getting the number of floors provided by the user in the input field
    const numberOfFloors = inputFloors.value

    //First step of math, getting the total number of occupants
    //math.ciel will be a built in tool to round to whole numbers
    const totalNumberOfOccupants = Math.ceil(maximumOccupancy * numberOfFloors)

    //Second step of math, getting the number of elevators required per bank
    const numOfElevators = Math.ceil(totalNumberOfOccupants/200)
    
    //Third step of math, getting the number of elevator banks required by dividing the number of floors by 10
    const numofElevatorBanks = Math.ceil(numberOfFloors/10)

    //Final step of math, getting the total elevators by multipying the number of elevators by the number of banks and adding the number of banks
    const numofTotalElevators = Math.ceil(numOfElevators * numofElevatorBanks + numofElevatorBanks)

    //displaying the elevators to the user
    inputReq4Elevators.value = numofTotalElevators

    calculateFinalValues()
}


//event listener island for a "triggering" event
inputMaxOccupancy.addEventListener("input", () => {
    if(inputMaxOccupancy.value < 0){
        inputMaxOccupancy.value = 0;
        return;
    }
    commercialMath()

})

//SEPARATE FROM THE CODE ABOVEm specific to having an "input.Floors" variable for "triggering" event

inputFloors.addEventListener("input", () => {

    if(inputFloors.value < 0){
        inputFloors.value = 0
        return
    }

    if(residentialButton.checked){
        ResidentialMath()

    }else if (commercialButton.checked){
        commercialMath()
    }
})


//=================================================PRODUCT TIER EVENT LISTENERS=================================================//

//DRY rule, Dont Repeat Yourself

//Take the math and put it in its own function

//Pass the function the numbers for each tiers unit and instillation cost



//Fill in function parameters to recieve install cost and unit cost
const calculateFinalValues  = () => {

    //declare unitCost and installFee using let
    let unitCost = 0;
    let installFee = 0;


    //use an if statement to confirm which button is pressed

    if (standardtierButton.checked) {
        unitCost = 8000
        installFee = .10
    }else if (premiumtierButton.checked){
        unitCost = 12000
        installFee = .15
    }else if(excelliumtierButton.checked){
        unitCost = 15000
        installFee = .20
    }else{
        return
    }


    //inside that if statement you could change the value of unitCost and InstallFee


    //get the number of elevators required
    const numberOfElevators = inputReq4Elevators.value

    //Get the pre install cost, by multiplying the number of elevators by the unit cost
    const preinstallCost = Math.ceil(numberOfElevators * unitCost)

    //instillation cost by multplying the pre install cost by the install fee
    const installCost = Math.ceil(preinstallCost * installFee)

    //Get the final cost by adding the pre install cost and the instillation cost
    const finalCost = Math.ceil(preinstallCost + installCost)


    //display the pre install cost, the istillation cost, and the final cost to the user using .value on the matching output field
    inputCostperUnit.value = USDollar.format(preinstallCost)
    inputInstallationFees.value = USDollar.format(installCost)
    inputTotalCost.value = USDollar.format(finalCost)
   
}

//Call this function with your event listeners
//pass it the unit cosr and installation fee


//STANDARD TIER
standardtierButton.addEventListener("click", () => {
    
    calculateFinalValues()
})

//PREMIUM TIER
premiumtierButton.addEventListener("click", () => {

    calculateFinalValues()

})

//EXELLIUM TIER
excelliumtierButton.addEventListener("click", () => {

    calculateFinalValues()

})

//PRO TIP FOR ABOVE FUNCTION
    //   .value is only used on variables which have an assigned value that is html code ( i.e. document.getElementById("") )


//CURRENCY FORMATTER

const USDollar = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD"

//POSITIVE NUMBERS ONLY 


})