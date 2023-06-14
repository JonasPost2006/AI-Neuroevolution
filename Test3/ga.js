function nextGeneration(){
    calculateFitness();
    for(let i = 0; i < TOTAL; i++){
        cars[i] = pickOne();
    }
    savedCars = [];
    console.log("Next gen");
}

function pickOne(){
    let car = random(savedCars); //Pak een random car
    let child = new Car(carX, carY, width, height, car.brain); //Maak een nieuwe car met hetzelfde brein
    child.mutate(); //muteer de car zodat hij nieuwe weights krijgt
    return child;
}

function calculateFitness(){ //hier wordt de fitness (gezondheid, hoe goed de autos zijn) berekent
    let sum = 0;
    for(let car of savedCars){
        sum += car.score;
    }
    for(let car of savedCars){
        car.fitness = car.score / sum;
    }
}
//Dat ene algorithme met r