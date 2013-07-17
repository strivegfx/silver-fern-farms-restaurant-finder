/*global L: true*//*global TweenMax: true*//*jshint devel:true*/$(document).ready(function(){var e={s:{},init:function(){e.genSet();e.genMap();e.getJson()},genSet:function(){e.s.test="hello world";console.log("test = "+e.s.test);e.s.pin={};e.s.pin.orgHgt=473;e.s.pin.orgWth=292;e.s.pin.smlRatio=.25;e.s.pin.lrgRatio=.5;e.s.pin.smlHgt=e.s.pin.orgHgt*e.s.pin.smlRatio;e.s.pin.smlWth=e.s.pin.orgWth*e.s.pin.smlRatio;e.s.pin.lrgHgt=e.s.pin.orgHgt*e.s.pin.lrgRatio;e.s.pin.lrgWth=e.s.pin.orgWth*e.s.pin.lrgRatio},genMap:function(){console.log("generating map!");var t=L.map("map").setView([-36.85,174.7833],13);L.tileLayer("http://{s}.tile.cloudmade.com/1142b9cbe62a48c6b6e8a86ef4122ab7/997/256/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',maxZoom:18}).addTo(t);e.s.map=t},getJson:function(){$.getJSON("js/auckland.json",function(t){e.s.json=t}).success(function(){}).error(function(){}).complete(function(){console.log("got json");e.genIcon();e.listeners()})},genIcon:function(){console.log("generating icons!");var t=e.s.json,n=e.s.map,r=e.s.pin.smlHgt,i=e.s.pin.smlWth,s=L.icon({iconUrl:"img/pin.png",shadowUrl:"img/shadow.png",iconSize:[i,r],shadowSize:[50,64],iconAnchor:[i/2,r],shadowAnchor:[0,0],popupAnchor:[-3,-76]});L.marker([-36.873579,174.761311],{icon:s}).addTo(n)},listeners:function(){console.log("generating listeners!");$(".leaflet-marker-icon").on("mouseenter",function(){e.uiAct.iconEnter($(this))});$(".leaflet-marker-icon").on("mouseleave",function(){e.uiAct.iconLeave($(this))});$(".leaflet-marker-icon").on("click",function(e){e.preventDefault()})},uiAct:{iconEnter:function(t){console.log("icon enter!");var n=e.s.pin.lrgHgt,r=e.s.pin.lrgWth,i=e.s.pin.smlHgt,s=e.s.pin.smlWth,o=(n-i)*-1;TweenMax.to(t,.25,{width:r,height:n,top:o,left:"-38px"});TweenMax.to(t,1,{top:o-30,repeat:-1,yoyo:!0,delay:.25})},iconLeave:function(t){console.log("icon leave!");var n=e.s.pin.smlHgt,r=e.s.pin.smlWth;TweenMax.to(t,.25,{width:r,height:n,top:"0",left:"0"})}}};(function(){e.init()})()});