<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-select
      v-model="portfolio"
      :rules="dataRules"
      :items="port"
            dense
            filled
      label="portfolio"
      
      required
    ></v-select>
    <v-text-field
      v-model="nameofthestock"
      :rules="dataRules"
      label="Name of the stock"
      required
    ></v-text-field>

    <v-text-field
      v-model="weightage"
      :rules="weightageRules"
      label="Weightage"
      required
    ></v-text-field>

    <!-- <v-text-field
      v-model="symbol"
      :rules="dataRules"
      label="symbol"
      
      required
    ></v-text-field> -->

    <v-combobox
      v-model="symbol"
      
      :items="items"
      item-text="text"
      :return-object="true"
            dense
            filled
      label="symbol"
      @input.native="symbol=$event.srcElement.value"
      required
    >
    </v-combobox>
     
    <v-btn
      :loading="btnLoad"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Submit
    </v-btn>
  </v-form>
</template>


<script>
import axios from 'axios'
import { URL } from '../helper/consts.js'
  // import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      btnLoad : false,
      name: 'nameofthestock',
      dataRules: [
        // v => !!v || 'data is required',
      ],
      weightageRules: [
        //v => !!v || 'Weightage is required',
        v => {if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true; return 'Weightage must be valid' },

      ],
      items: ['INFOBEAN','CONCOR','DEEPAKNTR','OAL','TCS','ICICIBANK','ASALCBR','TEJASNET','DOLLAR','BALAMINES','IIFL','JUBLINGREA','INFY','LALPATHLAB','KOTAKBANK','SUPRAJIT','CAPLIPOINT',
'HDFCBANK','POLYCAB','HCLTECH','HDFC','SMSPHARMA','ATUL','MAHSCOOTER','ZENSARTECH','TCIDEVELOP','HINDOILEXP','RELIANCE','INTELLECT','CHOLAFIN','SAPPHIRE',
'MIRZAINT','RATEGAIN','MFL','NYKAA','POLICYBZR','DFM','UJJIVAN','ZEEL','PEL','IBREALEST','MASTEK','MITSU'],
      port:['1','2','3','4','5','6','7','8','9','10'],
      email: '',
      nameofthestock : '',
      weightage : '',
      symbol : '',
      portfolio : ''
    }),

    methods: {
      async validate () {
        if(this.$refs.form.validate())
        {
          this.snackbar = true;
        }
        if(this.valid == true) {
          this.btnLoad = true; 
          await axios.post(`${URL}analytic/insert`, {
            portfolio_id :this.portfolio,
            name : this.nameofthestock,
            weightage : this.weightage,
            symbol : this.symbol
            
          })
          // reset
           this.btnLoad = false; 
            this.nameofthestock = ''
             this.weightage = ''
             this.symbol = ''
             this.$refs.form.reset()
        }
      },
      
        
    
    },
    watch: {
  symbol: function (val) {
     this.symbol = val.toUpperCase();
  },
  
},
  }
</script>
