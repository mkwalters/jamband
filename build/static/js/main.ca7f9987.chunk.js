(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{123:function(e,t,n){},157:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(14),r=n.n(s),i=(n(123),n(25)),o=n.n(i),l=n(36),j=n(13),u=n(21),b=n(17),d=n(2),h=n(87),O=n(88),p=n(107),x=n(106),f=function(e){Object(p.a)(n,e);var t=Object(x.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("h1",{children:"info"})})}}]),n}(c.Component),m=function(){var e={display:"block",marginTop:"10px",marginBottom:"10px"};return Object(d.jsx)("main",{class:"container",children:Object(d.jsxs)("article",{class:"grid",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("hgroup",{children:Object(d.jsx)("h1",{children:"Sign up"})}),Object(d.jsxs)("form",{action:"/users",method:"post",children:[Object(d.jsx)("input",{style:e,type:"text",name:"username",placeholder:"Username"}),Object(d.jsx)("input",{style:e,type:"password",name:"password",placeholder:"Password"}),Object(d.jsx)("button",{type:"submit",class:"contrast",children:"Sign up"})]})]}),Object(d.jsx)("div",{})]})})},g=n(200),v=Object(g.a)((function(e){return{root:{display:"block",margin:"20px"}}})),y=function(){var e=v(),t=Object(c.useState)(""),n=Object(j.a)(t,2),a=(n[0],n[1],Object(c.useState)("")),s=Object(j.a)(a,2);s[0],s[1];return Object(d.jsx)("main",{class:"container",children:Object(d.jsxs)("article",{class:"grid",children:[Object(d.jsx)("h1",{className:e.root,children:"Log in"}),Object(d.jsxs)("div",{children:[Object(d.jsx)("hgroup",{children:Object(d.jsx)("h1",{children:"Sign in"})}),Object(d.jsxs)("form",{action:"/login/password",method:"post",children:[Object(d.jsx)("input",{style:{display:"block"},type:"text",name:"username",placeholder:"Username"}),Object(d.jsx)("input",{style:{display:"block",marginTop:"10px",marginBottom:"10px"},type:"password",name:"password",placeholder:"Password"}),Object(d.jsx)("button",{style:{display:"block",marginTop:"10px",marginBottom:"10px"},type:"submit",class:"contrast",children:"Sign in"})]})]}),Object(d.jsx)("div",{}),Object(d.jsx)("div",{children:Object(d.jsx)(u.b,{className:e.root,to:"/signup",children:"Create an account"})})]})})},k=Object(c.createContext)(null),w=n(48),N=(n(73),n(74),n(203)),S=n(207),C=n(205),P=n(206),F=Object(g.a)({root:{minWidth:700,marginTop:"12px",marginBottom:"12px",backgroundColor:"#FFFDD0"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:18},author:{fontSize:13}}),U=function(){var e=F(),t=Object(c.useContext)(k),n=(t.user,t.setUser),a=Object(c.useState)([]),s=Object(j.a)(a,2),r=s[0],i=s[1],u=Object(c.useState)(-1),b=Object(j.a)(u,2),h=b[0],O=b[1],p=(e.bullet,function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("/getUser").then((function(e){e.json().then((function(e){n(e)}))}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(c.useEffect)((function(){n(p()),fetch("/songs").then((function(e){e.json().then((function(e){i(e.data)}))}))}),[]),Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("div",{children:r.map((function(t,n){return Object(d.jsx)("span",{style:{display:"flex",justifyContent:"center"},children:Object(d.jsxs)(N.a,{className:t.song_id===h?"card-selector":e.root,children:[Object(d.jsxs)(C.a,{children:[Object(d.jsx)(P.a,{className:e.title,color:"textPrimary",gutterBottom:!0,children:t.name}),Object(d.jsx)(w.a,{src:t.s3key,onPlay:function(e){return O(t.song_id)},header:t.name,style:{opacity:"0.5"}})]}),Object(d.jsx)(S.a,{})]})})}))})})},B=n(209),T=n(63),D=function(e){var t=e.msg;return Object(d.jsxs)("div",{className:"alert alert-info alert-dismissible fade show",role:"alert",children:[t,Object(d.jsx)("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",children:Object(d.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]})},E=function(e){var t=e.percentage;return Object(d.jsx)("div",{className:"progress",children:Object(d.jsxs)("div",{className:"progress-bar progress-bar-striped bg-success",role:"progressbar",style:{width:"".concat(t,"%")},children:[t,"%"]})})},I=n(103),A=n.n(I),_=n(221),G=n(220),L=n(219),J=n(65);function M(e){return Object(d.jsx)(G.a,Object(T.a)({elevation:6,variant:"filled"},e))}var R=Object(g.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}})),W=function(e){R();var t=a.a.useState(!1),n=Object(j.a)(t,2),s=n[0],r=n[1],i=Object(c.useState)(""),u=Object(j.a)(i,2),b=u[0],h=u[1],O=Object(c.useState)(""),p=Object(j.a)(O,2),x=(p[0],p[1]),f=Object(c.useState)({}),m=Object(j.a)(f,2),g=m[0],v=m[1],y=Object(c.useState)(""),k=Object(j.a)(y,2),w=k[0],N=k[1],S=Object(c.useState)(0),C=Object(j.a)(S,2),P=C[0],F=C[1],U=Object(c.useState)(""),B=Object(j.a)(U,2),T=B[0],I=B[1],G=function(e,t){"clickaway"!==t&&r(!1)},W=function(){var t=Object(l.a)(o.a.mark((function t(n){var c,a,s,i,l;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==J.keys(e.user).length&&null!=e.user){t.next=3;break}return r(!0),t.abrupt("return");case 3:return n.preventDefault(),(c=new FormData).append("file",b),c.append("previousPath",e.previousPath),c.append("songName",T),c.append("authorId",e.user.user_id),c.append("original",e.original),t.prev=10,t.next=13,A.a.post("/aws/upload",c,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){F(parseInt(Math.round(100*e.loaded/e.total)))}});case 13:a=t.sent,setTimeout((function(){return F(0)}),1e4),s=a.data,i=s.fileName,l=s.filePath,v({fileName:i,filePath:l}),N("File Uploaded"),t.next=24;break;case 20:t.prev=20,t.t0=t.catch(10),500===t.t0.response.status?N("There was a problem with the server"):N(t.t0.response.data.msg),F(0);case 24:case"end":return t.stop()}}),t,null,[[10,20]])})));return function(e){return t.apply(this,arguments)}}();return Object(d.jsxs)(c.Fragment,{children:[w?Object(d.jsx)(D,{msg:w}):null,Object(d.jsx)(_.a,{open:s,autoHideDuration:6e3,onClose:G,children:Object(d.jsx)(M,{onClose:G,severity:"warning",children:"Must be logged in to upload files"})}),Object(d.jsx)("form",{onSubmit:W,children:Object(d.jsxs)("div",{className:"custom-file mb-4",children:[Object(d.jsx)(L.a,{value:T,onChange:function(e){I(e.target.value)},id:"standard-basic",label:"Song name"}),Object(d.jsx)("input",{type:"file",className:"custom-file-input",id:"customFile",onChange:function(e){h(e.target.files[0]),x(e.target.files[0].name)},style:{display:"block"}}),Object(d.jsx)(E,{percentage:P}),Object(d.jsx)("input",{type:"submit",value:"Upload",className:"btn btn-primary btn-block mt-4"})]})}),g?Object(d.jsx)("div",{className:"row mt-5",children:Object(d.jsxs)("div",{className:"col-md-6 m-auto",children:[Object(d.jsx)("h3",{className:"text-center",children:g.fileName}),Object(d.jsx)("img",{style:{width:"100%"},src:g.filePath,alt:""})]})}):null]})},z=n(222),H=n(210),q=n(105),K=n.n(q),Q=n(104),V=n.n(Q),X=Object(g.a)({root:{height:110,flexGrow:1,maxWidth:400}}),Y=function(){var e=X(),t=Object(c.useContext)(k),n=t.user,a=(t.setUser,Object(b.f)().id),s=Object(c.useState)([]),r=Object(j.a)(s,2),i=r[0],o=r[1],l=Object(c.useState)(!1),u=Object(j.a)(l,2),h=u[0],O=u[1],p=Object(c.useState)([]),x=Object(j.a)(p,2),f=x[0],m=x[1],g=Object(c.useState)([]),v=Object(j.a)(g,2),y=v[0],N=v[1];Object(c.useEffect)((function(){console.log("mounted"),fetch("/songs/".concat(a)).then((function(e){e.json().then((function(e){console.log(e.data[0]),o(e.data[0]);var t=e.data[0].path.split(".")[0];console.log("original ancestor: ",t),fetch("/songs/getTree/".concat(t)).then((function(e){e.json().then((function(e){console.log(e.data),m(e.data),N(function(e){for(var t=[],n=0;n<e.length;n++)for(var c=e[n].path.split("."),a=t,s=0;s<c.length;s++){for(var r=c[s],i=a,o=0;o<a.length;o++)if(a[o].pathName==r){a=a[o].children;break}if(i==a){var l=a[o]={id:e[n].song_id,name:e[n].name,pathName:r,children:[]};a=l.children}}return t[0]}(e.data))}))}))}))}))}),[]);return Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:i.name}),Object(d.jsx)(w.a,{src:i.s3key,onPlay:function(e){return console.log("onPlay")}}),Object(d.jsx)(B.a,{variant:"outlined",onClick:function(){O(!h)},children:"remix"}),h&&Object(d.jsx)(W,{previousPath:i.path,user:n,original:!1}),Object(d.jsx)(H.a,{className:e.root,defaultCollapseIcon:Object(d.jsx)(V.a,{}),defaultExpanded:["root"],defaultExpandIcon:Object(d.jsx)(K.a,{}),onNodeSelect:function(e,t){console.log(t),f.forEach((function(e){e.song_id===t&&o(e)}))},children:function e(t){return Object(d.jsx)(z.a,{nodeId:t.id,label:t.name,children:Array.isArray(t.children)?t.children.map((function(t){return e(t)})):null},t.id)}(y)})]})},Z=function(){var e=Object(c.useContext)(k).user,t=Object(c.useState)(""),n=Object(j.a)(t,2);n[0],n[1];return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("p",{children:JSON.stringify(e)}),Object(d.jsx)(W,{previousPath:"",user:e,original:!0})]})},$=n(212),ee=n(216),te=n(215),ne=n(211),ce=n(213),ae=n(214),se=n(109),re=n(65),ie=Object(g.a)({table:{minWidth:650}});function oe(e){return Object(d.jsx)(G.a,Object(T.a)({elevation:6,variant:"filled"},e))}var le=function(){var e=ie(),t=Object(c.useContext)(k),n=t.user,s=t.setUser,r=Object(c.useState)([]),i=Object(j.a)(r,2),b=i[0],h=i[1],O=Object(c.useState)(!1),p=Object(j.a)(O,2),x=p[0],f=p[1],m=a.a.useState(!1),g=Object(j.a)(m,2),v=g[0],y=g[1],N=function(e,t){"clickaway"!==t&&y(!1)},S=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("/getUser").then((function(e){e.json().then((function(e){s(e)}))}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){s(S()),fetch("/songs/backingtracks").then((function(e){e.json().then((function(e){h(e.data)}))}))}),[]);return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{className:e.root,children:Object(d.jsx)(_.a,{open:v,autoHideDuration:6e3,onClose:N,children:Object(d.jsx)(oe,{onClose:N,severity:"warning",children:"Must be logged in to upload"})})}),Object(d.jsx)("p",{}),Object(d.jsx)(B.a,{variant:"outlined",onClick:function(){0!==re.keys(n).length?f(!x):y(!0)},children:"Create new backing track"}),x&&Object(d.jsx)(W,{previousPath:"",user:n,original:!0}),Object(d.jsx)(ne.a,{component:se.a,children:Object(d.jsxs)($.a,{className:e.table,"aria-label":"simple table",children:[Object(d.jsx)(ce.a,{children:Object(d.jsxs)(ae.a,{children:[Object(d.jsx)(te.a,{children:"Song Name"}),Object(d.jsx)(te.a,{children:"audio player"}),Object(d.jsx)(te.a,{children:"author"}),Object(d.jsx)(te.a,{})]})}),Object(d.jsx)(ee.a,{children:b.map((function(e,t){return Object(d.jsxs)(ae.a,{children:[Object(d.jsx)(te.a,{children:e.name}),Object(d.jsx)(te.a,{component:"th",scope:"row",children:Object(d.jsx)(w.a,{src:e.s3key,onPlay:function(e){return console.log("onPlay")},header:e.name})}),Object(d.jsx)(te.a,{children:Object(d.jsx)("p",{children:e.username})}),Object(d.jsx)(te.a,{children:Object(d.jsx)(B.a,{variant:"outlined",component:u.b,to:"/song/"+e.song_id.toString(),children:"Remix >"})})]},e.name)}))})]})})]})},je=n(217),ue=n(218),be=n(65),de=Object(g.a)((function(e){return{root:{flexGrow:1,color:"#FFFDD0"},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},username:{marginRight:e.spacing(2),color:"black"}}})),he=function(){var e=de(),t=Object(c.useContext)(k),n=t.user,a=t.setUser;return Object(d.jsx)("div",{className:e.root,children:Object(d.jsx)(je.a,{position:"static",style:{backgroundColor:"#FFFDD0"},children:Object(d.jsxs)(ue.a,{children:[Object(d.jsx)(P.a,{variant:"h6",className:e.menuButton,children:Object(d.jsx)(u.b,{to:"/",children:"Jamband"})}),Object(d.jsx)(B.a,{variant:"outlined",component:u.b,to:"/backingtracks",className:e.menuButton,children:"Backing Tracks"}),Object(d.jsx)(P.a,{variant:"h6",className:e.title}),0===be.keys(n).length&&Object(d.jsxs)("div",{children:[Object(d.jsx)(B.a,{variant:"outlined",component:u.b,to:"/login",children:"Log in"}),Object(d.jsx)(B.a,{variant:"outlined",component:u.b,to:"/signup",children:"Sign up"})]}),Object(d.jsx)(P.a,{variant:"h6",className:e.username,children:be.keys(n).length>0&&n.username}),be.keys(n).length>0&&Object(d.jsx)(B.a,{variant:"outlined",component:u.b,onClick:function(){fetch("/logout"),a({})},children:"Logout"})]})})})};Object(g.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function Oe(){var e=Object(c.useState)(null),t=Object(j.a)(e,2),n=t[0],a=t[1],s=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("/getUser").then((function(e){e.json().then((function(e){a(e)}))}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){a(s())}),[]),Object(d.jsx)(u.a,{children:Object(d.jsx)("div",{children:Object(d.jsxs)(k.Provider,{value:{user:n,setUser:a},children:[Object(d.jsx)(he,{}),Object(d.jsxs)(b.c,{children:[Object(d.jsx)(b.a,{path:"/info",children:Object(d.jsx)(f,{})}),Object(d.jsx)(b.a,{path:"/signup",children:Object(d.jsx)(m,{})}),Object(d.jsx)(b.a,{path:"/login",children:Object(d.jsx)(y,{})}),Object(d.jsx)(b.a,{path:"/create",children:Object(d.jsx)(Z,{})}),Object(d.jsx)(b.a,{path:"/song/:id",children:Object(d.jsx)(Y,{})}),Object(d.jsx)(b.a,{path:"/backingtracks",children:Object(d.jsx)(le,{})}),Object(d.jsx)(b.a,{path:"/",children:Object(d.jsx)(U,{})})]})]})})})}var pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,223)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))};r.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(Oe,{})}),document.getElementById("root")),pe()},74:function(e,t,n){}},[[157,1,2]]]);
//# sourceMappingURL=main.ca7f9987.chunk.js.map