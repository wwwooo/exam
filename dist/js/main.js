$(function() {
    $('.h-it-w__section-1').slick({
        initialSlide: 0
    });

    $('.h-it-w__section-2').slick({
        initialSlide: 1
    });

    $('.h-it-w__section-3').slick({
        initialSlide: 2
    });

    var search = document.getElementById('search');
    var submit = document.getElementById('search-btn');
    var content = document.getElementById('discover-ideas');
    var request = new XMLHttpRequest();

    var makeRequest = function(tag, callback, limit) {
        limit = limit || 15;

        request.open('GET', 'http://api.pixplorer.co.uk/image?word=' + tag + '&amount=' + limit);
        request.onreadystatechange = function() {
            if (request.status === 200 && request.readyState === 4) {
                callback(JSON.parse(request.response));
                console.log('request \n', request);
                console.log('respons \n', request.response);

            } else if (request.status !== 200) {
                console.log('false request', request.status);
            }
        };
        request.send();
    };

    submit.addEventListener('click', function() {
        makeRequest(search.value, function(data) {
            content.innerHTML = tmpl('item_tmpl', {data: data.images});

            $('.discover-ideas__grid').imagesLoaded( function(){
                $('.discover-ideas__grid').masonry({
                    itemSelector: '.discover-ideas__item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    isFitWidth: true,
                    gutter: 20
                })
            });
        });
    });

    submit.dispatchEvent(new Event('click'));
});
