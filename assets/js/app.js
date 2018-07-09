var IntroHandler = function() {
    var body = $('body');
    var screen = $('.intro');
    var playerIntro = $('#intro__player')[0];
    var playerMain = $('#main__player')[0];

    screen.find('div').addClass('show');
    screen.on('click', function(event) {
        event.preventDefault();

        body.removeClass('introison');
        $(this).removeClass('show');

        var volFadeOut = window.setInterval(function() {
            playerIntro.volume = (Math.round(playerIntro.volume * 100) - 1) / 100;
            if (playerIntro.volume < 0.02) {
                playerIntro.pause();
                clearInterval(volFadeOut);
                screen.hide();
            }
        }, 15);
    });

    playerIntro.onpause = function() {
        playerMain.volume = 0.3;
        playerMain.play();
    };
};

var ButtonHandler = function() {
    var button = $('.buttons__item');
    var scene = $('.action');

    button.on('click', function(event) {
        event.preventDefault();

        button.removeClass('selected')
        $(this).addClass('selected');
    });

    button.keydown(function(e) {
        if ($(this).hasClass('selected')) {
            if (e.which == 13) {
                var id = $(this).attr('id');
                var text = $(this).data('text');

                scene.data('button', id);
                scene.addClass('show');
                scene.find('.action__image').attr('src', 'assets/images/' + id + '.jpg');
                scene.find('.action__text').text(text);
                setTimeout(function() {
                    scene.find('.action__image').addClass('show');
                }, 300);
                setTimeout(function() {
                    scene.find('.action__text').addClass('show');
                }, 800);
            }
        }
    });
};

var ActionHandler = function() {
    var scene = $('.action');
    var buttons = $('.buttons');

    scene.on('click', function() {
        buttons.find('#' + $(this).data('button')).css({
            'opacity': 0,
            'pointer-events': 'none',
        });
        scene.removeClass('show');
        scene.find('.action__image').removeClass('show');
        scene.find('.action__text').removeClass('show');
    });
};

var FinalHandler = function() {
    var scene = $('.final');
    var img = scene.find('img');

    $(window).keydown(function(e) {
        if (e.which == 27) {
            if (!scene.hasClass('show')) {
                scene.addClass('show');
                setTimeout(function() {
                    img.addClass('show');
                }, 2000);
            } else {
            	scene.removeClass('show');
            	img.removeClass('show');
            }
        }
    });
};


jQuery(document).ready(function($) {
    IntroHandler();
    ButtonHandler();
    ActionHandler();
    FinalHandler();
});