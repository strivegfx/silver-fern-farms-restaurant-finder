/*global L: true*//*global TweenMax: true*//*jshint devel:true*/$(document).ready(function(){var e={s:{},init:function(){e.genSet();e.genMap();e.getJson()},genSet:function(){e.s.test="hello world";console.log("test = "+e.s.test);e.s.pin={};e.s.pin.orgHgt=473;e.s.pin.orgWth=292;e.s.pin.smlRatio=.2;e.s.pin.lrgRatio=.35;e.s.pin.smlHgt=e.s.pin.orgHgt*e.s.pin.smlRatio;e.s.pin.smlWth=e.s.pin.orgWth*e.s.pin.smlRatio;e.s.pin.lrgHgt=e.s.pin.orgHgt*e.s.pin.lrgRatio;e.s.pin.lrgWth=e.s.pin.orgWth*e.s.pin.lrgRatio;e.s.sel={};e.s.sel.loc="auckland";e.s.sel.cui=[];e.s.menu=$(".menu")},genMap:function(){console.log("generating map!");var t=L.map("map").setView([-36.85,174.7833],13);L.tileLayer("http://{s}.tile.cloudmade.com/1142b9cbe62a48c6b6e8a86ef4122ab7/997/256/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',maxZoom:18}).addTo(t);e.s.map=t},getJson:function(){$.getJSON("js/auckland.json",function(t){e.s.json=t}).success(function(){}).error(function(){}).complete(function(){console.log("got json");e.genIcon();e.listeners()})},genIcon:function(){console.log("generating icons!");var t=e.s.json,n=t.length,r=e.s.map,i=e.s.pin.smlHgt,s=e.s.pin.smlWth,o=L.icon({iconUrl:"img/special-pin.png",iconSize:[s,i],iconAnchor:[s/2,i],popupAnchor:[-3,-76],shadowUrl:"img/shadow.png",shadowSize:[s,s],shadowAnchor:[s/2,s/2]}),u=L.icon({iconUrl:"img/green-pin.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[-3,-76],shadowUrl:"img/marker-shadow.png",shadowSize:[41,41],shadowAnchor:[12,41]}),a=null,f=null;console.log("json length = "+n);for(var l=0;l<n;l++){a=t[l].Latitude;f=t[l].Longitude;l%100===0?L.marker([a,f],{icon:o}).addTo(r):L.marker([a,f],{icon:u}).addTo(r)}},listeners:function(){console.log("generating listeners!");$(".leaflet-marker-icon").on("mouseenter",function(){e.uiAct.iconEnter($(this))});$(".leaflet-marker-icon").on("mouseleave",function(){e.uiAct.iconLeave($(this))});$(".leaflet-marker-icon").on("click",function(e){});e.s.menu.on("click","li",function(){e.uiAct.menuClick($(this))})},uiAct:{iconEnter:function(t){console.log("icon enter!");var n=t.attr("src");console.log("image src = "+n);if(n!=="img/special-pin.png"){console.log("NOT SPECIAL PIN!");return""}var r=e.s.pin.lrgHgt,i=e.s.pin.lrgWth,s=e.s.pin.smlHgt,o=e.s.pin.smlWth,u=(r-s)*-1,a=(r-s)/2*-1;TweenMax.to(t,.25,{width:i,height:r,top:u,left:a+15})},iconLeave:function(t){console.log("icon leave!");var n=t.attr("src");console.log("image src = "+n);if(n!=="img/special-pin.png"){console.log("NOT SPECIAL PIN!");return""}var r=e.s.pin.smlHgt,i=e.s.pin.smlWth;TweenMax.to(t,.25,{width:i,height:r,top:"0",left:"0",repeat:0,yoyo:!1})},menuClick:function(t){console.log("menu click!");var n=e.s.sel.loc,r=e.s.sel.cui,i=t.attr("data-selection"),s=t.attr("data-active"),o=t.closest("div.selection-container"),u=o.hasClass("location");console.log("");console.log("you clicked the "+i+" button");if(u){if(s==="true")return"";o.find("li").attr({"data-active":"false"});t.attr({"data-active":"true"});console.log("inside the location container");n=i}else{console.log("inside the cuisine container");r=[];s==="true"?t.attr({"data-active":"false"}):t.attr({"data-active":"true"});o.find("li").each(function(){t=$(this),s=t.attr("data-active");if(s==="true"){i=t.attr("data-selection");r.push(i)}})}e.s.sel.loc=n;e.s.sel.cui=r;console.log("location name = "+n);console.log("cusine array = "+r)}}};(function(){e.init()})()});