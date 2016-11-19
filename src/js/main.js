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
    var request1 = new XMLHttpRequest();
    var request = new XMLHttpRequest();

    var request1 = function(tag) {
        request1.open('GET', 'https://wordsapiv1.p.mashape.com/words/?random=true');
        request1.onreadystatechange = function() {
            JSON.parse(request1.responseText.word);
        };
        request1.send();
    };

    var makeRequest = function(tag, callback, limit) {
        limit = limit || 15;
        request.open('GET', 'https://pixabay.com/api/?key=2344285-2757d4dcb4a1174d53dd52d34&q=' + tag + '&per_page=' + limit + '&orientation=vertical');
        request.onreadystatechange = function() {
            if (request.status === 200 && request.readyState === 4) {
                callback(JSON.parse(request.responseText));
            } else if (request.status !== 200) {
                console.log('false request', request.status);
            }
        };
        request.send();
    };

    submit.addEventListener('click', function() {
        if (!search.value) {
            request1();
        }
        makeRequest(search.value, function(data) {
            content.innerHTML = tmpl('item_tmpl', {data: data.hits});

            $('.discover-ideas__grid').imagesLoaded(function() {
                $('.discover-ideas__grid').masonry({
                    itemSelector: '.discover-ideas__item',
                    columnWidth: '.discover-ideas__item',
                    percentPosition: true
                });
            });
        });
    });

    submit.dispatchEvent(new Event('click'));
});
