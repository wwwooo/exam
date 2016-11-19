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
    var requestTag = new XMLHttpRequest();
    var request = new XMLHttpRequest();

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var randomTag = function(callback) {
        requestTag.open('GET', 'https://pixabay.com/api/?key=2344285-2757d4dcb4a1174d53dd52d34&per_page=25', false);
        requestTag.onreadystatechange = function() {
            if (requestTag.status === 200 && requestTag.readyState === 4) {
                callback(JSON.parse(requestTag.response));
                console.log('true requestTag', requestTag.status);
            } else if (requestTag.status !== 200) {
                console.log('false requestTag', requestTag.status);
            }
        };
        requestTag.send();
    };

    var makeRequest = function(tag, callback, limit) {
        limit = limit || 10;
        console.log('tag: ' + tag);
        request.open('GET', 'https://pixabay.com/api/?key=2344285-2757d4dcb4a1174d53dd52d34&q=' + tag + '&per_page=' + limit + '&orientation=vertical');
        request.onreadystatechange = function() {
            if (request.status === 200 && request.readyState === 4) {
                callback(JSON.parse(request.responseText));
                console.log('true request', request.status);
            } else if (request.status !== 200) {
                console.log('false request', request.status);
            }
        };
        request.send();
    };

    submit.addEventListener('click', function() {
        console.log('first search.value: ', search.value);
        if (search.value === '') {
            randomTag(function(data) {
                var data = data.hits;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += data[i].tags;
                }
                var str = str.split(', ');
                console.log('str: ', str);
                search.value = str[getRandomInt(0, str.length - 1)];
                console.log('tag: ', search.value);
            });
            console.log('end randomTag request');
        }

        makeRequest(search.value, function(data) {
            content.innerHTML = tmpl('item_tmpl', {data: data.hits});
            search.value = '';
            $('.discover-ideas__grid').imagesLoaded(function() {
                $('.discover-ideas__grid').masonry({
                    itemSelector: '.discover-ideas__item',
                    columnWidth: '.discover-ideas__item',
                    percentPosition: true
                });
            });
            console.log('end makeRequest\n__________________');
        });
    });

    submit.dispatchEvent(new Event('click'));
});
