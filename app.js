(function($) {
	$(document).ready(function() {
		var clipboard = new ClipboardJS('.btn-copy-link');

		$('.btn-menu').on('click', function(e) {
			e.preventDefault();
			$(this).find('.fa').toggleClass('fa-bars').toggleClass('fa-close');
			$(this).parent().parent().find('.navbar').toggleClass('show');
		});

		$(document).on('click', '.btn-copy-link', function(e) {
			e.preventDefault();
			$(this).html('Copied!');
			$(this).removeClass('btn-primary').addClass('btn-secondary');
		});

		$('.form').on('submit', function(e) {
			e.preventDefault();
			var $form = $(this);
			$form.find('.has-error').removeClass('.has-error');
			$form.find('.form-message').remove();

			if( $form.find('.form-field').val() === '' ) {
				$form.find('.form-field').addClass('has-error');
				$form.find('.form-field').parent().append('<p class="form-message">Please add a link</p>');
			} else {
				$.ajax({
					url: 'https://api.shrtco.de/v2/shorten',
					method: 'post',
					data: {
						url: $form.find('.form-field').val()
					},
					success: function(data) {
						var $link = '<div class="api-link">';
						$link += '<div class="initial-link">' + data.result.original_link + '</div>';
						$link += '<div class="final-link">';
						$link += '<span class="shorten-link">' + data.result.full_short_link + '</span>';
						$link += '<button type="button" class="btn btn-primary btn-copy-link" data-clipboard-text="' + data.result.full_short_link + '">Copy</button>';
						$link += '</div>';
						$link += '</div>';
						$form.parent().append($link);
					},
					error: function(x,y,z) {
						$form.find('.form-field').addClass('has-error');
						$form.find('.form-field').parent().append('<p class="form-message">API link error! Please try again later!</p>');
					}
				});
			}
		});
	});
})(jQuery);