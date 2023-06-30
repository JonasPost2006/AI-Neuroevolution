function nextGeneration(){
    calculateFitness();
    getBestCar();
    for(let i = 0; i < TOTAL; i++){
        cars[i] = pickOne();
    }
    savedCars = [];
    console.log("Next gen");
}

function calculateFitness(){ //hier wordt de fitness (gezondheid, hoe goed de autos zijn) berekent
    let sum = 0;
    for(let car of savedCars){
        sum += car.score;
    }
    for(let car of savedCars){
        car.fitness = car.score / sum;
        // console.log(car.fitness);
    }
}

function getBestCar(){
    cars[0] = new Car(carX, carY, width, height, getBestCarBrain());
    bestCar = cars[0];
}

function getBestCarBrain(){
    let bestCarBrain;
    let record = 0;
    for(const savedCar of savedCars){
        if(savedCar.fitness > record){
            record = savedCar.fitness;
            bestCarBrain = savedCar.brain;
        }
    }
    return bestCarBrain;
}



function pickOne(){ //Algoritme van the coding train
    var index = 0;
    var r = random();
    while (r > 0) {
      r = r - savedCars[index].fitness;
      index++;
    }
    index--;

    let car = savedCars[index];
    let child = new Car(carX, carY, width, height, car.brain); //Maak een nieuwe car met hetzelfde brein
    child.mutate(); //muteer de car zodat hij nieuwe weights krijgt
    return child;
}