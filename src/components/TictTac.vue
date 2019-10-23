<template>
    <v-container grid-list-md class="changeWraper">

        <v-flex xs12 sm12 md12 class="wrapGame">
            <transition-group class="testes layout text-xs-center wrap"
                              name="list" mode="out-in" enter-active-class="animated zoomIn"
                              leave-active-class="animated zoomOut">
                <v-flex class="block-container" v-for="i in blocks" :key="`4${i}`" xs4>
                    <v-card v-if="!activeGame" style="cursor: default;" dark class="blocks">
                    </v-card>
                    <v-card v-else class="blocks" @click="addMarker($event)" :id="'block_id_' + i"
                            :data-id="i">
                    </v-card>
                </v-flex>
            </transition-group>

            <div v-if="activeGame">
                <v-btn @click="gameState(0)" color="info">Retry</v-btn>
                <v-btn color="success">{{this.counter}}</v-btn>
                <v-btn @click="gameState(1)" color="info">Reset</v-btn>
            </div>
        </v-flex>

        <br><br>

        <v-flex xs12 sm12 md12 class="playerNames">
            <v-form v-if="!activeGame" class="layout text-xs-center wrap playerNames">
                <v-text-field prepend-icon="person" name="person1" label="Player 1" v-model="playerOne"
                              type="text" v-validate="'min:5'"></v-text-field>
                <v-text-field id="person2" prepend-icon="person" name="person2" label="Player 2" v-model="playerTwo"
                              type="text" v-validate="'min:5'"></v-text-field>

                <transition name="list" enter-active-class="animated flipInY" leave-active-class="animated flipOutX">
                    <v-alert :value="true" type="error" v-if="this.message !== '' ">{{this.message}}</v-alert>
                </transition>
                <v-btn color="primary" @click="addPlayers()">Start</v-btn>
            </v-form>

            <div v-else class="v-input-control playerNames">
                <p :class="{'activePlayerOne' : indexOne}" class="v-text-field__slot">
                    <span v-if="winner.length > 0 && winner[1] === 'playerOne'">Winnaar: </span>
                    <span v-else>Player 1:</span>
                    <span>{{playerOne}}</span>
                    <span>{{scoreOne}}</span>
                </p>
                <span></span>
                <p :class="{'activePlayerTwo' : indexTwo}" class="v-text-field__slot">
                    <span v-if="winner.length > 0 && winner[1] === 'playerTwo'">Winnaar: </span>
                    <span v-else>Player 2:</span>
                    <span>{{playerTwo}}</span>
                    <span>{{scoreTwo}}</span>
                </p>
            </div>
            <br>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "TictTac",

        data() {
            return {
                blocks: [
                    1, 2, 3,
                    4, 5, 6,
                    7, 8, 9
                ],
                toSolve: [{
                    pOne: [],
                    pTwo: []
                }],
                playerOne: '',
                playerTwo: '',
                winner: [],
                message: '',
                counter: 0,
                activeGame: false,
                indexOne: true,
                indexTwo: false,
                scoreOne: 0,
                scoreTwo: 0,
            }
        },

        methods: {
            addPlayers() {
                //Als de velden leeg zijn & de functie wordt aangeroepen:
                if (this.playerOne === "" || this.playerTwo === "") {
                    this.message = 'De velden kunnen niet leeg zijn'; //Toon een error message
                } else if(this.playerOne === this.playerTwo){
                    this.message = 'Voer voor beiden spelers een unieke naam in'; //Toon een error message
                }
                else {
                    this.activeGame = true;                    //Maak de game active
                }
            },

            addMarker(event) {
                //Wanneer de beurt van de spelers minder is dan 10 en er nog geen winnaar is
                if (this.counter < 10 && this.winner.length <= 0 ) {
                    let number = event.target.dataset.id;                  //De nummer van het gelikte object
                    let checkThree = null;                                 //Dit wordt de array dat de nummers zal onthouden

                    if (event.target.innerHTML === '') {                   //Wanneer het blok leeg is
                        if (this.indexOne) {
                            event.target.innerHTML = 'X';                  //Markeer het geklikte object met een 'X'
                            event.target.className += " playerOneMark";    //En voeg de bijbehorende class er aan toe
                            this.toSolve[0].pOne.push(number);             //Push de geklikte nummer in de toSolve array van de speler
                            checkThree = this.toSolve[0].pOne;             //checkThree wordt toSolve
                        }
                        else {
                            event.target.innerHTML = 'O';                  //Hier gebeurt hetzelfde maar dan als
                            event.target.className += " playerTwoMark";    //speler 2
                            this.toSolve[0].pTwo.push(number)
                            checkThree = this.toSolve[0].pTwo;
                        }
                        this.counter++;                                    //Verhoog de counter (counter === elke zet die de spelers overhebben)
                        if (checkThree.length >= 3) {this.checkWinner();}  //Als de array in checkThree meer dan 3 is, roep dan het volgende functie aan (Er zijn 3 cijfers nodig om te winnen)
                        this.switchPlayer();                               //Wissel de speler met deze functie
                    }
                }
            },

            checkWinner() {
                let curPlayer = this.indexOne ? 'pOne' : 'pTwo';         //Check welke speler nu aan het beurt is

                if (this.finalCheck(curPlayer) === 'pOne') {             //Wanneer finalCheck 'pOne' terug geeft
                    this.winner.push(this.playerOne, 'playerOne');       //Dan heeft speler 1 gewonnen, voeg dan de naam van de speler toe aan winner
                    this.scoreOne = this.scoreOne + 1;
                }
                else if (this.finalCheck(curPlayer) === 'pTwo') {        //Wanneer finalCheck 'pTwo' terug geeft
                    this.winner.push(this.playerTwo, 'playerTwo');       //Dan heeft speler 2 gewonnen, voeg dan de naam van de speler toe aan winner
                    this.scoreTwo = this.scoreTwo + 1;
                }
            },

            finalCheck(curPlayer) {
                //Deze array bevat elke mogelijke combinatie waarmee je kan winnen
                let firstCheck = [{
                    1: [1, 2, 3],
                    2: [4, 5, 6],
                    3: [7, 8, 9],
                    4: [1, 4, 7],
                    5: [1, 5, 9],
                    6: [2, 5, 8],
                    7: [3, 5, 7]
                }];

                let counter = 1; //De counter 3 is de max
                let current = curPlayer === 'pOne' ? this.toSolve[0].pOne : this.toSolve[0].pTwo; //Op basis van de huidige player wordt bepaald naar welke arrays gekeken wordt in to Solve\
                for (let i = 1; i < 8; i++) {          //Deze loop kijkt in elk van de 7 mogelijkheden an firstCheck of er een match is
                    for (let j = 0; j < 4; j++) {      //En daarin wordt gekeken of 1 van de 3 cijfers overeen komt met 1 van de cijfers van current

                        if (JSON.stringify(current).includes(JSON.stringify(firstCheck[0][i][j]))) {  //Als een cijfer fan firstcheck overeenkomt met een cijfer van current

                            if(counter === 2 && firstCheck[0][i].indexOf(j) === 2){ //Er wordt gekeken of de volgende nummer de laatste nummer is van de array van firstcheck
                                counter = 0
                            }
                            if (counter === 2) { //Als counter 2 is, dus als alle 3 cijfers voorkomen dan heeft de speler gewonnen
                                return curPlayer;
                            }
                            counter++;
                        }
                        else {
                            counter = 0;
                        }
                    }
                }
            },

            switchPlayer() {
                if (this.winner.length <= 0) {   //Alleen wanneer er nog geen winner is
                    if (this.indexOne) {          //Als de speler true is, maak het dan false en maak de volgende speler true
                        this.indexOne = false;
                        this.indexTwo = true;
                    }
                    else {
                        this.indexOne = true;
                        this.indexTwo = false;
                    }
                }
            },

            gameState(sort) {
                if (sort === 1) {              //Sort = 1 is wanneer de hele spel gerest wordt
                    this.playerOne = "";
                    this.playerTwo = "";
                    this.activeGame = false;
                    this.scoreOne = 0;
                    this.scoreTwo = 0;
                }
                                                 //Reset de rest behalve de speler naam
                for (let i = 1; i < 10; i++) {
                    document.getElementById('block_id_' + i).innerHTML = '';
                    document.getElementById('block_id_' + i).classList.remove("playerOneMark");
                    document.getElementById('block_id_' + i).classList.remove("playerTwoMark");
                }


                this.toSolve = [];
                this.toSolve = [{
                    pOne: [],
                    pTwo: []
                }];
                this.winner = [];
                this.counter = 1;
                this.indexOne = true
                this.indexTwo = false
            },
        },
    }
</script>

<style scoped>

    .changeWraper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;

    }

    .wrapGame {
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
    }

    .testes {
        width: 70%;
    }

    .block-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 70px;
        width: auto;
    }
    .blocks {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        min-height: 80px;
        min-width: 70px;
        max-width: 200px;
        max-height: 150px;
        height: 20vw;
        width: 100%;
        font-size: 4rem;
    }

    .playerNames {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .playerNames > * {flex: 100%;}
    .playerNames > * {
        font-size: 18px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        transition: 0.3s ease-in-out;
        padding: 0 10px;
    }

    .activePlayerOne, .playerOneMark {
        padding: 10px 5px;
        transition: 0.3s ease-in-out;
        color: dodgerblue;
        border: 1px solid rgba(24, 150, 240, 0.4);
        box-shadow: rgba(24, 150, 240, 0.4) 0px 6px 15px -7px;
    }

    .activePlayerTwo, .playerTwoMark {
        padding: 10px 5px;
        transition: 0.3s ease-in-out;
        color: firebrick;
        border: 1px solid firebrick;
        box-shadow: firebrick 0px 6px 15px -7px;
    }

</style>