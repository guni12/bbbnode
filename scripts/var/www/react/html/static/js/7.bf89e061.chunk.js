(window.webpackJsonpbbb=window.webpackJsonpbbb||[]).push([[7],{572:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var o=n(16),s=n(17),a=n(20),r=n(18),c=n(4),l=n(19),i=n(0),m=n.n(i),u=(n(54),n(11)),h=n.n(u),d=n(27),p=window.location.protocol+"//"+window.location.host+"/api",b=p+"/rooms",f=p+"/addroom",g=p+"/roomssensors",E=p+"/showsensors",v=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(a.a)(this,Object(r.a)(t).call(this))).fetchRooms=function(){fetch(g).then((function(e){return e.json()})).then((function(t){var n=[];return console.log("result",t),e.setState({rooms:t}),console.log("this.state.rooms",e.state.rooms),t.map((function(e){e.sensor&&n.push(e.sensor)})),e.setState({usedsensors:n}),fetch(E)})).then((function(e){return e.json()})).then((function(t){var n=[];return t.map((function(t){!1!==e.state.usedsensors.includes(t.sensor)||n.push(t.sensor)})),e.setState({remainsensors:n}),console.log("REMAINSENSORS",e.state.remainsensors),e.state.remainsensors.length<1&&e.setState({buttontext:"Det finns inga lediga sensorer"}),fetch(b)})).then((function(e){return e.json()})).then((function(t){var n=[];t.map((function(e){console.log(e),null!=e.sensorid||n.push(e)}));var o=e.state.rooms.concat(n);console.log(n,o),e.setState({rooms:o})}))},e.addRoom=function(){e.state.remainsensors.length>0&&(console.log("ADDROOM",e.state.remainsensors),fetch(f).then((function(e){return console.log("response",e),e.json()})).then((function(t){console.log("result",typeof t,t,t[0]),e.fetchRooms()})))},e.state={roomname:"",rooms:[],newrooms:[],sensors:[],usedsensors:[],remainsensors:[],buttontext:"L\xe4gg till rum"},e.addRoom=e.addRoom.bind(Object(c.a)(e)),e}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fetchRooms()}},{key:"render",value:function(){var e=this.state.rooms;return console.log(e),m.a.createElement("div",{className:"zones-page"},m.a.createElement("h1",null,m.a.createElement("span",{className:"tempis"},"\xc4rv\xe4rde"),"Rum",m.a.createElement("span",{className:"should"},"B\xf6rv\xe4rde")),m.a.createElement("div",null,e.map((function(e){var t=e.sensor?e.sensor:e.id,n=e.roomid?e.roomid:e.id,o=(e.tempis?e.tempis.toFixed(1):"").toString();return o=o.replace(".",","),m.a.createElement("span",{key:t},m.a.createElement(d.b,{to:"/room/".concat(n),className:"btn btn-block"},m.a.createElement(h.a,{variant:"light",size:"lg",block:!0},m.a.createElement("span",{className:"three"},m.a.createElement("span",{className:"tempis"},m.a.createElement("b",null,o," \xb0C"))," ",m.a.createElement("span",{className:"zone"},m.a.createElement("b",null,e.roomname))," ",m.a.createElement("span",{className:"should"},m.a.createElement("b",null,e.should," \xb0C"))))))})),m.a.createElement("span",{className:"btn btn-block"},m.a.createElement(h.a,{variant:"light",size:"lg",block:!0,onClick:this.addRoom},this.state.buttontext))))}}]),t}(i.Component)}}]);
//# sourceMappingURL=7.bf89e061.chunk.js.map