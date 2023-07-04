function nextGeneration(){
    calculateFitness();
    getBestCar();
    for(let i = 0; i < TOTAL; i++){
        cars[i] = pickOne();
    }
    savedCars = [];
    console.log("Next gen");
    generation++;
    document.getElementById('generation').textContent = `${generation}`;
}

function calculateFitness(){ //Hier wordt de fitness (gezondheid, hoe goed de autos zijn) berekent
    let sum = 0;
    for(let car of savedCars){
        sum += car.score;
    }
    for(let car of savedCars){
        car.fitness = car.score / sum;
        // console.log(car.fitness);
    }
}

function getBestCar(){  //Selecteerd auto uit cars en geeft het het beste nn tot nu toe
    cars[0] = new Car(carX, carY, width, height, getBestCarBrain());
    bestCar = cars[0];
}

function getBestCarBrain(){ //Bepaal het beste nn op basis van de fitness van de auto's
    let bestCarBrain;
    let record = 0;         //Houd de hoogste waarde van fitness bij
    for(const savedCar of savedCars){
        if(savedCar.fitness > record){
            record = savedCar.fitness;
            bestCarBrain = savedCar.brain;
        }
    }
    return bestCarBrain;
}



function pickOne(){ //Functie muteerd de weights van de auto met hoogste fitness
    var index = 0;
    var r = random(); //Random nummer tussen 0 en 1
    while (r > 0) { 
      r = r - savedCars[index].fitness; //Trek de fitness van de huidige opgeslagen auto af van het random getal.
      index++;
    }
    index--;

    let car = savedCars[index];
    let child = new Car(carX, carY, width, height, car.brain); //Maak een nieuwe auto met hetzelfde brein
    child.mutate(); //Muteer de auto zodat hij nieuwe weights krijgt
    return child;
}
