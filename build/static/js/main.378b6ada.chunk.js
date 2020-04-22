(this["webpackJsonpsolar-calculator"]=this["webpackJsonpsolar-calculator"]||[]).push([[0],{176:function(e,t,a){e.exports=a(299)},181:function(e,t,a){},299:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),i=a.n(l),o=(a(181),a(155)),c=a(16),s=a(332),u=a(324),d=a(325),g=a(303),h=a(326),m=a(154),p=a(110),f=a(333),y=a(149),v=a.n(y),b=a(322),D=a(144),E=a(145),x=a(64),w=function(){function e(){Object(D.a)(this,e)}return Object(E.a)(e,[{key:"getDeg",value:function(e){return"-"===e[0].charAt(0)?-parseFloat(e[0].substring(1))-parseFloat(e[1])/60-parseFloat(e[2])/3600:parseFloat(e[0])+parseFloat(e[1])/60+parseFloat(e[2])/3600}},{key:"getDegMinSec",value:function(e){var t=Math.floor(e),a=Math.floor(60*(e-t)),n=Math.round(3600*(e-t-a/60));return 60===n&&(a++,n=0),60===a&&(t++,a=0),[t.toString(),a.toString(),n.toString()]}},{key:"formatDayLength",value:function(e){var t=e/1e3,a=Math.floor(t%60),n=Math.floor(t/60%60),r=Math.floor(t/60/60%24),l=Math.floor(t/60/60/24);return(0===l?"":l+"d ")+r+"h "+n+"m "+a+"s"}},{key:"latIsValid",value:function(e){var t=Array.isArray(e)?this.getDeg(e):e;return t>=-90&&t<=90}},{key:"lngIsValid",value:function(e){var t=Array.isArray(e)?this.getDeg(e):e;return t>=-180&&t<=180}},{key:"dateIsValid",value:function(e){return null!==e&&!isNaN(e.getTime())}},{key:"stateIsValid",value:function(e,t,a){return this.latIsValid(e)&&this.lngIsValid(t)&&this.dateIsValid(a)}},{key:"getSunrise",value:function(e,t,a){return Object(x.getTimes)(a,e,t).sunrise}},{key:"getSunset",value:function(e,t,a){return Object(x.getTimes)(a,e,t).sunset}},{key:"getDayLength",value:function(e,t,a){var n=this.getSunrise(e,t,a),r=this.getSunset(e,t,a);return Math.abs(r-n)}},{key:"getDayLengthString",value:function(e,t){return this.formatDayLength(Math.abs(t-e))}},{key:"msToHrs",value:function(e){return e/1e3/60/60%24}},{key:"getPolarDayLength",value:function(e,t,a){var n=Object(x.getTimes)(a,e,t),r=new Date(a);return"Invalid Date"!==n.sunrise.toString()?isNaN(this.getDayLength(e,t,new Date(r.setDate(r.getDate()+1))))?24:0:"Invalid Date"!==n.sunset.toString()?isNaN(this.getDayLength(e,t,new Date(r.setDate(r.getDate()+1))))?0:24:Object(x.getPosition)(r,e,t).altitude>=0?24:0}},{key:"getGraphDayLength",value:function(e,t,a){var n=this.msToHrs(this.getDayLength(e,t,a));return isNaN(n)&&(n=this.getPolarDayLength(e,t,a)),n}},{key:"getChartData",value:function(e,t,a,n){var r=new Map;r.set("labels",[]),r.set("data",[]);for(var l=new Date(e);l<=t;)r.get("labels").push(new Date(l)),r.get("data").push({x:new Date(l),y:this.getGraphDayLength(a,n,l)}),l=new Date(l.setDate(l.getDate()+1));return r}}]),e}(),S=a(323);function j(e){var t=new w,a=O(),l=Object(n.useState)(t.getDegMinSec(e.coordinate)),i=Object(c.a)(l,2),o=i[0],s=i[1],u=function(a){return""!==a[0]&&""!==a[1]&&""!==a[2]&&"latitude"===e.type?t.latIsValid(a):t.lngIsValid(a)},d=function(a){return function(n){var r=n.target.value.replace(a>0?/[^0-9]/g:/[^0-9-]/g,""),l=Object(m.a)(o);l[a]=r,s(l),e.setCoordinate(t.getDeg(l))}};Object(n.useEffect)((function(){for(var a=t.getDegMinSec(e.coordinate),n=0;n<3;n++)if(a[n]!==o[n]){s(a);break}}),[e.coordinate]);return r.a.createElement("div",{style:{width:"270px"}},r.a.createElement(S.a,null,e.type.charAt(0).toUpperCase()+e.type.substring(1)),r.a.createElement("div",{className:a.input},function(){for(var e=[],t=0;t<3;t++)e.push(r.a.createElement(f.a,{key:t,error:!u(o)},r.a.createElement(v.a,{value:o[t],onChange:d(t),endAdornment:r.a.createElement(b.a,null,0===t?"\xb0":1===t?"'":"''"),inputProps:{style:{textAlign:"right"}}})));return e}()),r.a.createElement(S.a,{error:!0},u(o)?" ":"latitude"===e.type?"Latitude must be between -90\xb0 and 90\xb0.":"Longitude must be between -180\xb0 and 180\xb0."))}var O=Object(p.a)((function(){return{input:{"& > *":{width:"40px"},display:"flex"}}})),C=a(18),L=a(329),k=a(153);function I(e){var t=M();return r.a.createElement(C.a,{utils:k.a},r.a.createElement(L.a,{className:t.date,label:e.label,format:"MM/dd/yyyy",value:e.date,onChange:function(t){e.setDate(t)},KeyboardButtonProps:{"aria-label":"change date"}}))}var M=Object(u.a)((function(){return{date:{"& > *":{maxWidth:"180px"},marginBottom:"2vh"}}})),N=a(331),V=a(334),A=a(327),F=a(20),T=a.n(F);function W(e){var t=new w,a=Y(),l=Object(n.useState)([Number(0).toFixed(4),Number(0).toFixed(4)]),i=Object(c.a)(l,2),o=i[0],u=i[1],g=function(){return t.latIsValid(e.lat)&&t.lngIsValid(e.lng)};return r.a.createElement(s.a,{className:a.root},r.a.createElement(d.a,{className:a.location},"Latitude: "+o[0]," \u2002 ","Longitude: "+o[1]),r.a.createElement(s.a,{className:a.map},r.a.createElement(N.a,{center:[30,0],zoom:1.5,onClick:e.handleMapClick,onMouseMove:function(e){u([Number(e.latlng.lat).toFixed(4),Number(e.latlng.lng).toFixed(4)])}},r.a.createElement(V.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),r.a.createElement(A.a,{opacity:g()?100:0,icon:z(),position:g()?[e.lat,e.lng]:[0,0]}))))}var z=function(){var e=new T.a.Icon.Default;return e.options.shadowSize=[0,0],e},Y=Object(p.a)((function(){return{root:{display:"grid",width:"100%",height:"100%"},location:{backgroundColor:"white",gridRow:"1",gridColumn:"1",zIndex:"2",position:"relative",justifySelf:"right",width:"300px",height:"25px",opacity:"0.7",padding:"0 5px 0 5px"},map:{gridRowStart:"1",gridRowEnd:"2",gridColumnStart:"1",gridColumnEnd:"2",width:"100%",height:"100%",zIndex:"0",position:"relative"}}}));function B(e){var t=P(),a=new w,l=Object(n.useState)(new Date),i=Object(c.a)(l,2),o=i[0],s=i[1],u=Object(n.useState)(a.getSunrise(e.lat,e.lng,new Date)),m=Object(c.a)(u,2),p=m[0],f=m[1],y=Object(n.useState)(a.getSunset(e.lat,e.lng,new Date)),v=Object(c.a)(y,2),b=v[0],D=v[1],E=e.lat,x=e.lng;return r.a.createElement("div",{className:t.root},r.a.createElement(d.a,{className:t.calculator},r.a.createElement("div",{className:t.form},r.a.createElement(j,{type:"latitude",coordinate:e.lat,setCoordinate:function(e){E=e},isValid:a.latIsValid}),r.a.createElement(j,{type:"longitude",coordinate:e.lng,setCoordinate:function(e){x=e},isValid:a.lngIsValid}),r.a.createElement(I,{date:o,label:"Date",setDate:s}),r.a.createElement(h.a,{variant:"contained",color:"primary",onClick:function(){a.stateIsValid(E,x,o)&&(e.setLat(E),e.setLng(x),f(a.getSunrise(E,x,o)),D(a.getSunset(E,x,o)))},style:{width:"150px"}},"Calculate")),r.a.createElement("div",{className:t.result},r.a.createElement(g.a,{variant:"h5",paragraph:!0},"Sunrise: ",p.toUTCString()),r.a.createElement(g.a,{variant:"h5",paragraph:!0},"Sunset: ",b.toUTCString()),r.a.createElement(g.a,{variant:"h5"},"Length of day: ",a.getDayLengthString(p,b)))),r.a.createElement(d.a,{className:t.map},r.a.createElement(W,{lat:e.lat,lng:e.lng,handleMapClick:function(t){e.setLat(t.latlng.lat),e.setLng(t.latlng.lng)}})))}var P=Object(u.a)((function(){return{root:{display:"flex",flexDirection:"column",alignItems:"center"},calculator:{display:"flex",justifyContent:"space-around",flexWrap:"wrap",alignItems:"center",padding:"3ch 5ch 3ch 5ch",width:"40vw"},form:{display:"flex",flexDirection:"column",minWidth:"220px"},date:{"& > *":{maxWidth:"180px"},marginBottom:"2vh"},result:{display:"flex",flexDirection:"column",justifyContent:"space-between",margin:"2vh 0 2vh 0",width:"25vw"},map:{width:"55vw",height:"55vh",marginTop:"3vh"}}})),R=a(150),U=a(109),G=a.n(U);function H(e){var t=K(),a=new w,l=new Date,i=Object(n.useState)(new Date(l)),o=Object(c.a)(i,2),u=o[0],g=o[1],m=Object(n.useState)(new Date(l.setFullYear(l.getFullYear()+1))),p=Object(c.a)(m,2),f=p[0],y=p[1],v=Object(n.useState)(a.getChartData(u,f,e.lat,e.lng)),b=Object(c.a)(v,2),D=b[0],E=b[1],x=Object(n.useState)({labels:D.get("labels"),datasets:[{borderColor:"rgba(17, 82, 147, 1)",backgroundColor:"rgba(17, 82, 147, 0.5)",data:D.get("data")}]}),S=Object(c.a)(x,2),O=S[0],C=S[1],L=Object(n.useState)({title:{text:"Length of day per date",display:!0},responsive:!0,maintainAspectRatio:!1,legend:{display:!1},elements:{point:{radius:0}},scales:{xAxes:[{type:"time",time:{unit:J(D.get("labels").length),unitStepSize:q(D.get("labels").length),displayFormats:{day:"MMM DD",month:"MMM",year:"YYYY"}}}],yAxes:[{scaleLabel:{display:!0,labelString:"Day length (hrs)",fontWeight:"bold"},ticks:{min:0,max:24}}]}}),k=Object(c.a)(L,2),M=k[0],N=k[1],V=e.lat,A=e.lng;return r.a.createElement(s.a,{style:{display:"flex",flexDirection:"column",alignItems:"center"}},r.a.createElement(d.a,{style:{display:"flex",flexDirection:"row",padding:0,height:"40vh"}},r.a.createElement("div",{className:t.form},r.a.createElement(j,{type:"latitude",coordinate:V,setCoordinate:function(e){V=e},isValid:a.latIsValid}),r.a.createElement(j,{type:"longitude",coordinate:A,setCoordinate:function(e){A=e},isValid:a.lngIsValid}),r.a.createElement(I,{date:u,label:"Start date",setDate:g}),r.a.createElement(I,{date:f,label:"End date",setDate:y}),r.a.createElement(h.a,{variant:"contained",color:"primary",onClick:function(){if(a.stateIsValid(V,A,u)&&a.dateIsValid(f)){e.setLat(V),e.setLng(A);var t=a.getChartData(u,f,V,A);E(t);var n=G.a.clone(O);n.labels=t.get("labels"),n.datasets[0].data=t.get("data"),C(n);var r=G.a.clone(M);r.scales.xAxes[0].time.unit=J(t.get("labels").length),r.scales.xAxes[0].time.unitStepSize=q(t.get("labels").length),N(r)}},style:{width:"150px"}},"Update chart")),r.a.createElement(s.a,{style:{width:"45vw",height:"40vh",margin:0}},r.a.createElement(W,{lat:e.lat,lng:e.lng,handleMapClick:function(t){e.setLat(t.latlng.lat),e.setLng(t.latlng.lng)}}))),r.a.createElement(d.a,{className:t.graph},r.a.createElement(R.a,{id:"chart",options:M,data:O})))}var J=function(e){return e>750?"year":e>90?"month":"day"},q=function(e){var t=J(e);return"day"===t?e>60?6:e>30?3:1:e<=15*("month"===t?30:365)?1:0},K=Object(u.a)((function(){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",alignItems:"center",padding:"3ch 5ch 3ch 5ch"},form:{display:"flex",flexDirection:"column",minWidth:"220px",padding:"4ch"},graph:{marginTop:"3ch",padding:"3ch",height:"40vh",width:"80%"}}})),$=a(330),Q=a(328),X=a(152),Z=a.n(X);function _(e){var t=e.children,a=e.value,n=e.index,l=Object(o.a)(e,["children","value","index"]),i=ee();return r.a.createElement("div",Object.assign({hidden:a!==n,className:i.root},l),a===n&&r.a.createElement(s.a,{p:3},t))}var ee=Object(u.a)((function(){return{root:{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}})),te=function(){var e=Object(n.useState)(0),t=Object(c.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)(0),o=Object(c.a)(i,2),s=o[0],u=o[1],d=r.a.useState(0),g=Object(c.a)(d,2),h=g[0],m=g[1];return r.a.createElement("div",null,r.a.createElement(Z.a,{square:!0},r.a.createElement($.a,{value:h,indicatorColor:"primary",textColor:"primary",onChange:function(e,t){m(t)}},r.a.createElement(Q.a,{label:"Calculator"}),r.a.createElement(Q.a,{label:"Graph"}))),r.a.createElement(_,{value:h,index:0},r.a.createElement(B,{lat:a,lng:s,setLat:l,setLng:u})),r.a.createElement(_,{value:h,index:1},r.a.createElement(H,{lat:a,lng:s,setLat:l,setLng:u})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[176,1,2]]]);
//# sourceMappingURL=main.378b6ada.chunk.js.map