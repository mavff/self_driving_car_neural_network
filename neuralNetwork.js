class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for(let i=0;i<neuronCounts.length - 1;i++){
            this.levels.push(new Level(//create the new level where we have the conection between the layer
                neuronCounts[i],neuronCounts[i+1]
                )
            );
        }
    }
    static feedForward(givenInputs,network){
        let outputs=Level.feedForward(
                givenInputs,network.levels[0]);
        for(let i=1;i<network.levels.length;i++){
            outputs=Level.feedForward(
                    outputs,network.levels[i]);
        }
        return outputs;

    }
}
class Level{
    constructor(inputCount,outputCount){
        this.input=new Array(inputCount);
        this.output=new Array(outputCount);
        this.biases=new Array(outputCount);

        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }
    static #randomize(level){//randomize the values of weights and bias between 1/-1
        for(let i=0;i<level.input.length;i++){
            for(let j=0;j<level.output.length;j++){
                level.weights[i][j]=Math.random()*2 - 1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2 -1;            
        }
    }
    static feedForward(givenInputs,level){//this method calculates the output layer data with given inputs
        for(let i=0;i<level.input.length;i++){
            level.input[i]=givenInputs[i];//copy the given inputs for the input level
        }
        for(let i=0;i<level.output.length;i++){
            let sum=0;
            for(let j=0;j<level.input.length;j++){
                sum+=level.input[j]*level.weights[j][i];
            }
            if(sum>level.biases[i]){//here we have the activation function
                level.output[i]=1;
            }else{
                level.output[i]=0;
            }
        }
        return level.output;
    }
}