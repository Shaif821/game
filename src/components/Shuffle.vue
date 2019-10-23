<template>
    <v-container grid-list-md text-xs-center>
        <v-flex xs12 class="testes">
            <v-btn @click="shuffleDeck" color="info">Shuffle</v-btn>
            <v-btn @click="reOrder" color="info">Reset</v-btn>
            <v-btn @click="addMore" color="info">+ ({{items.length - 1}})</v-btn>
        </v-flex>
        <br>

        <v-flex xs12>
            <transition-group class="testes layout text-xs-center wrap"
                              name="list" mode="out-in" enter-active-class="animated zoomIn"
                              leave-active-class="animated zoomOut">
                <v-flex v-for="(i, index) in items" :key="`item${i}`" xs3 class="outer-columns"
                        :class="{'unsolved' : !isSolved,  'solved' : isSolved}">
                    <parallax-container class="horizontal-card centered-card">
                        <parallax-element class="background-image">
                            <v-card style="cursor: pointer" class="numbersTest">
                                <v-touch v-if="i !== 21"  v-on:swipe="moveDeck(i, index)"
                                         v-on:swipeUp="moveDeck(i, index)"
                                         v-on:swipeDown="moveDeck(i, index)">
                                    <v-card-text @click="moveDeck(i, index)" @keyup="moveArrows(i)"
                                                 class="number-columns">
                                        <parallax-element class="text-container">
                                            {{i}}
                                        </parallax-element>
                                    </v-card-text>
                                </v-touch>
                                <parallax-element v-else class="text-container">
                                        <v-card-text style="color:white;" class="number-columns">. {{i}}</v-card-text>
                                </parallax-element>
                            </v-card>
                        </parallax-element>
                    </parallax-container>
                </v-flex>
            </transition-group>

        </v-flex>

        <br><br>

        <v-flex xs12>
            <p>Gebruik je muis, pijl toetsen of swipe op je mobiel om de blokken te verplaatsen</p>
        </v-flex>

    </v-container>
</template>

