<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <transition-group class="testes layout text-xs-center wrap"
                              name="list" mode="out-in" enter-active-class="animated zoomIn"
                              leave-active-class="animated zoomOut">
                <v-flex v-for="i in blocks" :key="`1${i}`" xs2 class="color-wrap">
                    <v-card class="tester" :color="colorBlocks[i]">
                        <v-touch v-on:swipe="moveBlock(i)" v-on:swipeUp="moveBlock(i)"
                                 v-on:swipeDown="moveBlock(i, $event)">
                            <v-card-text @click="moveBlock(i, $event)" :color="colorBlocks[i]"
                                         :class="' getCard-' + i">
                            </v-card-text>
                        </v-touch>
                    </v-card>
                </v-flex>
            </transition-group>
        </v-layout>

        <br>
        <v-layout column>
            <div>
                <v-btn @click="shuffle()" color="info">Shuffle</v-btn>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "ColorBreak",

        data() {
            return {
                blocks: [],
                colorBlocks: [],
                colors: [
                    'red', 'pink', 'purple', 'deep-purple',
                    'blue', 'cyan', 'green', 'lime', 'amber',
                ],
                lastButton: null,
                state: false,
                clicked: null,
            }
        },

        methods: {
            shuffle() {
                this.blocks = []; //Maakt de blocks array leeg.
                this.colorBlocks = []; //Maakt de colors blocks array leeg.

                for (let i = 1; i < 43; i++) {
                    this.blocks.push(i)
                } //voeg alle blokken opnieuw toe
                for (let j = 0; j < 43; j++) {
                    this.colorBlocks.push(this.colors[Math.floor(Math.random() * this.colors.length)])
                }

                if (this.lastButton !== null) {                  //Checkt of er eerder op een blok geklikt is
                    this.lastButton.classList.remove('active');  //Verwijder de active class van de vorige blok
                    this.lastButton = null;                      //Maakt de object empty
                }
            },

            moveBlock(i, event) {
                let color = event.target.getAttribute('color');

                if (!this.state) {
                    this.clicked = i;
                    this.curPosition(event, false);
                }
                else {
                    let toSwitch = this.blocks.indexOf(i);  //Het huidige positie van het geklikte blok
                    let block = this.blocks.indexOf(this.clicked); //De vorige blok, dus de blok die verlaats zal worden
                    let blockVal = this.clicked;

                    if (((toSwitch + 6) === block || (toSwitch + 1) === block)) {
                        if (this.checkColor(color, toSwitch, true)) {
                            this.blocks.splice(block, 1);     //De vorige nummer die geklikte is wordt verwijderd van de array
                            this.blocks.splice(toSwitch, 1);  //De index van het geklikte nummer wordt verwijderd van de array

                            this.blocks.splice(toSwitch, 0, blockVal);
                            this.blocks.splice(block, 0, i);
                            this.checkMatch(color, toSwitch);
                        }
                    }
                    else if ((toSwitch - 6) === block || (toSwitch - 1) === block) {
                        if (this.checkColor(color, toSwitch, false)) {
                            this.blocks.splice(toSwitch, 1);  //De index van het geklikte nummer wordt verwijderd van de array
                            this.blocks.splice(block, 1);     //De vorige nummer die geklikte is wordt verwijderd van de array

                            this.blocks.splice(block, 0, i);
                            this.blocks.splice(toSwitch, 0, this.clicked);
                            this.checkMatch(color, toSwitch);
                        }
                    }
                    this.curPosition(event, true);
                    this.state = false;
                }
            },

            checkColor(color, nextColor, direction) {
                let newColor = color;
                let nextId = nextColor;
                let blockMove = direction;

                let nextLeft = null;
                let nextUp = null;
                let nextRight = null;
                let nextDown = null;

                if (blockMove) {
                    if (document.getElementsByClassName(' getCard-' + (nextId + 5))[0]) {
                        nextLeft = document.getElementsByClassName(' getCard-' + (nextId + 5))[0].getAttribute('color');
                    }
                    if (document.getElementsByClassName(' getCard-' + (nextId + 7))[0]) {
                        nextRight = document.getElementsByClassName(' getCard-' + (nextId + 7))[0].getAttribute('color');
                    }
                    if (document.getElementsByClassName(' getCard-' + (nextId + 12))[0]) {
                        nextDown = document.getElementsByClassName(' getCard-' + (nextId + 12))[0].getAttribute('color');
                    }
                } else {
                    if (document.getElementsByClassName(' getCard-' + (nextId - 7))[0]) {
                        nextLeft = document.getElementsByClassName(' getCard-' + (nextId - 7))[0].getAttribute('color');
                    }
                    if (document.getElementsByClassName(' getCard-' + (nextId - 5))[0]) {
                        nextRight = document.getElementsByClassName(' getCard-' + (nextId - 5))[0].getAttribute('color');
                    }
                    if (document.getElementsByClassName(' getCard-' + (nextId - 12))[0]) {
                        nextUp = document.getElementsByClassName(' getCard-' + (nextId - 12))[0].getAttribute('color');
                    }
                }

                if(newColor === nextLeft || newColor ===  nextRight || newColor ===  nextUp || newColor === nextDown){
                    let params = [];
                    return params.push(true, nextRight, nextLeft, nextDown, nextUp);
                }
            },

            // checkMatch(color, toSwitch){
            //
            // },

            curPosition(event, repeat) {
                if (this.lastButton !== null) {                  //Checkt of er eerder op een blok geklikt is
                    this.lastButton.classList.remove('active');  //Verwijder de active class van de vorige blok
                    this.lastButton = null;                      //Maakt de object empty
                }
                if (!repeat) {
                    this.lastButton = event.target;              //Slaat het geklikte blok op
                    event.target.className += ' active';         //Voegt een active class eraan toe
                    this.state = true;
                }

            }

        },

        mounted() {
            this.shuffle();
        }
    }
</script>

<style scoped>
    .color-wrap {
        transition: 0.3s ease-in-out;
    }

    .active {
        transition: 0.3s ease-in-out;
        background-color: rgba(255, 255, 255, 0.5);
    }

</style>