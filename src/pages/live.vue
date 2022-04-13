<template>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="100"
      class="elevation-1"
    ></v-data-table>

</template>

<script>

import axios from 'axios'
// import { URL } from '../helper/consts.js'


  export default {
    name: 'sample-table',
    mounted () {
    this.fetchData();
    //this.timer = setInterval(this.fetchData, 300000);
    },
    methods : {
      fetchData () {
        
       axios
      .get(`http://api.marketstack.com/v1/eod?access_key=cc070a926eb089902727bec546a59253&symbols=INFY,TCS&date_from=2022-03-29&date_to=2022-03-29`)     
      .then( (res) => {
        //console.log(res.data)
        res.data.data.forEach((listing ) => {
          listing.sections.forEach((section) => {
            section.position.forEach((el)=>{
               console.log(el)
            });
        });
      });
        let resData = res.data.data;
        // let total = res.data.total;
        
        this.data = resData;
        console.log(this.data)
        //val.urldata = this.data;
        // let fetch = this.fetchData;
        // console.log(fetch)
        // return fetch;
      
      })
      },
      clearData () {
        clearInterval(this.timer);
      } 
    },
    data () {
      return {
        timer: '',
        data : [],
        // analyticLiveData : {
        //   Infosys : 3,
        //   Accenture : 4,
        //   TCS : -2,
        //   IBM : -1,
        //   PWM : 2,
        //   ABC : 3,
        //   Reliance :-3,
          
        // },
        headers: [
          {
            text: 'Name of The Stock',
            align: 'start',
            sortable: false,
            value: 'urldata',
          },
          { text: 'Weightage',
            align: 'start',
            // sortable: false,
            value: 'weightage'
           },
           {
            text: 'weightage %',
            align: 'start',
            sortable: false,
            value: 'per'
           },

          { text: 'Yahoo Live Data', value: 'live' },

          { text: 'BTS', value: 'bts' },
          // { text: 'Protein (g)', value: 'protein' },
          // { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
           
          },
  
        ],
      }
    },
  }
  
  /*

  data, -> varable
  method, -> function


  */
</script>
