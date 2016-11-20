$(function() {
    $('#h-it-w__section-1').slick({
        initialSlide: 0
    });

    $('#h-it-w__section-2').slick({
        initialSlide: 1
    });

    $('#h-it-w__section-3').slick({
        initialSlide: 2
    });

    var search = document.getElementById('search');
    var submit = document.getElementById('search-btn');
    var content = document.getElementById('grid');
    var requestTags = new XMLHttpRequest();
    var requestImg = new XMLHttpRequest();
    var tags = [];

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var makeRequestTags = function(callback) {
        requestTags.open('GET', 'https://pixabay.com/api/?key=2344285-2757d4dcb4a1174d53dd52d34&per_page=100',false);
        requestTags.onreadystatechange = function() {
            if (requestTags.status === 200 && requestTags.readyState === 4) {
                callback(JSON.parse(requestTags.response));
            } else if (requestTags.status !== 200) {
                console.log('false requestTag', requestTags.status);
            }
        };
        requestTags.send();
    };

    var makeRequestImg = function(tag, callback, limit) {
        limit = limit || 6;
        requestImg.open('GET', 'https://pixabay.com/api/?key=2344285-2757d4dcb4a1174d53dd52d34&q=' + tag + '&per_page=' + limit + '&orientation=vertical');
        requestImg.onreadystatechange = function() {
            if (requestImg.status === 200 && requestImg.readyState === 4) {
                callback(JSON.parse(requestImg.responseText));
            } else if (requestImg.status !== 200) {
                console.log('false request', requestImg.status);
            }
        };
        requestImg.send();
    };

    submit.addEventListener('click', function() {
        if (search.value === '') {
            search.value = tags[getRandomInt(0, tags.length - 1)];
        }

        makeRequestImg(search.value, function(data) {
            if (data.totalHits) {
                search.value = '';
                content.innerHTML = tmpl('item_tmpl', {data: data.hits});
                $('.discover-ideas__grid').imagesLoaded(function() {
                    $('.discover-ideas__grid').masonry({
                        itemSelector: '.discover-ideas__item',
                        columnWidth: '.discover-ideas__item',
                        percentPosition: true
                    });
                });
            }
        });
    });

    search.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            submit.dispatchEvent(new Event('click'));
	    }
    });

    makeRequestTags(function(data) {
        var data = data.hits;
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += data[i].tags + ', ';
        }
        tags = str.split(', ');
    });

    submit.dispatchEvent(new Event('click'));
});
