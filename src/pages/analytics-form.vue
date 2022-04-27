<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-autocomplete
      v-model="portfolio"
      :rules="dataRules"
      :items="port"
            dense
            filled
      label="portfolio"
      
      required
    ></v-autocomplete>
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
      :rules="dataRules"
      :items="items"
            dense
            filled
      label="symbol"
      
      required
    ></v-combobox>
     
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
      items: ['INFOBEAN.NS','CONCOR.NS','DEEPAKNTR.NS','OAL.NS','TCS.NS','ICICIBANK.NS','ASALCBR.NS','TEJASNET.NS','DOLLAR.NS','BALAMINES.NS','IIFL.NS','JUBLINGREA.NS','INFY.NS','LALPATHLAB.NS','KOTAKBANK.NS','SUPRAJIT.NS','CAPLIPOINT.NS',
'HDFCBANK.NS','POLYCAB.NS','HCLTECH.NS','HDFC.NS','SMSPHARMA.NS','ATUL.NS','MAHSCOOTER.NS','ZENSARTECH.NS','TCIDEVELOP.NS','HINDOILEXP.NS','RELIANCE.NS','INTELLECT.NS','CHOLAFIN.NS','SAPPHIRE.NS',
'MIRZAINT.NS','RATEGAIN.NS','MFL.NS','NYKAA.NS','POLICYBZR.NS','DFM.BO','UJJIVAN.NS','ZEEL.NS','PEL.NS','IBREALEST.NS','MASTEK.NS','MITSU.BO'],
      port:['1','2','3'],
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