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
      :itemsPerPage="100" 
      :loading="loading"
      :addBtn="false"
      :setEditedItem.sync="setEditedItem"
      :defaultItem="defaultItem"
      @deleteItem="deleteItem"
      @UpdateItem="UpdateItem"
      
      :footer-props="{
    'items-per-page-options':[100],
    'disable-items-per-page': true,
    
  }"
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
         
            TOTAL BTS  : <strong class="green--text text--lighten-2" >
              {{totalbts}} </strong>  
              <br/>
              NIFTY 500 : <strong class="green--text text--lighten-2 font-size: 1.9em" >
               {{nifty}}</strong> 
               <br/>  
              
   <!-- <v-select v-model="selected">
       <option v-for="product in products" v-bind:value="{ id: product.id, text: product.name }" v-bind:key="product">{{ product.name }}
       </option>
   </v-select>
   <h1>Value:
   {{selected.id}}
   </h1>
   <h1>Text:
   {{selected.text}}
   </h1> -->

               
               <div>

            PERFORM : <strong class="blue--text text--darken-3" >
               {{perform}}</strong> </div>
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
        //let joinSymbol = symbol.join(',')
        //let joinSymbol = 'CONCOR.NS'
         let analyticLiveData = {}
         
              //console.log(symbol, joinSymbol)
          await  axios

          // .get(`http://api.marketstack.com/v1/eod?access_key=cc070a926eb089902727bec546a59253&symbols=INFY,TCS,ACN,IBM,RELIANCE,BALAMINES,DOLLAR&date_from=2022-03-29&date_to=2022-03-29`)
        .get(`https://yfapi.net/v6/finance/quote?region=IN&lang=en&symbols=%2C%5ECRSLDX`, {
        headers: {
           'accept': 'application/json',
        'X-API-KEY': 'J6WzGEj49F59U8eeu3kSr210VOXDYVCiacvOx7fS'
                }
        }).then( (res) => {
        //console.log('res',res.data.quoteResponse.result)
        let resData = res.data.quoteResponse.result
       //let nifty = res.data.quoteResponse.result.regularMarketChangePercent
        resData.forEach(element => {


          if(element.symbol == '^CRSLDX') {
          this.nifty = element.regularMarketChangePercent
          let bc = this.nifty.toFixed(2);
          
          this.nifty = bc;
              }
        
             })
        
        });

        await  axios
         .get(`${URL}analytic`)

         .then( async(res) => {
        console.log('res',res.data)
        let resData = res.data.data;
       //let nifty = res.data.quoteResponse.result.regularMarketChangePercent
        resData.forEach(element => {
          //console.log('pppp',element.close,element.prevclose,element.symbol)
          let zx = element.close - element.prevclose ;
          let qw = zx / element.prevclose; 
          let cv = qw * 100 ;
          //console.log(cv)
         analyticLiveData[element.symbol] = (cv)
        //analyticLiveData[element.symbol] = (element.regularMarketDayHigh) * (75) ;
        //console.log(resData)
        //let nifty = 0;
        //console.log('my',nifty)
        
        // if(element.symbol == 'CRSLDX') {
        //   console.log('symbol is coming')
        //   this.nifty = element.perc
        //   let bc = Number(this.nifty).toFixed(2);
          
        //   this.nifty = bc;
        // }
           });

          //console.log('ok',analyticLiveData)

        });
   
        resData = resData.map(function(val) {
         // val.per =(val.weightage / total) * 100;
          
          val.per = val.weightage;
          val.live = analyticLiveData[ val.symbol] || 0.00
          val.bts = (val.live/100) * val.per; 
          // var xy = parseInt(val.per);
          // var xz = xy.toString(2);
          // val.per = xz;
          // let xy = Math.round(val.per);
          // val.per=xy;
          // let xy = val.per.toFixed(2);
          // val.per = xy;
          let ab =val.bts.toFixed(6);
          val.bts=ab;
          //console.log(val.live)
           let cd = Number(val.live).toFixed(2);
           val.live=cd;
           let zx = parseFloat(val.weightage) + parseFloat(val.bts);
          val.zx = parseFloat(zx)
          val.newwe = parseFloat(val.weightage) + parseFloat(zx) ;

          val.newweight =  parseFloat(val.newwe)
           //let zx = (val.weightage/100) * val.bts;
          // console.log('ttt',zx,val.weightage)
          // val.newwe = parseFloat(val.weightage) + parseFloat(zx) ;
           //console.log('uuu',val.newwe)
          //val.newwe = (val.per/100) * val.live;
          

        //console.log(val.per, val.newwe)
        // val.newweight = parseFloat(val.per) + parseFloat(val.newwe)
          val.newweight =  parseFloat(val.newwe)
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
        resData.forEach(val => {
        //sumweight = (val.newweight/sum) * 100;
        //sumweight = val.newweight;
        //val.newweight=sumweight.toFixed(2);
        sumbps += parseFloat(val.bts);
        sumofweight +=parseFloat(val.weightage)
        })
        let bb = parseFloat(sumbps)
         let cc = parseFloat (sumofweight) 
        resData.forEach(val => {
          val.totalbts = bb
          val.sumofweight = cc
          val.totalweight = (val.totalbts) + (val.sumofweight)
          sumweight = val.zx / val.totalweight * 100;
          val.newweight=sumweight.toFixed(2);
        })
        
        let cd = totalbts.toFixed(6);
          totalbts = cd;
       // console.log(resData)
        this.data = resData;
        this.totalbts = totalbts;

        let perform = 0;
        perform = totalbts - this.nifty;
        this.perform = perform.toFixed(2);
        
        // let fetch = this.fetchData;
        // console.log(fetch)
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
        // selected: '',
        // products: [{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'} ],
        timer: '',
        data : [],
        items : ['1','2','3','4','5','6','7','8','9','10'],
        portfolio : '1',
        totalbts : 0,
        nifty : 0,
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

          { text: 'NSE DATA', value: 'live' },

          { text: 'BTS', value: 'bts' },
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
