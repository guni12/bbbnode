(window.webpackJsonpbbb=window.webpackJsonpbbb||[]).push([[8],{571:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return h}));var a=n(16),s=n(17),o=n(20),r=n(18),c=n(19),l=n(0),i=n.n(l),u=(n(54),n(11)),m=n.n(u),b=n(27),p=window.location.protocol+"//"+window.location.host+"/api"+"/showsensors",h=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(o.a)(this,Object(r.a)(t).call(this))).state={name:"",sensor:"",sensors:[]},e}return Object(c.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(p).then((function(e){return e.json()})).then((function(t){console.log("result",t),e.setState({sensors:t}),console.log("this.state.sensors",e.state.sensors)}))}},{key:"render",value:function(){var e=this.state.sensors;return i.a.createElement("div",{className:"zones-page"},i.a.createElement("h1",null,"Sensorer"),i.a.createElement("div",null,e.map((function(e){var t=e.tempis.toFixed(1).toString();return t=t.replace(".",","),i.a.createElement("span",{key:e.id},i.a.createElement(b.b,{to:"/sensor/".concat(e.id),className:"btn btn-block"},i.a.createElement(m.a,{variant:"light",size:"lg",block:!0},i.a.createElement("span",{className:"three"},i.a.createElement("span",{className:"tempis"},i.a.createElement("b",null,t," \xb0C"))," ",i.a.createElement("span",{className:"zone"},i.a.createElement("b",null,e.name))," ",i.a.createElement("span",{className:"should"},i.a.createElement("b",null,e.sensor)," ")))))}))))}}]),t}(l.Component)}}]);
//# sourceMappingURL=8.9f56734f.chunk.js.map