(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b89530f"],{"359b":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("AppBar",{attrs:{page:t.page,updateCart:t.carts}}),e("v-container",{staticClass:"elevation-0 mt-12 mb-12"},[e("v-row",{attrs:{dense:""}},t._l(t.carts,(function(a,r){return e("v-col",{key:r,attrs:{cols:"12"}},[e("v-card",[e("div",{staticClass:"d-flex flex-no-wrap"},[e("v-avatar",{staticClass:"ma-3",attrs:{size:"125",tile:""}},[e("v-img",{attrs:{src:a.file_path}})],1),e("div",[e("v-card-title",{staticClass:"text-h5",domProps:{textContent:t._s(a.ternak_nama)}}),e("v-card-subtitle",{domProps:{textContent:t._s(a.ternak_deskripsi)}}),e("v-card-subtitle",[e("div",{staticClass:"subtitle font-weight-bold",attrs:{color:"#FF8F0B"}},[t._v(" Rp. "+t._s(t.formatPrice(a.ternak_harga))+" ")])]),e("v-card-actions",[e("div",{staticClass:"text-center"},[e("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(r){var s=r.on,n=r.attrs;return[e("v-btn",t._g(t._b({attrs:{color:"#139CA4",dark:""}},"v-btn",n,!1),s),[t._v(" Details ")]),e("v-btn",{attrs:{color:"orange lighten-2",dark:"",to:"payment/"+a.id}},[t._v(" Checkout ")])]}}],null,!0)},[e("v-card",[e("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(" Detail Pesanan ")]),e("v-card-text",[e("table",{staticClass:"table"},[e("tbody",[e("tr",[e("td",[t._v("Nama Ternak")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(a.ternak_nama))])]),e("tr",[e("td",[t._v("Deskripsi")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(a.ternak_deskripsi))])]),e("tr",[e("td",[t._v("Harga")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(a.ternak_harga))])]),e("tr",[e("td",[t._v("Penerima")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(JSON.parse(a.transaksi_alamat).name))])]),e("tr",[e("td",[t._v("Detail Alamat")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(JSON.parse(a.transaksi_alamat).alamat)+", "+t._s(JSON.parse(a.transaksi_alamat).detail_alamat)+" ")])]),e("tr",[e("td",[t._v("Note")]),e("td",[t._v(" : ")]),e("td",[t._v(t._s(JSON.parse(a.transaksi_alamat).note))])])])])]),e("v-divider"),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"orange lighten-2",dark:"",to:"payment/"+a.id}},[t._v(" Checkout ")])],1)],1)],1)],1)])],1)],1)])],1)})),1)],1)],1)},s=[],n=(e("ac1f"),e("5319"),e("b680"),e("d3b7"),e("25f0"),e("dd38")),i=e("bc3a"),o=e.n(i),c={name:"Cart",components:{AppBar:n["a"]},data:function(){return{page:{link:"/",title:"Keranjang"},carts:[]}},methods:{setCarts:function(t){this.carts=t,console.log(this.carts)},formatPrice:function(t){var a=(t/1).toFixed(2).replace(".",",");return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}},mounted:function(){var t=this;o.a.get("http://ternakmart.id/ternakmart_api/public/api/transaksi/"+this.$store.state.auth.user.id+"/cart").then((function(a){return t.setCarts(a.data.cart)})).catch((function(t){return console.log(t)}))}},d=c,l=e("2877"),v=e("6544"),_=e.n(v),p=e("8212"),u=e("8336"),m=e("b0af"),b=e("99d9"),f=e("62ad"),k=e("a523"),g=e("169a"),h=e("ce7e"),C=e("adda"),V=e("0fd9"),w=e("2fa4"),x=Object(l["a"])(d,r,s,!1,null,null,null);a["default"]=x.exports;_()(x,{VAvatar:p["a"],VBtn:u["a"],VCard:m["a"],VCardActions:b["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCol:f["a"],VContainer:k["a"],VDialog:g["a"],VDivider:h["a"],VImg:C["a"],VRow:V["a"],VSpacer:w["a"]})},dd38:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-app-bar",{attrs:{absolute:"",color:"white"}},[e("v-btn",{attrs:{icon:"",color:"teal",to:t.page.link}},[e("v-icon",[t._v("mdi-chevron-left")])],1),e("span",{staticClass:"title font-weight-bold text-center mx-auto"},[t._v(t._s(t.page.title))])],1)},s=[],n={props:{page:{type:Object,required:!0}}},i=n,o=e("2877"),c=e("6544"),d=e.n(c),l=e("40dc"),v=e("8336"),_=e("132d"),p=Object(o["a"])(i,r,s,!1,null,null,null);a["a"]=p.exports;d()(p,{VAppBar:l["a"],VBtn:v["a"],VIcon:_["a"]})}}]);
//# sourceMappingURL=chunk-0b89530f.5dfc4473.js.map