$(function(){$(".h-it-w__section-1").slick({initialSlide:0}),$(".h-it-w__section-2").slick({initialSlide:1}),$(".h-it-w__section-3").slick({initialSlide:2});var e=document.getElementById("search"),t=document.getElementById("search-btn"),i=document.getElementById("grid"),n=new XMLHttpRequest,s=function(e,t,i){i=i||15,n.open("GET","http://api.pixplorer.co.uk/image?word="+e+"&amount="+i),n.onreadystatechange=function(){200===n.status&&4===n.readyState?(t(JSON.parse(n.response)),console.log("request \n",n),console.log("respons \n",n.response)):200!==n.status&&console.log("false request",n.status)},n.send()};t.addEventListener("click",function(){s(e.value,function(e){i.innerHTML=tmpl("item_tmpl",{data:e.images}),$(".discover-ideas__grid").imagesLoaded(function(){$(".discover-ideas__grid").masonry({itemSelector:".discover-ideas__item",columnWidth:".discover-ideas__item",percentPosition:!0})})})}),t.dispatchEvent(new Event("click"))});