var e=Object.defineProperty,s=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.propertyIsEnumerable,l=(s,a,t)=>a in s?e(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t,o=(e,o)=>{for(var n in o||(o={}))s.call(o,n)&&l(e,n,o[n]);if(a)for(var n of a(o))t.call(o,n)&&l(e,n,o[n]);return e};import{k as n,u as r,l as i,n as c,p as u,o as d,q as p,r as m}from"./app.beba8c26.js";import{d as y,b as v,o as b,c as h,a as T,F as f,e as g,x as k,y as I,k as S,v as L,t as O,B as x,C as $,p as E,n as P,w}from"./vendor.e49a9334.js";import{c as j}from"./community.d6037c6b.js";var A=y({name:"AgendaNavbar",setup(){const{isLoaded:e,currentDayIndex:s,daysSchedule:a}=n(),t=v((()=>a.value.map((e=>e.day)))),l=v((()=>t.value[s.value]));return{isLoaded:e,days:t,selectedDay:l,onTabClick:e=>{s.value=e}}}});const _={key:0,class:"schedule-navbar"},D={class:"tabs"},M={class:"day-text"},C={class:"date"};A.render=function(e,s,a,t,l,o){return e.isLoaded?(b(),h("nav",_,[T("div",D,[(b(!0),h(f,null,g(e.days,((s,a)=>(b(),h("div",{class:["tab",{active:e.selectedDay.join("")===s.join("")}],key:`day-option-${a}`,onClick:s=>e.onTabClick(a)},[T("span",M,k(`Day ${a+1}`),1),T("span",C,k(s.join(" / ")),1)],10,["onClick"])))),128))])])):I("v-if",!0)};var R=y({name:"ScheduleItem",props:{sessionId:{type:String,required:!0}},setup(e){const{t:s,locale:a}=r(),{xsOnly:t}=i(),{isLoaded:l,getSessionById:o}=n(),u=v((()=>o(e.sessionId))),d=v((()=>({name:"SessionDetail",params:{sessionId:u.value.id}}))),p=v((()=>u.value.type[a.value].name)),m=v((()=>`${c(u.value.start,"：")} ~ ${c(u.value.end,"：")}`)),y=v((()=>u.value[a.value].title)),b=v((()=>u.value.speakers.map((e=>e[a.value].name)))),h=v((()=>u.value.tags.map((e=>e[a.value].name)))),T=v((()=>u.value.language)),f=v((()=>u.value.room[a.value].name.split(" / ")[0])),g=S(!1),k=v((()=>s("session['room-status']."+(g.value?"full":"vacancy"))));return{isLoaded:l,xsOnly:t,location:d,track:p,period:m,title:y,speakers:b,tags:h,language:T,room:f,isFull:g,statusText:k}}});const q={class:"content-section"},N={class:"track"},U={class:"status"},B={class:"name"},F={class:"period"},G={class:"title"},W={class:"speaker-list"},z=T("span",null,"by",-1),H={class:"tag-list"};R.render=function(e,s,a,t,l,o){const n=L("router-link");return e.isLoaded?(b(),h(n,{key:0,class:"schedule-item",to:e.location},{default:O((()=>[T("section",q,[T("h4",N,[x(T("div",{class:["room",{full:e.isFull}]},[T("span",U,k(e.statusText),1),T("span",B,k(e.room),1)],2),[[$,e.xsOnly]]),T("span",null,k(e.track),1)]),I("  "),T("h4",F,k(e.period),1),I("  "),T("h2",G,k(e.title),1),I("  "),T("h3",W,[z,(b(!0),h(f,null,g(e.speakers,((s,a)=>(b(),h("span",{key:`session-${e.sessionId}-speaker-${a}`,class:"speaker"},k(s),1)))),128))]),I("  "),T("div",H,[(b(!0),h(f,null,g(e.tags,((s,a)=>(b(),h("span",{key:`tag-${e.sessionId}-tag-${a}`,class:"tag"},k(s),1)))),128))])])])),_:1},8,["to"])):I("v-if",!0)};var J=y({name:"ScheduleList",components:{ScheduleItem:R},props:{list:{type:Object,required:!0},sessionsMap:{type:Object,rquired:!0}},setup:()=>({getTimeText:([e,s])=>`${u(e)}：${u(s)}`})});const K={class:"schedule-list"},Q={class:"time"};J.render=function(e,s,a,t,l,o){const n=R;return b(),h("ul",K,[(b(!0),h(f,null,g(e.list.items,((s,a)=>(b(),h("section",{key:`schedule-list-section-${a.toString()}`,class:"section"},[T("li",Q,k(e.getTimeText(s.start)),1),(b(!0),h(f,null,g(s.elements,(({session:e})=>(b(),h("li",{key:`schedule-list-section-${a.toString()}-session-${e}`,class:"schedule-item-container"},[T(n,{"session-id":e},null,8,["session-id"])])))),128))])))),128))])};var V={},X=y({name:"AgendaTableRoomCell",props:{roomId:{type:String,required:!0}},setup(e){const{t:s,locale:a}=r(),{isLoaded:t,getRoomById:l,getRoomStatusById:o}=n(),i=v((()=>l(e.roomId)[a.value].name.split(" / ")[0])),c=v((()=>o(e.roomId))),u=v((()=>c.value.isFull)),d=v((()=>s("session['room-status']."+(u.value?"full":"vacancy")))),p=v((()=>{const s=V[e.roomId];if(null===s)return null;const a=new URL(`https://www.youtube-nocookie.com/embed/${s}`);return a.searchParams.set("autoplay","1"),a.searchParams.set("modestbranding","1"),a.searchParams.set("controls","0"),a.searchParams.set("rel","0"),a.toString()})),m=S(!1);return{isLoaded:t,roomName:i,isFull:u,statusText:d,roomLink:p,iframeLoaded:m}}});const Y={key:0,class:"schedule-table-room-cell"},Z={class:"text"},ee=T("span",null,"Room",-1);X.render=function(e,s,a,t,l,o){return e.isLoaded?(b(),h("div",Y,[T("div",Z,[ee,T("span",null,k(e.roomName),1)])])):I("v-if",!0)};var se=y({name:"ScheduleTable",components:{ScheduleItem:R,ScheduleTableRoomCell:X},props:{table:{type:Object,required:!0}}});const ae={class:"schedule-table"},te={class:"room-list"},le={class:"cell-content"},oe=T("div",{style:{height:"0.5rem"}},null,-1),ne={class:"table-body"},re={class:"cell-content"};se.render=function(e,s,a,t,l,o){const n=X,r=R;return b(),h("table",ae,[T("thead",te,[T("tr",null,[(b(!0),h(f,null,g(e.table.head,(e=>(b(),h("th",{key:`table-room-${e.room}`},[T("div",le,[T(n,{"room-id":e.room},null,8,["room-id"])])])))),128))])]),oe,T("tbody",ne,[(b(!0),h(f,null,g(e.table.body,((e,s)=>(b(),h("tr",{key:`table-row-${s}`},[(b(!0),h(f,null,g(e,((e,a)=>(b(),h("td",{key:`table-row-${s}-cell-${a}`,rowspan:e.rowspan},[T("div",re,["session"===e.type?(b(),h(r,{key:0,"session-id":e.element.session},null,8,["session-id"])):I("v-if",!0)])],8,["rowspan"])))),128))])))),128))])])};var ie=y({name:"Session",components:{ScheduleNavbar:A,ScheduleTable:se,ScheduleList:J},setup(){const e=E(),s=P(),{load:a,daysSchedule:t,currentDayIndex:l,getSessionById:c,isLoaded:u}=n(),{openPopUp:y,removeAll:v}=d(),{xsOnly:b}=i(),{locale:h}=r();function T(){const[a,t]=[u.value,e.params.sessionId];if(!a)return;if("string"!=typeof t)return void v((e=>{var s;return!(null==(s=e.popupId)?void 0:s.startsWith("session-"))}));const l=()=>{s.push({name:"Room"===e.query.from?"Room":"Session"})};var n;y("template"===t?{popupId:"session-template",metaOptions:{title:"@{TEMPLATE_META_TITLE}",description:"@{TEMPLATE_META_DESCRIPTION}",ogUrl:"@{TEMPLATE_META_OG_URL}",ogImage:"@{TEMPLATE_META_OG_IMAGE}"},containerData:{type:"default"},contentData:{type:"html",html:"@{TEMPLATE_CONTENT_HTML}"},onClose:l}:o(o({},m(c(t),(n=c(t),j.communities.find((e=>e.track===n.type["zh-TW"].name))),h.value)),{onClose:l}))}return T(),w((()=>[e.params.sessionId,u.value]),(()=>{T()})),p&&w(l,(async()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})})),{xsOnly:b,currentDayIndex:l,daysSchedule:t,load:a,tryToOpenSessionPopUp:T,route:e}},async serverPrefetch(){await this.load(),this.route.params.sessionId&&this.tryToOpenSessionPopUp()}});const ce={id:"session",class:"page-container"};ie.render=function(e,s,a,t,l,o){const n=A,r=J,i=se;return b(),h("main",ce,[T(n),(b(!0),h(f,null,g(e.daysSchedule,((s,a)=>(b(),h(f,null,[e.xsOnly?x((b(),h(r,{key:`list-${s.day.join("")}`,list:s.list},null,8,["list"])),[[$,e.currentDayIndex===a]]):x((b(),h(i,{key:`table-${s.day.join("")}`,table:s.table},null,8,["table"])),[[$,e.currentDayIndex===a]])],64)))),256))])};export{ie as default};