import{u as e,s as a}from"./app.beba8c26.js";import{d as s,o as t,c as p,F as n,e as l,y as o,a as m}from"./vendor.e49a9334.js";const r=a({"../assets/images/venues/map-2F.jpg":Object.freeze(Object.defineProperty({__proto__:null,default:"/2022/assets/map-2F.1660c20d.jpg"},Symbol.toStringTag,{value:"Module"})),"../assets/images/venues/map-3F.jpg":Object.freeze(Object.defineProperty({__proto__:null,default:"/2022/assets/map-3F.0dc9bd17.jpg"},Symbol.toStringTag,{value:"Module"})),"../assets/images/venues/map-4F.jpg":Object.freeze(Object.defineProperty({__proto__:null,default:"/2022/assets/map-4F.56171379.jpg"},Symbol.toStringTag,{value:"Module"})),"../assets/images/venues/map-5F.jpg":Object.freeze(Object.defineProperty({__proto__:null,default:"/2022/assets/map-5F.cb90b292.jpg"},Symbol.toStringTag,{value:"Module"})),"../assets/images/venues/map-all.jpg":Object.freeze(Object.defineProperty({__proto__:null,default:"/2022/assets/map-all.15b6f1b5.jpg"},Symbol.toStringTag,{value:"Module"}))},"../assets/images/venues/*.jpg");var u=s({name:"Venue",components:{},setup(){const a=["map-all","map-2F","map-3F","map-4F","map-5F"],s=Object.fromEntries(a.map((e=>[e,r[`${e}.jpg`]]))),{t:t}=e();return{t:t,maps:a,mapImages:s}}});const g={id:"venue",class:"page-container"};u.render=function(e,a,s,r,u,i){return t(),p("main",g,[(t(!0),p(n,null,l(e.maps,(a=>(t(),p("div",{key:a,class:"map-container"},[o(' <h2 class="title">\n        <a :href="linksImages[map]" target="_blank">\n          {{ t(`home.info.${map}`)}}\n        </a>\n      </h2> '),m("img",{src:e.mapImages[a],alt:"Map"},null,8,["src"])])))),128))])};export{u as default};