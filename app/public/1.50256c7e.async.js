(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{xL0y:function(e,a,t){"use strict";var n=t("g09b");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t("p0pE")),c=n(t("d6i3")),s=t("hgce"),u={namespace:"list",state:{data:{list:[],pagination:{}}},effects:{fetch:c.default.mark(function e(a,t){var n,r,u,l;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,u=t.put,e.next=4,r(s.queryList,n);case 4:return l=e.sent,e.next=7,u({type:"save",payload:l});case 7:case"end":return e.stop()}},e)}),add:c.default.mark(function e(a,t){var n,r,u,l,p;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,u=t.call,l=t.put,e.next=4,u(s.addList,n);case 4:return p=e.sent,e.next=7,l({type:"save",payload:p});case 7:r&&r();case 8:case"end":return e.stop()}},e)}),remove:c.default.mark(function e(a,t){var n,r,u,l,p;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,u=t.call,l=t.put,e.next=4,u(s.removeList,n);case 4:return p=e.sent,e.next=7,l({type:"save",payload:p});case 7:r&&r();case 8:case"end":return e.stop()}},e)}),update:c.default.mark(function e(a,t){var n,r,u,l,p;return c.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,u=t.call,l=t.put,e.next=4,u(s.updateList,n);case 4:return p=e.sent,e.next=7,l({type:"save",payload:p});case 7:r&&r();case 8:case"end":return e.stop()}},e)})},reducers:{save:function(e,a){return(0,r.default)({},e,{data:a.payload})}}};a.default=u}}]);