<script>
    export default {
        name: 'Shuffle',

        data() {
            return {
                items: [
                    1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21
                ],
                oldNumbers: [
                    1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21
                ],
                isSolved: false,
            }
        },

        mounted() {
            document.addEventListener("keyup", this.moveArrows);
            this.addClass();
        },

        methods: {
            shuffleDeck() {
                let randomNumbers = this.items;
                for (let i = randomNumbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
                }
                this.items = [];               //Maakt de items array leeg
                this.items = randomNumbers;    //En voeg de geshuffelde nummers toe aan items
                this.addClass();
            },

            reOrder() {
                console.log('test');
                this.items = []; //Reset de order
                this.items = [
                    1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21
                ];
                this.addClass();
            },

            addClass() {
                this.isSolved = JSON.stringify(this.items) === JSON.stringify(this.oldNumbers);
            },

            addMore() {
                let cur = this.items.length;   //Sla de lengte van items op, voeg er een extra
                this.items.push(cur + 1);        //nummer aan toe en push het terug aan items
                this.addClass();
            },

            moveArrows(i) {
                let code = i['keyCode'];            //De event van het toetsenbord
                let swap = this.items.indexOf(21);  //De index van 21

                let index = null;
                let cur = null;

                switch (code) {
                    case 38: //ArrowUp
                        index = this.items[this.items.indexOf(swap - 3)];    //De index van het nummer dat boven de 21 is
                        cur = this.items[index];                             //De waarde van het nummer
                        if (1 <= index) {                                    //Als het index niet kleiner is dan 1
                            this.moveDeck(cur, index)
                        }
                        break;
                    case 40: //ArrowDown
                        index = this.items[this.items.indexOf(swap + 3)];    //De index van het nummer dat beneden de 21 is
                        cur = this.items[index];                             //De waarde van het nummer
                        if (this.items.length >= index) {                    //Als het index iet groter is dan de lengte van alle nummers
                            this.moveDeck(cur, index)
                        }
                        break;
                    case 37: //ArrowLeft
                        index = this.items[this.items.indexOf(swap - 1)];    //De index van het nummer dat links van 21 is
                        if (index === undefined) {
                            index = 0;
                        }                //Als de index undefined is dan is het gewoon null (begin van de items = 0)
                        cur = this.items[index];                             //De waarde van de index
                        if (index >= 0) {                                     //Als het index niet groter dan 0 is
                            this.moveDeck(cur, index)
                        }
                        break;
                    case 39: //ArrowRight
                        index = this.items[this.items.indexOf(swap + 1)];    //De index van het nummer dat rechts van 21 is
                        cur = this.items[index];                             //De waarde van het nummer
                        if (index >= 0) {                                    //Als het index niet groter is dan 0
                            this.moveDeck(cur, index)
                        }
                        break;
                    default:
                        break;
                }
            },

            moveDeck(cur, index) {
                let pos = index;                       //De positie van het geklikte nummer
                let posVal = cur;                      //De waarde van de positie
                let swap = this.items.indexOf(21);     //De huidige positie van het nummer 21

                // Als de positie van het geklikte nummer 1 cijfer verwijderd is van swap (Links & rechts kunnen bewegen)
                if (pos + 1 === swap || pos - 1 === swap) {
                    this.items.splice(swap, 1);            //Verwijder de waarde van de positie van 21
                    this.items.splice(pos, 0, 21);         //Voeg op de plek van het geklikte nummer 21 toe.
                }
                // //Als de positie van het geklikte nummer 3 cijfers verwijderd is van swap (Boven en beneden kunnen bewegen)
                else if (pos + 3 === swap || pos - 3 === swap) {

                    if (pos + 3 === swap) {
                        this.items.splice(swap, 1);              //Verwijdert de postitie van 21
                        this.items.splice(pos, 1);               //Verwijdert het geklikte nummer

                        this.items.splice(pos, 0, 21);           //Voegt 21 toe op de positie van het geklikte nummer
                        this.items.splice(swap, 0, posVal);      //Voegt het geklikte nummer toe aan de positie van 21
                    }
                    else {
                        this.items.splice(pos, 1);               //Verwijdert het geklikte nummer
                        this.items.splice(swap, 1);              //Verwijdert het geklikte nummer

                        this.items.splice(swap, 0, posVal);      //Voegt het geklikte nummer toe aan de positie van 21
                        this.items.splice(pos, 0, 21);           //Voegt 21 toe op de positie van het geklikte nummer
                    }
                }
                this.addClass();
            },
        }
    }
</script>

<style>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

    .outer-columns {
        transition: 0.3s ease-in-out;
        border: 1px solid transparent;
        margin: 2px;
    }

    .unsolved:hover, .solved {
        transition: 0.3s ease-in-out;
    }

    .unsolved {
        box-shadow: rgba(24, 150, 240, 0.4) 0px 6px 15px -7px;
    }

    .solved {
        box-shadow: #2E7D32 0px 6px 15px -7px;
        border: 1px solid #00E676;
    }

    .solved .numbersTest {
        color: #2E7D32 !important;
    }

    .unsolved:hover .numbersTest {
        color: rgb(24, 150, 240) !important;
        transition: 0.3s ease-in-out;
        box-shadow: rgba(24, 150, 240, 0.4) 0px 6px 15px -7px;
    }

    .unsolved:hover {
        border: 1px solid rgba(24, 150, 240, 0.4);
        color: rgb(24, 150, 240) !important;
        box-shadow: inset rgba(24, 150, 240, 0.4) 0px 6px 15px -7px;
    }

    .numbersTest {
        transition: 0.3s ease-in-out;
        box-shadow: rgba(255, 255, 255, 255) 0px 6px 15px -7px;
        border: 1px solid #ffffff;
        padding: -5px;
        width: 100%;
    }

    .numbersTest p {
        width: 100%;
        margin: 10px;
    }

    .testes {
        display: flex;
        justify-content: center;
    }
</style>
