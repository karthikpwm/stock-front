<template>
  <div>
    <v-select

         
         v-model="portfolio" 
        :items="items"
        :loading="loading"
        label="portfolio"
            dense
            filled
            
        required
        this.fetchdata
        @change="fetchData(); loading = true " 
        
>
  
        
       </v-select>
       <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
      <v-spacer></v-spacer>
    <CrudDataTable
      :headers="headers"
      :items="data"
      :itemsPerPage="15" 
      :loading="loading"
      :addBtn="false"
      :setEditedItem.sync="setEditedItem"
      :defaultItem="defaultItem"
      @deleteItem="deleteItem"
      @UpdateItem="UpdateItem"
      
      @upload="upload"
      class="elevation-1"
      >       
        <template v-slot:forms>
          <v-row
            dense
          >
            <v-col
              cols="6"
              md="3"
            >
              <v-text-field
                v-model="setEditedItem.name"
                label="Name of the stock"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="setEditedItem.weightage"
                label="Weightage"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="setEditedItem.symbol"
                label="Symbol"
                type="text"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </template>
       <template v-slot:[`footer.prepend`]>
        <span
          class="ma-2"
          
         >
         
            TOTAL BPS  : <strong class="green--text text--lighten-2" >
              {{totalbts}} </strong>  
              <br/>
              <!-- NIFTY 500 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{nifty}}</strong> 
               <br/>  
                 NIFTY 50 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{nifty50}}</strong> 
               <br/>  
               NIFTY Midcap 100 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{niftysmlcap}}</strong> 
               <br/>
               NIFTY smalcap 100 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{niftymidcap}}</strong> 
               <br/> -->
               BENCHMARK : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{benchmark}}</strong> <div>
            PERFORM : <strong class="blue--text text--darken-3" >
               {{perform}}</strong> </div>
          </span>
          <span class="ma-2">
            P SmallCap  : <strong class="green--text text--lighten-2" >
              {{marketcap}} </strong>  
              <br/>
              P MidCap  : <strong class="green--text text--lighten-2" >
              {{midmarketcap}} </strong>  
              <br/>
              P LargeCap  : <strong class="green--text text--lighten-2" >
              {{largemarketcap}} </strong>  
              <br/>
          </span>
          <span class="ma-2">
          Nifty SmallCap  : <strong class="green--text text--lighten-2" >
              {{niftysmlcap}} </strong>  
              <br/>
              Nifty MidCap  : <strong class="green--text text--lighten-2" >
              {{niftymidcap}} </strong>  
              <br/>
              Nifty 50  : <strong class="green--text text--lighten-2" >
              {{nifty50}} </strong>  
              <br/>
          </span>
           <!-- <div id="app">
           <h1>{{localTime}}</h1>
            </div> -->
            
      </template>
   
    </CrudDataTable>
   
