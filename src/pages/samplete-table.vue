<template>
  <div  >

    <CrudDataTable
      :headers="headers"
      :items="data"
      :items-per-page="5" 
      :addBtn="false"
      @deleteItem="deleteItem"
      class="elevation-1"
      >       

       <template v-slot:[`footer.prepend`]>
        <span
          class="ma-2"
          
         >
            TOTAL BTS  : <strong class="green--text text--lighten-2" >
              {{totalbts}} </strong>  
              <br/>
              NIFTY 500 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{nifty}}</strong> 
               <br/>  <div>
            PERFORM : <strong class="blue--text text--darken-3" >
               {{perform}}</strong> </div>
          </span>
           <!-- <div id="app">
    <h1>{{localTime}}</h1>
  </div> -->
      </template>
     
    </CrudDataTable>
  </div>
</template>
<style scoped>
       .ma-2 {
        font-size: 1.2rem;
}
</style>
<script>
import CrudDataTable from './../components/common/CrudDataTable.vue'
import axios from 'axios'
import { URL } from '../helper/consts.js'


  export default {
    name: 'sample-table',
    components:{
      CrudDataTable
    },
    mounted () {
    this.fetchData();
    //this.timer = setInterval(this.fetchData, 300000);
    // this.showLocaleTime();
    

    },
    methods : {
      deleteItem(data) {
        let vm = this
        axios.delete(`${URL}analytic/${data.item.analytic_id}`)
        .then( function () {
          vm.fetchData();
        })
      },
      // showLocaleTime: function () {
      // var time = this;
      // setInterval(function () {
      // time.localTime = new Date().toLocaleTimeString();
      // }, 5000);
      // if(time === "18:00:00")
      // {
        
      //     axios.update(`${URL}analytic/`,{
      //       weightage : this.newweight
      //     })

        
      // }
      // },
      fetchData () {
        console.log(URL,'url')
       axios
      .get(`https://afternoon-peak-90299.herokuapp.com/analytic`)     
      .then( async (res) => {
        console.log(res.data)
        let resData = res.data.data;
       // let total = res.data.total;
        
        let symbol = []
        
        // for -> arry -> join
        resData.forEach(element => {
          if(element.symbol) {
            
          symbol.push(element.symbol)
          }
          //console.log('my', element.symbol)
        })
        
        
        let joinSymbol = symbol.join(',')
       let analyticLiveData = {}
              //console.log(symbol, joinSymbol)
     await  axios
      // .get(`http://api.marketstack.com/v1/eod?access_key=cc070a926eb089902727bec546a59253&symbols=INFY,TCS,ACN,IBM,RELIANCE,BALAMINES,DOLLAR&date_from=2022-03-29&date_to=2022-03-29`)
      .get(`https://yfapi.net/v6/finance/quote?region=IN&lang=en&symbols=${joinSymbol},%2C%5ECRSLDX`, {
        headers: {
           'accept': 'application/json',
        'X-API-KEY': 'J6WzGEj49F59U8eeu3kSr210VOXDYVCiacvOx7fS'
        }
      }).then( (res) => {
        //console.log('res',res.data.quoteResponse.result)
      let resData = res.data.quoteResponse.result
       //let nifty = res.data.quoteResponse.result.regularMarketChangePercent
      resData.forEach(element => {
         analyticLiveData[element.symbol] = (element.regularMarketChangePercent)
        //analyticLiveData[element.symbol] = (element.regularMarketDayHigh) * (75) ;
        //console.log(resData)
        //let nifty = 0;
        //console.log('my',nifty)

        if(element.symbol == '^CRSLDX') {
          this.nifty = element.regularMarketChangePercent
          let bc = this.nifty.toFixed(2);
          
          this.nifty = bc;
        }


        
      });

//console.log('ok',analyticLiveData)

});
   
        resData = resData.map(function(val) {
         // val.per =(val.weightage / total) * 100;
          val.per = val.weightage;
          val.live = analyticLiveData[ val.symbol] || 0
          val.bts = (val.live/100) * val.per; 
          // var xy = parseInt(val.per);
          // var xz = xy.toString(2);
          // val.per = xz;
          // let xy = Math.round(val.per);
          // val.per=xy;
          // let xy = val.per.toFixed(2);
          // val.per = xy;
          let ab =val.bts.toFixed(3);
          val.bts=ab;
          //console.log(val.live)
          let cd = val.live.toFixed(3);
          val.live=cd;
          val.newwe = (val.per/100) * val.live;

        //console.log(val.per, val.newwe)
         val.newweight = parseFloat(val.per) + parseFloat(val.newwe)
//          calculateSum() {
//           var sum = 0;
//     for(let value in val.newweight){
//         sum += value[val.newweight]
//     }
//      return sum;
//      console.log(sum);
    
          // console.log(val.newwe);
          
          //console.log('not',val.live)
          return val
         
        })




        let totalbts = 0;
        let sum = 0;
        resData.forEach(val => {
          totalbts += parseFloat(val.bts);
         sum += parseFloat(val.newweight)
        });
        console.log(sum)
        let sumweight = 0;
        resData.forEach(val => {
        sumweight = (val.newweight/sum) * 100;
        val.newweight=sumweight.toFixed(3);
        })
        
        let cd = totalbts.toFixed(3);
          totalbts = cd;
      // console.log(resData)
        this.data = resData;
        this.totalbts = totalbts;

        let perform = 0;
        perform = totalbts - this.nifty;
        this.perform = perform.toFixed(3);
        
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
        totalbts : 0,
        nifty : 0,
        perform : 0,
        // localTime: " ",
        analyticLiveData : {
          // Infosys : 3,

        },
        headers: [
          
          {
            text: 'Name of The Stock',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Weightage',
            align: 'start',
            sortable: false,
            value: 'weightage'
           },
          //  {
          //   text: 'weightage %',
          //   align: 'start',
          //   sortable: false,
          //   value: 'per'
          //  },

          { text: 'Yahoo Live Data', value: 'live' },

          { text: 'BTS', value: 'bts' },
          { text: 'New Weight', value: 'newweight'},
          { text: 'Edit', value: 'Edit' },
          { text: 'Delete', value: 'Delete' },
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
