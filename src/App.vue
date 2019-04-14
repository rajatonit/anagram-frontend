<template>
  <v-app>
    <v-container grid-list-md>
      <v-flex xs12 md10 offset-md2>
        <v-container header>
          <h1>Anagrammatist</h1>
          <h2>an·a·gram·ma·tist</h2>
          <h3>(noun) a maker of anagrams</h3>
        </v-container>
        <v-container>
          <v-flex xs12 md6 lg6 text-sm-right>
            <v-tooltip top data-app>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon color="primary lighten-1">info</v-icon>
                </v-btn>
              </template>
              <span>Enter any single word and hit the enter key <br/>
                or submit button to find a possible anagram!</span>
            </v-tooltip>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs12 md6 lg6>
              <v-text-field outline light label="Any word (ie.tabs)" primary v-model="word" v-on:change="anagramSearch" id="text-box">
              </v-text-field>
            </v-flex>
            <v-flex xs12 md6 text-xs-right text-md-left>
              <v-btn id="button" depressed large color="primary" v-on:click="anagramSearch()">Submit</v-btn>
            </v-flex>
          </v-layout>
          <v-flex md8 v-if="anagrams.length > 0">
            <h5 id="anagram-list-header">Here's all the anagrams for {{anagramWord}}! </h5>
            <v-card >
              <ul id="list-group" >
                <li id="list-group-item" v-for="item in anagrams" :key="item">
                  <h3> {{ item }}</h3>
                </li>
              </ul>
            </v-card>
          </v-flex>
          <v-flex id="anagram-err-box" md8 v-if="anagrams.length === 0 && anagramWord != '' && err === ''">
            <h3 >Could not find a anagram for {{anagramWord}}! </h3>
          </v-flex>
          <v-flex md8 id="err" v-if="err != ''">
            <h3>{{err}}</h3>
          </v-flex>
        </v-container>
     
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      word: '',
      anagrams: [],
      anagramWord: '',
      err: ''
    }
  },
  methods:{
    async anagramSearch(){
      this.err = ""
      this.anagrams = []
      const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

      if(format.test(this.word)){
        this.err = "Please enter valid string with no special chars!"
        return;
      }

      try{
        const anagramResponse = await axios.get(`/api/v1/anagram/${this.word}`)
        this.anagrams = anagramResponse.data.anagrams
        this.anagramWord = this.word;
      }catch(err){
        this.err = "Something went wrong. Try again later."
      }
    }
  }
}
</script>

<style>
  #app{
font-family: 'Fira Sans', sans-serif;
  }
  h1{
    font-size: 3rem;
    margin-top: .67em;
  }
  h2{
    font-size: 2.3rem;
 

  }
  h3{
    font-size: 1.9rem;

  }
  h5{
    font-size: 1.5rem;
  }

  .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.3;
    color: inherit;
}
#list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: .25rem;
    border-bottom-left-radius: .25rem;
}
#list-group-item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
}
#list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
}
#list-group {
    padding-left: 0;
    margin-bottom: 0;
}
</style>
