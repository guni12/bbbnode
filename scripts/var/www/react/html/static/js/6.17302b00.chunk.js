(window.webpackJsonpbbb=window.webpackJsonpbbb||[]).push([[6],{540:function(e,t,a){"use strict";a.r(t);var n=a(28),o=a(15),r=a(16),l=a(18),c=a(17),s=a(4),m=a(19),i=a(0),u=a.n(i),h=(a(53),a(11)),d=a.n(h),g=a(26),y=a(27),E=a.n(y),p=a(21),v=a.n(p),f=a(1),b=a.n(f),w=(a(66),(new Date).getFullYear(),(new Date).getMonth(),function(e,t){return"".concat(e).padStart(t,"0")}),D=function(e){var t="[object Date]"===Object.prototype.toString.call(e),a=e&&!Number.isNaN(e.valueOf());return t&&a},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return D(e)?[e.getFullYear(),w(+e.getMonth()+1,2),w(+e.getDate(),2)].join("-"):null},C=a(446),S=a.n(C),I=(a(488),a(539)),N=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return u.a.createElement("button",{className:"btn-primary btn-light",onClick:this.props.onClick},this.props.placeholderText)}}]),t}(u.a.Component),O=a(20),j=a.n(O);a.d(t,"default",(function(){return P}));var k="http://"+window.location.hostname+":1337",x=k+"/settings",T=k+"/editsettings",M=k+"/spotcal",A=k+"/controlupdate",F=k+"/tempupdate",L=k+"/hourcontrol";N.propTypes={onClick:j.a.func,value:j.a.string,placeholderText:j.a.object},Object(C.registerLocale)("sv",I.a),console.log(I.a);var P=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(c.a)(t).call(this,e)))._isMounted=!1,a.checkAway=function(e,t){console.log("I CHECKAWAY"),console.log(a.state),a.state.awayto&&(new Date(t)<new Date||new Date(t)<new Date(e))&&(console.log("SL\xc4NG",new Date(t)),a.updateSettings("awayfrom","null"),a.updateSettings("awayto","null"),a.setState({startDate:new Date}),a.setState({toDate:new Date}),a.updates())},a.handleAreaChange=function(e){console.log("Area:"+e),a.updateSettings("area",e),a.updates()},a.handlePercentChange=function(e){console.log("Percent:"+e),a.updateSettings("percent",e),a.updates()},a.handleCurrencyChange=function(e){console.log("Currency:",e),a.updateSettings("currency",e),a.updates()},a.updates=function(){fetch(M).then((function(e){return e.json()})).then((function(e){return console.log("spotdata",e),fetch(A)})).then((function(e){return e.json()})).then((function(e){return console.log("controldata",e),fetch(F)})).then((function(e){return e.json()})).then((function(e){return console.log("tempc",e),fetch(L)})).then((function(e){return e.json()})).then((function(e){console.log("hourc",e)})).catch((function(e){if(console.log(e),"AbortError"!==e.name)throw e}))},a.getDsmText=function(e){if(void 0!==e)return 1===e?"Eln\xe4tsbolag styr":"Eln\xe4tsbolag styr ej"},a.getModeText=function(e){if(void 0!==e)return 1===e?"Du styr enligt elpris":"Du styr ej enligt elpris"},a.getModeVariant=function(e){if(void 0!==e)return 1===e?"success":"danger"},a.handleControlChange=function(e,t){if(console.log(e,t),t.preventDefault(),void 0!==e){var n=1===e?0:1;console.log("Det var "+e+" Ska nu vara: ",n),a.updateSettings("percenton",n),a.updates()}},a.handleDsmChange=function(e,t){if(console.log("Dsm: ",e,t),t.preventDefault(),void 0!==e){var n=1===e?0:1;console.log("Det var "+e+" Ska nu vara: ",n),a.updateSettings("dsmon",n),a.updates()}},a.handleFromChange=function(e){console.log("From:",K(e)),a.updateSettings("awayfrom",K(e));var t=new Date(K(e));a.setState({startDate:t}),a.updates()},a.handleToChange=function(e){console.log("To:",K(e)),a.updateSettings("awayto",K(e));var t=new Date(K(e));a.setState({toDate:t}),a.updates()},a.updateSettings=function(e,t){console.log(e,t),fetch(T,{method:"POST",body:"column="+e+"&value="+t+"&id=1",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(o){if(console.log(o),200!==o.status)throw new Error(o.error);console.log("Uppdaterat",e,t),"null"===t&&(t=""),a.setState(Object(n.a)({},e,t)),console.log(a.state),"awayfrom"!==e&&"awayto"!==e||(console.log("F\xd6RE CHECK",a.state),a.checkAway(a.state.awayfrom,a.state.awayto))})).catch((function(e){console.error(e)}))},console.log(e),Object(C.registerLocale)("sv",I.a),Object(C.setDefaultLocale)("sv"),a.state={dsmon:0,currency:"currency",area:"area",percenton:0,percent:0,lat:"Latitud",long:"Longitud",awayto:"",awayfrom:"",startDate:new Date,toDate:new Date,test:K("2019-07-23")},a.handleAreaChange=a.handleAreaChange.bind(Object(s.a)(a)),a.handlePercentChange=a.handlePercentChange.bind(Object(s.a)(a)),a.handleCurrencyChange=a.handleCurrencyChange.bind(Object(s.a)(a)),a.handleDsmChange=a.handleDsmChange.bind(Object(s.a)(a)),a.handleFromChange=a.handleFromChange.bind(Object(s.a)(a)),a.handleToChange=a.handleToChange.bind(Object(s.a)(a)),a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,fetch(x).then((function(e){return e.json()})).then((function(t){if(e._isMounted){console.log(t),e.setState({area:t.area}),e.setState({currency:t.currency}),e.setState({lat:t.lat}),e.setState({long:t.long}),e.setState({percent:t.percent}),e.setState({percenton:t.percenton}),e.setState({dsmon:t.dsmon}),e.setState({awayfrom:t.awayfrom}),e.setState({awayto:t.awayto});var a=null!==t.awayfrom?new Date(t.awayfrom):new Date,n=null!==t.awayfrom?new Date(t.awayfrom):new Date;e.setState({startDate:a}),e.setState({toDate:n}),e.checkAway(t.awayfrom,t.awayto)}})).catch((function(e){if(console.log(e),"AbortError"!==e.name)throw e}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=u.a.createElement("span",null,u.a.createElement("span",{className:"redtext"},this.state.percent)," %"),t=u.a.createElement("span",null,"Omr\xe5de ",u.a.createElement("span",{className:"redtext"},this.state.area)),a=u.a.createElement("span",null,"Valuta ",u.a.createElement("span",{className:"redtext"},this.state.currency)),n=u.a.createElement("span",null,"Latitud ",u.a.createElement("span",{className:"redtext"},this.state.lat)),o=u.a.createElement("span",null,"Longitud ",u.a.createElement("span",{className:"redtext"},this.state.long)),r=u.a.createElement("span",null,u.a.createElement("span",{className:"twofive"},"Bortrest fr\xe5n: "),u.a.createElement("span",{className:"redtext"},this.state.awayfrom)),l=u.a.createElement("span",null,u.a.createElement("span",{className:"twofive"},"Bortrest till: "),u.a.createElement("span",{className:"redtext"},this.state.awayto));return u.a.createElement("div",{className:"hub-page"},u.a.createElement("h1",null,"Inst\xe4llningar"),u.a.createElement("div",{className:"d-flex flex-column"},u.a.createElement("div",{className:"dropContainer"},u.a.createElement(b.a,{type:"checkbox",className:"settings-toggle",onClick:this.handleControlChange.bind(this,this.state.percenton),variant:this.getModeVariant(this.state.percenton)},this.getModeText(this.state.percenton))),u.a.createElement("div",{className:"dropContainer"},u.a.createElement(b.a,{type:"checkbox",className:"settings-toggle",onClick:this.handleDsmChange.bind(this,this.state.dsmon),variant:this.getModeVariant(this.state.dsmon)},this.getDsmText(this.state.dsmon)))),u.a.createElement(E.a,{id:"dropdown-area",onSelect:this.handleAreaChange,title:t},u.a.createElement(v.a.Item,{eventKey:"SE1"},"SE1"),u.a.createElement(v.a.Item,{eventKey:"SE2"},"SE2"),u.a.createElement(v.a.Item,{eventKey:"SE3"},"SE3"),u.a.createElement(v.a.Item,{eventKey:"SE4"},"SE4"),u.a.createElement(v.a.Item,{eventKey:"SP1"},"SP1"),u.a.createElement(v.a.Item,{eventKey:"DK1"},"DK1"),u.a.createElement(v.a.Item,{eventKey:"EE"},"EE"),u.a.createElement(v.a.Item,{eventKey:"FI"},"FI"),u.a.createElement(v.a.Item,{eventKey:"LT"},"LT"),u.a.createElement(v.a.Item,{eventKey:"LV"},"LV"),u.a.createElement(v.a.Item,{eventKey:"NO1"},"NO1"),u.a.createElement(v.a.Item,{eventKey:"NO2"},"NO2"),u.a.createElement(v.a.Item,{eventKey:"NO3"},"NO3"),u.a.createElement(v.a.Item,{eventKey:"NO4"},"NO4"),u.a.createElement(v.a.Item,{eventKey:"NO5"},"NO5")),u.a.createElement(E.a,{id:"dropdown-currency",onSelect:this.handleCurrencyChange,title:a},u.a.createElement(v.a.Item,{eventKey:"SEK"},"SEK"),u.a.createElement(v.a.Item,{eventKey:"DKK"},"DKK"),u.a.createElement(v.a.Item,{eventKey:"NOK"},"NOK"),u.a.createElement(v.a.Item,{eventKey:"EUR"},"EUR")),u.a.createElement(E.a,{id:"dropdown-percent",onSelect:this.handlePercentChange,title:e},u.a.createElement(v.a.Item,{eventKey:"0"},"0"),u.a.createElement(v.a.Item,{eventKey:"1"},"1"),u.a.createElement(v.a.Item,{eventKey:"2"},"2"),u.a.createElement(v.a.Item,{eventKey:"3"},"3"),u.a.createElement(v.a.Item,{eventKey:"4"},"4"),u.a.createElement(v.a.Item,{eventKey:"5"},"5"),u.a.createElement(v.a.Item,{eventKey:"6"},"6"),u.a.createElement(v.a.Item,{eventKey:"7"},"7"),u.a.createElement(v.a.Item,{eventKey:"8"},"8"),u.a.createElement(v.a.Item,{eventKey:"9"},"9"),u.a.createElement(v.a.Item,{eventKey:"10"},"10"),u.a.createElement(v.a.Item,{eventKey:"11"},"11"),u.a.createElement(v.a.Item,{eventKey:"12"},"12"),u.a.createElement(v.a.Item,{eventKey:"13"},"13"),u.a.createElement(v.a.Item,{eventKey:"14"},"14"),u.a.createElement(v.a.Item,{eventKey:"15"},"15"),u.a.createElement(v.a.Item,{eventKey:"16"},"16"),u.a.createElement(v.a.Item,{eventKey:"17"},"17"),u.a.createElement(v.a.Item,{eventKey:"18"},"18"),u.a.createElement(v.a.Item,{eventKey:"19"},"19"),u.a.createElement(v.a.Item,{eventKey:"20"},"20")),u.a.createElement(d.a,{variant:"light",size:"lg",block:!0},u.a.createElement(g.b,{to:"/settings",className:"buttonstyle"},n)),u.a.createElement(d.a,{variant:"light",size:"lg",block:!0},u.a.createElement(g.b,{to:"/settings",className:"buttonstyle"},o)),u.a.createElement("div",{className:"btn-light btn-block"},u.a.createElement(S.a,{customInput:u.a.createElement(N,{placeholderText:r}),selected:this.state.startDate,dateFormat:"yyyy-MM-dd",locale:"sv",className:".btn-primary datefrom",calendarClassName:"datefrom",showWeekNumbers:!0,minDate:new Date,onChange:this.handleFromChange})),u.a.createElement("div",{className:"btn-light btn-block"},u.a.createElement(S.a,{customInput:u.a.createElement(N,{placeholderText:l}),selected:this.state.toDate,dateFormat:"yyyy-MM-dd",locale:"sv",className:".btn-primary dateto",calendarClassName:"dateto",minDate:new Date(this.state.awayfrom),showWeekNumbers:!0,onChange:this.handleToChange})),u.a.createElement(d.a,{variant:"light",size:"lg",block:!0},u.a.createElement(g.b,{to:"/zones",className:"buttonstyle"},"Dina zoner")))}}]),t}(i.Component)}}]);
//# sourceMappingURL=6.17302b00.chunk.js.map