<template >
    
      <br>
      <br>
       <v-row
    align="center"
    justify="space-around" >
    <v-btn depressed
    color="primary"
    @click="upload()">
    UPLOAD
    </v-btn>
    </v-row>
    
  </template>
   
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
    async mounted () {
      this.loading = true
    await this.fetchData();
    this.loading = false
    //this.timer = setInterval(this.fetchData, 300000);
    // this.showLocaleTime();
    

    },
    methods : {
      async deleteItem(data) {
        this.loading = true
        let vm = this
        await axios.delete(`${URL}analytic/${data.item.analytic_id}`)
        .then( async function () {
          await vm.fetchData();
        })
        this.loading = false
      },
      //editItem (item) {
       // console.log(item, 'save [rpcess asdfasdfasdf')
        // this.setEditedItem = Object.assign({}, item.item)
     // },
      // editItem(data){
      //   axios.put(`${URL}analytic/${data.item.analytic_id}`),{
      //       name : this.nameofthestock,
      //       weightage : this.weightage,
      //       symbol : this.symbol

      //   }
      // },
          async upload(){
            this.loading=true
        //console.log(data.analytic_id) 
        const vm = this;
         let pass = []
       await this.data.forEach(val => {
              pass.push({analytic_id : val.analytic_id, weightage : val.newweight})
          })
         await axios.post(`${URL}analytic/uploadRecord`,{bulkData : pass}).then(async function(){
           await vm.fetchData()
         })
          this.loading=false
      },
          async  UpdateItem(data){     
            this.loading = true
        //console.log(data.analytic_id) 
        const vm = this;
          await axios.put(`${URL}analytic/${data.item.analytic_id}`,{
           name : data.item.name,
           weightage : data.item.weightage,
           symbol : data.item.symbol,
           analytic_id : data.item.analytic_id
           }).then( async function(){
           await vm.fetchData()
         }) 
         this.loading= false
           //this.$router.go()
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
      async fetchData () {
       await axios
      .get(`${URL}analytic/${this.portfolio}`)     
      .then( async (res) => {
        //console.log(res.data)
        let resData = res.data.data;
       // let total = res.data.total;
        
        let symbol = []
        
        // for -> arry -> join
        resData.forEach(element => {
          if(element.symbol) {
          let ab =  element.symbol + '.NS'
          symbol.push(ab)
          //console.log('my', element.symbol)
          // var ns = ['.NS,']
        
        //let joSymbol = symbol.join(ns)
        
        //console.log('joooo',joSymbol)
          }
        
        })  

                
        let joinSymbol = symbol.join(',')
        
         let analyticLiveData = {}
         let analticmarketcap = {}
         
              //console.log('yyyyy',joinSymbol)
          await  axios
          // .get(`http://api.marketstack.com/v1/eod?access_key=cc070a926eb089902727bec546a59253&symbols=INFY,TCS,ACN,IBM,RELIANCE,BALAMINES,DOLLAR&date_from=2022-03-29&date_to=2022-03-29`)
        .get(`https://yfapi.net/v6/finance/quote?region=IN&lang=en&symbols=${joinSymbol},%2C%5ECRSLDX,%5ENSEI,%2CNIFTY_MIDCAP_100.NS,%2C%5ECNXSC`, {
        headers: {
           'accept': 'application/json',
        'X-API-KEY': 'J6WzGEj49F59U8eeu3kSr210VOXDYVCiacvOx7fS'
        }
         }).then( (res) => {
        //console.log('res',res.data.quoteResponse.result)
        let resData = res.data.quoteResponse.result
       //let nifty = res.data.quoteResponse.result.regularMarketChangePercent
        resData.forEach(element => {
         const ab= (element.symbol).slice(0, -3)
   
          
         analyticLiveData[ab] = (element.regularMarketChangePercent)
         analticmarketcap[ab] =(element.marketCap)
         //console.log("com  :"+ ab +"markcap  :"+analticmarketcap[ab])
        

        //analyticLiveData[element.symbol] = (element.regularMarketDayHigh) * (75) ;
        //console.log(resData)
        //let nifty = 0;
        //console.log('my',nifty)
        
        if(element.symbol == '^CRSLDX') {
          this.nifty = element.regularMarketChangePercent
          let bc = this.nifty.toFixed(2);
          
          this.nifty = bc;
        }
        if(element.symbol == '^NSEI') {
          this.nifty50 = element.regularMarketChangePercent
          let bc = this.nifty50.toFixed(2);
          
          this.nifty50 = bc;
        }
        if(element.symbol == 'NIFTY_MIDCAP_100.NS') {
          this.niftymidcap = element.regularMarketChangePercent
          let bc = this.niftymidcap.toFixed(2);
          
          this.niftymidcap = bc;
        }
        if(element.symbol == '^CNXSC') {
          this.niftysmlcap = element.regularMarketChangePercent
          let bc = this.niftysmlcap.toFixed(2);
          
          this.niftysmlcap = bc;
        }

        
      });

//console.log('ok',analyticLiveData)

});
   
        resData = resData.map(function(val) {
         // val.per =(val.weightage / total) * 100;
          
          val.per = val.weightage;
          val.live =  analyticLiveData[val.symbol] || 0
          val.allmarketcap = analticmarketcap[val.symbol] || 0
          if(val.allmarketcap >= 0 && val.allmarketcap <= 50000000000)
          {
            val.marketstatus = 'small'
            console.log(val.allmarketcap,'small')
          }
          else if(val.allmarketcap >  50000000000 && val.allmarketcap <= 500000000000)
          {
            val.marketstatus = 'mid'
            console.log(val.allmarketcap,'mid')
          }
          else if(val.allmarketcap > 50000000000) 
          {
            val.marketstatus = 'large'
            console.log(val.allmarketcap,'large')
          }
          
          //console.log('marketchang',analyticLiveData[val.symbol])
          val.bts = (val.live/100) * val.per; 
          // var xy = parseInt(val.per);
          // var xz = xy.toString(2);
          // val.per = xz;
          // let xy = Math.round(val.per);
          // val.per=xy;
          // let xy = val.per.toFixed(2);
          // val.per = xy;
          let ab =val.bts.toFixed(2);
          val.bts=ab;
          //console.log(val.live)
          let cd = val.live.toFixed(2);
          //let cd = val.live
          val.live=cd;
          //let zx = (val.weightage/100) * val.bts;
          let zx = parseFloat(val.weightage) + parseFloat(val.bts);
          val.zx = parseFloat(zx)
          val.newwe = parseFloat(val.weightage) + parseFloat(zx) ;

          val.newweight =  parseFloat(val.newwe)
          //val.sumbps = cdd;
          //val.newwe = (val.per/100) * val.bts;

        //console.log(val.per, val.newwe)
        // val.newweight = parseFloat(val.per) + parseFloat(val.newwe)
         
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
        resData.forEach((data, index) => data.no = index + 1);
        //console.log(parseInt(bc))
        

        let totalbts = 0;
        
        //let sum = 0;
        resData.forEach(val => {
          totalbts += parseFloat(val.bts);
         
          
         //sum += parseFloat(val.newweight)
        });
        
        //console.log(sum)
        let sumweight = 0;
        let sumbps = 0;
        let sumofweight = 0;
        let sumofsmall = 0;
        let sumofmid = 0;
        let sumoflarge = 0;
        // let benchmark = 0;
        resData.forEach(val => {
        //sumweight = (val.newweight/sum) * 100;
        //sumweight = val.newweight;
        //val.newweight=sumweight.toFixed(2);
        if(val.marketstatus == 'small')
        {
          
          sumofsmall += parseFloat(val.bts)
        }
        if(val.marketstatus == 'mid')
        {
          
          sumofmid += parseFloat(val.bts)
        }
        if(val.marketstatus == 'large')
        {
          
          sumoflarge += parseFloat(val.bts)
        }
        sumbps += parseFloat(val.bts);
        sumofweight +=parseFloat(val.weightage)
        })
        let ss = parseFloat(sumofsmall)
        let sm = parseFloat(sumofmid)
        let sl = parseFloat(sumoflarge)
        let bb = parseFloat(sumbps)
         let cc = parseFloat (sumofweight) 
        resData.forEach(val => {
          val.smallmarketcapbps = ss
          val.midmarketcapbps= sm
          val.largemarketcapbps = sl
          val.totalbts = bb
          val.sumofweight = cc
          val.totalweight = (val.totalbts) + (val.sumofweight)
          sumweight = val.zx / val.totalweight * 100;
          val.newweight=sumweight.toFixed(2);
          val.nifty50 = this.nifty50 * parseInt(34);
          val.niftymidcap = this.niftymidcap * parseInt(33);
          val.niftysmlcap = this.niftysmlcap * parseInt(33);
          val.benchmark = (val.nifty50 + val.niftymidcap + val.niftysmlcap) / 100;
          this.benchmark = val.benchmark.toFixed(2)
          this.marketcap = val.smallmarketcapbps.toFixed(2)
          this.midmarketcap = val.midmarketcapbps.toFixed(2)
          this.largemarketcap = val.largemarketcapbps.toFixed(2)
        })
          //const cdd = sumbps.toFixed(2);
      //  resData = resData.map(function(val){
      //      val.sumbps = cdd;
           
      //  })
        
        let cd = totalbts.toFixed(2);
          totalbts = cd;
          
       //console.table(resData)
        this.data = resData;
        this.totalbts = totalbts;
        //this.benchmark = benchmark;
        let perform = 0;
        //perform = totalbts - this.nifty;
        perform = totalbts - this.benchmark;
        this.perform = perform.toFixed(2);
        
        // let fetch = this.fetchData;
         //console.log(this.benchmark)
        // return fetch;
      
      })
      },
      clearData () {
        clearInterval(this.timer);
      } 
    },
    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 3000)
      },
    },
    data () {
      return {
        loading: false,
        timer: '',
        data : [],
        items : ['1','2','3','4','5','6','7','8','9','10'],
        portfolio : '1',
        totalbts : 0,
        marketcap: 0,
        midmarketcap: 0,
        largemarketcap: 0,
        nifty : 0,
        nifty50 : 0,
        niftysmlcap: 0,
        niftymidcap : 0,
        benchmark : 0,
        perform : 0,
        //no : 0,
        // localTime: " ",
        analyticLiveData : {
          // Infosys : 3,

        },
        anaid : { },
        setEditedItem : {},
        defaultItem : {
          name : 0,
          weightage : 0,
          symbol : 0
        },
        headers: [
          {
             text: 'No',
             align: 'start',
             sortable: false,
             value: 'no'
          },
          {
            text: 'Name of The Stock',
            align: 'start',
            
            value: 'name',
          },
          { text: 'Weightage',
            align: 'start',
            
            value: 'weightage'
           },
          //  {
          //   text: 'weightage %',
          //   align: 'start',
          //   sortable: false,
          //   value: 'per'
          //  },

          { text: 'Yahoo Live Data', value: 'live' },

          { text: 'BPS', value: 'bts' },
          { text: 'NextDay Weightage', value: 'newweight'},
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
