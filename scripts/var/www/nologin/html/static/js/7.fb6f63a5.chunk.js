(window.webpackJsonpreactbbb=window.webpackJsonpreactbbb||[]).push([[7],{572:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var s=n(22),o=n(23),a=n(26),r=n(24),c=n(7),l=n(25),m=n(0),i=n.n(m),u=(n(50),n(11)),h=n.n(u),d=n(28),p="http://"+window.location.hostname+":1337",b=p+"/rooms",f=p+"/addroom",g=p+"/roomssensors",E=p+"/showsensors",v=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(a.a)(this,Object(r.a)(t).call(this))).fetchRooms=function(){fetch(g).then((function(e){return e.json()})).then((function(t){var n=[];return console.log("result",t),e.setState({rooms:t}),console.log("this.state.rooms",e.state.rooms),t.map((function(e){e.sensor&&n.push(e.sensor)})),e.setState({usedsensors:n}),fetch(E)})).then((function(e){return e.json()})).then((function(t){var n=[];return t.map((function(t){!1!==e.state.usedsensors.includes(t.sensor)||n.push(t.sensor)})),e.setState({remainsensors:n}),console.log("REMAINSENSORS",e.state.remainsensors),e.state.remainsensors.length<1&&e.setState({buttontext:"Det finns inga lediga sensorer"}),fetch(b)})).then((function(e){return e.json()})).then((function(t){var n=[];t.map((function(e){console.log(e),null!=e.sensorid||n.push(e)}));var s=e.state.rooms.concat(n);console.log(n,s),e.setState({rooms:s})}))},e.addRoom=function(){e.state.remainsensors.length>0&&(console.log("ADDROOM",e.state.remainsensors),fetch(f).then((function(e){return console.log("response",e),e.json()})).then((function(t){console.log("result",typeof t,t,t[0]),e.fetchRooms()})))},e.state={roomname:"",rooms:[],newrooms:[],sensors:[],usedsensors:[],remainsensors:[],buttontext:"L\xe4gg till rum"},e.addRoom=e.addRoom.bind(Object(c.a)(e)),e}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.fetchRooms()}},{key:"render",value:function(){var e=this.state.rooms;return console.log(e),i.a.createElement("div",{className:"zones-page"},i.a.createElement("h1",null,i.a.createElement("span",{className:"htempis"},"\xc4rv\xe4rde"),i.a.createElement("span",{className:"hroom"},"Rum"),i.a.createElement("span",{className:"hshould"},"B\xf6rv\xe4rde")),i.a.createElement("div",null,e.map((function(e){var t=e.sensor?e.sensor:e.id,n=e.roomid?e.roomid:e.id,s=(e.tempis?e.tempis.toFixed(1):"").toString();return s=s.replace(".",","),i.a.createElement("span",{key:t},i.a.createElement(d.b,{to:"/room/".concat(n),className:"btn btn-block"},i.a.createElement(h.a,{variant:"light",size:"lg",block:!0},i.a.createElement("span",{className:"three"},i.a.createElement("span",{className:"tempis"},i.a.createElement("b",null,s," \xb0C"))," ",i.a.createElement("span",{className:"zone"},i.a.createElement("b",null,e.roomname))," ",i.a.createElement("span",{className:"should"},i.a.createElement("b",null,e.should," \xb0C"))))))})),i.a.createElement("span",{className:"btn btn-block"},i.a.createElement(h.a,{variant:"light",size:"lg",block:!0,onClick:this.addRoom},this.state.buttontext))))}}]),t}(m.Component)}}]);
//# sourceMappingURL=7.fb6f63a5.chunk.js.map