function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
        });
        return vars;
}
var qGet = getUrlVars()["q"];
var q = decodeURI(getUrlVars()["q"]);

if (q != "undefined" && q != "") {
        document.body.className+=" results";
}


$(function () {

        if (q != "undefined" && q != "") {
                $("#search_box").attr("value",q);
                var uri = "http://cardsengine.herokuapp.com/mongo?q="  + qGet;
                sendAjax(uri);
        }

       	$("#search_box").keypress(function(e){
                if(e.keyCode == 13) {
                        $("#search_button").click();
                }
        });

	$("#search_button").click(function(){
                if ($("#search_box").val() == "") {
                        $("body").removeClass("results");
                } else {
                       	window.location.search = "?q=" + $("#search_box").val();
                }
        });

});
var resultItem ="";
		
function sendAjax(uri) {
        $.ajax({
               	url: uri,
                dataType: "json",
                success: function(data) {
		$.each(data, function(i,data) {
		
                                                if (data.player)
                                                {
							if(data.player.substring(data.player.lastIndexOf('.') + 1) =="mp4") {
	                                                resultItem += "<div class='item'><video width='100%' height='100%' controls><source src='"+data.player+"'></source></video></div>";
                             	}
							else if(data.site=="Instagram") {
	                                                resultItem += "<div class='item'>"+data.oembed.html+"</div>";
                             	}
							else
{                                                	resultItem += "<div class='player'><iframe style='position:absolute; border: 0; width: 100%; height: 100%;' allowfullscreen src='"+data.player+"'></iframe></div>";
                             	}
						}
                                                else if (data.html)
                                                {
                                                                resultItem += "<div class='item'>"+data.html+"</div>";
                             	
                                                }
                                                else if (data.oembed)
	                                        {
						        if ((data.oembed.html) && (data.oembed.html.indexOf("<")== 0))
        	                                        {
                                                                if ((data.oembed.html).substring(10, 26)=="twitter-timeline")
                                                                {
                                                                resultItem += "<div class='item'><a class='twitter-timeline' data-tweet-limit=1 href='"+data.canonical+"'></a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>";
								}
                                                                else if ((data.site)=="www.facebook.com")
                                                                {
                                                                resultItem += "<div class='item'><div id=\'fb-root\'></div>\n<script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \'//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10\';\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script><div class=\'fb-page\' data-href=\'"+data.canonical+"\' data-small-header=\'\' data-adapt-container-width=\'1\' data-hide-cover=\'\' data-width=\'500\' data-show-facepile=\'1\'><blockquote cite=\'"+data.canonical+"\' class=\'fb-xfbml-parse-ignore\'><a href=\'"+data.canonical+"\'>"+data.title+"</a></blockquote></div></div>";
								}
                                                                else if (data.oembed.type=='video')
								{
                                                                resultItem += "<div class='player'>"+data.oembed.html+"</div>";
								}
                                                                else if ((data.oembed.provider_name=='Variety') || (data.oembed.provider_name=='WIRED') || (data.oembed.provider_name=='TechCrunch'))
								{
                                                		resultItem += "<div class='item'><div class='article'><a class='l' title='"+data.title+"' href='"+data.canonical+"' style='background-image: url("+data.image+");'></a><div class='o'><header class='h'><h1 class='t' title='"+data.title+"'>"+data.title+"</h1><p class='m'><img style='width:16px;height:16px;margin-right:.125em;vertical-align:middle;' src='"+data.icon+"'><a href='"+data.canonical+"' target='_blank'>"+data.site+"</a></p></header></div></div></div>";
								}
                                                                else
								{		
                                                                resultItem += "<div class='item'>"+data.oembed.html+"</div>";
				                             	
								}
                	                                }
	                                                else if ((data.image) && (data.width > 399))
        	                                        {
														resultItem += "<div class='item'><div class='article'><a class='l' title='"+data.title+"' href='"+data.canonical+"' style='background-image: url("+data.image+");'></a><div class='o'><header class='h'><h1 class='t' title='"+data.title+"'>"+data.title+"</h1><p class='m'><img style='width:16px;height:16px;margin-right:.125em;vertical-align:middle;' src='"+data.icon+"'><a href='"+data.canonical+"' target='_blank'>"+data.site+"</a></p></header></div></div></div>";
														
													}
        	                                        else if ((data.oembed.image) && (data.oembed.width > 399))
        	                                        {
														resultItem += "<div class='item'><div class='article'><a class='l' title='"+data.title+"' href='"+data.canonical+"' style='background-image: url("+data.oembed.image+");'></a><div class='o'><header class='h'><h1 class='t' title='"+data.title+"'>"+data.title+"</h1><p class='m'><img style='width:16px;height:16px;margin-right:.125em;vertical-align:middle;' src='"+data.icon+"'><a href='"+data.canonical+"' target='_blank'>"+data.site+"</a></p></header></div></div></div>";
														
													}

							}
                                                else if ((data.image) && (data.width > 399))
                                                {
													resultItem += "<div class='item'><div class='article'><a class='l' title='"+data.title+"' href='"+data.canonical+"' style='background-image: url("+data.image+");'></a><div class='o'><header class='h'><h1 class='t' title='"+data.title+"'>"+data.title+"</h1><p class='m'><img style='width:16px;height:16px;margin-right:.125em;vertical-align:middle;' src='"+data.icon+"'><a href='"+data.canonical+"' target='_blank'>"+data.site+"</a></p></header></div></div></div>";
													
												}
						
               	});
        },

		complete: function() {
				$("#results-block").append(resultItem);
			}
});
}
