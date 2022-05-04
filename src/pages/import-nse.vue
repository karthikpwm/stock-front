<template>

  <div class="text-center">
    <input type="file" ref="file" @change="onChange($event)">
    
    <v-btn
      
      color="blue-grey"
      class="ma-2 white--text"
     @click="onUploadFile"
      
     
    >
      Upload
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
    
    </div>
</template>



<script>

import XLSX from "xlsx"
import axios from "axios";
import {URL} from './../helper/consts'

  export default {

    async mounted () {
      
    //await this.onUploadFile();
    
    //this.timer = setInterval(this.fetchData, 300000);
    // this.showLocaleTime();
    

    },

    methods: {
      onChange(event) {
        //console.log('hiiii')
        //console.log('ooooo',this.file)
        
       

      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();
        //console.log('hgnjjyh',this.file)
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {  skipHeader: true });
          

          this.excelData = data;
        //  data.map((item) => {
        //   this.itemsList.push(item.XLSX);
        // });
        //let rsedata = data
        //rsedata.forEach(element => {
          // let ab = element.PREVCLOSE ;
          // let bc = element.CLOSE;

          // let cd = bc.toFixed(2)- ab.toFixed(2);
          // let da = cd / element.PREVCLOSE * 100;
          // console.log(da.toFixed(2))
        //});
          //console.log('pppppp',data.PREVCLOSE)

          //this.data = data;
           

             }
      reader.readAsBinaryString(this.file);
      }
      //console.log('tooo')
      },

      onUploadFile() {
      // const formData = new FormData();
      // formData.append("file", this.file);  // appending file

     // sending file to the backend
//        axios
//       .get(`${URL}analytic`)     
//       .then( async (res) => {
//         //console.log(res.data)
//         let resData = res.data.data;
// resData.forEach(element => {
//   let en = element.name.slice(0, 6)
//   console.log(element.portfolio_id,en)
//   //console.log('hiiii',{excelData : this.excelData} ) 
//      //console.log('asfdfdsfds'.slice(1,4))
    
//      let exdata = this.excelData;
// exdata.forEach(val => {
//   let vn = val.name.slice(0,6)

// let wn = val.weightage
// let eportid = val.portfolio_id
// console.log(val.portfolio_id,vn,wn,eportid)
//   // if(element.portfolio_id == excelData. && element.name == excelData.name)
//   // {
//   //    console.log('pppp')
//   // }


// // let valp = this.eportid ;
// //   let excname = this.vn;
// //   let excweight = this.wn;

//    console.log('ooooo',element.portfolio_id,val.portfolio_id,en,vn)
//     if(element.portfolio_id == val.portfolio_id && en == vn) {
//       console.log('jojojo',val.portfolio_id,vn)
//       axios.put(`${URL}analytic/${element.analytic_id}`,{
//            name : val.name,
//            weightage : val.weightage,
//            symbol : val.symbol
 
//            })
          
//     }
//      else{
//        axios.post(`${URL}analytic/upexcel`, {
//          portfolio_id :element.portfolio_id,
//             name : element.name,
//             weightage : element.weightage,
//             symbol : element.symbol

//       })
//     }

// });
 
// })


     
      
//       })  
      
      axios.post(`${URL}analytic/uploadnse`, 
      { excelData : this.excelData 
          })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
     
     
      data: () => {
      return {
        // itemsList : [],
        vn :0,
        loader: null,
        da : '',
        loading3: false,
        
      }
    }
   },
   
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>